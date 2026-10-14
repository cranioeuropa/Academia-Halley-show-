# Fechamento de preservação — Lote 03 — 2026-10-14

Estado: ARQUIVOS_ORIGINAIS_IMPORTADOS; EXECUCAO_DE_APP_NOVO_NAO_REALIZADA.

## Fontes originais importadas integralmente da Library
- fontes_library/2026-09-30_BLUEPRINT_MASTER_ROADMAP_HALLEY.md
- fontes_library/2026-09-29_SNAPSHOT_HALLEY_JORNADA_VIVA.md
- fontes_library/MAPA_MESTRE_ACADEMIA_V01.md
- fontes_library/2026-09-28_CHECKPOINT_T09.md
- fontes_library/HALLEY_SHOW_CHARACTER_BIBLE_V01.md
- fontes_library/PROVA_CIRCUITO_01.md
- fontes_library/PLANO_PUBLICO_MEMBRO_HALLEY.md
- fontes_library/HANDOFF_HALLEY_2026-09-11.md

## Código original importado do sro-motor (checkpoint T09)
checkpoints_importados/T09_2026-09-28/
- web/src/main.ts
- web/src/styles.css
- web/index.html
- web/manifest.webmanifest
- web/sw.js
- ops/lab_gateway.py

A importação foi preservativa: snapshot LAB histórico, sem sobrescrever a versão V3.1 ou fingir que o T09 é a versão atual.

## Decisões de deduplicação
- Mapa Mestre = referência normativa; Blueprint de 30/09 = handoff atualizado; Snapshot de 29/09 = histórico.
- T09 = checkpoint anterior, T12 = regressão posterior encontrada no PC; ambos devem coexistir, não substituir um ao outro.
- HALLEY_APP_MVP_01 V0.1.1 = fonte técnica; Operação Viva/Cotidiano Vivo = eventos/ledger; Jornada Viva = LAB de interface. Não clonar esses motores dentro do repositório.
- Character Bible = contrato de identidade, não substitui imagens originais. Assets são inventariados, ainda não transportados nem conferidos.
- Arquivos de código do checkpoint têm genealogia em cranioeuropa/sro-motor. Não misturar com bancos/dados reais.

## Bloqueios desta rodada
- Conector PC Crânio e pontes locais retornaram HTTP 400; não foi possível copiar integralmente T12, APKs, imagens e recursos do computador.
- Código de checkpoint preservado, porém build novo e instalação nova não realizados neste lote.
- Segurança de membros públicos e Supabase staging não validadas.

## Próximo gate verificável
1. Recuperar conexão PC Crânio e copiar artefatos selecionados de T12, manifest/hashes e código atual para uma nova subpasta de snapshot.
2. Conferir hashes e filtrar segredos/dados de alunos antes de qualquer commit.
3. Executar build e testes de regressão sobre cópia; mostrar diferença funcional observável, caso haja.
