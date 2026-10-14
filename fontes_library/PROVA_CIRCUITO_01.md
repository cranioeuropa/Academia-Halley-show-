# PROVA — HALLEY CANÔNICO CIRCUITO 01

Veredito: **PASS**

Fluxo executado em navegador real (Chromium), com as requisições do navegador roteadas para os serviços reais locais por causa da política do ambiente que bloqueia navegação direta a localhost:

1. HOJE abriu com identidade sintética Ana e estado lido do Operação Viva.
2. TREINOS abriu.
3. Chest Press abriu com dados do Halley Core API V0.1.1.
4. Execução aprovada abriu com asset real.
5. Pós-treino registrou `desconforto`.
6. A sessão gerou `SESSAO_REGISTRADA` no ledger.
7. Presença + percepção entraram na fila governada e o worker processou 2/2, retry=0, dlq=0, errors=0.
8. O estado da Ana passou de NORMAL para ATENCAO.
9. A fila do professor passou a conter Ana com movimentos elegíveis.
10. O Professor registrou `OBSERVAR`.
11. A decisão apareceu de volta na superfície do aluno como “Retorno do Professor Halley”.
12. O serviço Operação Viva foi reiniciado e sessão, percepção, estado e decisão permaneceram no readback.

Arquitetura usada:
- Motor de trajetória/estado: Operação Viva + Cotidiano Vivo V0.1.5.
- Catálogo técnico: HALLEY_APP_MVP_01 V0.1.1.
- Gateway/adaptador: apenas coordena APIs existentes; não possui banco nem regra de classificação.
- Front: uma única superfície de aluno, com área de professor separada.

Limite honesto:
- identidade ainda é sintética (`ANA`);
- ambiente local, sem autenticação de produção;
- celular real do usuário ainda precisa ser provado na mesma Wi‑Fi;
- apenas Chest Press está fechado no Circuito 01.