# HALLEY — DIAGNÓSTICO DE BLOQUEIOS EXTERNOS 2026-10-13
Estado: BLOQUEADO — SEM PROMOÇÃO / SEM PILOTO.

## Execução
Supabase: projeto ehzzdbofkejszmzkhlne detectado; SELECT somente leitura falhou FATAL 28P01 password authentication failed for user postgres. Anteriormente supabase_read_only_user falhou com o mesmo código. Security advisors retornaram projeto hibernado. Não foi possível auditar RLS, segregação remota ou durabilidade externa. Zero alterações.

GitHub autenticado: cranioeuropa com repositórios sro-motor, vitrine-sro, sitesv0, mcp-caixa-governanca, empresa-viva-core, alane-viagem-viva. Nenhum repositório identificável como Academia Halley disponível para escrita. Busca pública por Halley retorna outros proprietários sem push. Nenhum commit criado para evitar repositório incorreto.

Vercel: halley-academia-lab aparece em lista de deployments; consulta detalhada ao projeto retorna 403 por escopo got-s-projects3. Não é prova de vínculo de repositório. Zero alterações.

## Evidência anterior
PC Crânio: _testes_pc_cranio_v04/halley_instanciacao_staging_20261013/gate_security_v05.py
Execução 9a0ca99606b0 — testes locais de revogação, expiração, isolamento e persistência aprovados. Isto não demonstra segurança remota.

## Gates
RLS remoto: NÃO TESTADO
Auth remota: NÃO TESTADO
Persistência durável remota: NÃO TESTADO
GitHub da Academia: DESTINO NÃO IDENTIFICADO
Produção: NÃO ALTERADA
Piloto: BLOQUEADO

## Próxima ação humana mínima
Restaurar permissões Supabase ou credenciais do projeto de staging, e conectar/identificar repositório exato da Academia ao GitHub. Depois read-only RLS, migração em branch isolada, ataques multi-tenant, regressões, receipts e PR.
