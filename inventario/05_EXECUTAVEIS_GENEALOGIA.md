# Lote 02 — executáveis e genealogia

Fontes Library auditadas em 2026-10-13.

## HALLEY_APP_MVP_01 V0.1.1
Fonte: README.md, backend Halley.
Contrato público: asset_status aprovado/pendente/ausente; /health, /muscle-groups, /exercises/{id}, /app/exercise-card/{id}.
Asset Chest Press aprovado; Leg Press pendente, sem imagem falsa. Smoke: tests/smoke_public_contract.py.
**Estado**: implementação documentada, código integral ainda não importado.

## Operação Viva / Cotidiano Vivo
Fonte: PROVA_CIRCUITO_01.md.
Ledger, worker, estados e filas já existentes. Não criar banco ou motor paralelo.

## OFICINA-13 / replicação
Bancada em cópia; arquivos gate_halley_real_v04.py e gate_security_v05.py já no repositório.
**Regra de deduplicação:** finalidade distinta de HALLEY_APP_MVP_01; V0.4/V0.5 testam instanciação e proteção local, não treino/continuidade canônica.

## Duplicatas
Não promover scripts de laboratório como backend final; deduplicar por FUNÇÃO → CONTRATO → EFEITO → PROVA.

## Próxima importação
Confrontar versões executáveis e licenças, calcular SHA256 dos arquivos efetivos, importar apenas código próprio e autorizado em namespace de origem.
