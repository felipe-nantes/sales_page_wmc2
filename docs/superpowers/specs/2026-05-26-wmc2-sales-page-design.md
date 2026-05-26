# WMC2 — Sales Page Design Spec

**Data:** 2026-05-26  
**Produto:** WMC2 — Weapons of Mass Construction 2  
**Status:** Aprovado

---

## 1. Visão Geral

Página de vendas única (single-scroll) para o curso técnico WMC2 do MrSaizen. O objetivo é converter visitantes qualificados — treinadores, coaches, personais, estudantes de Ed. Física e praticantes avançados — em compradores via Kiwify.

A página **não** tenta vender para iniciantes nem usa linguagem genérica de fitness. A conversão acontece por autoridade, método, prova e contraste.

---

## 2. Stack Técnica

- **Framework:** Next.js (App Router)
- **Estilização:** Tailwind CSS
- **Linguagem:** TypeScript
- **Deploy:** Vercel (ou qualquer host estático compatível com Next.js)
- **Checkout:** Kiwify — link externo nos botões CTA
- **VSL:** Arquivo em `references/VSL.MOV` — **deve ser convertido para `.mp4`** antes do embed (`.MOV` não tem suporte universal em browsers). Alternativa: hospedar no YouTube/Vimeo (não listado) e usar iframe. A implementação usa `<video>` HTML5 com o `.mp4` convertido.
- **Assets:** Logo WMC2 + imagens de referência em `/references`

---

## 3. Identidade Visual

### Paleta de Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#0a0a0a` | Fundo base da página |
| `--color-bg-alt` | `#111111` | Fundo de seções alternadas |
| `--color-red` | `#CC0000` | Acento principal, CTAs, bordas de destaque |
| `--color-red-dark` | `#990000` | Hover states, sombras vermelhas |
| `--color-white` | `#F0F0F0` | Texto principal |
| `--color-gray` | `#888888` | Texto secundário, labels |
| `--color-dark-gray` | `#333333` | Bordas sutis, separadores |

> Paleta exclusiva: **preto + branco + vermelho**. Nenhuma outra cor de acento é permitida.

### Tipografia

| Uso | Fonte | Peso |
|-----|-------|------|
| Headlines de impacto | `Impact` ou `Anton` (Google Fonts) | 900 |
| Copy do corpo | `Courier New` / `Source Code Pro` | 400–700 |
| Labels de sistema | `Courier New` monospace | 400, all-caps |

### Elementos Visuais Recorrentes

- **Halftone dots:** `radial-gradient` de pontos brancos/vermelhos sobre fundo preto
- **Noise/grunge texture:** overlay de ruído sutil em pseudo-element `::before`
- **Error windows:** componente `<ErrorWindow>` reutilizável — moldura cinza estilo Win98, barra de título vermelha, ícone `⚠` ou caveira pixel
- **Cortes diagonais:** `clip-path: polygon(...)` ou `transform: skewY(-2deg)` entre seções
- **Bordas vermelhas:** `border-left: 3px solid #CC0000` em labels e destaques
- **Comic halftone:** ilustrações em P&B com dots para simular quadrinhos (imagens das referências)

---

## 4. Arquitetura de Arquivos

```
sale_page_wmc2/
├── app/
│   ├── layout.tsx          # Meta tags, fontes, global CSS
│   ├── page.tsx            # Composição das 5 seções
│   └── globals.css         # CSS variables + reset + utilities
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSolutionSection.tsx
│   │   ├── CurriculumSection.tsx
│   │   ├── AuthorSection.tsx
│   │   └── OfferSection.tsx
│   └── ui/
│       ├── ErrorWindow.tsx     # Componente de janela de erro reutilizável
│       ├── CtaButton.tsx       # Botão CTA principal (link Kiwify)
│       ├── SectionDivider.tsx  # Corte diagonal entre seções
│       └── SystemLabel.tsx     # Label estilo "// PROTOCOLO ATIVO"
├── content/
│   └── content.ts          # TODA a copy da página centralizada aqui
└── public/
    └── assets/
        ├── logo-wmc2.png
        └── saizen-badge.png
```

---

## 5. Content Layer — `content/content.ts`

Todo texto da página vive neste arquivo. Os componentes importam daqui. Nenhuma string de copy é hardcoded dentro de componente.

```typescript
export const content = {
  hero: {
    systemLabel: '// NOVO PROTOCOLO — 2026',
    title: 'WMC2',
    subtitle: 'WEAPONS OF MASS CONSTRUCTION 2',
    cta: {
      label: 'ENTRAR NO PROTOCOLO',
      price: 'R$247',
      sub: 'Lançamento 05/06 · Acesso pelo grupo',
      href: 'KIWIFY_URL_AQUI',
    },
  },

  problem: {
    systemLabel: '// O PROBLEMA',
    headline: 'VOCÊ AINDA MONTA TREINO\nPOR COLAGEM?',
    body: [
      'Pega um pouco de um método. Um pouco de outro.',
      'Um pouco do que apareceu no Instagram essa semana.',
      'Mistura tudo e chama de metodologia.',
      'O problema não é falta de informação.',
      'É falta de eixo lógico.',
      'Treino sem critério é exercício físico.',
      'Não é prescrição.',
    ],
  },

  solution: {
    systemLabel: '// O QUE É O WMC2',
    headline: 'NÃO É TREINO PRONTO. É MÉTODO.',
    body: [
      'O WMC2 ensina a lógica por trás do Método Saizen.',
      'Como o Saizen pensa, analisa e constrói protocolos.',
      'Frequência. Perfil de resistência.',
      'Neuromechanical matching. Escolha de exercício com critério.',
      'A nova fase do método — atualizada desde 2023.',
    ],
  },

  curriculum: {
    systemLabel: '// CONTEÚDO DO PROTOCOLO',
    headline: '7 AULAS. 1 HORA. SEM ENROLAÇÃO.',
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
      'Slides das aulas em PDF',
      'Worksheet de montagem de protocolo',
      'Checklist de avaliação inicial',
      'Grupo de estudos no WhatsApp',
      'Ebook grátis: volume de treino',
      'FAQ técnico + guia de implementação',
      'Garantia de 7 dias',
    ],
  },

  author: {
    systemLabel: '// MR.SAIZEN',
    headline: 'TREINADOR. NÃO INFLUENCER.',
    body: [
      'Mais de 30 pro cards.',
      'Treinador da atual campeã do Mr. Olympia.',
      'WMC1: 1.700 cópias. R$400.000 em vendas.',
      'O Método Saizen tem histórico de aplicação real —',
      'não de teoria de internet.',
      'O WMC2 é a atualização do que esse trabalho',
      'produziu desde 2023.',
    ],
  },

  offer: {
    systemLabel: '// ACESSO AO PROTOCOLO',
    headline: 'WMC2 — WEAPONS OF MASS CONSTRUCTION 2',
    price: 'R$ 247',
    priceLabel: 'Pré-lançamento · Lançamento 05/06',
    cta: {
      label: 'ENTRAR NO PROTOCOLO →',
      href: 'KIWIFY_URL_AQUI',
    },
    accessNote: 'Acesso liberado pelo grupo de WhatsApp.',
    guarantee: {
      headline: '7 dias de garantia.',
      body: 'Se não servir, 100% devolvido. Sem conversa.',
    },
    faq: [
      {
        question: 'É só mais um curso?',
        answer: 'Não. É um estudo técnico sobre o Método Saizen atualizado.',
      },
      {
        question: 'O curso é muito curto?',
        answer: '1 hora concentrada vale mais que 10 horas de enrolação.',
      },
      {
        question: 'Serve sem ser atleta de competição?',
        answer: 'Se você prescreve, estuda ou aplica treino avançado, serve.',
      },
      {
        question: 'Qual a diferença para o WMC1?',
        answer: 'WMC2 é a nova fase do método, com mudanças de 2023 para cá.',
      },
      {
        question: 'Não é melhor pegar de vários métodos?',
        answer: 'Essa crença é exatamente o que o curso combate.',
      },
    ],
  },
}
```

---

## 6. Seções da Página

### Seção 01 — Hero

**Objetivo:** Impacto imediato + fazer o visitante apertar play na VSL.

**Layout:**
- Fundo: preto com noise texture + halftone sutil
- Error windows flutuando (absolute positioned, decorativas): `SYSTEM WARNING.exe` e `ACCESS GRANTED`
- Logo WMC2 centralizado, enorme (fonte Impact/Anton, vermelho distressed)
- Label acima do logo: `// NOVO PROTOCOLO — 2025` (monospace, vermelho, small)
- Subtitle abaixo do logo: `WEAPONS OF MASS CONSTRUCTION 2` (monospace, cinza, tracking largo)
- VSL: player de vídeo full-width (max 900px), com poster frame preto
- CTA: botão vermelho grande abaixo do vídeo, com preço e sublabel

**Componente:** `HeroSection.tsx`

---

### Seção 02 — Problema + Solução

**Objetivo:** Criar tensão (problema) e apresentar o WMC2 como o eixo lógico correto (solução).

**Layout:**
- Corte diagonal vermelho separando do hero
- Dois blocos lado a lado (em mobile: empilhados)
- **Bloco Problema (esquerdo):** fundo escuro com halftone, tipografia pesada, copy linha a linha
- **Bloco Solução (direito):** fundo levemente mais claro, label de sistema, copy técnica

**Componente:** `ProblemSolutionSection.tsx`

---

### Seção 03 — O Que Você Recebe

**Objetivo:** Mostrar o currículo e o arsenal de bônus — o que está dentro do protocolo.

**Layout:**
- Dois blocos lado a lado (em mobile: empilhados)
- **Currículo (esquerdo):** lista de 7 módulos com numeração militar (`01`, `02`...), bordas vermelhas finas
- **Arsenal/Bônus (direito):** cards em estilo error window, cada bônus com ícone pixel/monospace e label

**Componente:** `CurriculumSection.tsx`

---

### Seção 04 — Quem Ensina

**Objetivo:** Estabelecer autoridade do MrSaizen de forma sóbria — sem parecer vendedor.

**Layout:**
- Seção escura limpa (sem texturas pesadas)
- Foto do MrSaizen em P&B + badge "GUIS APPROVED SAIZEN SQUAD" estilo carimbo
- Copy à direita: headline forte + credenciais em lista
- Sem floreios visuais excessivos — a autoridade fala por si

**Componente:** `AuthorSection.tsx`

**Nota:** Foto do MrSaizen não está disponível nos assets atuais — placeholder até o asset ser fornecido.

---

### Seção 05 — Oferta + CTA

**Objetivo:** Converter. Remover objeções finais e fechar a venda.

**Layout:**
- Painel de impacto — blocos vermelhos como fundo parcial, espelha o hero
- Preço `R$ 247` em destaque (fonte Impact, grande)
- Label `Pré-lançamento · Lançamento 05/06`
- CTA principal vermelho (link Kiwify)
- Nota de acesso: "Acesso liberado pelo grupo de WhatsApp"
- Bloco de garantia: simples, direto, 2 linhas
- FAQ colapsável: accordion estilo terminal (`>` como indicador de abertura)

**Componente:** `OfferSection.tsx`

---

## 7. Componentes UI Reutilizáveis

### `ErrorWindow`
Janela de erro estilo Windows 98. Props: `title`, `message`, `variant` (`warning` | `granted` | `alert`). Usada decorativamente no hero e nos bônus.

### `CtaButton`
Botão principal de compra. Props: `label`, `href`, `price` (opcional). Sempre abre link Kiwify em nova aba. Vermelho sólido, hover com brilho.

### `SectionDivider`
Corte diagonal entre seções via `clip-path: polygon(...)`. Props: `direction` (`left` | `right`), `color` (padrão `#CC0000`). Usa `clip-path` — não `skewY` — para não afetar o layout dos elementos filhos.

### `SystemLabel`
Label monospace com `// ` prefix e borda esquerda vermelha. Props: `text`.

---

## 8. Responsividade — Mobile-First

> **A grande maioria dos usuários acessa pelo celular.** Todo CSS é escrito com base mobile (sem prefixo Tailwind) e usa `md:` apenas para ajustar no desktop. Nunca o contrário.

**Viewport de referência principal:** 375px (iPhone SE / base)

| Elemento | Mobile (375px) | Desktop (1024px+) |
|----------|----------------|-------------------|
| Layout | 1 coluna | 2 colunas (`md:grid-cols-2`) |
| Padding horizontal | `px-4` (16px) | `px-8` ou centrado com `max-w` |
| Logo WMC2 | `clamp(4rem, 16vw, 8rem)` | `clamp(6rem, 18vw, 14rem)` |
| Headlines | `clamp(2rem, 7vw, 2.5rem)` | `clamp(2.5rem, 5vw, 3.5rem)` |
| Botão CTA | 100% da largura, min-height 56px | auto width |
| VSL | `aspect-ratio: 16/9`, 100% largura | max-width 900px |
| Error windows | `hidden` | `block` com `md:block` |
| Padding vertical | `py-14` | `py-20 md:py-28` |

**Touch targets:** todos os elementos interativos (botões, FAQ items) devem ter área mínima de 44×44px.

---

## 9. SEO & Meta

```html
<title>WMC2 — Weapons of Mass Construction 2 | Método Saizen</title>
<meta name="description" content="O curso técnico do MrSaizen sobre a nova fase do Método Saizen. Prescrição de treino avançado com critério, lógica e aplicação prática." />
<meta property="og:title" content="WMC2 — Weapons of Mass Construction 2" />
<meta property="og:image" content="/assets/og-wmc2.jpg" />
```

---

## 10. Restrições & Regras de Copy

- Nenhuma promessa de resultado físico garantido
- Nenhuma linguagem de urgência artificial ("carrinho fechando", "última chance")
- Nenhuma menção a anabolizantes, exames ou condutas médicas
- Sem ataques nominais a pessoas — apenas a ideias e comportamentos de mercado
- Urgência válida: acesso pelo grupo, ebook grátis, lançamento 05/06, custo de continuar sem metodologia

---

## 11. Dependências Pendentes

| Item | Status |
|------|--------|
| URL definitiva do Kiwify | `KIWIFY_URL_AQUI` — substituir antes do deploy |
| Foto do MrSaizen | Não fornecida — placeholder P&B |
| Badge Saizen Squad em PNG | Não fornecida — recriar com CSS ou aguardar asset |
| VSL em MP4 | Converter `VSL.MOV` → `VSL.mp4` antes de colocar em `/public/assets/` |
| OG image para redes sociais | Não criada |
