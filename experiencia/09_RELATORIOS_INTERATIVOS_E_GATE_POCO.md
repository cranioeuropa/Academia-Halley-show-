# Candidata UX — Relatórios Interativos de Evolução Halley

Estado: PROPOSTA EM STAGING, não incorporada ao V3.1.
Origem: demanda de 2026-10-13.

## Experiência
Na tela Evolução, após concluir uma sessão:
- Resumo factual lido do ledger: exercício, séries, repetições, volume e percepção.
- Comparação histórica apenas entre períodos/sessões documentados.
- Cartão de continuidade com ação "Ver minha evolução".
- Ação "Conversar com Sofia sobre este treino", passando somente contexto autorizado e dados existentes.
- Quando existir sinal que exija autoridade técnica, "Solicitar ajuda do professor".

## Exemplo fundamentado T12
Chest Press (caso sintético): 10x20 kg, 6x20 kg, 8x25 kg = 24 repetições, 520 kg de volume; percepção NA_MEDIDA. Evolução registrada 10→11 treinos, 16→19 séries. Este exemplo histórico não é treino real de cliente.

## Segurança e fronteira
NAVE/ledger é fonte da verdade; front apenas projeta leituras. Sofia não prescreve e não altera histórico. Nenhum dado pessoal público. Identidade/autenticação pública de membro continua bloqueada.

## Gate
Somente integrar na V3.1 após recuperar runtime autorizado e provar UI→API→ledger→Evolução→Sofia, sem reconstruir produto.

## Instalação POCO
Em PC Crânio foi localizado 03_RELEASES/HALLEY_JORNADA_VIVA_ANDROID_V0_2_4_LOCAL_LAB.apk e 09_OPERACAO/SINCRONIZAR_BUILD_INSTALAR_POCO.ps1.
Teste de conectividade local do executor em 2026-10-13: adb ausente e Windows host não exposto no container WSL; APK não instalado neste ciclo.
