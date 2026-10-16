# Gate físico e reconstrução — 2026-10-15

Estado: INVENTARIO_REVALIDADO; BUILD_A_PARTIR_DO_GITHUB_PENDENTE; POCO_INSTALACAO_ATUAL_NAO_EXECUTADA_NESTA_SESSAO.

## Conferências novas via PC Crânio
Receipt 568b7c90a7a6.
- 01_WEB_APPDEPLOY_SNAPSHOT: 5826 arquivos (inclui dependências geradas); 125442314 bytes.
- 02_ANDROID_WRAPPER: 10 arquivos; 7726559 bytes.
- 03_RELEASES: 5 APKs; 35251670 bytes.
- 04_ASSETS: 11 arquivos; 15432243 bytes.
- APK LAB V0.2.4: SHA256 154c838123d97b9738f908fcd18d3f0d96393884d48dd3e5e66982ff43053154
- src/main.ts: SHA256 fe21b3990d6dbfd8fc4ee572adf408126747d48948332182966bc8f2e6301bd8
- package-lock.json: SHA256 5b1ced47c0de248c4a7d2b6847465404d4c547420ec289d9f2e483066b1b7c7b

## Recuperação e limites
O código-fonte T12, configurações Android, scripts PowerShell, manifesto de binários e provas estão na branch staging/halley-security-evidence-v05. Não declarar reconstrução independente completa: GitHub ainda não contém todos os resources/ícones/assets binários; npm e Node não disponíveis no executor MCP. Desktop Commander Windows respondeu cota mensal esgotada; não foi possível chamar ADB do host.

## POCO
O usuário já comprovou anteriormente no Windows BUILD SUCCESSFUL, ADB install Success, OPEN_LAB_POCO=PASS e gateway local 10.0.0.102. Isso prova instalação anterior, não instalação nova desta rodada.
Se o APK já estiver instalado, preferir só iniciar LAB e verificar funcionalidade; no PC existe 09_OPERACAO/ABRIR_LAB_POCO.ps1, mas este script pode modificar gateway wrapper e reinstalar quando necessário. Validar ambiente antes.
Nenhuma mudança funcional nova no Halley foi aplicada.
