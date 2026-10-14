$ErrorActionPreference='Stop'
$Root='C:\Users\Cranio\MCP_CAIXA\NAVE\ACADEMIA\HALLEY_SHOW_JORNADA_VIVA_BASE'
$Web=Join-Path $Root '01_WEB_APPDEPLOY_SNAPSHOT'
$Dist=Join-Path $Web 'dist'
$Gateway=Join-Path $Root '09_OPERACAO\lab_gateway.py'
$Wrapper=Join-Path $Root '02_ANDROID_WRAPPER'
$Main=Join-Path $Wrapper 'app\src\main\java\com\halleyshow\jornadaviva\MainActivity.java'
$Sync=Join-Path $Root '09_OPERACAO\SINCRONIZAR_BUILD_INSTALAR_POCO.ps1'

$lan=(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
  $_.IPAddress -notlike '127.*' -and
  $_.InterfaceAlias -notlike '*WSL*' -and
  $_.IPAddress -notlike '172.26.*' -and
  ($_.IPAddress -like '10.*' -or $_.IPAddress -like '192.168.*')
} | Select-Object -First 1 -ExpandProperty IPAddress)
if(-not $lan){throw 'LAN_IP_NOT_FOUND'}

$listeners=Get-NetTCPConnection -LocalPort 8799 -State Listen -ErrorAction SilentlyContinue
$gatewayAlive=$false
foreach($l in @($listeners)){
  $proc=Get-CimInstance Win32_Process -Filter ("ProcessId="+$l.OwningProcess) -ErrorAction SilentlyContinue
  if($proc.CommandLine -like '*lab_gateway.py*'){$gatewayAlive=$true}
  elseif($proc){Stop-Process -Id $proc.ProcessId -Force -ErrorAction SilentlyContinue}
}
if(-not $gatewayAlive){
  Start-Process -FilePath python -ArgumentList $Gateway -WindowStyle Hidden
  Start-Sleep -Seconds 2
}
$r=Invoke-WebRequest "http://127.0.0.1:8799/" -UseBasicParsing -TimeoutSec 5
if($r.StatusCode -ne 200){throw 'LOCAL_WEB_NOT_READY'}
$probe=Invoke-RestMethod "http://127.0.0.1:8799/nave/treinos/students/student_demo_01/today" -TimeoutSec 5
if(-not $probe.student.id){throw 'NAVE_GATEWAY_NOT_READY'}

$java=[IO.File]::ReadAllText($Main)
$desired='private static final String LOCAL_URL = "http://' + $lan + ':8799/";'
$updated=[regex]::Replace($java,'private static final String LOCAL_URL = "http://[^"]+";',$desired)
$wrapperChanged=($updated -ne $java)
if($wrapperChanged){
  [IO.File]::WriteAllText($Main,$updated,(New-Object System.Text.UTF8Encoding($false)))
}

$env:Path += ';'+[Environment]::GetEnvironmentVariable('Path','User')
$devices=(adb devices)
$target=$null
$wifiLine=$devices | Select-String '^\d+\.\d+\.\d+\.\d+:5555\s+device' | Select-Object -First 1
$usbLine=$devices | Select-String '^\S+\s+device$' | Where-Object {$_.ToString() -notmatch ':5555'} | Select-Object -First 1
if($wifiLine){$target=$wifiLine.ToString().Split()[0]}
elseif($usbLine){$target=$usbLine.ToString().Split()[0]}
else{
  adb connect 10.0.0.107:5555 | Out-Null
  Start-Sleep -Milliseconds 600
  $devices=(adb devices)
  $wifiLine=$devices | Select-String '^\d+\.\d+\.\d+\.\d+:5555\s+device' | Select-Object -First 1
  if($wifiLine){$target=$wifiLine.ToString().Split()[0]}
}
if(-not $target){throw 'POCO_NOT_REACHABLE'}

if($wrapperChanged){
  & $Sync -Build -Install
}else{
  $pkg=adb -s $target shell pm path com.halleyshow.jornadaviva
  if(-not $pkg){& $Sync -Build -Install}
}
adb -s $target shell am force-stop com.halleyshow.jornadaviva | Out-Null
adb -s $target shell am start -W -n com.halleyshow.jornadaviva/.MainActivity | Out-Null
Write-Output ('LAN_IP='+$lan)
Write-Output ('POCO_TARGET='+$target)
Write-Output ('GATEWAY=NAVE_PROXY_READY')
Write-Output ('WRAPPER_REBOUND='+$wrapperChanged)
Write-Output 'OPEN_LAB_POCO=PASS'
