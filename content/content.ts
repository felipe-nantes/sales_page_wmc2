export const KIWIFY_URL = process.env.NEXT_PUBLIC_KIWIFY_URL ?? '#'

export const content = {
  hero: {
    systemLabel: '// MÉTODO ATUALIZADO — 2026',
    title: 'WMC2',
    titleGlitch: 'WMC2',
    subtitle: 'A NOVA FASE DO MÉTODO SAIZEN',
    errorWindows: [
      { title: 'SYSTEM WARNING.exe', message: 'TREINO SEM CRITÉRIO DETECTADO...', variant: 'warning' as const },
      { title: 'ACCESS GRANTED', message: 'GURIZADA — ACESSO LIBERADO', variant: 'granted' as const },
    ],
    cta: {
      label: 'ACESSAR O WMC2',
      sub: 'Lançamento 05/06 · prioridade para quem está no grupo',
      href: KIWIFY_URL,
    },
  },

  problem: {
    systemLabel: '// O ERRO DA GURIZADA',
    headline: 'TU AINDA COPIA\nE CHAMA DE MÉTODO?',
    lines: [
      'Pega um pedaço de um método.',
      'Copia outro pedaço de alguém famoso.',
      'Salva mais um post e tenta encaixar no treino.',
      'Mistura tudo e chama de metodologia.',
      '',
      'O problema não é falta de informação, guri.',
      'É falta de critério pra decidir.',
      '',
      'Treino sem lógica é só esforço jogado fora.',
      'Não é prescrição de verdade.',
    ],
  },

  solution: {
    systemLabel: '// O QUE O WMC2 ENTREGA',
    headline: 'NÃO É RECEITA PRONTA.\nÉ RACIOCÍNIO.',
    lines: [
      'O WMC2 mostra a lógica por trás do Método Saizen.',
      'Como o Saizen pensa, analisa e monta um protocolo de verdade.',
      '',
      'Frequência. Perfil de resistência.',
      'Neuromechanical matching.',
      'Escolha de exercício sem achismo.',
      '',
      'A nova fase do método — atualizada depois de 2023.',
    ],
  },

  curriculum: {
    systemLabel: '// O QUE TEM DENTRO',
    headline: '7 AULAS. 1 HORA.\nSEM PAPINHO FITNESS.',
    disclaimer: 'É curto porque é direto. Não porque é fraco.',
    modules: [
      { num: '01', title: 'O que mudou no Método Saizen depois de 2023' },
      { num: '02', title: 'Dogmas que fazem a gurizada prescrever errado' },
      { num: '03', title: 'Frequência de treino sem achismo' },
      { num: '04', title: 'Perfil de resistência: o que separa escolha de chute' },
      { num: '05', title: 'Armas novas testadas na prática' },
      { num: '06', title: 'Neuromechanical matching aplicado de verdade' },
      { num: '07', title: 'Montando um protocolo com critério, não com fé' },
    ],
  },

  bonuses: {
    systemLabel: '// ACCESS GRANTED — MATERIAL DA GURIZADA',
    items: [
      { icon: '▸', label: 'Slides das aulas em PDF' },
      { icon: '▸', label: 'Worksheet para montar protocolo com critério' },
      { icon: '▸', label: 'Checklist para parar de avaliar no feeling' },
      { icon: '▸', label: 'Grupo de estudos com a gurizada no WhatsApp' },
      { icon: '▸', label: 'Ebook gratuito: volume de treino sem dogma' },
      { icon: '▸', label: 'FAQ técnico + guia pra aplicar sem viajar' },
      { icon: '▸', label: '7 dias de garantia. Padrão.' },
    ],
  },

  socialProof: {
    systemLabel: '// QUEM O SAIZEN TREINA',
    headline: 'RESULTADO\nNÃO É COINCIDÊNCIA.',
    sub: 'Alguns dos atletas que passaram pelo Método Saizen.',
    athletes: [
      { id: '01', name: '', achievement: '', photo: '/assets/atletas/prova_social3.png' },
      { id: '02', name: '', achievement: '', photo: '/assets/atletas/prova_social4.png' },
      { id: '03', name: '', achievement: '', photo: '/assets/atletas/prova_social5.png' },
      { id: '04', name: '', achievement: '', photo: '/assets/atletas/prova_social6.png' },
      { id: '05', name: '', achievement: '', photo: '/assets/atletas/stuart-10.png' },
      { id: '06', name: '', achievement: '', photo: '/assets/atletas/prova_12.1.png' },
      { id: '07', name: '', achievement: '', photo: '/assets/atletas/prova_12.2.png' },
      { id: '08', name: '', achievement: '', photo: '/assets/atletas/prova_12.3.png' },
      { id: '09', name: '', achievement: '', photo: '/assets/atletas/prova_12.4.png' },
      { id: '10', name: '', achievement: '', photo: '/assets/atletas/provasocial-13.png' },
      { id: '11', name: '', achievement: '', photo: '/assets/atletas/provasocial-14.png' },
      { id: '12', name: '', achievement: '', photo: '/assets/atletas/moraes-7.png' },
      { id: '13', name: '', achievement: '', photo: '/assets/atletas/dudu-11.png' },
      { id: '14', name: '', achievement: '', photo: '/assets/atletas/enzoplaster-9.png' },
      { id: '15', name: '', achievement: '', photo: '/assets/atletas/isa-6.png' },
      { id: '16', name: '', achievement: '', photo: '/assets/atletas/menegate-8.png' },
    ],
  },

  author: {
    systemLabel: '// QUEM ESTÁ POR TRÁS',
    headline: 'TREINADOR DE VERDADE.\nNÃO PERSONAGEM FITNESS.',
    lines: [
      'Mais de 30 pro cards.',
      'Treinador da atual campeã do Mr. Olympia.',
      'WMC1: 1.700 cópias. R$400.000 em vendas.',
      '',
      'O Método Saizen foi construído em aplicação real —',
      'não em post bonitinho de internet.',
      '',
      'O WMC2 é a atualização do que esse trabalho',
      'gerou depois de 2023.',
    ],
    badgeText: 'É US GURI\nSAIZEN SQUAD',
  },

  offer: {
    systemLabel: '// ENTRAR NO MÉTODO',
    headline: 'WMC2 — A NOVA FASE\nDO MÉTODO SAIZEN',
    cta: {
      label: 'ACESSAR O WMC2 →',
      href: KIWIFY_URL,
    },
    accessNote: 'Prioridade liberada para quem está no grupo de WhatsApp.',
    guarantee: {
      headline: '7 dias de garantia.',
      body: 'Entrou, viu e não fez sentido? Pede reembolso. Sem novela.',
    },
    faq: [
      {
        question: 'É só mais um curso de treino?',
        answer: 'Não. É a lógica atualizada do Método Saizen. Não tem planilha mágica, não tem receita universal e não tem papinho fitness. Tem critério de prescrição.',
      },
      {
        question: '1 hora não é pouco?',
        answer: 'Pouco é perder 10 horas ouvindo enrolação. Aqui é direto: conceito, lógica e aplicação. O valor está na clareza do método, não em empilhar aula inútil.',
      },
      {
        question: 'Serve pra quem não compete?',
        answer: 'Serve se tu prescreve, estuda ou leva treino a sério. Não é pra iniciante querendo treino pronto e mastigado. É pra quem quer entender a lógica.',
      },
      {
        question: 'Qual a diferença pro WMC1?',
        answer: 'O WMC2 é a nova fase do método. Tem armas novas, neuromechanical matching e atualização do raciocínio depois de 2023. Não é reprise. É atualização.',
      },
      {
        question: 'Não é melhor misturar vários métodos?',
        answer: 'Misturar sem critério é o que trava a gurizada. Tu acha que está estudando muito, mas só está colando pedaço de tudo. O WMC2 existe pra dar eixo lógico.',
      },
    ],
    faqHeading: 'DÚVIDAS DA GURIZADA',
  },
}
