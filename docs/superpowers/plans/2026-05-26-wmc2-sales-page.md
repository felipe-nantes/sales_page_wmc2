# WMC2 Sales Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a página de vendas do WMC2 — single-scroll Next.js landing page com 5 seções, identidade visual hacker/punk (preto + branco + vermelho), VSL embed, e checkout via Kiwify.

**Architecture:** Next.js App Router + TypeScript + Tailwind CSS. Toda copy vive em `content/content.ts`. Componentes de seção são independentes e compostos em `app/page.tsx`. Componentes UI compartilhados gerenciam elementos visuais reutilizáveis. Framer Motion gerencia animações de scroll. Design mandatório: invocar `impeccable:impeccable` e `frontend-design` antes de cada seção para garantir visual de alta qualidade sem cara de IA genérica.

> ⚠️ **MOBILE-FIRST OBRIGATÓRIO:** A grande maioria dos usuários acessa pelo celular. Todo CSS começa pelo mobile (base) e usa `md:` para desktop. Nunca o contrário. Fontes, espaçamentos, grids e botões devem ser projetados para 375px–430px primeiro. Testar cada seção no mobile antes de ajustar o desktop.

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS 3, Framer Motion 11, Google Fonts (Anton + Source Code Pro)

---

## Mapa de Arquivos

```
sale_page_wmc2/
├── app/
│   ├── layout.tsx                     # Meta tags, fonts, providers
│   ├── page.tsx                       # Composição das 5 seções
│   └── globals.css                    # CSS variables, keyframes, utilities
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx            # Seção 01 — logo + VSL + CTA
│   │   ├── ProblemSolutionSection.tsx # Seção 02 — problema + solução
│   │   ├── CurriculumSection.tsx      # Seção 03 — módulos + bônus
│   │   ├── AuthorSection.tsx          # Seção 04 — MrSaizen
│   │   └── OfferSection.tsx           # Seção 05 — oferta + CTA + FAQ
│   └── ui/
│       ├── ErrorWindow.tsx            # Janela de erro estilo Win98
│       ├── CtaButton.tsx              # Botão CTA principal
│       ├── SectionDivider.tsx         # Corte diagonal entre seções
│       └── SystemLabel.tsx            # Label "// PROTOCOLO ATIVO"
├── content/
│   └── content.ts                     # TODA a copy da página
└── public/
    └── assets/
        ├── logo-wmc2.png              # Logo fornecida pelo usuário
        ├── vsl.mp4                    # VSL convertida de MOV para MP4
        └── noise.svg                  # Textura de ruído para fundos
```

---

## Task 1: Inicializar projeto Next.js

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `postcss.config.mjs`

- [ ] **Step 1: Inicializar Next.js com TypeScript + Tailwind no diretório atual**

```bash
cd "C:/Users/fnant/Projects/sale_page_wmc2"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --no-git
```

Quando perguntado, escolher:
- Would you like to use Turbopack? → **No**
- (demais opções já passadas como flags)

- [ ] **Step 2: Instalar Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 3: Verificar que o projeto inicia corretamente**

```bash
npm run dev
```

Esperado: servidor rodando em `http://localhost:3000` sem erros.

- [ ] **Step 4: Limpar arquivos de boilerplate do Next.js**

Deletar o conteúdo de `app/page.tsx` (será reescrito na Task 10).
Deletar o conteúdo de `app/globals.css` (será reescrito na Task 2).

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "feat: initialize Next.js project with TypeScript + Tailwind + Framer Motion"
```

---

## Task 2: Design Tokens + Global Styles

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Create: `public/assets/noise.svg`

- [ ] **Step 1: Criar textura SVG de ruído**

Criar `public/assets/noise.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="200" height="200" filter="url(#noise)" opacity="1"/>
</svg>
```

- [ ] **Step 2: Escrever globals.css com tokens, keyframes e utilities**

```css
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Source+Code+Pro:ital,wght@0,400;0,600;0,700;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #0a0a0a;
  --color-bg-alt: #111111;
  --color-bg-light: #161616;
  --color-red: #CC0000;
  --color-red-dark: #990000;
  --color-red-glow: rgba(204, 0, 0, 0.4);
  --color-white: #F0F0F0;
  --color-gray: #888888;
  --color-dark-gray: #333333;
  --font-impact: 'Anton', Impact, sans-serif;
  --font-mono: 'Source Code Pro', 'Courier New', monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-white);
  font-family: var(--font-mono);
  overflow-x: hidden;
}

/* ── Noise texture overlay ── */
.noise-overlay {
  position: relative;
}
.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/assets/noise.svg');
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0.04;
  pointer-events: none;
  mix-blend-mode: overlay;
  z-index: 1;
}

/* ── Halftone dot pattern ── */
.halftone {
  background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
  background-size: 14px 14px;
}

.halftone-red {
  background-image: radial-gradient(circle, rgba(204,0,0,0.12) 1px, transparent 1px);
  background-size: 12px 12px;
}

/* ── Glitch keyframes ── */
@keyframes glitch-main {
  0%, 88%, 100% {
    transform: translate(0, 0);
    text-shadow: none;
  }
  89% {
    transform: translate(-3px, 0);
    text-shadow: 3px 0 0 rgba(204, 0, 0, 0.8);
    clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%);
  }
  90% {
    transform: translate(3px, 0);
    text-shadow: -3px 0 0 rgba(255, 255, 255, 0.5);
    clip-path: polygon(0 55%, 100% 55%, 100% 75%, 0 75%);
  }
  91% {
    transform: translate(-2px, 1px);
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }
  92% {
    transform: translate(0, 0);
    clip-path: none;
  }
}

@keyframes glitch-shadow {
  0%, 88%, 100% { opacity: 0; }
  89%, 91% { opacity: 1; transform: translate(4px, 0); }
  90%, 92% { opacity: 0; }
}

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

@keyframes flicker {
  0%, 97%, 100% { opacity: 1; }
  98% { opacity: 0.85; }
  99% { opacity: 1; }
}

@keyframes blink-cursor {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* ── Glitch text utility ── */
.glitch-text {
  position: relative;
  animation: glitch-main 6s infinite;
}
.glitch-text::before {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  color: var(--color-red);
  animation: glitch-shadow 6s infinite;
  pointer-events: none;
}

/* ── Red glow utility ── */
.red-glow {
  box-shadow: 0 0 24px var(--color-red-glow), 0 0 48px rgba(204, 0, 0, 0.2);
}

/* ── Scanline overlay ── */
.scanlines::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  pointer-events: none;
  z-index: 2;
}

/* ── Video player ── */
video {
  width: 100%;
  height: auto;
  display: block;
}

/* ── FAQ accordion ── */
.faq-item summary {
  list-style: none;
  cursor: pointer;
}
.faq-item summary::-webkit-details-marker {
  display: none;
}
```

- [ ] **Step 3: Configurar Tailwind com tokens customizados**

Substituir `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        'bg-alt': '#111111',
        'bg-light': '#161616',
        red: {
          DEFAULT: '#CC0000',
          dark: '#990000',
          light: '#FF3333',
        },
        gray: {
          DEFAULT: '#888888',
          dark: '#333333',
          light: '#CCCCCC',
        },
      },
      fontFamily: {
        impact: ['Anton', 'Impact', 'sans-serif'],
        mono: ['Source Code Pro', 'Courier New', 'monospace'],
      },
      animation: {
        'glitch': 'glitch-main 6s infinite',
        'flicker': 'flicker 8s infinite',
        'blink': 'blink-cursor 1s infinite',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 4: Verificar que Tailwind compila sem erros**

```bash
npm run build
```

Esperado: build concluído sem erros TypeScript ou CSS.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css tailwind.config.ts public/assets/noise.svg
git commit -m "feat: design tokens, global styles, animations, halftone utilities"
```

---

## Task 3: Content Layer

**Files:**
- Create: `content/content.ts`

- [ ] **Step 1: Criar diretório e arquivo de conteúdo**

```bash
mkdir -p content
```

- [ ] **Step 2: Escrever content.ts com toda a copy**

Criar `content/content.ts`:

```typescript
export const KIWIFY_URL = 'KIWIFY_URL_AQUI' // substituir antes do deploy

export const content = {
  hero: {
    systemLabel: '// NOVO PROTOCOLO — 2026',
    title: 'WMC2',
    titleGlitch: 'WMC2',
    subtitle: 'WEAPONS OF MASS CONSTRUCTION 2',
    errorWindows: [
      { title: 'SYSTEM WARNING.exe', message: 'TAKEOVER IN PROGRESS...', variant: 'warning' as const },
      { title: 'ACCESS GRANTED', message: 'USER_01 — AUTENTICADO', variant: 'granted' as const },
    ],
    cta: {
      label: 'ENTRAR NO PROTOCOLO',
      price: '— R$247',
      sub: 'Lançamento 05/06 · Acesso pelo grupo',
      href: KIWIFY_URL,
    },
  },

  problem: {
    systemLabel: '// O PROBLEMA',
    headline: 'VOCÊ AINDA MONTA\nTREINO POR COLAGEM?',
    lines: [
      'Pega um pouco de um método.',
      'Um pouco de outro.',
      'Um pouco do que apareceu no Instagram essa semana.',
      'Mistura tudo e chama de metodologia.',
      '',
      'O problema não é falta de informação.',
      'É falta de eixo lógico.',
      '',
      'Treino sem critério é exercício físico.',
      'Não é prescrição.',
    ],
  },

  solution: {
    systemLabel: '// O QUE É O WMC2',
    headline: 'NÃO É TREINO PRONTO.\nÉ MÉTODO.',
    lines: [
      'O WMC2 ensina a lógica por trás do Método Saizen.',
      'Como o Saizen pensa, analisa e constrói protocolos.',
      '',
      'Frequência. Perfil de resistência.',
      'Neuromechanical matching.',
      'Escolha de exercício com critério.',
      '',
      'A nova fase do método — atualizada desde 2023.',
    ],
  },

  curriculum: {
    systemLabel: '// CONTEÚDO DO PROTOCOLO',
    headline: '7 AULAS. 1 HORA.\nSEM ENROLAÇÃO.',
    disclaimer: 'O curso é curto porque é concentrado, não porque é raso.',
    modules: [
      { num: '01', title: 'A evolução do Método Saizen desde 2023' },
      { num: '02', title: 'Mitos e dogmas que travam a prescrição' },
      { num: '03', title: 'Frequência de treino: como usar direito' },
      { num: '04', title: 'Perfil de resistência: base da escolha de exercício' },
      { num: '05', title: 'Armas novas: técnicas desenvolvidas e testadas' },
      { num: '06', title: 'Neuromechanical matching na prática' },
      { num: '07', title: 'Demonstração: construindo um protocolo com critério' },
    ],
  },

  bonuses: {
    systemLabel: '// ACCESS GRANTED — O ARSENAL',
    items: [
      { icon: '▸', label: 'Slides das aulas em PDF' },
      { icon: '▸', label: 'Worksheet de montagem de protocolo' },
      { icon: '▸', label: 'Checklist de avaliação inicial' },
      { icon: '▸', label: 'Grupo de estudos no WhatsApp' },
      { icon: '▸', label: 'Ebook grátis: volume de treino' },
      { icon: '▸', label: 'FAQ técnico + guia de implementação' },
      { icon: '▸', label: 'Garantia de 7 dias' },
    ],
  },

  author: {
    systemLabel: '// MR.SAIZEN',
    headline: 'TREINADOR.\nNÃO INFLUENCER.',
    lines: [
      'Mais de 30 pro cards.',
      'Treinador da atual campeã do Mr. Olympia.',
      'WMC1: 1.700 cópias. R$400.000 em vendas.',
      '',
      'O Método Saizen tem histórico de aplicação real —',
      'não de teoria de internet.',
      '',
      'O WMC2 é a atualização do que esse trabalho',
      'produziu desde 2023.',
    ],
    badgeText: 'GUIS APPROVED\nSAIZEN SQUAD',
  },

  offer: {
    systemLabel: '// ACESSO AO PROTOCOLO',
    headline: 'WMC2 — WEAPONS OF\nMASS CONSTRUCTION 2',
    price: 'R$ 247',
    priceLabel: 'Pré-lançamento · Lançamento 05/06',
    cta: {
      label: 'ENTRAR NO PROTOCOLO →',
      href: KIWIFY_URL,
    },
    accessNote: 'Acesso liberado pelo grupo de WhatsApp.',
    guarantee: {
      headline: '7 dias de garantia.',
      body: 'Se não servir, 100% devolvido. Sem conversa.',
    },
    faq: [
      {
        question: 'É só mais um curso?',
        answer: 'Não. É um estudo técnico sobre o Método Saizen atualizado. Não tem planilha pronta, não tem receita universal. Tem lógica de prescrição.',
      },
      {
        question: 'O curso é muito curto?',
        answer: '1 hora concentrada vale mais que 10 horas de enrolação. O valor está na clareza do método, não no volume de aulas.',
      },
      {
        question: 'Serve sem ser atleta de competição?',
        answer: 'Se você prescreve, estuda ou aplica treino avançado, serve. O curso não é para iniciante que quer treino pronto.',
      },
      {
        question: 'Qual a diferença para o WMC1?',
        answer: 'WMC2 é a nova fase do método. Mudanças de 2023 para cá: armas novas, neuromechanical matching, atualização de conceitos. Não é revisão — é atualização.',
      },
      {
        question: 'Não é melhor pegar de vários métodos?',
        answer: 'Essa crença é exatamente o que o curso combate. Prescrição sem eixo lógico é colagem. O WMC2 resolve isso.',
      },
    ],
  },
}
```

- [ ] **Step 3: Verificar que o TypeScript compila o arquivo**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 4: Commit**

```bash
git add content/content.ts
git commit -m "feat: content layer with all WMC2 copy centralized"
```

---

## Task 4: Componentes UI Atômicos

**Files:**
- Create: `components/ui/ErrorWindow.tsx`
- Create: `components/ui/CtaButton.tsx`
- Create: `components/ui/SectionDivider.tsx`
- Create: `components/ui/SystemLabel.tsx`
- Create: `components/ui/index.ts`

> **Antes de implementar:** invocar `frontend-design` skill para garantir que os componentes seguem a estética WMC2.

- [ ] **Step 1: Criar diretório**

```bash
mkdir -p components/ui components/sections
```

- [ ] **Step 2: Criar ErrorWindow.tsx**

```tsx
// components/ui/ErrorWindow.tsx
interface ErrorWindowProps {
  title: string
  message?: string
  variant?: 'warning' | 'granted' | 'alert'
  className?: string
}

export function ErrorWindow({ title, message, variant = 'warning', className = '' }: ErrorWindowProps) {
  const icons = { warning: '☠', granted: '✓', alert: '⚠' }
  const titleColors = {
    warning: 'bg-[#CC0000]',
    granted: 'bg-[#CC0000]',
    alert: 'bg-[#333]',
  }

  return (
    <div className={`border border-[#555] bg-[#1a1a1a] font-mono text-xs select-none ${className}`}>
      <div className={`${titleColors[variant]} flex items-center justify-between px-2 py-[3px]`}>
        <span className="text-white tracking-wider text-[10px] uppercase">{title}</span>
        <button className="text-white/70 hover:text-white ml-4 leading-none">✕</button>
      </div>
      <div className="px-3 py-2 flex items-start gap-2">
        <span className="text-[#CC0000] text-base leading-none mt-[1px]">{icons[variant]}</span>
        {message && (
          <span className="text-[#aaa] text-[10px] tracking-wide leading-snug">{message}</span>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Criar CtaButton.tsx**

```tsx
// components/ui/CtaButton.tsx
'use client'
import { motion } from 'framer-motion'

interface CtaButtonProps {
  label: string
  href: string
  price?: string
  subLabel?: string
  size?: 'sm' | 'lg'
  className?: string
}

export function CtaButton({
  label,
  href,
  price,
  subLabel,
  size = 'lg',
  className = '',
}: CtaButtonProps) {
  const padding = size === 'lg' ? 'px-10 py-5' : 'px-6 py-3'
  const fontSize = size === 'lg' ? 'text-xl' : 'text-sm'

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-block bg-[#CC0000] text-white font-impact tracking-widest uppercase
          ${padding} ${fontSize}
          border border-[#CC0000]
          transition-colors duration-150
          hover:bg-[#990000]
          active:scale-95
          cursor-pointer
        `}
        style={{ fontFamily: 'Anton, Impact, sans-serif' }}
        whileHover={{ boxShadow: '0 0 30px rgba(204,0,0,0.5), 0 0 60px rgba(204,0,0,0.2)' }}
        whileTap={{ scale: 0.97 }}
      >
        {label}
        {price && (
          <span className="text-[#ffaaaa] ml-2">{price}</span>
        )}
      </motion.a>
      {subLabel && (
        <span className="text-[#555] text-xs tracking-[0.2em] font-mono uppercase">{subLabel}</span>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Criar SectionDivider.tsx**

```tsx
// components/ui/SectionDivider.tsx
interface SectionDividerProps {
  direction?: 'left' | 'right'
  from?: string
  to?: string
  height?: number
}

export function SectionDivider({
  direction = 'left',
  from = '#0a0a0a',
  to = '#111111',
  height = 48,
}: SectionDividerProps) {
  // Uses clip-path on the section below, not skewY, to avoid layout issues with children
  const clipPath =
    direction === 'left'
      ? `polygon(0 ${height}px, 100% 0, 100% 100%, 0 100%)`
      : `polygon(0 0, 100% ${height}px, 100% 100%, 0 100%)`

  return (
    <div
      aria-hidden="true"
      style={{
        height: `${height}px`,
        background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
        clipPath,
        marginTop: `-${height}px`,
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    />
  )
}

// RedSlash: decorative diagonal red line used between sections
export function RedSlash({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-none ${className}`}
      style={{ height: '3px' }}
    >
      <div
        className="w-full h-[3px] bg-[#CC0000]"
        style={{ transform: 'skewX(-20deg) scaleX(1.1)' }}
      />
    </div>
  )
}
```

- [ ] **Step 5: Criar SystemLabel.tsx**

```tsx
// components/ui/SystemLabel.tsx
interface SystemLabelProps {
  text: string
  className?: string
}

export function SystemLabel({ text, className = '' }: SystemLabelProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2
        font-mono text-xs tracking-[0.25em] text-[#CC0000] uppercase
        border-l-2 border-[#CC0000] pl-3
        ${className}
      `}
    >
      {text}
    </span>
  )
}
```

- [ ] **Step 6: Criar barrel export**

Criar `components/ui/index.ts`:

```typescript
export { ErrorWindow } from './ErrorWindow'
export { CtaButton } from './CtaButton'
export { SectionDivider, RedSlash } from './SectionDivider'
export { SystemLabel } from './SystemLabel'
```

- [ ] **Step 7: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 8: Commit**

```bash
git add components/ui/
git commit -m "feat: atomic UI components — ErrorWindow, CtaButton, SectionDivider, SystemLabel"
```

---

## Task 5: HeroSection

**Files:**
- Create: `components/sections/HeroSection.tsx`

> **Antes de implementar:** invocar `impeccable:impeccable` e `frontend-design` para revisar o design do hero antes de codar.

- [ ] **Step 1: Criar HeroSection.tsx**

```tsx
// components/sections/HeroSection.tsx
'use client'
import { motion } from 'framer-motion'
import { ErrorWindow, CtaButton, SystemLabel } from '@/components/ui'
import { content } from '@/content/content'

export function HeroSection() {
  const { hero } = content

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay scanlines"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Halftone background */}
      <div className="absolute inset-0 halftone opacity-40 pointer-events-none" />

      {/* Diagonal red accent lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute w-[200%] h-[2px] bg-[#CC0000] opacity-20"
          style={{ top: '30%', left: '-50%', transform: 'rotate(-8deg)' }}
        />
        <div
          className="absolute w-[200%] h-[1px] bg-[#CC0000] opacity-10"
          style={{ top: '65%', left: '-50%', transform: 'rotate(-8deg)' }}
        />
      </div>

      {/* Floating Error Windows — decorative, hidden on mobile */}
      <motion.div
        className="absolute top-8 left-6 hidden md:block z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <ErrorWindow
          title={hero.errorWindows[0].title}
          message={hero.errorWindows[0].message}
          variant={hero.errorWindows[0].variant}
          className="w-56 opacity-80"
        />
      </motion.div>

      <motion.div
        className="absolute top-10 right-6 hidden md:block z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        <ErrorWindow
          title={hero.errorWindows[1].title}
          message={hero.errorWindows[1].message}
          variant={hero.errorWindows[1].variant}
          className="w-52 opacity-80"
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl mx-auto pt-20 pb-16">

        {/* System label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <SystemLabel text={hero.systemLabel} />
        </motion.div>

        {/* WMC2 Logo — glitch effect */}
        <motion.h1
          className="glitch-text font-impact text-[clamp(5rem,18vw,14rem)] leading-none text-[#CC0000] tracking-tight select-none"
          data-text={hero.title}
          style={{ fontFamily: 'Anton, Impact, sans-serif' }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-mono text-xs md:text-sm tracking-[0.4em] text-[#666] uppercase mt-2 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {hero.subtitle}
        </motion.p>

        {/* VSL Player */}
        <motion.div
          className="w-full max-w-3xl mx-auto border border-[#222] relative"
          style={{ background: '#000' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Red top border accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#CC0000] z-10" />

          <video
            controls
            preload="metadata"
            className="w-full aspect-video"
            poster=""
            style={{ display: 'block', background: '#000' }}
          >
            <source src="/assets/vsl.mp4" type="video/mp4" />
            Seu browser não suporta o player de vídeo.
          </video>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <CtaButton
            label={hero.cta.label}
            price={hero.cta.price}
            href={hero.cta.href}
            subLabel={hero.cta.sub}
            size="lg"
          />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0a)' }}
      />
    </section>
  )
}
```

- [ ] **Step 2: Testar visualmente**

Adicionar temporariamente ao `app/page.tsx`:

```tsx
import { HeroSection } from '@/components/sections/HeroSection'
export default function Home() {
  return <HeroSection />
}
```

Rodar `npm run dev` e verificar em `http://localhost:3000`.

Checklist visual:
- [ ] Logo WMC2 enorme e vermelho
- [ ] Animação de glitch ocorre no logo
- [ ] Error windows aparecem nos cantos (desktop)
- [ ] Player de vídeo presente e funcional
- [ ] CTA botão vermelho com glow no hover
- [ ] Error windows ocultas no mobile

- [ ] **Step 3: Commit**

```bash
git add components/sections/HeroSection.tsx app/page.tsx
git commit -m "feat: HeroSection with glitch logo, VSL player, floating error windows"
```

---

## Task 6: ProblemSolutionSection

**Files:**
- Create: `components/sections/ProblemSolutionSection.tsx`

> **Antes de implementar:** invocar `impeccable:impeccable` para revisar o layout de duas colunas e garantir hierarquia visual correta.

- [ ] **Step 1: Criar ProblemSolutionSection.tsx**

```tsx
// components/sections/ProblemSolutionSection.tsx
'use client'
import { motion } from 'framer-motion'
import { SystemLabel } from '@/components/ui'
import { content } from '@/content/content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
}

export function ProblemSolutionSection() {
  const { problem, solution } = content

  return (
    <section className="relative" style={{ background: 'var(--color-bg-alt)' }}>
      {/* Red diagonal slash at top */}
      <div className="w-full h-[3px] bg-[#CC0000] opacity-60" />

      <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-0 md:gap-px">

          {/* ── PROBLEM BLOCK ── */}
          <motion.div
            className="relative halftone-red p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#CC0000]/20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Noise overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(204,0,0,0.08) 1px, transparent 1px)',
                backgroundSize: '10px 10px',
              }}
            />

            <div className="relative z-10">
              <motion.div custom={0} variants={fadeUp} className="mb-6">
                <SystemLabel text={problem.systemLabel} />
              </motion.div>

              <motion.h2
                custom={1}
                variants={fadeUp}
                className="font-impact text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-white uppercase mb-8 whitespace-pre-line"
                style={{ fontFamily: 'Anton, Impact, sans-serif' }}
              >
                {problem.headline}
              </motion.h2>

              <div className="space-y-1">
                {problem.lines.map((line, i) =>
                  line === '' ? (
                    <div key={i} className="h-3" />
                  ) : (
                    <motion.p
                      key={i}
                      custom={i + 2}
                      variants={fadeUp}
                      className="font-mono text-sm md:text-base text-[#aaa] leading-relaxed"
                    >
                      {line}
                    </motion.p>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* ── SOLUTION BLOCK ── */}
          <motion.div
            className="relative p-8 md:p-12"
            style={{ background: 'var(--color-bg-light)' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="relative z-10">
              <motion.div custom={0} variants={fadeUp} className="mb-6">
                <SystemLabel text={solution.systemLabel} />
              </motion.div>

              <motion.h2
                custom={1}
                variants={fadeUp}
                className="font-impact text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-white uppercase mb-8 whitespace-pre-line"
                style={{ fontFamily: 'Anton, Impact, sans-serif' }}
              >
                {solution.headline}
              </motion.h2>

              {/* Red accent line */}
              <motion.div
                custom={2}
                variants={fadeUp}
                className="w-12 h-[2px] bg-[#CC0000] mb-8"
              />

              <div className="space-y-1">
                {solution.lines.map((line, i) =>
                  line === '' ? (
                    <div key={i} className="h-3" />
                  ) : (
                    <motion.p
                      key={i}
                      custom={i + 3}
                      variants={fadeUp}
                      className="font-mono text-sm md:text-base text-[#aaa] leading-relaxed"
                    >
                      {line}
                    </motion.p>
                  )
                )}
              </div>
            </div>

            {/* Decorative corner bracket */}
            <div
              className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#CC0000]/30"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom separator line */}
      <div className="w-full h-[1px] bg-[#CC0000]/30" />
    </section>
  )
}
```

- [ ] **Step 2: Adicionar ao page.tsx e testar**

```tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
    </>
  )
}
```

Verificar:
- [ ] Duas colunas no desktop, empilhadas no mobile
- [ ] Copy linha a linha com fade-up no scroll
- [ ] Borda vermelha separando os blocos
- [ ] Halftone sutil no bloco de problema

- [ ] **Step 3: Commit**

```bash
git add components/sections/ProblemSolutionSection.tsx app/page.tsx
git commit -m "feat: ProblemSolutionSection with scroll animations and two-column layout"
```

---

## Task 7: CurriculumSection

**Files:**
- Create: `components/sections/CurriculumSection.tsx`

> **Antes de implementar:** invocar `impeccable:impeccable` para revisar grid de módulos e cards de bônus.

- [ ] **Step 1: Criar CurriculumSection.tsx**

```tsx
// components/sections/CurriculumSection.tsx
'use client'
import { motion } from 'framer-motion'
import { SystemLabel, ErrorWindow } from '@/components/ui'
import { content } from '@/content/content'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: 'easeOut' },
  }),
}

export function CurriculumSection() {
  const { curriculum, bonuses } = content

  return (
    <section
      className="relative noise-overlay"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">

          {/* ── CURRICULUM ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div custom={0} variants={fadeUp} className="mb-4">
              <SystemLabel text={curriculum.systemLabel} />
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-impact text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] text-white uppercase mb-3 whitespace-pre-line"
              style={{ fontFamily: 'Anton, Impact, sans-serif' }}
            >
              {curriculum.headline}
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="font-mono text-xs text-[#555] tracking-wide mb-10 italic"
            >
              {curriculum.disclaimer}
            </motion.p>

            {/* Modules list */}
            <div className="space-y-0">
              {curriculum.modules.map((mod, i) => (
                <motion.div
                  key={mod.num}
                  custom={i + 3}
                  variants={fadeUp}
                  className="flex items-start gap-4 py-4 border-b border-[#1e1e1e] group hover:border-[#CC0000]/40 transition-colors duration-200"
                >
                  <span
                    className="font-mono text-xs text-[#CC0000] tracking-widest mt-[2px] shrink-0 w-6"
                    aria-hidden="true"
                  >
                    {mod.num}
                  </span>
                  <span className="font-mono text-sm text-[#ccc] group-hover:text-white transition-colors duration-200 leading-snug">
                    {mod.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── BONUSES ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Error window frame */}
            <div className="border border-[#CC0000]/40">
              {/* Window title bar */}
              <div className="bg-[#CC0000] flex items-center justify-between px-3 py-2">
                <span className="font-mono text-xs text-white tracking-widest uppercase">
                  {bonuses.systemLabel}
                </span>
                <span className="font-mono text-[10px] text-white/70">■ ■ ✕</span>
              </div>

              {/* Window body */}
              <div className="bg-[#111] p-6 space-y-0">
                {bonuses.items.map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i + 1}
                    variants={fadeUp}
                    className="flex items-center gap-3 py-3 border-b border-[#1e1e1e] last:border-b-0"
                  >
                    <span className="text-[#CC0000] font-mono text-sm shrink-0" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="font-mono text-sm text-[#ccc] leading-snug">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Window status bar */}
              <div className="bg-[#0d0d0d] border-t border-[#1e1e1e] px-3 py-1">
                <span className="font-mono text-[10px] text-[#444] tracking-widest">
                  STATUS: ACTIVE · 7 ITEMS LOADED
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Adicionar ao page.tsx e testar**

```tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { CurriculumSection } from '@/components/sections/CurriculumSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
      <CurriculumSection />
    </>
  )
}
```

Verificar:
- [ ] Lista de módulos com numeração militar e hover state
- [ ] Card de bônus em estilo error window com barra de título vermelha
- [ ] Animações de fade-up no scroll

- [ ] **Step 3: Commit**

```bash
git add components/sections/CurriculumSection.tsx app/page.tsx
git commit -m "feat: CurriculumSection with modules list and bonus error-window card"
```

---

## Task 8: AuthorSection

**Files:**
- Create: `components/sections/AuthorSection.tsx`

> **Antes de implementar:** invocar `impeccable:impeccable` para revisar o layout de autoridade — deve ser sóbrio e não parecer vendedor.

- [ ] **Step 1: Criar AuthorSection.tsx**

```tsx
// components/sections/AuthorSection.tsx
'use client'
import { motion } from 'framer-motion'
import { SystemLabel } from '@/components/ui'
import { content } from '@/content/content'

export function AuthorSection() {
  const { author } = content

  return (
    <section
      className="relative"
      style={{ background: 'var(--color-bg-alt)' }}
    >
      {/* Top separator */}
      <div className="w-full h-[1px] bg-[#CC0000]/30" />

      <div className="max-w-5xl mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* ── Photo + Badge ── */}
          <motion.div
            className="flex flex-col items-center md:items-start gap-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            {/* Photo placeholder — grayscale frame */}
            <div
              className="relative w-full max-w-xs aspect-square border border-[#CC0000]/30 overflow-hidden"
              style={{ background: '#111' }}
            >
              {/* Placeholder until photo is provided */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-20 h-20 border-2 border-[#333] rounded-full flex items-center justify-center">
                  <span className="text-[#333] text-3xl font-impact" style={{ fontFamily: 'Anton, sans-serif' }}>
                    S
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#444] tracking-widest uppercase">
                  foto · mr.saizen
                </span>
              </div>

              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#CC0000]/60" aria-hidden="true" />
              <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#CC0000]/60" aria-hidden="true" />
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#CC0000]/60" aria-hidden="true" />
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#CC0000]/60" aria-hidden="true" />
            </div>

            {/* Badge — CSS stamp style */}
            <div className="relative border-2 border-[#CC0000]/60 px-5 py-3 text-center"
              style={{
                background: 'transparent',
                transform: 'rotate(-2deg)',
                boxShadow: '0 0 0 1px rgba(204,0,0,0.2), inset 0 0 0 2px rgba(204,0,0,0.1)',
              }}
            >
              <div className="w-full border-t border-b border-[#CC0000]/40 py-2">
                <p className="font-mono text-[9px] tracking-[0.3em] text-[#CC0000] uppercase whitespace-pre-line leading-loose">
                  {author.badgeText}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Bio copy ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SystemLabel text={author.systemLabel} className="mb-6 block" />

            <h2
              className="font-impact text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-white uppercase mb-8 whitespace-pre-line"
              style={{ fontFamily: 'Anton, Impact, sans-serif' }}
            >
              {author.headline}
            </h2>

            {/* Red accent line */}
            <div className="w-12 h-[2px] bg-[#CC0000] mb-8" />

            <div className="space-y-1">
              {author.lines.map((line, i) =>
                line === '' ? (
                  <div key={i} className="h-3" />
                ) : (
                  <p key={i} className="font-mono text-sm md:text-base text-[#aaa] leading-relaxed">
                    {line}
                  </p>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="w-full h-[1px] bg-[#CC0000]/30" />
    </section>
  )
}
```

- [ ] **Step 2: Adicionar ao page.tsx e testar**

```tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { CurriculumSection } from '@/components/sections/CurriculumSection'
import { AuthorSection } from '@/components/sections/AuthorSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
      <CurriculumSection />
      <AuthorSection />
    </>
  )
}
```

Verificar:
- [ ] Placeholder de foto com corner brackets vermelhos
- [ ] Badge estilo carimbo levemente rotacionado
- [ ] Copy de bio alinhada à direita
- [ ] Layout de 2 colunas colapsa corretamente no mobile

- [ ] **Step 3: Commit**

```bash
git add components/sections/AuthorSection.tsx app/page.tsx
git commit -m "feat: AuthorSection with photo placeholder, stamp badge, authority bio"
```

---

## Task 9: OfferSection

**Files:**
- Create: `components/sections/OfferSection.tsx`

> **Antes de implementar:** invocar `impeccable:impeccable` — esta é a seção de conversão, o design precisa ter máximo impacto visual com hierarquia clara: preço → CTA → garantia → FAQ.

- [ ] **Step 1: Criar OfferSection.tsx**

```tsx
// components/sections/OfferSection.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { SystemLabel, CtaButton } from '@/components/ui'
import { content } from '@/content/content'

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="border-b border-[#1e1e1e]"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
    >
      <button
        className="w-full flex items-start justify-between gap-4 py-4 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-mono text-sm text-[#ccc] group-hover:text-white transition-colors leading-snug">
          <span className="text-[#CC0000] mr-2 font-bold">{open ? '▾' : '▸'}</span>
          {question}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="font-mono text-sm text-[#888] pb-4 pl-5 leading-relaxed border-l-2 border-[#CC0000]/30 ml-[6px]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function OfferSection() {
  const { offer } = content

  return (
    <section
      className="relative noise-overlay"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Red top bar */}
      <div className="w-full h-[3px] bg-[#CC0000]" />

      <div className="max-w-3xl mx-auto px-4 py-20 md:py-28 text-center">

        {/* System label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex justify-center"
        >
          <SystemLabel text={offer.systemLabel} />
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="font-impact text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] text-white uppercase mb-10 whitespace-pre-line"
          style={{ fontFamily: 'Anton, Impact, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          {offer.headline}
        </motion.h2>

        {/* Price block */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div
            className="inline-block border border-[#CC0000]/40 px-10 py-6"
            style={{ background: 'rgba(204,0,0,0.05)' }}
          >
            <p className="font-mono text-xs text-[#CC0000] tracking-[0.3em] uppercase mb-2">
              {offer.priceLabel}
            </p>
            <p
              className="font-impact text-[clamp(3.5rem,10vw,6rem)] leading-none text-[#CC0000]"
              style={{ fontFamily: 'Anton, Impact, sans-serif' }}
            >
              {offer.price}
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <CtaButton
            label={offer.cta.label}
            href={offer.cta.href}
            size="lg"
          />
        </motion.div>

        {/* Access note */}
        <motion.p
          className="font-mono text-xs text-[#444] tracking-widest mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {offer.accessNote}
        </motion.p>

        {/* Guarantee block */}
        <motion.div
          className="border border-[#1e1e1e] p-6 mb-16 text-left"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-start gap-4">
            <span className="text-[#CC0000] text-2xl leading-none mt-1" aria-hidden="true">☑</span>
            <div>
              <p className="font-mono text-sm text-white mb-1 tracking-wide">
                {offer.guarantee.headline}
              </p>
              <p className="font-mono text-sm text-[#888]">
                {offer.guarantee.body}
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <div className="text-left">
          <h3 className="font-mono text-xs tracking-[0.3em] text-[#444] uppercase mb-6 flex items-center gap-3">
            <span className="flex-1 h-px bg-[#1e1e1e]" />
            PERGUNTAS FREQUENTES
            <span className="flex-1 h-px bg-[#1e1e1e]" />
          </h3>

          <div>
            {offer.faq.map((item, i) => (
              <FaqItem
                key={i}
                question={item.question}
                answer={item.answer}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Final CTA repeat */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <CtaButton
            label={offer.cta.label}
            href={offer.cta.href}
            size="lg"
          />
        </motion.div>
      </div>

      {/* Bottom red bar */}
      <div className="w-full h-[2px] bg-[#CC0000]/40" />
    </section>
  )
}
```

- [ ] **Step 2: Adicionar ao page.tsx e testar**

```tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { CurriculumSection } from '@/components/sections/CurriculumSection'
import { AuthorSection } from '@/components/sections/AuthorSection'
import { OfferSection } from '@/components/sections/OfferSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
      <CurriculumSection />
      <AuthorSection />
      <OfferSection />
    </>
  )
}
```

Verificar:
- [ ] Preço `R$ 247` enorme e vermelho
- [ ] CTA com glow no hover
- [ ] FAQ accordion abre/fecha com animação suave
- [ ] Bloco de garantia limpo e direto
- [ ] CTA repetido no final

- [ ] **Step 3: Commit**

```bash
git add components/sections/OfferSection.tsx app/page.tsx
git commit -m "feat: OfferSection with price block, animated FAQ accordion, dual CTAs"
```

---

## Task 10: Page Assembly + layout.tsx + SEO

**Files:**
- Modify: `app/page.tsx` (final)
- Modify: `app/layout.tsx`

- [ ] **Step 1: Escrever app/layout.tsx final**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WMC2 — Weapons of Mass Construction 2 | Método Saizen',
  description:
    'O curso técnico do MrSaizen sobre a nova fase do Método Saizen. Prescrição de treino avançado com critério, lógica e aplicação prática.',
  openGraph: {
    title: 'WMC2 — Weapons of Mass Construction 2',
    description:
      'A nova etapa do Método Saizen. Prescrição avançada com frequência, perfil de resistência e neuromechanical matching.',
    images: [{ url: '/assets/og-wmc2.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WMC2 — Weapons of Mass Construction 2',
    description: 'A nova etapa do Método Saizen.',
    images: ['/assets/og-wmc2.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Escrever app/page.tsx final com barrel imports**

```tsx
// app/page.tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { CurriculumSection } from '@/components/sections/CurriculumSection'
import { AuthorSection } from '@/components/sections/AuthorSection'
import { OfferSection } from '@/components/sections/OfferSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSolutionSection />
      <CurriculumSection />
      <AuthorSection />
      <OfferSection />
    </main>
  )
}
```

- [ ] **Step 3: Criar barrel export para seções**

Criar `components/sections/index.ts`:

```typescript
export { HeroSection } from './HeroSection'
export { ProblemSolutionSection } from './ProblemSolutionSection'
export { CurriculumSection } from './CurriculumSection'
export { AuthorSection } from './AuthorSection'
export { OfferSection } from './OfferSection'
```

- [ ] **Step 4: Testar build de produção**

```bash
npm run build
```

Esperado: build sem erros. Verificar warnings TypeScript e corrigir se houver.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/page.tsx components/sections/index.ts
git commit -m "feat: page assembly, layout with SEO meta tags, production build verified"
```

---

## Task 11: VSL + Assets Finais

**Files:**
- Modify: `public/assets/` (adicionar arquivos)

- [ ] **Step 1: Converter VSL de MOV para MP4**

Requer `ffmpeg` instalado. Se não estiver instalado:
```bash
# Windows (via Chocolatey)
choco install ffmpeg
# ou via Scoop
scoop install ffmpeg
```

Converter:
```bash
ffmpeg -i "C:/Users/fnant/Projects/sale_page_wmc2/references/VSL.MOV" \
  -c:v libx264 -crf 23 -preset medium \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  "C:/Users/fnant/Projects/sale_page_wmc2/public/assets/vsl.mp4"
```

Esperado: arquivo `public/assets/vsl.mp4` gerado com qualidade adequada para web.

- [ ] **Step 2: Copiar logo WMC2 para assets públicos**

```bash
cp "C:/Users/fnant/Projects/sale_page_wmc2/references/feee2561-c379-45d7-b5be-56df22e2a73a.png" \
   "C:/Users/fnant/Projects/sale_page_wmc2/public/assets/logo-wmc2.png"
```

- [ ] **Step 3: Verificar que vídeo carrega no browser**

Rodar `npm run dev` e navegar até `http://localhost:3000`. Verificar que o player de vídeo exibe e reproduz a VSL.

- [ ] **Step 4: Commit**

```bash
git add public/assets/
git commit -m "feat: add VSL mp4, logo WMC2 to public assets"
```

---

## Task 12: Polish Final + Verificação

**Files:**
- Modify: todos os section components (ajustes menores)

> **Antes de finalizar:** invocar `impeccable:impeccable` na página completa para auditoria de design e `superpowers:verification-before-completion` para verificar o build.

- [ ] **Step 1: Rodar página completa e fazer checklist visual**

```bash
npm run dev
```

Verificar em `http://localhost:3000`:
- [ ] Hero: logo WMC2 enorme, glitch ativo, error windows visíveis no desktop
- [ ] Hero: VSL carrega e reproduz
- [ ] Hero: CTA botão com glow no hover
- [ ] Seção 2: animações fade-up no scroll
- [ ] Seção 2: duas colunas no desktop, uma no mobile
- [ ] Seção 3: modules list com hover state
- [ ] Seção 3: error window de bônus com barra vermelha
- [ ] Seção 4: foto placeholder com corner brackets
- [ ] Seção 4: badge estilo carimbo
- [ ] Seção 5: preço enorme em vermelho
- [ ] Seção 5: FAQ accordion abre/fecha
- [ ] Paleta exclusiva preto + branco + vermelho em toda a página
- [ ] Nenhum texto de copy com clichê fitness

- [ ] **Step 2: Testar responsividade mobile — PRIORIDADE**

Abrir DevTools → viewport 375px (iPhone SE). Esta é a tela de referência principal:
- [ ] Hero: logo WMC2 legível e impactante em 375px
- [ ] Hero: VSL ocupa 100% da largura, aspect-ratio 16/9 mantido
- [ ] Hero: CTA botão tem pelo menos 48px de altura (touch target)
- [ ] Headlines: `clamp()` garante leitura confortável sem overflow
- [ ] Seções 2–4: colunas empilhadas verticalmente (1 coluna)
- [ ] Error windows: ocultas no hero mobile (não ocupam espaço)
- [ ] Padding horizontal mínimo de 16px em todos os lados
- [ ] FAQ: itens tocáveis com área mínima de 44px
- [ ] Textos não transbordam para fora do viewport
- [ ] Scroll suave, sem elementos com `position: fixed` que bloqueiem conteúdo

Testar também em 430px (iPhone 14 Pro Max) para garantir que não quebra em telas maiores de mobile.

- [ ] **Step 3: Build de produção final**

```bash
npm run build && npm run start
```

Acessar `http://localhost:3000` no modo produção e verificar ausência de erros no console.

- [ ] **Step 4: Substituir KIWIFY_URL_AQUI**

Quando a URL do Kiwify estiver disponível, editar `content/content.ts`:

```typescript
// Linha 1
export const KIWIFY_URL = 'https://pay.kiwify.com.br/SEU-LINK-AQUI'
```

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "feat: WMC2 sales page — complete implementation with all 5 sections"
```

---

## Checklist de Spec Coverage

| Requisito do spec | Task que implementa |
|-------------------|---------------------|
| Next.js + TypeScript + Tailwind | Task 1 |
| Design tokens preto/branco/vermelho | Task 2 |
| Paleta exclusiva sem outros acentos | Task 2 |
| Anton + Source Code Pro fonts | Task 2 |
| Halftone e noise texture | Task 2 |
| Glitch keyframes | Task 2 |
| Content centralizado em content.ts | Task 3 |
| Nenhuma copy hardcoded em componente | Task 3 |
| ErrorWindow reutilizável | Task 4 |
| CtaButton com glow e Kiwify link | Task 4 |
| SectionDivider via clip-path | Task 4 |
| SystemLabel monospace | Task 4 |
| Seção 01 — Hero + VSL + CTA | Task 5 |
| Error windows flutuantes no hero | Task 5 |
| Seção 02 — Problema + Solução | Task 6 |
| Seção 03 — Currículo + Bônus | Task 7 |
| Seção 04 — MrSaizen | Task 8 |
| Foto placeholder P&B | Task 8 |
| Badge Saizen Squad CSS | Task 8 |
| Seção 05 — Oferta + FAQ + Garantia | Task 9 |
| FAQ accordion animado | Task 9 |
| Framer Motion scroll animations | Tasks 5–9 |
| Mobile-first responsivo | Tasks 5–9 |
| Error windows ocultas no mobile | Task 5 |
| SEO meta tags | Task 10 |
| VSL convertida para MP4 | Task 11 |
| KIWIFY_URL_AQUI placeholder | Tasks 3, 12 |
| impeccable + frontend-design por seção | Tasks 4–9 (nota no header) |
