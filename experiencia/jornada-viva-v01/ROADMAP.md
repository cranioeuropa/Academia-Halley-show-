# Roadmap de evolução — candidata UX

**Branch isolada:** `staging/halley-jornada-ux-v01-20261018`.  
**Regra:** reaproveitar primeiro, preservar canônico, registrar antes/depois e provar comportamento no aparelho.

## Bloco 01 — Identidade + assets (próximo)

- [ ] Conferir as imagens reais (Halley e Sofia) contra o acervo aprovado da V3.5.
- [ ] Inserir os assets aprovados nos sete slots; testar crop, contraste, densidade e responsividade.
- [ ] Comparar Home, Hoje, Sofia e Continuidade com prints do POCO, corrigindo legibilidade e prioridade visual.

**Gate:** imagens fisicamente presentes; nenhuma identidade inventada; nenhuma tela quebrada; antes/depois documentado.

## Bloco 02 — Componentes + integração existente

- [ ] Portar a candidata para o Vite existente em **rota/flag de prévia**, preservando o fluxo atual.
- [ ] Ligar Hoje e Chest Press aos endpoints de Treinos já autorizados, com readback por série.
- [ ] Concluir percepção e reler Evolução e Sofia a partir do **mesmo estado da NAVE**, sem banco paralelo.

**Gate:** build e testes de UI + API + ledger. Nenhuma série gravada apenas em estado local. Outros músculos permanecem visual-only sem prescrição homologada.

## Bloco 03 — POCO + regressão + checkpoint

- [ ] Executar navegação física no POCO e no navegador mobile, observando erros JS, API e rolagem.
- [ ] Percorrer: entrada → identificação LAB → Hoje → 3 séries → percepção → Evolução → Sofia → retorno/reload.
- [ ] Preservar provas e decidir se a candidata está pronta para avaliação visual formal, **sem promoção canônica implícita**.

**Gate:** evidence receipts, screenshots, antes/depois e branch versionada. Segurança de membro em produção continua fronteira independente.

## Registro de status (18/10/2026)

- [x] Branch independente criada a partir da branch de evidências.
- [x] HTML original de nove estados salvo em GitHub.
- [x] Slots e fontes de assets mapeados.
- [ ] Binaries de imagens versionados e aplicados.
- [ ] Live preview servida a partir desta branch.
- [ ] Prova completa em POCO com esta nova candidata.
