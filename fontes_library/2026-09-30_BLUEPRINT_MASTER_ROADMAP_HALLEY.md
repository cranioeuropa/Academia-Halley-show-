# BLUEPRINT MESTRE + ROADMAP — HALLEY SHOW / JORNADA VIVA / ACADEMIA
**Versão de handoff:** 2026-09-30  
**Finalidade:** permitir que outra instância continue a construção sem refazer arqueologia, sem abrir arquitetura paralela e sem transformar o usuário em operador manual.

---

## 0. COMANDO DE LEITURA RÁPIDA

Antes de qualquer alteração, a nova instância deve assumir estas quatro verdades:

1. **Jornada Viva é LAB / candidato de UX, não o produto canônico.**
2. **HALLEY APP V3.1 — ALUNO ATIVO** continua sendo o produto-base canônico.
3. **NAVE / Academia Operação Viva / Cotidiano Vivo** é a verdade longitudinal.
4. **HALLEY_APP_MVP_01 V0.1.1** é a autoridade técnica.

Fluxo de trabalho obrigatório:

**AUTORIDADE → SKILL/REUSO → CÓDIGO/ASSET → EXECUÇÃO → TESTE → READBACK → PASS/BLOCKED → CHECKPOINT**

Trabalhar em **blocos de 3 tarefas**.  
Nunca pedir trabalho manual ao usuário quando Library, PC/MCP, GitHub, AppDeploy, browser ou ADB puderem executar.

---

# PARTE I — BLUEPRINT DO SISTEMA

## 1. IDENTIDADE E ESCOPO

### Produto-base canônico
**HALLEY APP V3.1 — ALUNO ATIVO**

### LAB atual
**Halley Show — Jornada Viva**

O LAB existe para provar:
- UX e navegação;
- relação Halley/Sofia/aluno;
- fluxo real de treino;
- PWA / instalação;
- QR / distribuição;
- identificação mínima de membro;
- integração real com a NAVE;
- comportamento em aparelhos físicos.

O LAB **não pode**:
- substituir silenciosamente o produto canônico;
- criar banco de identidade paralelo;
- criar backend paralelo;
- criar memória longitudinal paralela;
- inventar prescrição de treino;
- promover uma foto de exercício como autorização técnica.

---

## 2. FONTE FÍSICA DE VERDADE

Raiz persistente no PC Crânio:

```text
C:\Users\Cranio\MCP_CAIXA\NAVE\ACADEMIA\HALLEY_SHOW_JORNADA_VIVA_BASE
```

Estrutura:

```text
00_GOVERNANCA
01_WEB_APPDEPLOY_SNAPSHOT
02_ANDROID_WRAPPER
03_RELEASES
04_ASSETS
05_HANDOFF
06_PROVAS
07_PATRIMONIO_REFERENCIA
08_INBOX_ASSETS_NOVOS
09_OPERACAO
99_EXPORTS
```

Arquivos que a nova instância deve ler primeiro:

```text
00_GOVERNANCA\ESTADO_ATUAL.json
00_GOVERNANCA\HALLEY_FAST_12_TASKS_PROGRESS_V1.json
00_GOVERNANCA\T10_LOGIN_AUTHORITY_SKILL_V1.json
00_GOVERNANCA\T11_MINIMUM_MEMBER_IDENTIFICATION_RECEIPT.json
00_GOVERNANCA\T12_FULL_RELEASE_GATE_RECEIPT.json
00_GOVERNANCA\VERSIONAMENTO_RECUPERACAO.md
05_HANDOFF\T03_REAL_NAVE_BINDING_PROBE_V1.json
```

### Atenção
O arquivo:

```text
00_GOVERNANCA\SNAPSHOT_HANDOFF_OUTRO_CHAT_2026_09_29.md
```

é **histórico** e está desatualizado na parte que dizia T10/T11/T12 pendentes.  
Este Blueprint de 30/09 substitui esse snapshot como handoff principal.

---

## 3. ARQUITETURA OPERACIONAL

```text
                 ┌─────────────────────────────┐
                 │ CAMADA PÚBLICA / PWA       │
                 │ link + QR + instalação     │
                 └──────────────┬──────────────┘
                                │
                      "JÁ SOU ALUNO"
                                │
                 ┌──────────────▼──────────────┐
                 │ IDENTIFICAÇÃO DE MEMBRO    │
                 │ student_id / código NAVE   │
                 │ sessionStorage = ponteiro  │
                 └──────────────┬──────────────┘
                                │ valida
                                ▼
                 ┌─────────────────────────────┐
                 │ NAVE / TREINOS :8789       │
                 │ aluno, hoje, sessão, sets  │
                 │ percepção, professor       │
                 └──────────────┬──────────────┘
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
          ┌──────▼─────────┐            ┌──────▼─────────┐
          │ EVOLUÇÃO :8791│            │ SOFIA :8792    │
          │ ledger/progresso│           │ contexto vivo  │
          └──────┬─────────┘            └──────┬─────────┘
                 │                             │
                 └──────────────┬──────────────┘
                                ▼
                     UI lê o mesmo estado
```

Outros serviços confirmados:

```text
Treinos      8789
Evolução     8791
Sofia        8792
Experience   8797
Facade       8798
```

Regra: **UI nunca é a dona do estado canônico.**

`localStorage`/`sessionStorage` só podem guardar cache/ponteiro temporário.  
Identidade, treino, histórico, percepção e evolução pertencem aos motores canônicos.

---

## 4. APP WEB / PWA

### AppDeploy
```text
app_id: halley-show-jornada-viva-base-75al80
URL: https://halley-show-jornada-viva-base-75al80.v2.appdeploy.ai/
```

Estado atual:
- AppDeploy: **READY**
- frontend errors: **0**
- network errors: **0**
- manifest: **PASS**
- service worker: **PASS**
- ícones PWA 192/512: **PASS**
- QR: **PASS**
- instalação PWA: **PASS**
- emulação Xiaomi 12 no browser público: **PASS**

Escopo público permitido:
- entrada pública;
- conteúdo público;
- PWA;
- QR;
- demonstração LAB.

### Limite de produção
**Autenticação pública segura do membro ainda não foi provada.**

A identificação atual por `student_id` foi provada no LAB/local, mas **não deve ser promovida como autenticação de produção**.

---

## 5. ANDROID / LAB FÍSICO

Pacote:

```text
com.halleyshow.jornadaviva
```

Versão local conhecida:

```text
0.2.4-local
```

Laboratório físico conhecido:
- Xiaomi / **POCO X8 Pro**
- ADB Wi-Fi
- endereço usado: `10.0.0.107:5555`

Script operacional:

```text
09_OPERACAO\ABRIR_LAB_POCO.ps1
```

Objetivo do wrapper Android:
- abrir o LAB sem depender de cabo;
- permitir prova física rápida;
- usar web local em desenvolvimento;
- cair para web pública quando apropriado.

O Poco é **laboratório**, não destino exclusivo do produto.

---

## 6. DISTRIBUIÇÃO

A mesma superfície web pode ser acessada por:
- Android;
- Xiaomi;
- outros celulares Android;
- navegador desktop;
- PWA instalada.

QR governado:

```text
04_ASSETS\QR_HALLEY_PUBLIC_INSTALL.png
```

Destino:

```text
https://halley-show-jornada-viva-base-75al80.v2.appdeploy.ai/
```

Princípio:

```text
UM QR
→ UMA URL HTTPS
→ CAMADA PÚBLICA
→ instalação opcional
→ identificação somente quando entrar na jornada pessoal
```

---

## 7. CONTEÚDO TÉCNICO ATUAL

### Autorizado no LAB
**Peitoral / Chest Press**

Fluxo real provado:
```text
identificação
→ Hoje real
→ sessão real
→ Chest Press
→ 3 séries reais
→ finalizar
→ percepção
→ Evolução
→ Sofia
```

### Visual only / técnica em preparação
- Pernas
- Costas
- Ombros
- Bíceps
- Tríceps

Regra: **ter uma imagem não autoriza prescrição.**

Nenhum grupo adicional deve ganhar séries, repetições, carga, dica, erro comum ou exercício ativo sem autoridade técnica explícita.

---

## 8. ASSETS

Pasta canônica:

```text
04_ASSETS
```

Assets de grupos já existentes:

```text
BATCH_02\costas-remada.png
BATCH_02\ombros-press.png
BATCH_02\biceps-rosca.png
BATCH_02\triceps-polia.png
chest-press.png
professor-halley.png
QR_HALLEY_PUBLIC_INSTALL.png
```

Patrimônio visual maior encontrado em:

```text
C:\Users\Cranio\Downloads\FOTOS SISTEMA HALLEY SHOW
```

Regra de uso:
- pesquisar/reaproveitar primeiro;
- não despejar automaticamente a fase visual antiga;
- GOLDEN visual atual = **HALLEY CENA VIVA V3.5**;
- preto/vermelho atual tem precedência sobre referências verdes antigas.

---

## 9. SKILLS / MODO DE ENGENHARIA

Skills/capacidades usadas nesta construção:

```text
superpowers/executing-plans
superpowers/systematic-debugging
superpowers/verification-before-completion
vercel/verification
vercel/agent-browser-verify
vercel/auth
```

Uso correto:
- `executing-plans`: execução em blocos;
- `systematic-debugging`: causa raiz antes de patch;
- `verification-before-completion`: readback antes de PASS;
- `verification`: UI → API → dados → resposta;
- `agent-browser-verify`: clique/viewport/screenshot/regressão;
- `vercel/auth`: **referência**, não instalar cegamente.

A skill de auth foi estudada, mas não instalada porque o stack atual é Vite/static + NAVE existente. Adicionar Clerk/Auth0/Descope sem necessidade criaria autoridade paralela.

---

## 10. IDENTIDADE / LOGIN — ESTADO REAL

### T10 — PASS
Autoridade recuperada:
- público não exige login;
- membro exige identificação para histórico pessoal;
- AI não controla matrícula/identidade/permissão;
- autoridade atual = tabela/API de alunos da NAVE.

Schema observado:

```text
id TEXT PRIMARY KEY
name TEXT NOT NULL
created_at TEXT NOT NULL
```

### T11 — PASS
Identificação mínima implementada:

```text
JÁ SOU ALUNO
→ tela de identificação
→ código/student_id
→ GET /nave/treinos/students/{student_id}
→ aluno válido entra
→ código inválido bloqueia
```

Não foi criado banco novo, conta paralela, provedor externo ou backend novo.

No aparelho:

```text
sessionStorage = ponteiro temporário
```

Logout:

```text
limpa ponteiro
→ volta à camada pública
```

### Fronteira
Isso é **identificação mínima do LAB**, não autenticação segura pública de produção.

---

## 11. PROVA T12 — RELEASE CANDIDATE

Status:

```text
PASS_RELEASE_CANDIDATE_WITH_PRODUCTION_BOUNDARIES
```

Fluxo provado com 14 checks:

```text
entrada pública
→ identificação contra NAVE
→ Hoje real
→ sessão real
→ 3 séries reais Chest Press
→ finalizar
→ percepção canônica
→ Evolução
→ Sofia lendo a mesma sessão
→ logout
→ PWA
→ QR
→ Xiaomi 12 emulado
```

Sessão de prova:

```text
session_b16052c38f59
```

Evolução antes:

```text
treinos: 10
séries: 16
reps: 126
volume: 2720 kg
```

Depois:

```text
treinos: 11
séries: 19
reps: 150
volume: 3240 kg
```

Bug importante encontrado e corrigido:
- escrita da série chegava ao motor;
- UI podia ficar uma série atrás;
- causa raiz = Service Worker cacheando `/nave/`;
- correção = `sw.js v3` ignora cache para `/nave/` e usa network/no-store.

---

## 12. GITHUB / ROLLBACK

Repo privado:

```text
cranioeuropa/sro-motor
```

Branch de checkpoints:

```text
checkpoint/halley-jornada-viva-lab
```

Checkpoint T12 confirmado:

```text
commit: 8f0a2e69828d03fd02f3dd0fc17b96eceb727e5d
message: checkpoint(halley): T12 member identification and release gate
```

Regra de versionamento:
- checkpoint antigo é imutável;
- novo gate cria novo checkpoint;
- não sobrescrever versão boa;
- rollback = restaurar checkpoint, nunca reconstruir de memória;
- binários grandes permanecem no MCP/Library;
- GitHub preserva código, contratos, testes, manifests, hashes e governança.

---

# PARTE II — O QUE ESTÁ PRONTO / O QUE NÃO ESTÁ

## PRONTO / PROVADO
- autoridade recuperada;
- skill-driven workflow;
- PWA;
- QR;
- AppDeploy público READY;
- instalação web;
- Poco por Wi-Fi;
- identificação mínima de aluno contra NAVE;
- Hoje real;
- sessão real;
- 3 séries reais Chest Press;
- percepção canônica;
- Evolução;
- Sofia;
- logout;
- correção de scroll das séries;
- correção de cache `/nave/`;
- checkpoint GitHub T12.

## AINDA NÃO É PRODUÇÃO
- autenticação pública segura;
- bridge pública segura para dados pessoais NAVE;
- segundo Xiaomi físico;
- catálogo técnico completo;
- múltiplos exercícios por grupo;
- prova final de segurança/expiração/isolamento de sessão;
- release comercial definitivo.

---

# PARTE III — ROADMAP DOS PRÓXIMOS 12 GATES
## Regra: executar 3 por vez

## BLOCO A — SEGURANÇA DE MEMBRO

### R13 — AUTHORITY + SECURITY MODEL
Objetivo:
- pesquisar patrimônio/skills de auth já existentes;
- definir quem autentica e quem só identifica;
- modelar ameaça mínima;
- decidir vínculo seguro entre identidade autenticada e `student_id`.

PASS quando:
- existir contrato de autenticação;
- não houver banco de identidade paralelo;
- não houver exposição direta de dados pessoais por `student_id`.

### R14 — SECURE PUBLIC MEMBER BRIDGE
Objetivo:
- usar/extender a infraestrutura existente;
- preferencialmente facade/gateway já existente;
- criar boundary segura entre PWA pública e NAVE;
- token/sessão com expiração;
- servidor resolve o aluno autorizado.

PASS quando:

```text
auth válida → aluno correto
auth inválida → 401/403
student_id alheio → bloqueado
logout/expiração → acesso pessoal encerrado
```

### R15 — SECURITY REGRESSION
Testar:
- troca de aluno;
- replay;
- sessão expirada;
- logout;
- refresh;
- PWA instalada;
- acesso direto a endpoints;
- isolamento entre alunos.

---

## BLOCO B — DISTRIBUIÇÃO REAL

### R16 — XIAOMI 12 FÍSICO
Provar em segundo aparelho real:

```text
QR/link
→ abre público
→ instala PWA
→ abre standalone
→ atualização funciona
```

### R17 — PWA UPDATE LIFECYCLE
Provar:
- nova versão substitui SW antigo;
- nenhum dado NAVE fica stale;
- offline público funciona onde fizer sentido;
- dados pessoais nunca são cacheados indevidamente.

### R18 — QR ONBOARDING FINAL
Transformar QR em entrada prática:

```text
scan
→ público
→ instalar opcional
→ aluno entra somente se quiser área pessoal
```

---

## BLOCO C — EXPANSÃO DO TREINO SEM INVENTAR

### R19 — AUTHORIZATION PIPELINE DO PRÓXIMO EXERCÍCIO
Antes de programar:

```text
Library / patrimônio
→ skill/referência
→ conteúdo técnico
→ autoridade humana
→ asset
→ contrato
```

### R20 — SEGUNDO EXERCÍCIO AUTORIZADO
Adicionar somente quando R19 der PASS.

Preferência:
- completar uma família/músculo com qualidade;
- não “encher seis grupos” artificialmente.

### R21 — ASSET + EXECUÇÃO + PROVA
Para cada exercício:

```text
imagem certa
→ crop certo
→ dica autorizada
→ erro autorizado
→ séries reais
→ readback
→ Poco/Xiaomi/browser
```

---

## BLOCO D — RELEASE DE PRODUTO

### R22 — VISUAL GOLDEN PASS
Confrontar app com **HALLEY CENA VIVA V3.5**.

Refinar:
- Professor Halley;
- enquadramento;
- tipografia;
- cards;
- navegação;
- consistência mobile;
- telas Sofia/Evolução;
- zero assets genéricos onde já houver asset aprovado.

### R23 — FULL MULTI-DEVICE REGRESSION
Executar:

```text
web desktop
Android/Poco
Xiaomi 12
PWA instalada
login seguro
treino
percepção
Evolução
Sofia
logout
update PWA
```

### R24 — RELEASE + CHECKPOINT + RECOVERY
Somente depois de PASS:
- tag/release;
- checkpoint GitHub imutável;
- snapshot Library;
- manifest de assets/hashes;
- receipt final;
- procedimento de rollback testado.

---

# PARTE IV — REGRAS PARA A NOVA INSTÂNCIA

## Nunca fazer
1. Criar outro Halley em paralelo.
2. Criar banco de identidade sem provar necessidade.
3. Usar `localStorage` como verdade longitudinal.
4. Inventar exercício/dica/erro/carga.
5. Promover imagem como conteúdo técnico.
6. Pedir IP, caminho, URL ou arquivo ao usuário antes de procurar com as ferramentas disponíveis.
7. Fazer o usuário rodar regressão que a instância consegue rodar.
8. Declarar PASS sem readback.
9. Apagar checkpoint antigo.
10. Mudar arquitetura porque encontrou uma ferramenta nova.

## Sempre fazer
1. Library primeiro para autoridade.
2. Skills/patrimônio antes de construir do zero.
3. Menor mudança suficiente.
4. Testar no mesmo corte.
5. Gerar receipt.
6. Trabalhar em 3 tarefas.
7. Manter GitHub + MCP + Library sincronizados.
8. Informar claramente PASS / BLOCKED / próximo gate.

---

# PARTE V — PRIMEIROS 15 MINUTOS DA NOVA INSTÂNCIA

1. Ler este Blueprint.
2. Ler `ESTADO_ATUAL.json`.
3. Conferir `HALLEY_FAST_12_TASKS_PROGRESS_V1.json` = 12/12.
4. Conferir commit GitHub T12 `8f0a2e69828d03fd02f3dd0fc17b96eceb727e5d`.
5. Não reabrir T01–T12 sem evidência de regressão.
6. Começar no **R13 + R14 + R15**.
7. Antes de qualquer código de login público, pesquisar skills e patrimônio de autenticação.
8. Se nenhuma solução existente encaixar, estender a facade/NAVE existente — não criar backend paralelo.
9. Criar checkpoint antes de alteração estrutural.
10. Entregar 3 tarefas e parar no gate.

---

# PROMPT DE BOOTSTRAP — COPIAR E COLAR NA NOVA INSTÂNCIA

> Você está assumindo a frente **HALLEY SHOW / JORNADA VIVA / ACADEMIA**. Leia primeiro o Blueprint de handoff de 30/09 e os arquivos canônicos do MCP. Não refaça arqueologia geral e não invente arquitetura. A Jornada Viva é LAB; HALLEY APP V3.1 é produto-base, NAVE é verdade longitudinal, HALLEY_APP_MVP_01 é autoridade técnica e HALLEY CENA VIVA V3.5 é GOLDEN visual. O plano anterior T01–T12 está concluído: identificação mínima NAVE, treino Chest Press real, percepção, Evolução, Sofia, PWA, QR e release candidate foram provados. GitHub checkpoint T12: `8f0a2e69828d03fd02f3dd0fc17b96eceb727e5d`. Os limites atuais são: autenticação pública segura de membro ainda não provada e segundo Xiaomi físico ainda não provado. Trabalhe em blocos de 3 tarefas, usando Library + skills + MCP + GitHub + browser/ADB autonomamente. Próximo bloco: **R13 autoridade/modelo de segurança → R14 bridge pública segura para membro → R15 regressão de segurança**. Não crie novo app, banco, backend ou memória paralelos. Evidência/readback antes de PASS. Não transforme o usuário em operador manual.

---

# STATUS FINAL DE HANDOFF

```text
T01–T12: 12/12 EXECUTADAS
LOCAL MEMBER FLOW: PASS
NAVE REAL: PASS
CHEST PRESS REAL: PASS
EVOLUÇÃO: PASS
SOFIA: PASS
PWA PÚBLICA: PASS
QR: PASS
APPDEPLOY: READY
GITHUB CHECKPOINT T12: PASS
XIAOMI 12 EMULAÇÃO: PASS
SEGUNDO XIAOMI FÍSICO: BLOCKED
AUTH PÚBLICA SEGURA: NOT PROVEN
PRÓXIMO BLOCO: R13 + R14 + R15
```