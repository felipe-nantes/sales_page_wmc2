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
