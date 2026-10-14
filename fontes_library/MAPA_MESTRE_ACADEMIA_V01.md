# MAPA MESTRE DA ACADEMIA — V0.1

**Status:** CANÔNICO PARA CONDUÇÃO DA OBRA  
**Objetivo:** impedir dispersão e organizar a Academia Halley como um único produto grande, com várias camadas ligadas à mesma jornada do aluno.

## 1. Regra-mãe

A Academia não será construída como vários produtos separados.

**Um aluno → uma trajetória longitudinal → um estado coerente → várias projeções especializadas.**

Toda nova capacidade precisa responder:

> Em que ponto da jornada do aluno isso entra?

Se não houver resposta clara, a peça não entra na construção ativa.

## 2. Avenida principal

**JORNADA DO ALUNO**

Fluxo canônico:

**ENTRAR → HOJE → TREINAR → EXECUTAR → REGISTRAR PERCEPÇÃO → MEMÓRIA ATUALIZAR → EVOLUÇÃO REFLETIR → PROFESSOR ENTRAR SE NECESSÁRIO → PRÓXIMO ACESSO CONTINUAR A HISTÓRIA**

Esta é a linha de montagem principal da Academia.

## 3. Camadas da Academia

### C1 — JORNADA DO ALUNO
Função: organizar presença, sessão, percepção, memória, continuidade, retorno, conquista, atenção e retomada.

Já existe:
- contrato canônico de experiência do Halley App;
- V3.1 Aluno Ativo;
- estados NORMAL / CONQUISTA / ATENÇÃO;
- continuidade de sessão e percepção.

Falta:
- identidade real de aluno;
- persistência real compartilhada;
- conexão direta com motor operacional;
- expandir do Chest Press para outros exercícios sem quebrar a jornada.

Prioridade: **MÁXIMA**

### C2 — TREINO / CORPO / EXERCÍCIOS
Função: músculos, grupos musculares, exercícios, aparelhos, execução, conteúdo técnico, imagens e vídeos.

Já existe:
- Chest Press fechado com asset aprovado;
- Leg Press marcado como EM PREPARAÇÃO;
- biblioteca visual Halley/Sofia;
- referências de módulos, músculos e jornadas de treino.

Falta:
- catálogo governado de exercícios;
- vínculo exercício ↔ grupo muscular ↔ objetivo ↔ conteúdo técnico;
- regras de autoridade do professor;
- vídeos/imagens aprovados por exercício;
- expansão progressiva por grupos musculares.

Regra:
**não inventar carga, séries, repetições, prescrição ou progressão técnica.**

### C3 — ACOMPANHAMENTO / SOFIA
Função: acompanhar normalidade, continuidade, pequenas mudanças, percepção, contexto e retorno.

Já existe:
- Sofia na V3.1;
- princípio “acompanhamento cotidiano primeiro”;
- memória e continuidade como linguagem de produto;
- gatilhos de atenção.

Falta:
- ligar Sofia à memória real do motor;
- separar presença leve de intervenção;
- consolidar leitura longitudinal;
- definir saídas por estado.

Regra:
**Sofia acompanha; não diagnostica, não prescreve e não substitui o professor.**

### C4 — PROFESSOR / AUTORIDADE HUMANA
Função: receber somente o que exige autoridade técnica ou humana.

Já existe:
- fila do professor;
- decisões elegíveis;
- classificação de ATENÇÃO;
- gate humano para dúvida técnica e desconforto;
- projeção Professor já provada.

Falta:
- interface final integrada ao produto;
- retorno do professor fechando o ciclo no estado do aluno;
- provas com aluno real.

### C5 — PRODUTO / EXPERIÊNCIA VISÍVEL
Função: aquilo que aluno, professor e gestor realmente usam.

Base atual:
**HALLEY APP V3.1 — ALUNO ATIVO**

Já existe:
- entrada por “Hoje”;
- treino sem interrogatório inicial;
- Sofia como presença;
- Halley como condutor técnico;
- registro de percepção;
- memória local;
- continuidade visível.

Falta:
- tirar memória local como fonte principal;
- consumir estado/API real;
- identidade/autenticação;
- renderização final e QA em dispositivo real;
- superfícies de professor e gestor dentro da mesma experiência.

Regra:
**não criar nova Academia do zero. Evoluir V3.1.**

### C6 — MOTOR OPERACIONAL
Função: fonte de verdade.

Já existe:
- SQLite;
- ledger;
- eventos;
- estados;
- fila;
- auditoria;
- APIs de aluno/Sofia/professor/gestor;
- ingest;
- worker;
- pacote instalável;
- readback real do snapshot executável.

Falta:
- ligação direta V3.1 ↔ APIs;
- runtime vivo estável;
- identidade real;
- persistência de campo;
- prova física final por celular.

### C7 — COERÊNCIA / AUTONOMIA
Função: manter o sistema íntegro e reduzir dependência de operação manual.

Já existe no laboratório:
- detecção de incoerência;
- AUTO_FIX / NEEDS_REVIEW / HUMAN_AUTHORITY;
- kill switch;
- rollback;
- fail-closed;
- persistência;
- replay;
- idempotência;
- crash atomicity;
- ACK recovery;
- leases;
- heartbeat;
- fencing;
- shadow multidomínio;
- readback shadow da Academia.

Maturidade estimada do núcleo de autocorreção:
**~90% em laboratório**, não da Academia inteira.

Falta:
- runtime HTTP readback;
- operação residente shadow;
- canary muito limitado em operação real;
- métricas de falso positivo;
- política de promoção para mutação real.

Regra:
**esta camada fica por baixo; não vira experiência do aluno.**

## 4. Circuito 01 — PRIMEIRO CIRCUITO A FECHAR

**HOJE → TREINO PEITORAL → CHEST PRESS → VER EXECUÇÃO → FINALIZAR → PERCEPÇÃO → MEMÓRIA → EVOLUÇÃO → PROFESSOR SE NECESSÁRIO → RETORNO → PRÓXIMO ACESSO CONTINUA**

Esse circuito é a prioridade absoluta.

Nenhuma expansão para novos grupos musculares deve ultrapassar este circuito antes de ele funcionar ponta a ponta com estado real.

## 5. Ordem de construção

### Fase A — CONECTAR O QUE JÁ EXISTE
1. V3.1 consumir estado real da Academia.
2. Tirar localStorage da posição de fonte principal.
3. Fazer percepção gerar evento no motor.
4. Fazer evolução refletir o ledger real.
5. Fazer professor receber contexto real quando elegível.

### Fase B — FECHAR O PRIMEIRO CIRCUITO
1. Chest Press completo.
2. Percepção registrada.
3. Estado atualizado.
4. Professor recebe somente quando necessário.
5. Retorno do professor volta ao estado.
6. Próximo acesso continua de onde parou.

### Fase C — EXPANDIR TREINO
1. Segundo exercício.
2. Segundo grupo muscular.
3. Catálogo de exercícios.
4. Conteúdo visual aprovado.
5. Progressão apenas sob autoridade.

### Fase D — AMPLIAR ACOMPANHAMENTO
1. retorno após pausa;
2. conquista;
3. continuidade semanal;
4. sinais leves;
5. intervenção calibrada.

### Fase E — CAMPO REAL
1. aluno físico;
2. professor físico;
3. celular;
4. LAN/produção;
5. receipts;
6. prova de continuidade em dias diferentes.

## 6. Regra anti-dispersão

Uma nova peça só entra se satisfizer 4 perguntas:

1. Qual aluno/jornada ela atende?
2. Qual evento ou estado ela lê?
3. Qual consequência útil ela produz?
4. Em qual camada ela mora?

Se não houver resposta, congelar como semente.

## 7. Separação dos três níveis

### PRODUTO VISÍVEL
V3.1 / Lovable / experiência / telas / imagens / interação.

### MOTOR OPERACIONAL
estado / memória / eventos / filas / autoridade / APIs / ledger.

### INFRAESTRUTURA DE AUTONOMIA
corretor / consistência / resiliência / idempotência / segurança operacional.

Nunca misturar linguagem ou responsabilidade entre esses níveis.

## 8. O que NÃO fazer agora

- não criar outro app paralelo;
- não abrir novo produto de músculos separado;
- não criar memória nova dentro do Lovable;
- não duplicar regras do core;
- não expandir dez exercícios antes do primeiro circuito fechar;
- não transformar Sofia em professora;
- não transformar o Corretor em interface;
- não chamar prova de laboratório de produção real.

## 9. Estado atual resumido

**Produto visível:** V3.1 demonstrável, ainda não integrado ao estado real.  
**Motor operacional:** tecnicamente muito maduro, pacote instalável e APIs provadas.  
**Autocorreção/coerência:** ~90% em laboratório, ainda não residente com mutação real.  
**Campo físico:** bloqueio final ainda é prova real em dispositivo/pessoa.  
**Próxima prioridade:** integrar V3.1 ao motor e fechar o Circuito 01.

## 10. Norte

A Academia deve fazer o aluno sentir:

> **“Eu sei onde você parou. Vamos continuar.”**

E deve fazer o professor sentir:

> **“Eu só entro quando minha autoridade realmente é necessária, já com contexto.”**

E deve fazer o sistema operar assim:

> **“Eu acompanho, lembro, atualizo, verifico coerência e continuo sem depender de alguém coordenando cada passo manualmente.”**