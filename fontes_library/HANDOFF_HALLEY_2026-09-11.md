# HANDOFF MESTRE — NOVA INSTÂNCIA — NAVE / ACADEMIA HALLEY SHOW

Data: 2026-09-11
Estado: TRANSFERÊNCIA DE CONDUÇÃO / NÃO EXECUTAR CÓDIGO ANTES DO GATE DE COERÊNCIA
Destino: nova instância responsável por retomar a obra a partir da Library e das evidências já produzidas.

## 1. Objetivo maior

Construir a Academia Halley Show como primeira instância real/laboratório da NAVE, acompanhando a trajetória do aluno de forma longitudinal, com continuidade, estado coerente, memória, autoridade bem separada e intervenção apenas quando necessária.

A experiência deve fazer o aluno sentir: “eu sei onde você parou; vamos continuar”.

O centro do produto não é problema, risco ou “aluno sumido”. O centro é:

ACOMPANHAR → RECONHECER CONTINUIDADE → PERCEBER MUDANÇA → REGISTRAR EVOLUÇÃO → INTERVIR QUANDO NECESSÁRIO.

Produto visível: Academia Halley Show.
NAVE: bastidor invisível de estado, memória, regras, autoridade, permissões, histórico, contratos e próximo movimento.

## 2. Composição técnica reconhecida

Os doadores/capacidades já estudados são:

- MiniiChat = corpo/chassi conversacional Android, mensagens, streaming, persistência básica, separação Assistant ↔ Provider.
- A2UI = interação viva/estruturada: cards, botões, microformulários, ações e retorno.
- PromptBar = entrada/composer: texto, Send/Stop, microfone, anexos e estados da entrada.
- Box = referência e futuro motor cognitivo/local/multimodal; não integrar o motor pesado na primeira prova.
- NAVE = sistema nervoso/autoridade: estado canônico, memória, regras, permissões, histórico, próximo movimento, contratos e futura API PC/VPS.
- Professor Halley e Sofia = identidades/papéis. Não são modelos nem providers.

Fronteira obrigatória:

IA apresenta/interpreta/propõe.
Camada determinística valida e registra.
IA, Professor Halley, Sofia, A2UI, PromptBar e provider não escrevem diretamente no estado canônico.

## 3. Jornada canônica de produto recuperada da Library

A Library já possui uma avenida principal mais madura do que qualquer hipótese recente de tela:

ENTRAR → HOJE → TREINAR → EXECUTAR → REGISTRAR PERCEPÇÃO → MEMÓRIA ATUALIZAR → EVOLUÇÃO REFLETIR → PROFESSOR ENTRAR SE NECESSÁRIO → PRÓXIMO ACESSO CONTINUAR A HISTÓRIA.

O produto já tinha como direção:
- entrada por “Hoje”;
- treino sem interrogatório inicial;
- Sofia como presença/continuidade;
- Halley como condutor técnico;
- percepção e memória;
- continuidade visível.

Portanto, check-in diário obrigatório NÃO deve ser assumido como regra de produto. Perguntas/contexto só entram quando têm função clara na jornada e não repetem informação que a memória já conhece.

## 4. Memória e autoridade

A nova instância deve preservar esta separação:

1. Perfil/identidade do aluno.
2. Estado canônico atual.
3. Eventos validados/ledger.
4. Histórico longitudinal reconstruído.
5. Conversa/linguagem relacional.
6. Memória longitudinal/padrões.

Conversa não é fonte de verdade operacional.
O estado/memória oficial pertence ao motor/NAVE.
A Library registra contratos, mapas, decisões e evidências; não é banco operacional do aluno.

A Library também registra que já existiam motor operacional com SQLite, ledger, eventos, estados, filas, auditoria e APIs de aluno/Sofia/professor/gestor. Não criar memória paralela antes de auditar esse patrimônio.

## 5. CONFLITO CANÔNICO A RESOLVER ANTES DE NOVA CONSTRUÇÃO

Há duas direções documentais atualmente coexistindo na Library e elas NÃO podem ser conciliadas por suposição:

### Direção A — MAPA_MESTRE_ACADEMIA_V0_1.md
- status declarado: CANÔNICO PARA CONDUÇÃO DA OBRA;
- diz explicitamente para NÃO criar outro app paralelo;
- produto visível/base atual: HALLEY APP V3.1 — ALUNO ATIVO;
- prioridade: ligar V3.1 ao motor operacional já existente e fechar um circuito longitudinal real;
- ordem: conectar o que já existe → fechar primeiro circuito → expandir treino → ampliar acompanhamento → campo real.

### Direção B — MAPA_ORGAOS + PLANO_INTEGRACAO_INCREMENTAL (2026-09-10)
- propõe composição rastreável MiniiChat → A2UI → PromptBar → Provider local/Box;
- MiniiChat como chassi principal Android;
- testes incrementais em cópia, culminando em APK próprio no Mickey.

### Gate obrigatório da nova instância
Antes de codificar, responder com evidência:

1. O V3.1 é produto-base a ser evoluído e os quatro doadores entram como capacidades/órgãos nele?
2. Ou houve uma decisão posterior válida que substituiu formalmente o V3.1 por um novo app Android derivado de MiniiChat?
3. Onde está a evidência/autorização de promoção dessa mudança de arquitetura?
4. Qual patrimônio do motor operacional existente deve ser reutilizado em vez de recriado?

Se não houver prova de substituição, não declarar silenciosamente que o plano de 10/09 revogou o mapa mestre anterior.

Estado desse gate: PENDENTE_DE_RECONCILIACAO_CANONICA.

## 6. Evidência técnica produzida em 2026-09-11

### Contrato de estado
FASE_0_CONTRATO = PASS.

Foi definido contrato mínimo de AlunoState com autoridade NAVE e separação entre proposta e escrita de estado.
Arquivo físico no PC, no momento da transferência:
C:\MICKEY_LAB\NAVE_ANDROID_LAB\CONTRATO_ESTADO_ALUNO_V0_1.md

### Baseline MiniiChat
FASE_1_MINIICHAT_BASELINE = PASS.
Código-fonte original alterado = NÃO.

Android SDK encontrado:
C:\Users\Cranio\AppData\Local\Android\Sdk

JDK usado:
C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot

Comando aprovado:
$env:JAVA_HOME='C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot'; $env:ANDROID_HOME='C:\Users\Cranio\AppData\Local\Android\Sdk'; $env:ANDROID_SDK_ROOT=$env:ANDROID_HOME; $env:Path="$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:Path"; .\gradlew.bat clean :app:assembleDebug

Resultado: PASS, sem erro real.
APKs produzidos:
- C:\MICKEY_LAB\NAVE_ANDROID_LAB\05_MINIICHAT_ORIGINAL\app\build\outputs\apk\debug\miniichat-1.0.2-debug-arm64-v8a-debug.apk
- C:\MICKEY_LAB\NAVE_ANDROID_LAB\05_MINIICHAT_ORIGINAL\app\build\outputs\apk\debug\miniichat-1.0.2-debug-armeabi-v7a-debug.apk

Essa prova demonstra que o doador MiniiChat está saudável. NÃO demonstra, por si só, que ele deve substituir o V3.1 como produto-base.

## 7. Ordem histórica de integração dos doadores

Existe plano incremental salvo:
T01 MiniiChat → T02 A2UI → T03 PromptBar → T04 Provider local/Box → V0.1 composta.

Essa ordem continua válida como estratégia de PROVA DE CAPACIDADES se, e somente se, o gate canônico acima confirmar onde essa composição deve nascer.

Não confundir “ordem segura para testar órgãos” com “decisão de qual produto-base é canônico”.

## 8. Regras de condução da nova instância

1. Library primeiro. Antes de inventar arquitetura, ler os documentos canônicos e declarar conflitos.
2. Mapa antes de código. Nenhuma missão de execução sem indicar em qual mapa/gate ela vive.
3. Uma missão = um objetivo = uma prova = uma evidência = PASS/BLOCKED.
4. Não completar lacunas por inferência. Se faltar decisão canônica, marcar BLOCKED_DECISION.
5. Não criar app, memória, banco, backend ou arquitetura paralela sem provar que o patrimônio existente não atende.
6. Preservar originais dos doadores.
7. Não transformar hipótese de UX em requisito canônico sem referência, prova ou decisão explícita.
8. Pesquisa de referências externas é permitida para UX/jornada, mas deve produzir aprendizado, não copiar produto.
9. A experiência deve perguntar menos conforme conhece mais o aluno; memória existe para continuidade, não para repetir questionário.
10. O aluno não deve ver seleção de modelos/providers. Identidade percebida permanece Halley/Sofia independentemente do motor cognitivo.
11. Professor humano conserva autoridade técnica corporal/presencial quando necessária.
12. “Simples → funcional → testável → evolutivo”.

## 9. Fontes prioritárias na Library

Ler antes de propor continuidade:

1. /NAVE/ACADEMIA_HALLEY_SHOW/WORK_V0_1/MAPA_ORGAOS_ACADEMIA_HALLEY_SHOW_V0_1.md
2. /NAVE/ACADEMIA_HALLEY_SHOW/WORK_V0_1/PLANO_INTEGRACAO_INCREMENTAL_HALLEY_V0_1.md
3. /NAVE/ACADEMIA_HALLEY_SHOW/WORK_V0_1/00_HANDOFF_T01_MINIICHAT_READY_TO_SEND.md
4. MAPA_MESTRE_ACADEMIA_V0_1.md
5. MAPA_MESTRE_CONSTRUCAO_ACADEMIA_GPT_NAVE_V0_1.md
6. ACADEMIA_HALLEY_CONSOLIDACAO_V1.md
7. PRINCIPIO_ACOMPANHAMENTO_COTIDIANO_PRIMEIRO_ACADEMIA_V1.md

O MAPA_MESTRE_ACADEMIA_V0_1.md deve ser tratado com atenção especial porque se declara canônico e contém uma proibição explícita de criar app paralelo.

## 10. Primeira missão da nova instância

NÃO construir.

Produzir primeiro:

RECONCILIACAO_CANONICA_HALLEY_V0_1.md

Ela deve responder, citando a Library:
- qual é o produto-base canônico atual;
- como MiniiChat, A2UI, PromptBar e Box entram sem duplicar patrimônio;
- onde vive estado/memória/ledger;
- qual jornada do aluno é canônica;
- quais decisões posteriores revogaram ou não revogaram documentos anteriores;
- qual é o primeiro gate físico correto depois da reconciliação.

Resultado permitido:
CANON_RECONCILED = PASS
ou
CANON_RECONCILED = BLOCKED_DECISION

Somente depois de PASS deve existir novo comando de construção.