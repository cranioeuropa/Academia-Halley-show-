# Encaixe de assets — Jornada Viva v0.1

**Estado (18/10):** sete imagens operacionais e um guia visual do acervo foram **enviados como binários** para esta branch, com hashes em [ASSET_CATALOG_V01.json](./ASSET_CATALOG_V01.json). Identidade final e enquadramento ainda precisam da revisão visual do usuário. Primeiro conferir visualmente personagem/identidade da GOLDEN V3.5 e licença/aprovação dos materiais.

## Fontes confirmadas no PC Crânio

Raiz: `NAVE/ACADEMIA/HALLEY_SHOW_JORNADA_VIVA_BASE/`

- `01_WEB_APPDEPLOY_SNAPSHOT/public/resources/halley_acolhendo.png`
- `01_WEB_APPDEPLOY_SNAPSHOT/public/resources/halley_apresentando.png`
- `01_WEB_APPDEPLOY_SNAPSHOT/public/resources/halley_celebrando.png`
- `01_WEB_APPDEPLOY_SNAPSHOT/public/resources/sofia_acolhendo.webp`
- `01_WEB_APPDEPLOY_SNAPSHOT/public/resources/sofia_indicando.webp`
- `01_WEB_APPDEPLOY_SNAPSHOT/public/resources/chest_press_aprovado.webp`
- `01_WEB_APPDEPLOY_SNAPSHOT/public/resources/professor-halley.png`
- `04_ASSETS/halley-character-guide.png`
- `04_ASSETS/BATCH_02/ombros-press.png` e outros grupos somente visuais.

## Slots já preparados no código

| Chave `ASSET_REGISTRY` | Tela | Candidato físico | Gate |
|---|---|---|---|
| `halley.hero` | Chegada | `halley_acolhendo.png` | ENCAIXADO / aguarda revisão visual |
| `halley.welcome` | Conhecer | `halley_apresentando.png` | ENCAIXADO / aguarda revisão visual |
| `halley.victory` | Continuidade | `halley_celebrando.png` | ENCAIXADO / aguarda revisão visual |
| `exercise.chest` | Hoje | `chest_press_aprovado.webp` | ENCAIXADO / exercício já homologado no LAB |
| `exercise.execution` | Treino | `chest_press_aprovado.webp` | ENCAIXADO / imagem estática, não é vídeo |
| `sofia.portrait` | Sofia e percepção | `sofia_acolhendo.webp` | ENCAIXADO / revisão visual pendente |
| `community.cover` | Academia Digital | Curadoria editorial pendente | Não simular pessoas/comunidade reais |

## Como encaixar sem redesenhar

O HTML expõe:

```js
window.HALLEY_UX_LAB.applyAssets({
  'halley.hero': './assets/halley_acolhendo.png',
  'exercise.chest': './assets/chest_press_aprovado.webp',
  'sofia.portrait': './assets/sofia_acolhendo.webp'
})
```

Os seis slots listados acima estão agora configurados por padrão no `index.html` com URL pública `raw.githubusercontent.com` desta branch. Arquivos correspondentes foram lidos de volta no GitHub; para uso offline, baixar também a pasta `assets/` e adaptar `ASSET_BASE`. `community.cover` ainda é placeholder, evitando inventar conteúdo.

## Composições visuais 1–9

Os nove cards produzidos em três pranchas na conversa foram usados como **referência de hierarquia, composição e clima**, não como fonte canônica dos rostos. As pranchas são imagens de design, separadas do HTML. As imagens oficiais já existentes têm precedência.
