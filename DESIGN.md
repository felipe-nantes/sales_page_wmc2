# Design

## Theme

Dark. Always dark. Preto quase puro como base — não #000 mas muito próximo. O "branco" é off-white (#F0F0F0), nunca branco puro. O vermelho é sangue (#CC0000), não laranja nem rosa. Inspiração: cartazes DEDSEC do Watch Dogs 2 — horror comic, punk, quadrinhos P&B com acento cromático único e brutal.

## Color Palette

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Background | `--bg` | `oklch(8% 0.005 0)` ≈ `#0d0d0d` | Base de toda a página |
| Background Alt | `--bg-alt` | `oklch(10% 0.005 0)` ≈ `#111111` | Seções alternadas |
| Background Light | `--bg-light` | `oklch(13% 0.005 0)` ≈ `#181818` | Elevação leve |
| White | `--white` | `oklch(94% 0.005 0)` ≈ `#F0F0F0` | Texto principal, elementos hollow |
| Red | `--red` | `oklch(40% 0.22 25)` ≈ `#CC0000` | Acento principal — CTAs, logo, sangue |
| Red Dark | `--red-dark` | `oklch(30% 0.20 25)` ≈ `#8B0000` | Hover, sombras vermelhas, profundidade |
| Gray | `--gray` | `oklch(58% 0.005 0)` ≈ `#888888` | Texto secundário, labels |
| Gray Dark | `--gray-dark` | `oklch(25% 0.005 0)` ≈ `#333333` | Bordas, separadores |
| Error Window Gray | `--win-gray` | `oklch(55% 0.005 0)` ≈ `#808080` | Barra de título Win98 |

**Regra absoluta:** nenhuma outra cor de acento é permitida. Sem roxo, sem verde, sem azul. Preto + branco + vermelho = identidade WMC2.

## Typography

| Role | Family | Weight | Style |
|------|--------|--------|-------|
| Headlines de impacto | Anton (Google Fonts) | 900 | Hollow outline: `-webkit-text-stroke: 2-3px var(--white)`, `color: transparent` |
| Headlines preenchidos | Anton | 900 | `color: var(--red)` com `text-shadow: 4px 4px 0 #000` |
| Body / labels | Source Code Pro | 400–700 | Monospace, `letter-spacing: 0.2em`, `text-transform: uppercase` |
| System labels | Source Code Pro | 400 | `// ` prefix, `border-left: 2px solid var(--red)`, all caps |

**Hollow text:** headlines como "WMC2", "MÉTODO", "TREINO" devem usar o estilo vazado (outline only, sem fill) — referência direta às letras dos cartazes DEDSEC. Aplica-se aos títulos H1 e H2 principais.

## Halftone

Massivo e visível — não sutil. Exatamente como nas referências DEDSEC.

```css
/* Halftone grande — cobre seções inteiras */
.halftone-heavy {
  background-image: radial-gradient(circle, rgba(240,240,240,0.45) 1.5px, transparent 1.5px);
  background-size: 14px 14px;
}

/* Halftone vermelho — seções de destaque */
.halftone-red-heavy {
  background-image: radial-gradient(circle, rgba(204,0,0,0.35) 2px, transparent 2px);
  background-size: 12px 12px;
}

/* Halftone diagonal — alternância de intensidade */
.halftone-diagonal {
  background-image: radial-gradient(circle, rgba(240,240,240,0.3) 1px, transparent 1px),
                    radial-gradient(circle, rgba(240,240,240,0.15) 1px, transparent 1px);
  background-size: 16px 16px, 8px 8px;
  background-position: 0 0, 8px 8px;
}
```

## Error Windows (Win98)

Componente-chave da identidade. Espalhados por múltiplas seções, visíveis no mobile.

- Barra de título: fundo cinza Win98 (`#808080`) com texto branco, ícone ✕
- Variante `warning`: barra vermelha (`#CC0000`)
- Variante `granted`: barra vermelha com ✓
- Corpo: fundo `#1a1a1a`, texto `#aaa`, ícone ☠ ou ⚠
- Stack visual: múltiplas janelas levemente deslocadas entre si (como nas refs)
- Posicionamento: `absolute` no hero, `relative` em outras seções
- Mobile: visíveis mas menores (não hidden)

**Conteúdo das janelas:**
- `SYSTEM WARNING.exe` — `TAKEOVER IN PROGRESS...`
- `ACCESS GRANTED` — `USER_01 — AUTENTICADO`
- `ALERT.exe` — `PROTOCOLO ATIVO`
- `DEDSEC TAKEOVER` — `ARE YOU SURE?` (decorativa, sem botões funcionais)

## Components

### HeroSection
- Logo WMC2 (`/assets/logo-wmc2.png`) como elemento visual dominante — grande, central, 60-70% da largura no mobile
- Halftone massivo cobrindo o fundo inteiro
- 4 error windows absolutes: 2 visíveis no mobile (menores), 2 só desktop
- Glitch no texto "WMC2" mais agressivo (displacement maior)
- VSL abaixo do logo

### Section Separators
- Barra diagonal vermelha 3px: `transform: skewY(-1.5deg)` ou `clip-path`
- Scanlines overlay com opacity 0.04 em todas as seções

### Noise Texture
- SVG feTurbulence já existente — aumentar opacidade de 0.03 para 0.06

## Motion

- Todos os `whileInView` com `ease: 'easeOut'` e `duration: 0.4-0.5s`
- Glitch: clip-path animation, múltiplos steps, displacement ±6px
- Hover em CTAs: `boxShadow` vermelho expandindo + leve `scale(1.02)`
- `prefers-reduced-motion`: desativar glitch e transições, manter apenas opacity fade
