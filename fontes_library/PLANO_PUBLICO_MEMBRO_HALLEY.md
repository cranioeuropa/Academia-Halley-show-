# PLANO DE APLICAÇÃO — CAMADA PÚBLICA + MEMBRO — HALLEY V0.1

Data: 2026-09-24
Status: LAB_ONLY / NÃO CANÔNICO
Escopo: evoluir o protótipo `Halley Show — Jornada Viva` sem tocar no produto-base HALLEY APP V3.1, na GOLDEN V3.5 ou na fonte de verdade Motor NAVE.

## 1. Decisão operacional

A Academia não deve ser dividida em “site para visitante” e “app para aluno” como produtos independentes.

A direção já existente na Library é uma única presença com profundidades diferentes:

PUBLICO SEM CADASTRO
→ utilidade imediata
→ calistenia / movimentos / mobilidade / dicas / conteúdos / resenha / histórias / conhecer academia
→ convite opcional para aula experimental ou cadastro
→ MEMBRO / ALUNO
→ identidade
→ treino de hoje
→ histórico
→ evolução
→ Sofia / Professor com contexto

Regra de UX: ninguém é obrigado a se cadastrar antes de receber utilidade. O usuário identificado apenas ganha uma camada adicional de continuidade pessoal.

## 2. Patrimônio reutilizado

Fontes principais:
- `/NAVE/.../MAPA_DISTRIBUICAO_FREEMIUM_ACADEMIA_NAVE_V0_1.md`
- `preview(2).html` — jornada de visita com cadastro opcional e exploração livre.
- `App Fitness Halley Show em Ação.png` — já representa Calistenia, Conteúdos e Comunidade.
- `Academia Halley Show: App V1 Redesign.png` — já representa acesso rápido à Calistenia grátis, Treinos, Conteúdos e Comunidade.
- `/NAVE/ACADEMIA/MAPA_MESTRE_ACADEMIA_V0_1/MAPA_MESTRE_ACADEMIA_V0_1.md`
- `/NAVE/ACADEMIA_HALLEY_SHOW/WORK_V0_1/RELATORIOS/CORRECAO_FLUXO_CLICAVEL_HALLEY_PREOPEN_V1.md`
- `/NAVE/ACADEMIA/HALLEY_GOLDEN_BASELINE/HALLEY_GOLDEN_BASELINE.md`

## 3. Arquitetura de experiência

### Modo público — padrão sem login
Superfície inicial para qualquer pessoa que abra link/QR.

Blocos:
1. Hero Halley / identidade da academia.
2. CTA dominante: `TREINAR AGORA — CALISTENIA GRÁTIS`.
3. Acesso rápido:
   - Calistenia;
   - Movimentos/Mobilidade;
   - Dicas;
   - Conteúdos;
   - Resenha / Histórias;
   - Conhecer a academia.
4. CTA discreto: `JÁ SOU ALUNO`.
5. CTA opcional futuro: `AULA EXPERIMENTAL`, somente quando houver binding real.

Sem login inicial obrigatório.
Sem memória pessoal extensa.
Sem prescrição individual.
Sem falso acompanhamento.

### Modo membro — identidade reconhecida
Quando a pessoa entra como aluno identificado:
1. saudação pelo nome;
2. data/dia;
3. treino de hoje;
4. músculos do treino;
5. séries e execução;
6. percepção;
7. Sofia fecha o ciclo;
8. evolução e histórico;
9. Professor entra somente quando necessário.

O Circuito 01 atual permanece preservado.

## 4. Regra de conteúdo técnico

Conteúdo público pode exibir apenas conteúdo aprovado ou explicitamente marcado como preparação.

Catálogo mínimo de status:
- `APPROVED_PUBLIC`
- `APPROVED_MEMBER`
- `PENDING_TECHNICAL_REVIEW`
- `EM_PREPARACAO`
- `BLOCKED`

Nenhum executor pode inventar exercício, carga, séries, repetições, progressão, correção clínica ou conteúdo técnico apenas para completar layout.

## 5. Incrementos de aplicação

### I00 — BASELINE E PROTEÇÃO
Objetivo: congelar o LAB atual e garantir rollback.
Prova: snapshot/versão identificada + testes atuais preservados.
Saída: baseline imutável do laboratório.

### I01 — PORTA PÚBLICA
Objetivo: permitir que pessoa não identificada receba valor antes de login.
Adicionar:
- hero público;
- `Calistenia grátis`;
- `Conteúdos`;
- `Resenha`;
- `Já sou aluno`.
Não adicionar conteúdo técnico novo.
PASS: todos os CTAs têm destino funcional ou `EM PREPARAÇÃO`.

### I02 — CALISTENIA PÚBLICA
Objetivo: abrir módulo gratuito.
Entrada obrigatória: lote de conteúdo tecnicamente aprovado já existente ou autorizado.
Primeiro lote máximo: 3 movimentos/aulas.
PASS: conteúdo navegável, mobile, sem personalização falsa.

### I03 — DICAS / CONTEÚDOS
Objetivo: reaproveitar conteúdo curto já aprovado.
Adicionar catálogo simples por tipo: execução, mobilidade, dica, vida real.
PASS: cada item tem fonte/proveniência e estado de aprovação.

### I04 — RESENHA / HISTÓRIAS
Objetivo: transformar pertencimento em camada viva, opcional.
Reusar Bancada de Resenha e patrimônio narrativo já existente.
PASS: nenhum conteúdo é apresentado como fato real sem fonte; CTA de Resenha não interfere no treino.

### I05 — PONTE PÚBLICO → MEMBRO
Objetivo: conectar `Já sou aluno` ao circuito personalizado existente.
PASS: retorno para público preservado; membro entra na Home `Hoje` sem criar outro produto.

### I06 — CONHECER A ACADEMIA / VISITA
Objetivo: incorporar a jornada de visita já provada em `preview(2).html`.
PASS: pessoa pode explorar sem cadastro e optar por cadastro/aula somente no fim.

### I07 — COMPARTILHAMENTO
Objetivo: provar circulação de conteúdo público por link/card.
PASS: link real compartilhável e objeto público não contém estado pessoal.

### I08 — MÉTRICAS
Objetivo: medir utilidade pública sem converter o produto em máquina de spam.
Métricas candidatas:
- abertura pública;
- módulo acessado;
- conteúdo visto;
- retorno;
- compartilhamento;
- clique em `Já sou aluno`;
- clique em aula experimental quando existir binding.

## 6. Três melhorias de alto impacto incorporadas

### M1 — Uma presença, duas profundidades
Evita manter dois produtos. Público e membro compartilham identidade, navegação e catálogo; o que muda é autoridade e profundidade de estado.

### M2 — Registry de conteúdo com aprovação
Qualquer novo card, exercício, história ou dica entra por registro com fonte, status e público permitido. Isso impede que a UI corra na frente da autoridade técnica.

### M3 — Construtor incremental com regressão automática
Cada incremento nasce em LAB, roda testes, captura prova, compara com baseline, salva receipt e só então vira base do incremento seguinte. Falha não contamina o restante.

## 7. Gate de promoção

Estados possíveis:
`BLOCK → LAB_ONLY → CANDIDATE → PROMOTABLE`.

O workflow pode evoluir autonomamente dentro de `LAB_ONLY` quando:
- não tocar produto-base/GOLDEN;
- não exigir conteúdo técnico inexistente;
- não exigir credencial/gasto;
- testes e regressão estiverem verdes.

Promoção para produto canônico permanece humana e exige alinhamento com o gate físico vigente da Academia.

## 8. Estado alvo do primeiro ciclo

Visitante abre o mesmo endereço e vê:

`HALLEY → CALISTENIA GRÁTIS | CONTEÚDOS | RESENHA | CONHECER A ACADEMIA | JÁ SOU ALUNO`

Se escolher `JÁ SOU ALUNO`:

`HOJE → MEU TREINO → MÚSCULOS → SÉRIES → PERCEPÇÃO → SOFIA → EVOLUÇÃO/RESENHA`.

Esse é o desenho de composição. Não há segunda Academia.