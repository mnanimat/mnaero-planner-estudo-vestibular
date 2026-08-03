import { FrenteInfo, ExamTopicData, DidacticSummary, VideoLesson, Flashcard, AgendaTopic } from '../types';

export const INITIAL_FRENTES: FrenteInfo[] = [
  // MATEMÁTICA
  {
    id: 'MAT-1',
    subject: 'Matemática',
    frenteNumber: 1,
    name: 'MAT-1: Conjuntos & Funções',
    defaultIncidence: 5,
    phase: 'ambas',
    topics: [
      '1. Teoria elementar dos conjuntos, subconjuntos, conjuntos numéricos, números primos, T.F.A., divisibilidade, indução e princípio das gavetas',
      '3. Funções (injetoras, sobrejetoras, bijetoras, pares, ímpares, periódicas, compostas e inversas)',
      '3b. Funções afins, quadráticas, modulares, exponenciais e logarítmicas; equações e inequações'
    ]
  },
  {
    id: 'MAT-2',
    subject: 'Matemática',
    frenteNumber: 2,
    name: 'MAT-2: Álgebra, Complexos & Trigonometria',
    defaultIncidence: 8,
    phase: 'ambas',
    topics: [
      '4. Trigonometria (adição e subtração de arcos, arco duplo, arco metade, transformação em produto, equações e inequações)',
      '5. Números complexos (formas algébrica e trigonométrica, raízes complexas e fórmula de Moivre)',
      '6. Polinômios e equações algébricas (fatoração, raízes, Teorema Fundamental da Álgebra, Relações de Girard e equações recíprocas)'
    ]
  },
  {
    id: 'MAT-3',
    subject: 'Matemática',
    frenteNumber: 3,
    name: 'MAT-3: Sequências, Combinatória & Matrizes',
    defaultIncidence: 7,
    phase: 'ambas',
    topics: [
      '2. Sequências, lei de formação, recorrência, P.A., P.G. e soma dos termos de PG infinita',
      '7. Análise combinatória, permutações, combinações, Binômio de Newton e Probabilidade condicional',
      '8. Matrizes, Determinantes e Sistemas Lineares (matriz inversa, cálculo de determinantes e discussão de sistemas)'
    ]
  },
  {
    id: 'MAT-4',
    subject: 'Matemática',
    frenteNumber: 4,
    name: 'MAT-4: Geometrias (Plana, Analítica, Espacial)',
    defaultIncidence: 10,
    phase: 'ambas',
    topics: [
      '9. Geometria plana (polígonos, circunferência, círculo, congruência, semelhança e relações métricas)',
      '10. Geometria analítica plana (reta, circunferência, cônicas: elipse, hipérbole e parábola, e lugares geométricos)',
      '11. Geometria espacial (retas e planos, poliedros, prismas, pirâmides, troncos, cilindros, cones, esferas, áreas e volumes)'
    ]
  },

  // FÍSICA
  {
    id: 'FÍS-1',
    subject: 'Física',
    frenteNumber: 1,
    name: 'FÍS-1: Medidas, Cinemática & Vetores',
    defaultIncidence: 10,
    phase: 'ambas',
    topics: [
      '1. Noções sobre medidas físicas: algarismos significativos, erro, incerteza, análise dimensional, vetores e Sistema Internacional (SI)',
      '2. Cinemática escalar e vetorial da partícula: velocidade, aceleração, estudo gráfico, projéteis e movimento circular'
    ]
  },
  {
    id: 'FÍS-2',
    subject: 'Física',
    frenteNumber: 2,
    name: 'FÍS-2: Dinâmica, Leis de Newton & Energia',
    defaultIncidence: 10,
    phase: 'ambas',
    topics: [
      '3. Conceito de força, equilíbrio da partícula, momento de uma força e equilíbrio de corpo rígido',
      '4. Leis fundamentais da Mecânica: dinâmica retilínea e circular, força centrípeta/centrífuga, impulso, quantidade de movimento e centro de massa',
      '5. Trabalho e energia cinética/potencial, conservação da energia mecânica, forças conservativas e dissipativas'
    ]
  },
  {
    id: 'FÍS-3',
    subject: 'Física',
    frenteNumber: 3,
    name: 'FÍS-3: Gravitação, MHS & Hidrodinâmica',
    defaultIncidence: 8,
    phase: 'ambas',
    topics: [
      '6. Gravitação universal: campo gravitacional e Leis de Kepler do movimento planetário',
      '7. Movimentos periódicos: Movimento Harmônico Simples (MHS), superposição de MHS e pêndulo simples',
      '8. Estudo dos fluidos em equilíbrio (Arquimedes e Pascal) e Fluidomecânica (vazão, equação de continuidade, Bernoulli e Torricelli)'
    ]
  },
  {
    id: 'FÍS-4',
    subject: 'Física',
    frenteNumber: 4,
    name: 'FÍS-4: Termologia, Ondas & Óptica',
    defaultIncidence: 8,
    phase: 'ambas',
    topics: [
      '9. Termologia: escalas termométricas, dilatação, gases perfeitos (Clapeyron), teoria cinética, calorimetria e 1°/2° Princípios da Termodinâmica',
      '10. Ondas e Som: cordas vibrantes, tubos sonoros e Efeito Doppler',
      '11. Óptica geométrica: reflexão, refração, espelhos, lâminas, prismas, dispersão e lentes delgadas',
      '12. Natureza ondulatória da luz: interferência (Young), difração, polarização e modelos ondulatório/corpuscular'
    ]
  },
  {
    id: 'FÍS-5',
    subject: 'Física',
    frenteNumber: 5,
    name: 'FÍS-5: Eletromagnetismo & Física Moderna',
    defaultIncidence: 10,
    phase: 'ambas',
    topics: [
      '13. Eletrostática: cargas elétricas, Lei de Coulomb, campo elétrico, potencial eletrostático e capacitores',
      '14. Eletrodinâmica: corrente, Lei de Ohm, circuitos, efeito Joule, Leis de Kirchhoff, Ponte de Wheatstone e geradores',
      '15. Campo magnético, ímãs, força magnética sobre cargas/correntes, bobinas e interação entre correntes',
      '16. Indução eletromagnética: Lei de Faraday, Lei de Lenz, indutância e ondas eletromagnéticas',
      '17. Física Moderna: efeito fotoelétrico, radiação do corpo negro, átomo de Bohr, princípio da incerteza e Relatividade Restrita (Lorentz, dilatação do tempo, equivalência massa-energia)'
    ]
  },

  // QUÍMICA
  {
    id: 'QUÍ-1',
    subject: 'Química',
    frenteNumber: 1,
    name: 'QUÍ-1: Introdução, Matéria & Misturas',
    defaultIncidence: 5,
    phase: 'ambas',
    topics: [
      '1. Objetivos e ramos da Química; método científico',
      '2. Matéria: propriedades dos estados sólido, líquido e gasoso; materiais amorfos e cristalinos',
      '3. Misturas heterogêneas, coloides e soluções: identificação e métodos de separação de fases',
      '4. Elementos químicos, tabela periódica, substâncias simples e compostas'
    ]
  },
  {
    id: 'QUÍ-2',
    subject: 'Química',
    frenteNumber: 2,
    name: 'QUÍ-2: Estrutura Atômica, Ligações & Soluções',
    defaultIncidence: 8,
    phase: 'ambas',
    topics: [
      '5. Átomos e moléculas: partículas fundamentais, modelos atômicos, massas atômicas e radioatividade',
      '6. Bases estequiométricas: leis dos gases, princípio de Avogadro e o conceito geral de mol',
      '7. Ligações químicas (iônica, covalente, metálica), geometria, polaridade e forças intermoleculares',
      '8. Soluções: maneiras de expressar concentrações, solubilidade e propriedades coligativas'
    ]
  },
  {
    id: 'QUÍ-3',
    subject: 'Química',
    frenteNumber: 3,
    name: 'QUÍ-3: Reações, Estequiometria & Físico-Química',
    defaultIncidence: 10,
    phase: 'ambas',
    topics: [
      '9. Reações químicas, equação química e cálculos estequiométricos',
      '10. Equilíbrio químico: constantes de equilíbrio e princípio de Le Chatelier',
      '11. Termoquímica: calor, trabalho, entalpia, entropia, energia livre de Gibbs e Lei de Hess',
      '12. Cinética química: ordem de reação, catalisadores e energia de ativação'
    ]
  },
  {
    id: 'QUÍ-4',
    subject: 'Química',
    frenteNumber: 4,
    name: 'QUÍ-4: Inorgânica & Eletroquímica',
    defaultIncidence: 8,
    phase: 'ambas',
    topics: [
      '13. Ácidos, bases, sais e óxidos: conceitos, nomenclatura, classificação e processos de obtenção',
      '14. Eletroquímica: pilhas, potenciais de eletrodo, Lei de Nernst, Leis de Faraday, corrosão e eletrólise'
    ]
  },
  {
    id: 'QUÍ-5',
    subject: 'Química',
    frenteNumber: 5,
    name: 'QUÍ-5: Química Orgânica, Bioquímica, Polímeros & Ambiental',
    defaultIncidence: 9,
    phase: 'ambas',
    topics: [
      '15. Química orgânica: funções orgânicas, nomenclatura, propriedades, reações e isomeria (plana e óptica/quiralidade)',
      '16. Bioquímica: aminoácidos, proteínas, carboidratos, lipídeos e ácidos nucleicos',
      '17. Polímeros: monômeros, correlação estrutura-propriedades e aplicações',
      '18. Química ambiental: ciclos do carbono, água, oxigênio e nitrogênio; poluição hídrica e atmosférica'
    ]
  },

  // PORTUGUÊS
  {
    id: 'PORT-1',
    subject: 'Português',
    frenteNumber: 1,
    name: 'PORT-1: Morfologia, Sintaxe, Semântica & Estilística',
    defaultIncidence: 10,
    phase: '1a',
    topics: [
      '1. Morfologia: estrutura das palavras (morfemas, radicais, neologismos) e classificação/flexão das palavras',
      '2. Sintaxe: termos da oração, período simples e composto, pontuação, concordância, regência, crase e colocação pronominal',
      '3. Semântica: sinonímia, antonímia, homonímia, paronímia, polissemia, ambiguidade e intertextualidade',
      '4. Estilística: figuras de palavras, de pensamento, de construção e de som'
    ]
  },
  {
    id: 'PORT-2',
    subject: 'Português',
    frenteNumber: 2,
    name: 'PORT-2: Leitura, Interpretação & Literatura Brasileira/Portuguesa',
    defaultIncidence: 8,
    phase: '1a',
    topics: [
      '5. Leitura e interpretação: gêneros textuais, textos literários/não-literários, níveis de linguagem, pressupostos e implícitos',
      '6A. Literatura Brasileira: Barroco, Arcadismo, Romantismo (3 gerações), Realismo-Naturalismo, Parnasianismo, Simbolismo, Pré-Modernismo, Modernismo e Contemporânea',
      '6B. Literatura Portuguesa: Trovadorismo, Humanismo, Classicismo, Barroco, Neoclassicismo, Romantismo, Realismo, Simbolismo, Modernismo e Contemporânea'
    ]
  },

  // INGLÊS
  {
    id: 'ING-1',
    subject: 'Inglês',
    frenteNumber: 1,
    name: 'ING-1: Reading Comprehension & Vocabulário Acadêmico',
    defaultIncidence: 12,
    phase: '1a',
    topics: [
      'Compreensão global e detalhada de textos autênticos das mais variadas fontes em língua inglesa',
      'Predição de conteúdos, inferência de significados e reconhecimento de vocabulário acadêmico em contexto',
      'Sintetização das ideias principais, objetivo do autor e relações de sentido no texto'
    ]
  },
  {
    id: 'ING-2',
    subject: 'Inglês',
    frenteNumber: 2,
    name: 'ING-2: Gramática Essencial, Conectivos & Tiras Cômicas',
    defaultIncidence: 8,
    phase: '1a',
    topics: [
      'Estruturas gramaticais essenciais (modal verbs, passive voice, conditionals)',
      'Conectivos de oposição, contraste e concessão (however, nevertheless, in spite of)',
      'Expressões idiomáticas, frases isoladas e interpretação de tiras cômicas'
    ]
  },

  // REDAÇÃO ITA
  {
    id: 'RED-1',
    subject: 'Redação',
    frenteNumber: 1,
    name: 'RED-1: Redação Dissertativa-Argumentativa ITA (2ª Fase)',
    defaultIncidence: 15,
    phase: '2a',
    topics: [
      'Texto dissertativo-argumentativo sobre tema contemporâneo (25 a 35 linhas)',
      'Raciocínio lógico profundo sem fórmulas prontas ou clichês formatados',
      'Grade de avaliação do ITA: Tema, Tipo de texto, Coerência, Coesão e Modalidade (norma-padrão da língua portuguesa)'
    ]
  }
];

export const EXAM_TOPICS_DATA: ExamTopicData[] = [
  // MATEMÁTICA
  { id: 'm1', subject: 'Matemática', topicName: 'Geometria Plana', questions5y: 12, freq5y: 15.38, questions10y: 27, freq10y: 14.14, frenteId: 'MAT-4', analysisNote: 'Mais de 1/3 da prova do ITA (33% somado com Espacial e Analítica).' },
  { id: 'm2', subject: 'Matemática', topicName: 'Geometria Espacial', questions5y: 9, freq5y: 11.54, questions10y: 17, freq10y: 8.90, frenteId: 'MAT-4', analysisNote: 'Constante nas 2as fases com volumes, seções planas e diedros.' },
  { id: 'm3', subject: 'Matemática', topicName: 'Geometria Analítica (reta, circunferência e cônicas)', questions5y: 9, freq5y: 11.54, questions10y: 20, freq10y: 10.47, frenteId: 'MAT-4', analysisNote: 'Muitas questões misturam com matrizes e sistemas.' },
  { id: 'm4', subject: 'Matemática', topicName: 'Números complexos', questions5y: 8, freq5y: 10.26, questions10y: 12, freq10y: 6.28, frenteId: 'MAT-2', analysisNote: 'Forma trigonométrica e raízes da unidade caem com alta frequência.' },
  { id: 'm5', subject: 'Matemática', topicName: 'Polinômios (raízes, fatoração e Girard)', questions5y: 6, freq5y: 7.69, questions10y: 14, freq10y: 7.33, frenteId: 'MAT-2', analysisNote: 'Relações de Girard aplicadas em equações de alto grau.' },
  { id: 'm6', subject: 'Matemática', topicName: 'Matrizes e determinantes', questions5y: 6, freq5y: 7.69, questions10y: 13, freq10y: 6.81, frenteId: 'MAT-3', analysisNote: 'Propriedades de determinantes e matrizes inversíveis.' },
  { id: 'm7', subject: 'Matemática', topicName: 'Progressão Aritmética e Geométrica', questions5y: 5, freq5y: 6.41, questions10y: 15, freq10y: 7.85, frenteId: 'MAT-3', analysisNote: 'PA e PG caem MUITO misturadas com geometria e funções.' },
  { id: 'm8', subject: 'Matemática', topicName: 'Trigonometria e Equações trigonométricas', questions5y: 5, freq5y: 6.41, questions10y: 16, freq10y: 8.38, frenteId: 'MAT-2', analysisNote: 'Transformações em produto e somas trigonométricas.' },
  { id: 'm9', subject: 'Matemática', topicName: 'Funções (injetoras, sobrejetoras, compostas, inversas)', questions5y: 5, freq5y: 6.41, questions10y: 9, freq10y: 4.71, frenteId: 'MAT-1', analysisNote: 'Questões conceituais exigentes de domínio e contradomínio.' },
  { id: 'm10', subject: 'Matemática', topicName: 'Análise combinatória e Probabilidade', questions5y: 5, freq5y: 6.41, questions10y: 10, freq10y: 5.24, frenteId: 'MAT-3', analysisNote: 'Probabilidade condicional e combinações com repetição.' },

  // FÍSICA
  { id: 'f1', subject: 'Física', topicName: 'Trabalho, Energia e Impulso', questions5y: 10, freq5y: 11.90, questions10y: 21, freq10y: 11.11, frenteId: 'FÍS-1', analysisNote: 'Junto com Cinemática e Ondulatória é metade da prova!' },
  { id: 'f2', subject: 'Física', topicName: 'Cinemática da partícula', questions5y: 10, freq5y: 11.90, questions10y: 25, freq10y: 13.23, frenteId: 'FÍS-2', analysisNote: 'Lançamentos oblíquos e movimentos relativos/vetoriais complexos.' },
  { id: 'f3', subject: 'Física', topicName: 'Ondas e Fenômenos Ondulatórios', questions5y: 9, freq5y: 10.71, questions10y: 18, freq10y: 9.52, frenteId: 'FÍS-5', analysisNote: 'Efeito Doppler, interferência em fendas e ressonância.' },
  { id: 'f4', subject: 'Física', topicName: 'Magnetismo e Indução', questions5y: 8, freq5y: 9.52, questions10y: 17, freq10y: 8.99, frenteId: 'FÍS-4', analysisNote: 'Força de Lorentz e Lei de Faraday-Lenz com circuitos móveis.' },
  { id: 'f5', subject: 'Física', topicName: 'Gases e Termodinâmica', questions5y: 6, freq5y: 7.14, questions10y: 13, freq10y: 6.88, frenteId: 'FÍS-5', analysisNote: 'Sempre que cai termologia no ITA, envolve dilatação e MHS.' },
  { id: 'f6', subject: 'Física', topicName: 'Leis de Newton e Aplicações', questions5y: 6, freq5y: 7.14, questions10y: 11, freq10y: 5.82, frenteId: 'FÍS-3', analysisNote: 'Sistemas acoplados com atrito estático e dinâmico.' },
  { id: 'f7', subject: 'Física', topicName: 'Eletrostática (campo, potencial e capacitores)', questions5y: 5, freq5y: 5.95, questions10y: 13, freq10y: 6.88, frenteId: 'FÍS-4', analysisNote: 'Capacitores associados e energia armazenada.' },

  // QUÍMICA
  { id: 'q1', subject: 'Química', topicName: 'Equilíbrio químico e Equilíbrios iônicos', questions5y: 12, freq5y: 14.29, questions10y: 20, freq10y: 10.20, frenteId: 'QUÍ-3', analysisNote: 'Ksp, efeito do íon comum e hidrólise salina (Top 1 no ITA).' },
  { id: 'q2', subject: 'Química', topicName: 'Soluções e titulações', questions5y: 9, freq5y: 10.71, questions10y: 17, freq10y: 8.67, frenteId: 'QUÍ-4', analysisNote: 'Titulações de neutralização e oxirredução com misturas.' },
  { id: 'q3', subject: 'Química', topicName: 'Termoquímica e termodinâmica', questions5y: 9, freq5y: 10.71, questions10y: 16, freq10y: 8.16, frenteId: 'QUÍ-3', analysisNote: 'Lei de Hess, entropia, energia livre de Gibbs ($$\\Delta G$$).' },
  { id: 'q4', subject: 'Química', topicName: 'Química Orgânica e isomeria', questions5y: 6, freq5y: 7.14, questions10y: 17, freq10y: 8.67, frenteId: 'QUÍ-1', analysisNote: 'Isomeria óptica (estereocentros, quiralidade) e reações orgânicas.' },
  { id: 'q5', subject: 'Química', topicName: 'Reações orgânicas', questions5y: 6, freq5y: 7.14, questions10y: 16, freq10y: 8.16, frenteId: 'QUÍ-1', analysisNote: 'Substituição eletrofílica e mecanismos de polimerização.' },

  // PORTUGUÊS (1ª Fase)
  { id: 'p1', subject: 'Português', topicName: 'Gramática, Sintaxe & Concordância', questions5y: 8, freq5y: 13.33, questions10y: 18, freq10y: 15.00, frenteId: 'PORT-1', phase: '1a', analysisNote: 'Cobrança técnica de regência, crase e orações subordinadas no ITA.' },
  { id: 'p2', subject: 'Português', topicName: 'Obras Literárias Obrigatórias & Escolas', questions5y: 7, freq5y: 11.67, questions10y: 15, freq10y: 12.50, frenteId: 'PORT-2', phase: '1a', analysisNote: 'Exige leitura atenta dos livros indicados e contextualização histórico-literária.' },

  // INGLÊS (1ª Fase - Nota Mínima Eliminatória 40%)
  { id: 'i1', subject: 'Inglês', topicName: 'Reading Comprehension & Vocabulário Técnico', questions5y: 10, freq5y: 16.67, questions10y: 22, freq10y: 18.33, frenteId: 'ING-1', phase: '1a', analysisNote: 'Artigos do MIT, Nature e Economist com questões de interpretação detalhada.' },
  { id: 'i2', subject: 'Inglês', topicName: 'Connectors, Conditionals & Modals', questions5y: 6, freq5y: 10.00, questions10y: 14, freq10y: 11.67, frenteId: 'ING-2', phase: '1a', analysisNote: 'Conectivos de oposição/concessão (however, nevertheless, in spite of) são recorrentes.' },

  // REDAÇÃO (2ª Fase Discursiva)
  { id: 'r1', subject: 'Redação', topicName: 'Redação Dissertativa Filosófico-Argumentativa', questions5y: 5, freq5y: 100.0, questions10y: 10, freq10y: 100.0, frenteId: 'RED-1', phase: '2a', analysisNote: 'Prova decisiva na 2ª fase. Exige repertório denso, tese em 4 parágrafos e rigor semântico.' }
];




export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    subject: 'Matemática',
    frenteId: 'MAT-2',
    topic: 'Números complexos (formas algébrica e trigonométrica)',
    frontText: 'Qual é a representação geométrica e a soma das $n$ raízes $n$-ésimas da unidade $z^n = 1$ no plano de Argand-Gauss?',
    backText: 'As $n$ raízes $n$-ésimas da unidade formam um POLÍGONO REGULAR de $n$ lados inscrito no círculo unitário $|z|=1$, com vértices em $w_k = e^{i \\frac{2k\\pi}{n}}$ para $k = 0, 1, \\dots, n-1$.\n\nA soma de todas as $n$ raízes é SEMPRE IGUAL A ZERO: $\\sum_{k=0}^{n-1} w_k = 0$.',
    tags: ['ITA', 'Complexos', 'Geometria'],
    phase: 'ambas',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split('T')[0],
    history: []
  },
  {
    id: 'fc-2',
    subject: 'Física',
    frenteId: 'FÍS-1',
    topic: 'Trabalho e energia mecânica, quantidade de movimento, impulso',
    frontText: 'O que ocorre com a energia cinética e a quantidade de movimento em uma colisão perfeitamente inelástica entre dois corpos?',
    backText: '1) A Quantidade de Movimento Total do sistema SE CONSERVA ($P_{\\text{antes}} = P_{\\text{depois}}$).\n2) A Energia Cinética NÃO SE CONSERVA: há a MÁXIMA PERDA POSSÍVEL de energia cinética compatível com a conservação da quantidade de movimento.\n3) Os corpos GRUDAM e passam a se mover com a mesma velocidade final $v_f = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}$.',
    tags: ['Física', 'Mecânica', 'ITA'],
    phase: 'ambas',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split('T')[0],
    history: []
  },
  {
    id: 'fc-3',
    subject: 'Química',
    frenteId: 'QUÍ-3',
    topic: 'Equilíbrio químico e Equilíbrios iônicos',
    frontText: 'O que é o Efeito do Íon Comum e como ele afeta a solubilidade de um sal pouco solúvel como o $AgCl$ em uma solução de $NaCl$?',
    backText: 'O Efeito do Íon Comum é a diminuição da ionização/solubilidade de um eletrólito fraco ou sal pouco solúvel pela adição de um íon já presente no equilíbrio (Princípio de Le Chatelier).\n\nAdicionar $NaCl$ introduz íons $Cl^-$, deslocando o equilíbrio $AgCl_{(s)} \\rightleftharpoons Ag^+_{(aq)} + Cl^-_{(aq)}$ PARA A ESQUERDA, REDUZINDO drasticamente a solubilidade do $AgCl$.',
    tags: ['Química', 'Ksp', 'LeChatelier'],
    phase: 'ambas',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split('T')[0],
    history: []
  },
  {
    id: 'fc-4',
    subject: 'Português',
    frenteId: 'PORT-1',
    topic: 'Gramática, Sintaxe & Concordância',
    frontText: 'Qual a diferença sintática entre "A aluna de quem falei" e "A aluna a quem respondi" na 1ª Fase do ITA?',
    backText: '1) "falei": pede a preposição "DE" (falar DE algo ou alguém).\n2) "respondi": verbo transitivo indireto que pede a preposição "A" (responder A alguém).\n\nA preposição exigida pelo verbo DEVE anteceder o pronome relativo "quem".',
    tags: ['Português', 'Sintaxe', 'Regência'],
    phase: '1a',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split('T')[0],
    history: []
  },
  {
    id: 'fc-5',
    subject: 'Inglês',
    frenteId: 'ING-2',
    topic: 'Gramática Aplicada & Connectors',
    frontText: 'Qual a diferença gramatical entre "In spite of / Despite" e "Although / Even though" no Inglês do ITA?',
    backText: '1) "In spite of" / "Despite": São preposições e devem ser seguidas de SUBSTANTIVO ou GERÚNDIO (-ing). Ex: "Despite the rain, we left."\n2) "Although" / "Even though": São conjunções e devem ser seguidas de ORAÇÃO COMPLETA (Sujeito + Verbo). Ex: "Although it was raining, we left."',
    tags: ['Inglês', 'Connectors', 'Gramática'],
    phase: '1a',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split('T')[0],
    history: []
  }
];

export const INITIAL_VIDEOS: VideoLesson[] = [
  {
    id: 'v1',
    subject: 'Matemática',
    frenteId: 'MAT-2',
    topic: 'Números complexos (formas algébrica e trigonométrica)',
    title: 'Números Complexos Avançados - Resolução Nível ITA/IME',
    channelName: 'Poliedro Educação / Vestmap',
    duration: '45 min',
    youtubeId: '2vkJGCUh8Rw',
    recommendedStages: ['1-aula', '4-questoes'],
    phase: 'ambas'
  },
  {
    id: 'v2',
    subject: 'Física',
    frenteId: 'FÍS-1',
    topic: 'Trabalho e energia mecânica, quantidade de movimento, impulso',
    title: 'Mecânica Profunda ITA: Colisões Oblíquas e Conservação de Quantidade de Movimento',
    channelName: 'Prof. Renato Brito - Física para ITA/IME',
    duration: '58 min',
    youtubeId: 'ThTcyomrgl4',
    recommendedStages: ['1-aula', '3-autoexplicacao'],
    phase: 'ambas'
  },
  {
    id: 'v3',
    subject: 'Química',
    frenteId: 'QUÍ-3',
    topic: 'Equilíbrio químico e Equilíbrios iônicos',
    title: 'Equilíbrio Iônico e Ksp Nível Hard ITA',
    channelName: 'Química em Ação - Prof. Paulo Valim',
    duration: '52 min',
    youtubeId: '3rxZ3jVprks',
    recommendedStages: ['1-aula', '2-resumo'],
    phase: 'ambas'
  },
  {
    id: 'v4',
    subject: 'Português',
    frenteId: 'PORT-1',
    topic: 'Gramática, Sintaxe & Concordância',
    title: 'Português ITA 1ª Fase - Análise Sintática Profunda e Questões Inéditas',
    channelName: 'Estratégia Militares',
    duration: '40 min',
    youtubeId: 'WGE0ONNzIa4',
    recommendedStages: ['1-aula', '4-questoes'],
    phase: '1a'
  },
  {
    id: 'v5',
    subject: 'Inglês',
    frenteId: 'ING-1',
    topic: 'Reading Comprehension & Vocabulário Técnico',
    title: 'Inglês para o ITA - Garantindo a Nota Mínima Eliminatória com Skimming & Scanning',
    channelName: 'Estratégia Militares',
    duration: '38 min',
    youtubeId: 'c6k83XU6hLU',
    recommendedStages: ['1-aula', '2-resumo'],
    phase: '1a'
  }
];

export const OFFICIAL_ITA_SYLLABUS_LIST = [
  // FÍSICA (17 TÓPICOS)
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-1',
    topicName: '1. Noções sobre medidas físicas: algarismos significativos, erro, incerteza, Análise Dimensional, vetores e SI',
    notes: 'Incertezas de medição, escalas, gráficos, soma/subtração de vetores e análise dimensional aplicadas ao ITA.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-1',
    topicName: '2. Cinemática escalar e vetorial: equação horária, trajetória, velocidade, aceleração, projéteis e movimento circular',
    notes: 'Estudo gráfico do movimento, decomposição vetorial de projéteis e aceleração centrípeta/tangencial.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-2',
    topicName: '3. Conceito de força, equilíbrio da partícula, momento de força e equilíbrio do corpo rígido (estável/instável)',
    notes: 'Condições de equilíbrio estático, momento resultante e estabilidade de corpos rígidos.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-2',
    topicName: '4. Leis da Mecânica, dinâmica retilínea/circular, força centrípeta, sistemas acelerados, força centrífuga, impulso e centro de massa',
    notes: 'Forças fictícias em referenciais não-inerciais, teoremas do impulso e quantidade de movimento.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-2',
    topicName: '5. Trabalho e energia cinética, energia potencial, conservação da energia mecânica, forças conservativas e dissipativas',
    notes: 'Teorema da Energia Cinética, trabalho de forças variáveis e atrito em superfícies curvas.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-3',
    topicName: '6. Gravitação universal: campo gravitacional e Leis de Kepler do movimento planetário',
    notes: 'Órbitas elípticas, velocidades de escape e energia potencial gravitacional genérica.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-3',
    topicName: '7. Movimentos periódicos: Movimento Harmônico Simples (MHS), superposição de MHS e Pêndulo Simples',
    notes: 'Equações diferenciais do MHS, associação de molas e Figuras de Lissajous.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-3',
    topicName: '8. Fluidos em equilíbrio (pressão, Arquimedes, Pascal) e Fluidomecânica (vazão, continuidade, Bernoulli e Torricelli)',
    notes: 'Escoamento incompressível irrotacional, empuxo em fluidos acelerados e escoamento em tubos de Venturi.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-4',
    topicName: '9. Termologia: dilatação, gases perfeitos, Clapeyron, teoria cinética, calorimetria, 1° e 2° Princípios da Termodinâmica e propagação de calor',
    notes: 'Ciclo de Carnot, variação de entropia e transmissão de calor por condução/radiação.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-4',
    topicName: '10. Ondas transversais e longitudinais, acústica, velocidade do som, cordas vibrantes, tubos sonoros e Efeito Doppler',
    notes: 'Ondas estacionárias, batimentos, ressonância e Doppler com fonte e observador móveis.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-4',
    topicName: '11. Óptica geométrica: propagação retilínea, reflexão, refração, espelhos, lâminas, prismas e lentes delgadas',
    notes: 'Fórmula de Gauss, desvio mínimo em prismas e sistemas de lentes delgadas.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-4',
    topicName: '12. Natureza ondulatória da luz: interferência (Young), difração, polarização e modelos ondulatório/corpuscular',
    notes: 'Experiência das fendas duplas, interferência em películas finas e lei de Malus.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-5',
    topicName: '13. Cargas elétricas, eletrização, Lei de Coulomb, campo elétrico, potencial eletrostático e capacitores planos',
    notes: 'Trabalho da força elétrica, linhas de campo, rigidez dielétrica e associação de capacitores.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-5',
    topicName: '14. Corrente elétrica, Lei de Ohm, efeito Joule, Leis de Kirchhoff, Ponte de Wheatstone, geradores e receptores',
    notes: 'Análise de circuitos elétricos complexos em malhas e medição de fem.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-5',
    topicName: '15. Campo magnético, ímãs, bobinas, forças sobre cargas móveis (Lorentz) e interação entre correntes elétricas',
    notes: 'Trajetória helicoidal de cargas em B, força magnética entre fios paralelos e torque em espiras.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-5',
    topicName: '16. Indução eletromagnética: Lei de Faraday, Lei de Lenz, auto-indução, indutância e ondas eletromagnéticas',
    notes: 'Fem induzida por variação de área e de B, circuitos RL e espectro eletromagnético.',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Física' as const,
    frenteId: 'FÍS-5',
    topicName: '17. Física Moderna e Relatividade Restrita: Efeito Fotoelétrico, Bohr, Princípio da Incerteza e Transformações de Lorentz',
    notes: 'Fótons, momento do fóton, dilatação do tempo, contração do comprimento e relação E=mc².',
    color: '#000000',
    startTime: '08:00',
    endTime: '10:30'
  },

  // PORTUGUÊS (7 TÓPICOS)
  {
    subject: 'Português' as const,
    frenteId: 'PORT-1',
    topicName: '1. Morfologia: estrutura das palavras, morfemas, radicais, formação de palavras, neologismos, classes e flexões',
    notes: 'Análise morfológica contextualizada e valor semântico das classes gramaticais.',
    color: '#3B82F6',
    startTime: '14:00',
    endTime: '16:00'
  },
  {
    subject: 'Português' as const,
    frenteId: 'PORT-1',
    topicName: '2. Sintaxe: termos da oração, período simples e composto, pontuação, concordância, regência, crase e colocação pronominal',
    notes: 'Construção argumentativa em orações subordinadas e uso prático da pontuação.',
    color: '#3B82F6',
    startTime: '14:00',
    endTime: '16:00'
  },
  {
    subject: 'Português' as const,
    frenteId: 'PORT-1',
    topicName: '3. Semântica: sinonímia, antonímia, polissemia, paronímia, ambiguidade e intertextualidade',
    notes: 'Mecanismos linguísticos para produção de sentidos e paráfrase textual.',
    color: '#3B82F6',
    startTime: '14:00',
    endTime: '16:00'
  },
  {
    subject: 'Português' as const,
    frenteId: 'PORT-1',
    topicName: '4. Estilística: Figuras de palavras, de pensamento, de construção e de som',
    notes: 'Recursos estilísticos em textos literários e publicitários.',
    color: '#3B82F6',
    startTime: '14:00',
    endTime: '16:00'
  },
  {
    subject: 'Português' as const,
    frenteId: 'PORT-2',
    topicName: '5. Leitura e Interpretação: gêneros textuais, inferências, pressupostos, implícitos e variedades linguísticas',
    notes: 'Leitura profunda de ensaios, crônicas, charges e artigos de opinião.',
    color: '#3B82F6',
    startTime: '14:00',
    endTime: '16:00'
  },
  {
    subject: 'Português' as const,
    frenteId: 'PORT-2',
    topicName: '6A. Literatura Brasileira: Barroco, Arcadismo, Romantismo, Realismo, Parnasianismo, Simbolismo, Modernismo e Contemporânea',
    notes: 'Contexto histórico-social, autores e características das escolas nacionais.',
    color: '#3B82F6',
    startTime: '14:00',
    endTime: '16:00'
  },
  {
    subject: 'Português' as const,
    frenteId: 'PORT-2',
    topicName: '6B. Literatura Portuguesa: Trovadorismo, Humanismo, Classicismo, Barroco, Romantismo, Realismo e Modernismo',
    notes: 'Evolução da estética portuguesa de Camões a Fernando Pessoa.',
    color: '#3B82F6',
    startTime: '14:00',
    endTime: '16:00'
  },

  // INGLÊS (2 TÓPICOS)
  {
    subject: 'Inglês' as const,
    frenteId: 'ING-1',
    topicName: '1. Inglês: Compreensão global e detalhada de textos autênticos em língua inglesa',
    notes: 'Técnicas de skimming, scanning, inferência e identificação de argumentos centrais.',
    color: '#10B981',
    startTime: '16:30',
    endTime: '18:00'
  },
  {
    subject: 'Inglês' as const,
    frenteId: 'ING-2',
    topicName: '2. Inglês: Estruturas gramaticais essenciais, conectivos, expressões idiomáticas e tiras cômicas',
    notes: 'Modal verbs, orações condicionais, voz passiva e marcadores de coesão.',
    color: '#10B981',
    startTime: '16:30',
    endTime: '18:00'
  },

  // REDAÇÃO (1 TÓPICO)
  {
    subject: 'Redação' as const,
    frenteId: 'RED-1',
    topicName: '1. Redação Dissertativa-Argumentativa ITA: raciocínio lógico, atualidades e fuga de fórmulas prontas',
    notes: 'Prática de dissertação no padrão ITA: tema, coerência, coesão, repertório e norma-padrão.',
    color: '#FF6321',
    startTime: '18:30',
    endTime: '20:30'
  },

  // MATEMÁTICA (11 TÓPICOS)
  {
    subject: 'Matemática' as const,
    frenteId: 'MAT-1',
    topicName: '1. Teoria elementar dos conjuntos, conjuntos numéricos, números primos, TFA, divisibilidade, indução e princípio das gavetas',
    notes: 'Demonstrações por indução finita e resoluções com Princípio de Dirichlet.',
    color: '#FF6321',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Matemática' as const,
    frenteId: 'MAT-3',
    topicName: '2. Sequências: P.A., P.G. e soma dos termos de uma progressão geométrica infinita',
    notes: 'Somas telescópicas, sequências recorrentes e frações geratrizes.',
    color: '#FF6321',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Matemática' as const,
    frenteId: 'MAT-1',
    topicName: '3. Funções (injetoras, sobrejetoras, bijetoras, compostas, inversas, modulares, exponenciais e logarítmicas)',
    notes: 'Análise de domínio, imagem, paridade e equações/inequações logarítmicas.',
    color: '#FF6321',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Matemática' as const,
    frenteId: 'MAT-2',
    topicName: '4. Trigonometria: adição/subtração de arcos, arco duplo, arco metade, transformações em produto e equações trigonométricas',
    notes: 'Resolução de equações e inequações trigonométricas avançadas.',
    color: '#FF6321',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Matemática' as const,
    frenteId: 'MAT-1',
    topicName: '5. Números complexos: formas algébrica e trigonométrica, raízes complexas e Fórmula de Moivre',
    notes: 'Raízes da unidade, interpretação geométrica e potenciação de complexos.',
    color: '#FF6321',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Matemática' as const,
    frenteId: 'MAT-2',
    topicName: '6. Polinômios e equações algébricas: fatoração, raízes, TFA, relações de Girard e equações recíprocas',
    notes: 'Teorema de D\'Alembert, multiplicidade de raízes e pesquisa de raízes racionais.',
    color: '#FF6321',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Matemática' as const,
    frenteId: 'MAT-3',
    topicName: '7. Análise combinatória, Binômio de Newton e Probabilidade condicional',
    notes: 'Permutações com repetição, combinações completas e independência de eventos.',
    color: '#FF6321',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Matemática' as const,
    frenteId: 'MAT-3',
    topicName: '8. Matrizes, Determinantes e Sistemas Lineares (resolução e discussão de sistemas)',
    notes: 'Escalonamento, matriz inversa, determinante por Laplace e Teorema de Rouché-Capelli.',
    color: '#FF6321',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Matemática' as const,
    frenteId: 'MAT-4',
    topicName: '9. Geometria plana: polígonos, circunferência, semelhança de triângulos, relações métricas e áreas',
    notes: 'Teoremas de Menelaus, Ceva, Ptolemeu e potência de ponto.',
    color: '#FF6321',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Matemática' as const,
    frenteId: 'MAT-4',
    topicName: '10. Geometria analítica plana: reta, circunferência e cônicas (elipse, hipérbole e parábola)',
    notes: 'Posições relativas, distância de ponto a reta, equações reduzidas e gerais de cônicas.',
    color: '#FF6321',
    startTime: '08:00',
    endTime: '10:30'
  },
  {
    subject: 'Matemática' as const,
    frenteId: 'MAT-4',
    topicName: '11. Geometria espacial: retas/planos, poliedros, prismas, pirâmides, troncos, cilindros, cones e esferas',
    notes: 'Teorema de Euler, posições relativas no espaço, seções planas e cálculo de volumes.',
    color: '#FF6321',
    startTime: '08:00',
    endTime: '10:30'
  },

  // QUÍMICA (18 TÓPICOS)
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-1',
    topicName: '1. Objetivos e ramos da Química e Método Científico',
    notes: 'Princípios fundamentais da investigação científica e divisões da química.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-1',
    topicName: '2. Matéria: propriedades dos estados sólido, líquido e gasoso; materiais amorfos e cristalinos',
    notes: 'Transformações de fase, redes cristalinas e forças de coesão.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-1',
    topicName: '3. Misturas heterogêneas, coloides, soluções e métodos de separação das fases e componentes',
    notes: 'Fracionamento de misturas complexas, efeito Tyndall e grau de pureza.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-2',
    topicName: '4. Elementos químicos, tabela periódica, substâncias simples e compostas e obtenção',
    notes: 'Propriedades periódicas (raio, eletronegatividade, energia de ionização).',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-2',
    topicName: '5. Átomos e moléculas: partículas fundamentais, modelos atômicos, massas atômicas/molares e radioatividade',
    notes: 'Evolução atômica (Bohr, Sommerfeld, Schrödinger), decaimentos radioativos e meia-vida.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-2',
    topicName: '6. Bases estequiométricas da teoria atômica moderna: leis dos gases, princípio de Avogadro e mol',
    notes: 'Leis ponderais, densidade dos gases e constante de Avogadro.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-2',
    topicName: '7. Ligações químicas (iônica, covalente, metálica), geometria, polaridade e forças intermoleculares',
    notes: 'Teoria VSEPR, hibridização de orbitais, momento dipolar e ponte de hidrogênio.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-2',
    topicName: '8. Soluções: maneiras de expressar concentrações, solubilidade e propriedades coligativas',
    notes: 'Molaridade, fração molar, curvas de solubilidade, fator de van \'t Hoff.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-3',
    topicName: '9. Reações químicas: equação química, balanceamento e cálculos estequiométricos',
    notes: 'Reativos limitantes, rendimento, pureza e reações consecutivas.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-3',
    topicName: '10. Equilíbrio químico: conceito, constantes Kc e Kp, Le Chatelier e equilíbrio iônico',
    notes: 'Titulações, produto de solubilidade (Kps), grau de ionização e efeito do íon comum.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-3',
    topicName: '11. Termoquímica: calor, trabalho, entalpia, entropia, energia livre de Gibbs e Lei de Hess',
    notes: 'Cálculo de variação de entalpia por energia de ligação e espontaneidade com Gibbs.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-3',
    topicName: '12. Cinética química: ordem de reação, catalisadores, energia de ativação e leis de velocidade',
    notes: 'Equação de Arrhenius, catálise homogênea/heterogênea e mecanismos de reação.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-4',
    topicName: '13. Ácidos, bases, sais e óxidos: conceitos (Arrhenius, Brønsted, Lewis), nomenclatura e propriedades',
    notes: 'Força de ácidos/bases e caráter ácido/básico de óxidos e sais.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-4',
    topicName: '14. Eletroquímica: pilhas, potenciais de eletrodo, Equação de Nernst, Leis de Faraday e eletrólise',
    notes: 'Eletrólise ígnea e aquosa, corrosão, proteção catódica e estequiometria de Faraday.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-5',
    topicName: '15. Química orgânica: funções orgânicas, nomenclatura, reações e isomeria (plana, geométrica e óptica)',
    notes: 'Enantiômeros, mistura racêmica, regra de Cahn-Ingold-Prelog e reações de substituição/adição.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-5',
    topicName: '16. Bioquímica: aminoácidos, peptídeos, proteínas, enzimas, carboidratos, nucleotídeos e lipídeos',
    notes: 'Estrutura primária/secundária de proteínas, ligação peptídica e ácidos graxos.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-5',
    topicName: '17. Polímeros: monômeros, correlação estrutura-propriedades e métodos de obtenção',
    notes: 'Polímeros de adição, condensação, copolímeros e elastômeros.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  },
  {
    subject: 'Química' as const,
    frenteId: 'QUÍ-1',
    topicName: '18. Química ambiental: ciclos biogeoquímicos (carbono, água, oxigênio, nitrogênio) e poluição',
    notes: 'Efeito estufa, chuva ácida, camada de ozônio e tratamento de água/esgoto.',
    color: '#FF6321',
    startTime: '10:30',
    endTime: '13:00'
  }
];

export function generateFullSyllabusAgenda(baseStartDate: Date = new Date()): AgendaTopic[] {
  const start = new Date(baseStartDate);
  start.setHours(0, 0, 0, 0);

  return OFFICIAL_ITA_SYLLABUS_LIST.map((item, index) => {
    const topicDate = new Date(start);
    topicDate.setDate(start.getDate() + index);
    const dateStr = topicDate.toISOString().split('T')[0];

    return {
      id: `ag-official-${index + 1}`,
      subject: item.subject,
      frenteId: item.frenteId,
      topicName: item.topicName,
      startDate: dateStr,
      endDate: dateStr,
      startTime: item.startTime,
      endTime: item.endTime,
      status: index === 0 ? 'em_progresso' : 'planejado',
      stage: '1-aula',
      notes: item.notes,
      color: item.color
    };
  });
}

export const INITIAL_AGENDA_TOPICS = generateFullSyllabusAgenda();

export function generateFullSyllabusSummaries(): DidacticSummary[] {
  return OFFICIAL_ITA_SYLLABUS_LIST.map((item, index) => {
    return {
      id: `sum-official-${index + 1}`,
      subject: item.subject,
      frenteId: item.frenteId,
      topic: item.topicName,
      title: `Resumo Detalhado: ${item.topicName.replace(/^\d+\.\s*/, '')}`,
      subtitle: item.notes,
      phase: 'ambas',
      summaryText: `Este é o resumo teórico focado no vestibular do ITA para o assunto: ${item.topicName.replace(/^\d+\.\s*/, '')}.

Este tópico aborda ${item.notes}

### Aprofundamento Teórico
Para o ITA, é fundamental não apenas saber a teoria básica, mas entender as demonstrações, os casos limites e as aplicações não triviais. 
As questões frequentemente misturam este assunto com outras áreas da matéria, exigindo uma base matemática muito forte.

### Dicas Práticas
- Revise as deduções das fórmulas principais.
- Resolva as questões discursivas das provas da 2ª fase dos últimos 10 anos.
- Esteja preparado para manipulações algébricas pesadas.
`,
      formulas: [
        {
          name: 'Fórmula Principal',
          latex: 'f(x) = \dots',
          explanation: 'Fórmula representativa do assunto.'
        }
      ],
      itaTips: [
        'Atenção às condições de contorno e simplificações indevidas.',
        'O ITA adora misturar este tópico com outras áreas do conhecimento.'
      ],
      commonTraps: [
        'Esquecer de verificar as unidades ou o domínio da função.',
        'Aplicar fórmulas sem entender as premissas por trás delas.'
      ]
    };
  });
}

export const INITIAL_SUMMARIES: DidacticSummary[] = generateFullSyllabusSummaries();
