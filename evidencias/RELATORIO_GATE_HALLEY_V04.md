# Gate Halley V0.4 — 2026-10-13
Estado: PROVADO_EM_LAB_LOCAL; NAO_LIBERADO_PILOTO
Regressao fabrica real em copia: 56/56 PASS; receipt f347df43e176.
Instanciacao real via WorkshopController.fabricate_payload: duas empresas ficticias; receipt 78b44ffa1d7a; sem ativacao externa.
SQLite local: isolamento logico testado, duas tentativas invalidas rejeitadas; 1000 escritas em 6.4356 segundos; 45056 bytes.
Limites: staging remoto NAO configurado; autenticacao HMAC experimental sem expiracao/revogacao; sem RLS, IdP, backup ou custo financeiro; banco temporario.
Proxima prova: staging real com auth revogavel, persistencia duravel, isolamento por tenant, custo de infraestrutura e regressao.
