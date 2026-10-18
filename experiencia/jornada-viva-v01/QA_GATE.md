# Gate de prova UX — Halley Jornada Viva v0.1

## Regras

O arquivo `index.html` é uma prova de conceito isolada. **Nenhum teste escrito neste documento conta como executado** sem receipt, data, ambiente, entrada, ação e resultado observado.

## Testes de experiência visual a executar

| ID | Cenário | Evidência mínima | Estado |
|---|---|---|---|
| UX01 | Acesso à Chegada | Screenshot mobile legível | PENDENTE DE NOVA PROVA |
| UX02 | Chegada → Hoje | Clique real e tela correta | PENDENTE |
| UX03 | Chegada → Conhecer → Digital | Clique real e retorno | PENDENTE |
| UX04 | Hoje → Treino | CTA leva ao exercício homologado | PENDENTE |
| UX05 | Concluir 3 séries no protótipo | Estado demonstrativo 3/3, sem gravação | PENDENTE |
| UX06 | Treino → Percepção → Continuidade | Fluxo demonstrativo íntegro | PENDENTE |
| UX07 | Evolução → Sofia | Navegação correta e contexto rotulado como demo | PENDENTE |
| UX08 | Injetar 7 assets reais | Sem 404, crop adequado, sem layout shift grave | BLOQUEADO POR ASSETS |
| UX09 | Portar para LAB Vite | Build/testes mantendo rota anterior | BLOQUEADO |
| UX10 | Exercício real NAVE | POST + readback da série/sessão | BLOQUEADO |
| UX11 | Evolução e Sofia reais | Mesma sessão e valores do ledger | BLOQUEADO |
| UX12 | POCO físico + reload | 390px, tap targets, legibilidade e persistência real | BLOQUEADO |

## Critérios de experiência

- Aluno entende a ação principal de cada tela sem orientação externa.
- Halley e Sofia têm presença reconhecível, sem animação gratuita.
- Letras/botões apropriados ao celular e contraste confortável.
- Informação secundária não compete com ação principal.
- A tela não pula de posição quando o aluno conclui uma série.
- Grupos não homologados não apresentam séries/cargas inventadas.

## Separação de evidências

**UX prototipada:** visual/roteamento local.  
**E2E LAB NAVE:** estado real; readback.  
**Produção:** autenticação segura e gates próprios.  
Não somar verificações de classes diferentes para declarar produto pronto.
