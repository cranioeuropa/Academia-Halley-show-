# Encaixe de assets — Jornada Viva v0.1

**Estado:** fontes localizadas no PC Crânio; **imagens binárias não foram copiadas para esta branch**. Primeiro conferir visualmente personagem/identidade da GOLDEN V3.5 e licença/aprovação dos materiais.

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
| `halley.hero` | Chegada | `halley_acolhendo.png` | Identidade/enquadramento |
| `halley.welcome` | Conhecer | `halley_apresentando.png` | Identidade/enquadramento |
| `halley.victory` | Continuidade | `halley_celebrando.png` | Identidade/enquadramento |
| `exercise.chest` | Hoje | `chest_press_aprovado.webp` | Fidelidade ao exercício aprovado |
| `exercise.execution` | Treino | `chest_press_aprovado.webp` | Mesma técnica, não inventar movimento |
| `sofia.portrait` | Sofia e percepção | `sofia_acolhendo.webp` | Identidade visual da Sofia |
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

Esses caminhos **só funcionam depois que os arquivos correspondentes forem colocados fisicamente no destino**. Não alegar presença de imagem no GitHub só por haver nome no mapa.

## Composições visuais 1–9

Os nove cards produzidos em três pranchas na conversa foram usados como **referência de hierarquia, composição e clima**, não como fonte canônica dos rostos. As pranchas são imagens de design, separadas do HTML. As imagens oficiais já existentes têm precedência.
