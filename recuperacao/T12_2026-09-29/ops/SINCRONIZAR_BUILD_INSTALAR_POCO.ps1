param(
  [switch]$Build,
  [switch]$Install
)

$ErrorActionPreference = 'Stop'
$Root = 'C:\Users\Cranio\MCP_CAIXA\NAVE\ACADEMIA\HALLEY_SHOW_JORNADA_VIVA_BASE'
$Canonical = Join-Path $Root '02_ANDROID_WRAPPER'
$Workspace = 'C:\Users\Cranio\sro-engine\halley-jornada-viva-android'
$Sdk = 'C:\Users\Cranio\AppData\Local\Android\Sdk'
$Gradle = 'C:\Users\Cranio\.gradle\wrapper\dists\gradle-9.5.0-bin\bvnork1r7n8i6kp5cnkibsc9q\gradle-9.5.0\bin\gradle.bat'
$PocoUsb = '4HW8AUROK7EEW8IR'
$PocoWifi = '10.0.0.107:5555'

New-Item -ItemType Directory -Force -Path $Workspace | Out-Null
robocopy $Canonical $Workspace /MIR /XD .gradle build /XF local.properties | Out-Null
if ($LASTEXITCODE -gt 7) { throw "ROBOCOPY_FAIL_$LASTEXITCODE" }

"sdk.dir=$($Sdk.Replace('\','\\'))" | Set-Content (Join-Path $Workspace 'local.properties') -Encoding ASCII
Write-Output 'SYNC_CANONICAL_TO_WORKSPACE=PASS'

if ($Build -or $Install) {
  Push-Location $Workspace
  & $Gradle --no-daemon assembleDebug
  $code = $LASTEXITCODE
  Pop-Location
  if ($code -ne 0) { throw "GRADLE_FAIL_$code" }
  $apk = Join-Path $Workspace 'app\build\outputs\apk\debug\app-debug.apk'
  Write-Output "BUILD=PASS"
  Write-Output "APK=$apk"
}

if ($Install) {
  $env:Path += ';' + [Environment]::GetEnvironmentVariable('Path','User')
  $deviceLines = adb devices
  $Target = $null
  if ($deviceLines -match [regex]::Escape($PocoUsb)) { $Target = $PocoUsb }
  elseif ($deviceLines -match [regex]::Escape($PocoWifi)) { $Target = $PocoWifi }
  else {
    adb connect $PocoWifi | Out-Null
    $deviceLines = adb devices
    if ($deviceLines -match [regex]::Escape($PocoWifi)) { $Target = $PocoWifi }
  }
  if (-not $Target) { throw 'POCO_NOT_REACHABLE_USB_OR_WIFI' }
  Write-Output ("POCO_TARGET=" + $Target)
  adb -s $Target install -r $apk
  if ($LASTEXITCODE -ne 0) { throw 'ADB_INSTALL_FAIL' }
  Write-Output 'INSTALL_POCO=PASS'
}
