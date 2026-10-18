# Halley Show — Jornada Viva | Candidata UX v0.1

**Checkpoint:** 2026-10-18 · revisão de assets versionada  
**Estado:** protótipo navegável isolado, **não canônico** e **não implantado no POCO**.  
**Origem:** revisão da experiência após teste físico no POCO, com nove composições conceituais de interface.

## Abra a estrutura

[**Prévia HTML (arquivo-fonte)**](./index.html) — abra em navegador após baixar ou use servidor local estático.  
Arquivo HTML com CSS e JavaScript internos e seis imagens carregadas de URLs públicas do GitHub (requer internet). **Não tem comunicação com a NAVE** nem autenticação real.

## As nove superfícies

| Nº | Estado | Objetivo da pessoa |
|---|---|---|
| 01 | Chegada | Decidir entre conhecer a academia e entrar como aluno |
| 02 | Hoje | Ver o treino do dia e sua próxima ação |
| 03 | Evolução | Ver a consequência do treino |
| 04 | Conhecer | Explorar a Halley sem exigência de login |
| 05 | Digital | Descobrir conteúdos e a comunidade |
| 06 | Sofia | Receber acompanhamento contextual |
| 07 | Treino | Completar séries com foco e clareza |
| 08 | Percepção | Registrar como o treino foi sentido |
| 09 | Continuidade | Reconhecer progresso e sugerir próximo passo |

Os estados são **superfícies reutilizáveis**, não nove etapas obrigatórias consecutivas.

## O que o protótipo realmente prova

- Estrutura visual responsiva, estados e navegação demonstrativa em arquivo HTML único.
- Sete slots de imagem nomeados no `ASSET_REGISTRY`: **seis agora carregam automaticamente** imagens versionadas no GitHub; `community.cover` permanece reservado, sem conteúdo curado. O mapeamento continua substituível por `window.HALLEY_UX_LAB.applyAssets(mapping)`.
- Cenários de séries/percepção são apenas ilustração e **não gravam dados reais**.

**Não prova:** serviço online, build Android, UX validada com cliente, imagens oficiais encaixadas, integração NAVE, readback do ledger, segurança de membro ou técnica de outros grupos musculares.

## Autoridades preservadas

- Produto-base: **HALLEY APP V3.1 — ALUNO ATIVO**.
- Referência visual: **HALLEY CENA VIVA V3.5**.
- Verdade longitudinal: **NAVE / Academia Operação Viva / Cotidiano Vivo**.
- Contrato técnico: **HALLEY_APP_MVP_01 V0.1.1**.
- Jornada Viva: **LAB / candidata de UX**.

**Limite do exercício:** apenas Chest Press/Peitoral possui circuito ativo confirmado no LAB. Outros músculos podem aparecer visualmente, sem prescrição inventada. Identificação por código em LAB não é autenticação pública segura.

## Relação com o patrimônio anterior

Arquivos e relatórios mais antigos da Academia já estão preservados neste repositório na branch original `staging/halley-security-evidence-v05`. Esta branch parte daquela linha e adiciona a candidata visual; **não substitui o sistema existente**.

Leitura obrigatória: [assets](./ASSET_MAP.md), [catálogo com checksums](./ASSET_CATALOG_V01.json), [guia visual](./referencias/GUIA_VISUAL_PROFESSOR_HALLEY_SHOW_2026-09-18.png), [roteiro](./ROADMAP.md) e [gate](./QA_GATE.md).

## Regra de evolução

Design aprovado visualmente → imagens recuperadas do PC e versionadas (ajuste fino de identidade pendente) → componentes ligados ao Vite LAB existente → integração real NAVE → teste ponta a ponta no POCO → checkpoint.  
Cada avanço exige evidência e não promove automaticamente a candidata a produto canônico.
