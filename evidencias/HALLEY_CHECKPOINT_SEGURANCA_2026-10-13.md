# HALLEY — checkpoint de segurança e replicação

Data: 2026-10-13
Estado: LAB_LOCAL_PASS / STAGING_REMOTO_BLOQUEADO / PILOTO_BLOQUEADO

## Evidência no PC Crânio
Diretório: `_testes_pc_cranio_v04/halley_instanciacao_staging_20261013/`

- `gate_halley_real_v04.py`: invocou `WorkshopController.fabricate_payload()` da OFICINA-13 em cópia. Duas academias fictícias fabricadas, nenhuma ativação externa.
- Regressão OFICINA-13 na cópia: 56/56 PASS. Recibo MCP `f347df43e176`.
- Execução da fabricação: recibo MCP `78b44ffa1d7a`.
- `gate_security_v05.py`: sessões com expiração e revogação, isolamento lógico por tenant, reabertura de SQLite, rejeição de quatro acessos inválidos. Recibo MCP `9a0ca99606b0`.
- SQLite benchmark V0.5: 100 operações em 0,6272 s, banco de 20.480 bytes; resultado exclusivamente local.

## Bloqueios
- Supabase: projeto localizado, mas consultas de leitura falharam com erro PostgreSQL 28P01; RLS remoto não auditado.
- Vercel: projeto `halley-academia-lab` listado, inspeção detalhada retornou 403.
- Staging remoto com identidade real e persistência durável: NÃO TESTADO.

## Gates
- Laboratório em cópia: APROVADO nos cenários citados.
- Staging remoto: BLOQUEADO.
- Piloto: BLOQUEADO.
- Promoção canônica: NÃO AUTORIZADA.

Este arquivo registra resultados reportados pela execução no PC Crânio; não contém credenciais ou dados de alunos. Para reproduzir, recuperar os scripts originais autorizados da pasta acima, executar regressões e comparar os receipts.
