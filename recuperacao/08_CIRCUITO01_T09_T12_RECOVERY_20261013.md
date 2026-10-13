# Gate de recuperação — Circuito 01 — 2026-10-13

Estado: FONTES_RECUPERADAS / BUILD_ATUAL_BLOQUEADO / CAMPO_NAO_LIBERADO.

## Genealogia cruzada
- Library: HALLEY_CHECKPOINT_T09_2026_09_28.md. Canônico declarado: Halley App V3.1 Aluno Ativo; Jornada Viva é laboratório.
- PC Crânio: NAVE/ACADEMIA/HALLEY_SHOW_JORNADA_VIVA_BASE, com 00_GOVERNANCA, 01_WEB_APPDEPLOY_SNAPSHOT, 06_PROVAS e 09_OPERACAO.
- GitHub anterior: cranioeuropa/sro-motor, branch checkpoint/halley-jornada-viva-lab, arquivo checkpoints/halley-jornada-viva/2026-09-28_t09/web/src/main.ts recuperado; blob 0d7e887a5fa9f20e3b721bab22a2b0ed2a654fac.
- T09 é ancestral; no PC há provas posteriores T11 e T12. Não sobrescrever T09 nem confundir com produto-base.

## Estado histórico posterior — T12
Recibo PC: 00_GOVERNANCA/T12_FULL_RELEASE_GATE_RECEIPT.json, 2026-09-29.
14 checks reportados PASS, sequência identificação sintética → Hoje → 3 séries Chest Press → percepção → evolução no ledger → Sofia → logout → PWA.
Session ID: session_b16052c38f59. Evolução reportada: 10→11 treinos; 16→19 séries; 126→150 repetições; 2720→3240 kg.
Bug detectado: cache do service worker para /nave/; documento relata correção sw.js v3 com network/no-store.
Limites: autenticação pública segura não provada; segundo Xiaomi físico bloqueado; PWA pública LAB não significa membro em produção.

## Recuperação física nesta rodada
Cópia não destrutiva:
_testes_pc_cranio_v04/halley_circuito01_recovery_20261013/web/
Executor: recover_build.py, recibo caca1acf7991.
SHA256 fonte PC:
- src/main.ts fe21b3990d6dbfd8fc4ee572adf408126747d48948332182966bc8f2e6301bd8
- src/styles.css b5462be4b89f3d8cf07095b48df49f68e45bb3d1813a5b6264d4eb9ccd91e8ea
- package.json 62f8f64749796b56b1e1d9bbf24e7933239437dc62e2ef9996f9170a7449d002
- sw.js 8dcd3fe9684ab0e7ddc079f86118292924ff5103ceceb15d8600997e020df3af
- manifest.webmanifest 57bf2407c6293de1fe8d2b4b03f9badbe552408e7a9cc8b1fe55f985c75fe78b
Snapshot original contém dist/index.html, dist/assets, manifest e sw.js.
Build atual na bancada: NÃO EXECUTADO (node e npm ausentes no runtime do PC Crânio).
Runtime ponta a ponta atual: NÃO TESTADO. Evidência T12 é histórica.

## Exemplo documentado (não uma operação atual)
Aluno Demo executou Chest Press com 10x20 kg, 6x20 kg e 8x25 kg; 24 reps e 520 kg. Percepção NA_MEDIDA; Sofia leu mesma sessão; painel Evolução passou de 10 para 11 treinos.

## Próximo gate
Recompilar em ambiente autorizado com Node, executar smoke tests e regressão UI/API/ledger/Sofia sobre cópia e validar segundo dispositivo/identidade. Não mover V3.1 nem promover staging.
