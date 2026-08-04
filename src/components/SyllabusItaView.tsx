import React, { useState, useEffect } from 'react';
import { 
  BookOpenCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Award, 
  AlertTriangle, 
  Flame, 
  BookOpen, 
  Sparkles, 
  Printer, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Zap,
  Info,
  Layers,
  Clock,
  RotateCcw
} from 'lucide-react';
import { Subject } from '../types';

export interface SyllabusTopic {
  id: string; // e.g. 'FIS-01'
  number: number;
  title: string;
  description: string;
  highYieldNotes?: string;
  phase: '1a' | '2a' | 'ambas';
  importance: 'Extrema (Top ITA)' | 'Alta' | 'Média';
}

export interface SubjectSyllabus {
  subject: Subject;
  iconName: string;
  badgeColor: string;
  bgColor: string;
  phase1Format: string;
  phase2Format: string;
  description: string;
  recommendedBooks: string[];
  topics: SyllabusTopic[];
}

export const ITA_SYLLABUS_DATA: SubjectSyllabus[] = [
  {
    subject: 'Física',
    iconName: 'Zap',
    badgeColor: 'bg-[#FF6321] text-black',
    bgColor: 'border-[#FF6321]',
    phase1Format: '12 Questões Objetivas (Múltipla Escolha)',
    phase2Format: '10 Questões Dissertativas (4 Horas)',
    description: 'A prova de Física do ITA exige elevado rigor conceitual, análise dimensional rigorosa, domínio de referenciais não-inerciais, circuitos com ponte/reostato, óptica geométrica/física e conceitos de física moderna e relatividade restrita.',
    recommendedBooks: [
      'Tópicos de Física (Vols. 1, 2 e 3) — Gref / Helou / Gualter / Newton',
      'Física em Nível Olímpico — Ivan Ramos / Renato Brito',
      'Problems in General Physics — I.E. Irodov (Leitura avançada)',
      'Fundamentos de Física — Halliday & Resnick (Mecânica e Eletromagnetismo)'
    ],
    topics: [
      {
        id: 'FIS-01',
        number: 1,
        title: 'Medidas Físicas, Análise Dimensional & Vetores',
        description: 'Algarismos significativos, erro e incerteza. Análise dimensional e teorema dos Pi de Buckingham. Grandezas escalares e vetoriais, soma/subtração de vetores, decomposição e representação gráfica de funções. Sistema Internacional de Unidades (SI).',
        highYieldNotes: 'Análise dimensional é cobrada em questões que exigem determinar expoentes de equações sem resolução direta.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'FIS-02',
        number: 2,
        title: 'Cinemática Escalar & Vetorial da Partícula',
        description: 'Equação horária do movimento, trajetória, velocidade e aceleração vetoriais. Estudo gráfico do movimento. Movimento de projéteis em 2D. Movimento circular uniforme e variado. Cinemática vetorial e vinculos geométricos.',
        highYieldNotes: 'Múltiplos projéteis, aceleração tangencial e centrípeta em trajetórias não-circulares.',
        phase: 'ambas',
        importance: 'Alta'
      },
      {
        id: 'FIS-03',
        number: 3,
        title: 'Estática do Ponto Material e do Corpo Rígido',
        description: 'Conceito de força e momento (torque). Equilíbrio de uma partícula e de um corpo rígido. Tipos de apoio e reações vinculares. Equilíbrio estável, instável e indiferente.',
        highYieldNotes: 'Sistemas com múltiplas barras e forças distribuídas (recorrência na 2ª fase).',
        phase: 'ambas',
        importance: 'Alta'
      },
      {
        id: 'FIS-04',
        number: 4,
        title: 'Dinâmica das Leis de Newton, Referenciais Não-Inerciais e Quantidade de Movimento',
        description: 'Leis fundamentais da Mecânica. Dinâmica retilínea e circular, força centrípeta e centrífuga. Sistemas acelerados de referência (Força de Coriolis e de Inércia fictícia). Impulso, teorema do impulso, conservação e centro de massa.',
        highYieldNotes: 'Forças fictícias em elevadores/cunhas móveis e colisões oblíquas com restituição e atrito.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'FIS-05',
        number: 5,
        title: 'Trabalho, Energia e Conservação da Energia Mecânica',
        description: 'Trabalho de forças variáveis e constantes. Energia cinética e potencial (gravitacional e elástica). Teorema energia-trabalho. Conservação da energia mecânica com forças conservativas e dissipativas.',
        highYieldNotes: 'Sistemas massa-mola acoplados com perdas dissipativas e rampas curvas.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'FIS-06',
        number: 6,
        title: 'Gravitação Universal & Mecânica Celeste',
        description: 'Lei da Gravitação Universal de Newton, campo e potencial gravitacional. Leis de Kepler do movimento planetário. Energia de órbita circular e elíptica, velocidade de escape.',
        highYieldNotes: 'Órbitas elípticas, manobras orbitais e colisão de corpos celestes.',
        phase: 'ambas',
        importance: 'Alta'
      },
      {
        id: 'FIS-07',
        number: 7,
        title: 'Movimento Harmônico Simples (MHS) & Pêndulos',
        description: 'Movimentos periódicos, equação diferencial do MHS, energia no MHS. Superposição de MHS na mesma direção e perpendiculares (Figuras de Lissajous). Pêndulo simples e sistemas massa-mola.',
        highYieldNotes: 'MHS associado com Eletrostática (pêndulo em campo elétrico) e MHS com mola equivalente.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'FIS-08',
        number: 8,
        title: 'Hidrostática & Hidrodinâmica Avançada',
        description: 'Fluidos em equilíbrio: pressão, massa específica, Princípios de Arquimedes, Pascal e Stevin. Pressão atmosférica e vasos comunicantes. Fluidomecânica: escoamento não-viscoso e incompressível, vazão, equação da continuidade, equação de Bernoulli e Torricelli.',
        highYieldNotes: 'Tubo de Venturi, vasos comunicantes com aceleração e escoamento de Bernoulli.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'FIS-09',
        number: 9,
        title: 'Termologia, Calorimetria, Gases & Termodinâmica',
        description: 'Escalas termométricas, dilatação térmica de sólidos e líquidos. Leis dos gases perfeitos e equação de Clapeyron. Teoria cinética dos gases. Calorimetria, capacidade térmica, equivalente mecânico. 1° e 2° Princípios da Termodinâmica, ciclos térmicos (Carnot) e condução do calor.',
        highYieldNotes: 'Ciclos termodinâmicos com variação de massa molar e processos politrópicos.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'FIS-10',
        number: 10,
        title: 'Ondulatória & Acústica',
        description: 'Ondas transversais e longitudinais, equação da onda, velocidade de propagação. Natureza do som: altura, intensidade, timbre. Cordas vibrantes (fórmula de Taylor), tubos sonoros abertos/fechados e Efeito Doppler acústico.',
        highYieldNotes: 'Efeito Doppler com fonte e observador em movimento oblíquo.',
        phase: 'ambas',
        importance: 'Alta'
      },
      {
        id: 'FIS-11',
        number: 11,
        title: 'Óptica Geométrica & Sistemas Ópticos',
        description: 'Propagação retilínea, reflexão e refração, reflexão total (ângulo limite). Espelhos planos e esféricos (Gauss), lâminas de faces paralelas, prismas e dispersão da luz. Lentes delgadas e sistemas ópticos compostos.',
        highYieldNotes: 'Associação de lentes delgadas imersas em diferentes meios e prismas de desvio mínimo.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'FIS-12',
        number: 12,
        title: 'Óptica Física (Interferência, Difração e Polarização)',
        description: 'Natureza ondulatória da luz. Interferência de Young (dupla fenda), franjas claras e escuras. Difração por fenda única. Polarização da luz e Lei de Malus. Modelos ondulatório e corpuscular da luz.',
        highYieldNotes: 'Experiência de Young com película de índice de refração variável.',
        phase: 'ambas',
        importance: 'Alta'
      },
      {
        id: 'FIS-13',
        number: 13,
        title: 'Eletrostática: Campo, Potencial e Capacitores',
        description: 'Carga elétrica, processos de eletrização, Lei de Coulomb. Campo elétrico e linhas de força. Potencial eletrostático, energia potencial. Capacitores planos e com dielétricos, capacitância e associação.',
        highYieldNotes: 'Capacitores com dielétricos parciais e trabalho para inserção de dielétrico.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'FIS-14',
        number: 14,
        title: 'Eletrodinâmica: Circuitos, Kirchhoff e Geradores',
        description: 'Corrente elétrica, resistência, Lei de Ohm, efeito Joule. Variação da resistividade com a temperatura. Leis de Kirchhoff, Ponte de Wheatstone. Geradores, receptores e força eletromotriz. Potenciômetros e reostatos.',
        highYieldNotes: 'Ponte de Wheatstone balanceada com componentes não-lineares e potências máximas.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'FIS-15',
        number: 15,
        title: 'Magnetismo: Campos, Bobinas e Força Magnética',
        description: 'Campo magnético, ímãs, campo produzido por correntes retilíneas e circulares (Biot-Savart/Ampère). Solenoides e bobinas. Força magnética sobre cargas em movimento (Força de Lorentz) e fios condutores. Interação entre correntes.',
        highYieldNotes: 'Movimento helicoidal de cargas em campos cruzados E e B.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'FIS-16',
        number: 16,
        title: 'Indução Eletromagnética & Ondas Eletromagnéticas',
        description: 'Fluxo magnético, Lei de Faraday-Neumann e Lei de Lenz. Autoindução e indutância de solenoides. Propagação e interferência de ondas eletromagnéticas. Equações de Maxwell na forma qualitativa/integral.',
        highYieldNotes: 'Hastes metálicas deslizando em trilhos com campo magnético e resistores.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'FIS-17',
        number: 17,
        title: 'Física Moderna & Relatividade Restrita',
        description: 'Efeito fotoelétrico, equação de Einstein e trabalho de extração. Radiação de corpo negro (Lei de Planck). Espectro do hidrogênio e modelo atômico de Bohr. Princípio da Incerteza de Heisenberg. Postulados da Relatividade Restrita, transformações de Lorentz, dilatação do tempo, contração do comprimento, momento e energia relativísticos (E=mc²).',
        highYieldNotes: 'Tema certo nas provas recentes do ITA (tanto 1ª quanto 2ª fase).',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      }
    ]
  },
  {
    subject: 'Matemática',
    iconName: 'BookOpen',
    badgeColor: 'bg-emerald-400 text-black',
    bgColor: 'border-emerald-500',
    phase1Format: '12 Questões Objetivas',
    phase2Format: '10 Questões Dissertativas (4 Horas)',
    description: 'A prova de Matemática do ITA exige prova formal rigorosa, fatorações algébricas complexas, números complexos na forma exponencial/trigonométrica, polinômios com raízes múltiplas, geometria espacial com projeção ortogonal e combinatória avançada.',
    recommendedBooks: [
      'Fundamentos de Matemática Elementar (Coleção 1 a 11) — Gelson Iezzi et al.',
      'Aprofundamento de Polinômios e Equações Algébricas — Caio Guimarães',
      'Análise Combinatória e Probabilidade — Augusto César Morgado (SBM)',
      'Geometria I e II — Eduardo Wagner e A. C. Morgado'
    ],
    topics: [
      {
        id: 'MAT-01',
        number: 1,
        title: 'Teoria dos Conjuntos & Princípios de Indução/Gavetas',
        description: 'Subconjuntos, união, intersecção, diferença e complementar. Conjuntos numéricos (N, Z, Q, I, R). Princípio da Indução Finita (PIF) e Princípio das Gavetas de Dirichlet (Pombos).',
        highYieldNotes: 'Provas por indução finita e contagem de subconjuntos com restrições.',
        phase: 'ambas',
        importance: 'Alta'
      },
      {
        id: 'MAT-02',
        number: 2,
        title: 'Números Complexos & Fórmula de Moivre',
        description: 'Forma algébrica e trigonométrica (exponencial de Euler). Operações, conjugado, módulo. Raízes n-ésimas complexas, Fórmula de Moivre e interpretação geométrica no plano de Argand-Gauss.',
        highYieldNotes: 'Uso de raízes da unidade para simplificar somatórios trigonométricos.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'MAT-03',
        number: 3,
        title: 'Progressões Aritméticas (PA) e Geometricas (PG)',
        description: 'Propriedades de termo geral, razão, soma dos termos de uma PA e PG finitas. Soma dos termos de uma PG infinita convergente. Progressões compostas e produto de termos.',
        highYieldNotes: 'PG infinitas associadas à Geometria Plana e somas telescópicas.',
        phase: 'ambas',
        importance: 'Alta'
      },
      {
        id: 'MAT-04',
        number: 4,
        title: 'Estudo das Funções, Logaritmos & Exponenciais',
        description: 'Domínio, contradomínio e imagem. Funções injetoras, sobrejetoras, bijetoras. Paridade (pares/ímpares) e periodicidade. Função composta e inversa. Funções afim, quadrática e modular. Logaritmos e exponenciais: definições, propriedades, equações e inequações.',
        highYieldNotes: 'Inequações logarítmicas com bases variáveis e mudança de base.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'MAT-05',
        number: 5,
        title: 'Polinômios & Teorema Fundamental da Álgebra',
        description: 'Conceito, grau, operações, fatorações notáveis, divisão de polinômios (Briot-Ruffini, resto). Raízes de polinômios e Teorema Fundamental da Álgebra. Teorema de Bolzano para localização de raízes reais.',
        highYieldNotes: 'Divisão de polinômios por divisores de grau 2+ e polinômios recíprocos.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'MAT-06',
        number: 6,
        title: 'Equações Algébricas & Relações de Girard',
        description: 'Multiplicidade de raízes, número de raízes reais e complexas. Relações entre coeficientes e raízes (Relações de Girard). Transformações aditivas, multiplicativas e recíprocas.',
        highYieldNotes: 'Determinação de parâmetro para raiz dupla ou tripla e equações recíprocas de grau 4.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'MAT-07',
        number: 7,
        title: 'Análise Combinatória, Binômio de Newton & Probabilidade',
        description: 'Princípios de contagem, arranjos, permutações (simples, com repetição e circulares), combinações. Permutações caóticas (desarranjos). Binômio de Newton e Trijângulo de Pascal. Probabilidade condicional, Teorema de Bayes e eventos independentes.',
        highYieldNotes: 'Desarranjos (permutação caótica) e probabilidade condicional na 2ª fase.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'MAT-08',
        number: 8,
        title: 'Matrizes, Determinantes & Sistemas Lineares',
        description: 'Operações com matrizes, matriz inversa e transposta. Determinantes, propriedades e Teorema de Binet. Matriz associada a sistemas lineares, Regra de Cramer, escalonamento e discussão de sistemas em função de parâmetros.',
        highYieldNotes: 'Sistemas lineares homogêneos e propriedades de det(A^n) com inteiros.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'MAT-09',
        number: 9,
        title: 'Trigonometria Avançada & Transformações em Produto',
        description: 'Fórmulas de adição, subtração e bissecção de arcos. Relações fundamentais. Transformação de soma em produto (prostaférese). Equações e inequações trigonométricas avançadas.',
        highYieldNotes: 'Prostaférese e equações trigonométricas com restrição de domínio restrito.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'MAT-10',
        number: 10,
        title: 'Geometria Analítica & Cônicas',
        description: 'Coordenadas cartesianas, distância ponto-ponto e ponto-reta. Equação da reta, paralelismo/perpendicularismo, ângulo entre retas. Circunferência, tangência e intersecção. Cônicas: elipse, hipérbole, parábola, focos, diretrizes e excentricidade.',
        highYieldNotes: 'Propriedades ópticas e focais das cônicas e famílias de retas tangentes.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'MAT-11',
        number: 11,
        title: 'Geometria Plana Avançada (Teoremas de Ceva e Menelaus)',
        description: 'Polígonos, círculos e circunferências. Congruência e semelhança de triângulos. Relações métricas nos triângulos e triângulos retângulos. Teoremas de Ceva, Menelaus e Ptolemeu. Áreas de polígonos, círculos, coroas e setores.',
        highYieldNotes: 'Teorema de Menelaus, quadriláteros notáveis e círculos ex-inscritos.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'MAT-12',
        number: 12,
        title: 'Geometria Espacial, Poliedros & Projeções Ortogonais',
        description: 'Posições relativas de retas e planos no espaço. Poliedros regulares (Sólidos de Platão) e Teorema de Euler. Prismas, pirâmides, troncos, cilindros, cones e esferas. Áreas, volumes e área da projeção ortogonal.',
        highYieldNotes: 'Projeção ortogonal de cubos/tetraedros sobre planos e esferas inscritas/circunscritas.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      }
    ]
  },
  {
    subject: 'Química',
    iconName: 'Flame',
    badgeColor: 'bg-amber-400 text-black',
    bgColor: 'border-amber-500',
    phase1Format: '12 Questões Objetivas',
    phase2Format: '10 Questões Dissertativas (4 Horas)',
    description: 'A prova de Química do ITA é referência em profundidade teórica e físico-química. Cobre físico-química avançada (Kps, Nernst, cinética com mecanismos, termodinâmica com Gibbs), química orgânica (reações, mecanismos, isomeria R/S quiral) e química inorgânica descritiva.',
    recommendedBooks: [
      'Química (Vols. 1, 2 e 3) — Ricardo Feltre',
      'Princípios de Química: Questionando a Vida Moderna — Peter Atkins & Loretta Jones',
      'Química Geral e Reações Químicas — John C. Kotz',
      'Química Orgânica (Vols. 1 e 2) — Solomons / Paula Yurkanis Bruice'
    ],
    topics: [
      {
        id: 'QUI-01',
        number: 1,
        title: 'Objetivos, Ramos da Química & Método Científico',
        description: 'Definições da química, grandezas físicas, método científico e hipóteses.',
        phase: '1a',
        importance: 'Média'
      },
      {
        id: 'QUI-02',
        number: 2,
        title: 'Estados da Matéria: Sólidos, Líquidos e Gases',
        description: 'Propriedades dos estados físico. Materiais amorfos vs cristalinos. Diagrama de fases e estados da matéria.',
        phase: '1a',
        importance: 'Média'
      },
      {
        id: 'QUI-03',
        number: 3,
        title: 'Sistemas, Misturas, Coloides e Purificação',
        description: 'Misturas heterogêneas, soluções e coloides. Métodos de separação de fases (destilação fracionada, recristalização, extração por solvente), grau de pureza.',
        highYieldNotes: 'Separação de misturas orgânicas por extração ácido-base em éter.',
        phase: 'ambas',
        importance: 'Alta'
      },
      {
        id: 'QUI-04',
        number: 4,
        title: 'Elementos Químicos & Tabela Periódica',
        description: 'Propriedades periódicas e aperiódicas (raio atômico, energia de ionização, afinidade eletrônica, eletronegatividade). Anomalias periódicas (Cátion As3- vs Se2-, P vs S).',
        highYieldNotes: 'Anomalias da 1ª energia de ionização (grupo 15 vs grupo 16).',
        phase: 'ambas',
        importance: 'Alta'
      },
      {
        id: 'QUI-05',
        number: 5,
        title: 'Estrutura Atômica, Modelos Atômicos e Radioatividade',
        description: 'Evolução dos modelos atômicos (Thomson, Rutherford, Bohr). Números quânticos e orbitais. Decaimento radioativo, meia-vida, datação por carbono-14 e equações nucleares.',
        highYieldNotes: 'Datação por C-14 com amostras contaminadas e números quânticos.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'QUI-06',
        number: 6,
        title: 'Estequiometria, Leis Ponderais & Conceito de Mol',
        description: 'Bases da teoria atômica, leis ponderais (Lavoisier, Proust, Gay-Lussac), hipótese de Avogadro, massa molar, determinação de fórmula empírica e molecular.',
        highYieldNotes: 'Fórmula mínima/molecular a partir do número de moléculas e estequiometria.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'QUI-07',
        number: 7,
        title: 'Ligações Químicas, Geometria Molecular & Interações',
        description: 'Casos extremos de ligação (iônica, covalente, metálica) e intermediários. Geometria molecular (VSEPR), polaridade, momento dipolar e forças intermoleculares (London, dipolo-dipolo, pontes de hidrogênio). Teoria dos Orbitais Moleculares (TOM) básica.',
        highYieldNotes: 'Geometria de interhalogênios (PCl5, CH2O) e momentos dipolares.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'QUI-08',
        number: 8,
        title: 'Soluções, Unidades de Concentração & Coligativas',
        description: 'Expressão de concentrações (molaridade, molalidade, fração molar, % m/m). Solubilidade de sólidos e gases. Propriedades coligativas (tonoscopia, ebulioscopia, crioscopia, osmoscopia e fator de van \'t Hoff).',
        highYieldNotes: 'Ebulioscopia combinada com constante de equilíbrio em ebulição.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'QUI-09',
        number: 9,
        title: 'Reações Químicas & Cálculos Estequiométricos',
        description: 'Equações químicas, balanceamento de reações redox complexas pelo método do íon-elétron. Reagente limitante, pureza e rendimento em reações consecutivas.',
        highYieldNotes: 'Balanceamento redox em meio ácido e alcalino.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'QUI-10',
        number: 10,
        title: 'Equilíbrio Químico, Kc, Kp, Kps & Tampões',
        description: 'Conceito de equilíbrio reversível, constantes Kc, Kp, Kps e grau de equilíbrio. Princípio de Le Chatelier. Solução tampão e Equação de Henderson-Hasselbalch.',
        highYieldNotes: 'Precipitação fracionada por Kps e perturbação no equilíbrio.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'QUI-11',
        number: 11,
        title: 'Termoquímica: Entalpia, Entropia & Energia Livre de Gibbs',
        description: 'Calor, trabalho, energia interna, entalpia (H), entropia (S) e energia livre de Gibbs (G). Lei de Hess, energia de ligação e espontaneidade de reações (Delta G = Delta H - T*Delta S).',
        highYieldNotes: 'Cálculo de variação de entropia e temperatura mínima de espontaneidade.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'QUI-12',
        number: 12,
        title: 'Cinética Química, Mecanismos & Energia de Ativação',
        description: 'Fatores que afetam a velocidade de reação. Lei de velocidade, ordem de reação, constante de velocidade (Arrhenius), energia de ativação e mecanismos de reação (etapa lenta). Catalisadores e catálise enzimática.',
        highYieldNotes: 'Equação de Arrhenius e cálculo de Ea com variação de temperatura.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'QUI-13',
        number: 13,
        title: 'Funções Inorgânicas: Ácidos, Bases, Sais e Óxidos',
        description: 'Teorias de ácido-base (Arrhenius, Brønsted-Lowry, Lewis). Nomenclatura, classificação e propriedades das soluções aquosas dos compostos inorgânicos.',
        highYieldNotes: 'Acentuada cobrança nas provas discursivas da 2ª fase.',
        phase: 'ambas',
        importance: 'Alta'
      },
      {
        id: 'QUI-14',
        number: 14,
        title: 'Eletroquímica: Pilhas, Equação de Nernst & Eletrólise',
        description: 'Células galvânicas (pilhas), potenciais padrão de redução, espontaneidade. Equação de Nernst para condições não-padrão. Baterias primárias e secundárias. Corrosão. Células eletrolíticas (eletrólise ígnea e aquosa) e Leis de Faraday.',
        highYieldNotes: 'Nernst com concentração não unitária e massa depositada por Faraday.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'QUI-15',
        number: 15,
        title: 'Química Orgânica: Funções, Reações & Isomeria R/S',
        description: 'Funções orgânicas, nomenclatura IUPAC, propriedades físicas. Isomeria plana (cadeia, posição, função) e espacial (geométrica cis/trans/E-Z e óptica/quiralidade R/S por Cahn-Ingold-Prelog). Reações orgânicas: adição, substituição, eliminação, oxidação (ozonólise, KMnO4) e esterificação.',
        highYieldNotes: 'Oxidação branda/enérgica de alquenos e identificação de isômeros quipais R/S.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'QUI-16',
        number: 16,
        title: 'Bioquímica: Aminoácidos, Proteínas, Carboidratos e Lipídeos',
        description: 'Estrutura de aminoácidos, ligação peptídica, estrutura de proteínas e enzimas. Carboidratos (monossacarídeos, dissacarídeos e polissacarídeos), nucleotídeos, DNA/RNA e lipídeos.',
        phase: '1a',
        importance: 'Média'
      },
      {
        id: 'QUI-17',
        number: 17,
        title: 'Polímeros Sintéticos e Naturais',
        description: 'Monômeros, reações de polimerização por adição e condensação (PET, náilon, baquelite). Correlação estrutura-propriedades e aplicações tecnológicas.',
        highYieldNotes: 'Cálculo do número médio de unidades repetitivas de um polímero.',
        phase: 'ambas',
        importance: 'Alta'
      },
      {
        id: 'QUI-18',
        number: 18,
        title: 'Química Ambiental & Ciclos Biogeoquímicos',
        description: 'Ciclos do carbono, água, oxigênio e nitrogênio. Poluição atmosférica (efeito estufa, chuva ácida, destruição da camada de ozônio por CFCs) e poluição da água/solo.',
        highYieldNotes: 'Reações de degradação do ozônio e gases do efeito estufa.',
        phase: '1a',
        importance: 'Alta'
      }
    ]
  },
  {
    subject: 'Português',
    iconName: 'FileText',
    badgeColor: 'bg-sky-400 text-black',
    bgColor: 'border-sky-500',
    phase1Format: 'Presença na 1ª Fase e Integra a 2ª Fase',
    phase2Format: '15 Questões Objetivas + Redação (4 Horas)',
    description: 'A prova de Português e Literatura do ITA é caracterizada por rigor na análise sintático-semântica de excertos literários e jornalísticos complexos, cobrança de figuras de linguagem, regência/crase, gramática histórica e estudo aprofundado das obras e escolas literárias.',
    recommendedBooks: [
      'Gramática para Concursos / Ensino Médio — Fernando Pestana / Domingos Paschoal Cegalla',
      'Análise de Textos e Comunicação — Othon M. Garcia (Comunicação em Prosa Moderna)',
      'História Concisa da Literatura Brasileira — Alfredo Bosi',
      'Leitura e Análise das Obras Obrigatórias do Edital do ITA 2026'
    ],
    topics: [
      {
        id: 'POR-01',
        number: 1,
        title: 'Morfologia, Estrutura e Formação de Palavras',
        description: 'Morfemas (radical, afixos, desinências, vogal temática), processos de formação de palavras (derivação parassintética, composição, neologismos). Flexão e função útil das classes gramaticais na construção de sentidos.',
        highYieldNotes: 'Análise de derivação parassintética e neologismos em textos contemporâneos.',
        phase: 'ambas',
        importance: 'Alta'
      },
      {
        id: 'POR-02',
        number: 2,
        title: 'Sintaxe do Período Simples e Composto',
        description: 'Termos essenciais, integrantes e acessórios da oração. Período simples e composto: subordinação, coordenação, conectivos e conjunções. Pontuação (implicações semânticas da vírgula), Concordância nominal/verbal, Regência nominal/verbal, Crase e Colocação pronominal.',
        highYieldNotes: 'Classificação sintática e morfológica do "que" e "se" e casos especiais de regência.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'POR-03',
        number: 3,
        title: 'Semântica & Intertextualidade',
        description: 'Sinonímia, antonímia, homonímia, paronímia, polissemia, hiponímia, hiperonímia e ambiguidade. Mecanismos de intertextualidade (paráfrase, alusão, citação, paródia) em diversos gêneros textuais.',
        highYieldNotes: 'Identificação do tipo de intertextualidade (alusão x paráfrase).',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'POR-04',
        number: 4,
        title: 'Estilística & Figuras de Linguagem',
        description: 'Figuras de palavras (metáfora, metonímia), de pensamento (antítese, paradoxo, ironia), de construção (elipse, zeugma, anacoluto, aliteração) e de som. Discurso direto, indireto e discurso indireto livre.',
        highYieldNotes: 'Discurso indireto livre (ex: Vidas Secas, Graciliano Ramos).',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'POR-05',
        number: 5,
        title: 'Leitura, Interpretação de Texto & Variedades Linguísticas',
        description: 'Gêneros textuais, textos literários e não-literários. Funções da linguagem (referencial, poética, conativa, metalinguística). Leitura profunda: inferências, pressupostos e implícitos. Variedades linguísticas.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'POR-06',
        number: 6,
        title: 'Literatura Brasileira (Barroco ao Modernismo e Contemporânea)',
        description: 'Escolas literárias: Barroco (Gregório de Matos, Pe. Antônio Vieira), Arcadismo, Romantismo (gerações de poesia e prosa), Realismo-Naturalismo (Machado de Assis, Aluísio Azevedo), Parnasianismo, Simbolismo, Pré-Modernismo, Vanguardas Europeias, Modernismo (1ª, 2ª e 3ª gerações) e Tendências Contemporâneas.',
        highYieldNotes: 'Sermões de Pe. Antônio Vieira (aforismos) e poesia romântica/condoreira de Castro Alves.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'POR-07',
        number: 7,
        title: 'Literatura Portuguesa (Medieval ao Modernismo)',
        description: 'Trovadorismo, Humanismo, Classicismo (Luís de Camões - Os Lusíadas e lírica), Barroco, Neoclassicismo, Romantismo, Realismo (Eça de Queirós), Simbolismo, Modernismo (Fernando Pessoa e heterônimos: Caeiro, Reis, Campos, Soares) e literatura contemporânea.',
        highYieldNotes: 'Episódios célebres de Os Lusíadas e heterônimos de Fernando Pessoa.',
        phase: 'ambas',
        importance: 'Extrema (Top ITA)'
      }
    ]
  },
  {
    subject: 'Inglês',
    iconName: 'BookOpenCheck',
    badgeColor: 'bg-purple-400 text-black',
    bgColor: 'border-purple-500',
    phase1Format: '12 Questões Objetivas de Múltipla Escolha',
    phase2Format: 'Caráter Eliminatório (Nota Mínima Exigida)',
    description: 'A prova de Inglês do ITA é focada na leitura e interpretação instrumental de artigos científicos autênticos (Scientific American, Nature, BBC, Forbes, The Guardian). Avalia inferência, vocabulário científico, conectivos acadêmicos e falsos cognatos.',
    recommendedBooks: [
      'Artigos originais de divulgação científica (Scientific American, Nature, MIT Tech Review)',
      'Inglês Instrumental para Concursos de Alto Nível — Eduardo Amos',
      'Grammar in Use (Advanced) — Martin Hewings (Cambridge)'
    ],
    topics: [
      {
        id: 'ING-01',
        number: 1,
        title: 'Compreensão Leitora & Inferência Textual',
        description: 'Leitura global e detalhada de textos autênticos de divulgação científica, tecnologia, astrofísica e inteligência artificial. Predição de conteúdos e dedução do propósito do autor.',
        phase: '1a',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'ING-02',
        number: 2,
        title: 'Conectivos e Marcadores Discursivos Acadêmicos',
        description: 'Reconhecimento de conjunções e advérbios de nível avançado: notwithstanding, albeit, hence, hitherto, whereby, inasmuch as, insofar as, puzzlingly, cogently.',
        highYieldNotes: 'Substituição do termo HENCE e WHILE mantendo o sentido original.',
        phase: '1a',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'ING-03',
        number: 3,
        title: 'Falsos Cognatos & Expressões Idiomáticas Científicas',
        description: 'Identificação de falsos cognatos em contextos científicos (ex: comprehensive = abrangente; physician = médico; data = dados; eventually = com o tempo) e expressões idiomáticas.',
        phase: '1a',
        importance: 'Alta'
      },
      {
        id: 'ING-04',
        number: 4,
        title: 'Estruturas Gramaticais Avançadas & Voz Passiva',
        description: 'Reescrita de orações (paráfrase), voz passiva científica, modais (must, should, might), condicionais e referência pronominal (its, which, former/latter).',
        highYieldNotes: 'Identificação dos referentes "the former" e "the latter" no texto.',
        phase: '1a',
        importance: 'Extrema (Top ITA)'
      }
    ]
  },
  {
    subject: 'Redação',
    iconName: 'Printer',
    badgeColor: 'bg-rose-500 text-white',
    bgColor: 'border-rose-600',
    phase1Format: 'Não cobrada na 1ª Fase',
    phase2Format: '1 Texto Dissertativo-Argumentativo na 2ª Fase',
    description: 'A prova de Redação do ITA é realizada na 2ª fase com duração de 4 horas (junto com Português). Exige texto dissertativo-argumentativo norma-padrão de 25 a 35 linhas, com TÍTULO OBRIGATÓRIO, visão crítica do mundo e fuga de fórmulas prontas.',
    recommendedBooks: [
      'Manual de Redação do ITA e Grade Oficial de Correção',
      'A Produção Textual na Universidade — Ingedore Koch',
      'Comunicação em Prosa Moderna — Othon M. Garcia'
    ],
    topics: [
      {
        id: 'RED-01',
        number: 1,
        title: 'Tema & Adequação da Leitura de Mundo',
        description: 'Compreensão profunda do tema proposto a partir dos textos motivadores (ex: "O papel da Engenharia na construção de um mundo justo e um planeta sustentável" ou "A importância do comprometimento do jovem engenheiro com a prevenção do próprio apodrecimento cerebral"). Exige fuga de tangenciamentos e originalidade.',
        phase: '2a',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'RED-02',
        number: 2,
        title: 'Estrutura & Tipo Textual Dissertativo-Argumentativo',
        description: 'Texto estritamente dissertativo-argumentativo com TÍTULO OBRIGATÓRIO e extenção rígida de 25 a 35 linhas. Proibição de narração, fórmulas prontas ou modelo coringa engessado.',
        phase: '2a',
        importance: 'Extrema (Top ITA)'
      },
      {
        id: 'RED-03',
        number: 3,
        title: 'Coerência, Coesão e Modalidade Gramatical Norma-Padrão',
        description: 'Encadeamento lógico de premissas e argumentos, ausência de contradição interna. Emprego preciso de conectivos inter e intraparágrafos sem repetições viciosas. Domínio impecável da norma-padrão da Língua Portuguesa.',
        phase: '2a',
        importance: 'Extrema (Top ITA)'
      }
    ]
  }
];

export const SyllabusItaView: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('TODAS');
  const [selectedPhase, setSelectedPhase] = useState<'all' | '1a' | '2a'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSubject, setExpandedSubject] = useState<string | null>('Física');

  // Load mastered/studied topics from localStorage
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('mnaero_syllabus_progress_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mnaero_syllabus_progress_v1', JSON.stringify(completedTopics));
    } catch (e) {
      console.error('Erro ao salvar progresso do edital:', e);
    }
  }, [completedTopics]);

  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  // Filtered syllabi list
  const filteredSyllabus = ITA_SYLLABUS_DATA.filter((s) => {
    if (selectedSubject !== 'TODAS' && s.subject.toUpperCase() !== selectedSubject.toUpperCase()) {
      return false;
    }
    return true;
  }).map((s) => {
    const filteredTopics = s.topics.filter((t) => {
      // Phase filter
      if (selectedPhase === '1a' && t.phase === '2a') return false;
      if (selectedPhase === '2a' && t.phase === '1a') return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(query);
        const matchesDesc = t.description.toLowerCase().includes(query);
        const matchesNotes = t.highYieldNotes?.toLowerCase().includes(query) || false;
        return matchesTitle || matchesDesc || matchesNotes;
      }

      return true;
    });

    return {
      ...s,
      topics: filteredTopics,
    };
  }).filter((s) => s.topics.length > 0 || (searchQuery === '' && selectedPhase === 'all'));

  // Global completion metrics
  let totalTopics = 0;
  let doneTopics = 0;
  ITA_SYLLABUS_DATA.forEach((s) => {
    s.topics.forEach((t) => {
      totalTopics++;
      if (completedTopics[t.id]) doneTopics++;
    });
  });

  const overallPercentage = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-mono pb-12">
      {/* CSS Rules for Printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-syllabus-area, #printable-syllabus-area * {
            visibility: visible;
          }
          #printable-syllabus-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 10mm;
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Banner */}
      <div className="bg-[#F7F3EF] border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#FF6321]" />
              <span>Edital Unificado Oficial // ITA 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black italic tracking-tight text-black">
              Programa de Matérias do Vestibular ITA
            </h1>
            <p className="text-xs font-sans text-black/80 max-w-2xl leading-relaxed">
              Consulte todo o conteúdo programático do Exame de Escolaridade para ingresso no Instituto Tecnológico de Aeronáutica. Marque seu progresso conforme avança nos estudos de cada tópico da 1ª e 2ª fase.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="bg-white border-2 border-black p-4 text-center space-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0 min-w-[200px]">
            <span className="text-[10px] uppercase font-bold text-black/60 block">Progresso Geral do Edital</span>
            <div className="font-serif font-black text-3xl text-black">
              {doneTopics} <span className="text-sm font-mono font-normal text-black/60">/ {totalTopics}</span>
            </div>
            <div className="w-full bg-zinc-200 h-2.5 border border-black overflow-hidden mt-1">
              <div 
                className="bg-[#FF6321] h-full transition-all duration-500" 
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-[#FF6321] block mt-0.5">{overallPercentage}% Concluído</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar (No Print) */}
      <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-black/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar tópico do edital (ex: Bernoulli, Cônicas, Le Chatelier, Relatividade)..."
              className="w-full bg-[#F7F3EF] border-2 border-black pl-9 pr-3 py-2 text-xs font-mono text-black focus:outline-none focus:bg-white transition-all placeholder:text-black/40 font-bold"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-black/60 hover:text-black cursor-pointer"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 bg-black hover:bg-[#FF6321] hover:text-black text-white font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <Printer className="w-4 h-4 text-[#FF6321] group-hover:text-black" />
            <span>Imprimir Programa</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-black/10 text-xs">
          {/* Subject Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase text-black/60 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#FF6321]" /> Matéria:
            </span>
            {['TODAS', 'Física', 'Matemática', 'Química', 'Português', 'Inglês', 'Redação'].map((subj) => (
              <button
                key={subj}
                type="button"
                onClick={() => setSelectedSubject(subj)}
                className={`px-3 py-1 font-bold text-[11px] border border-black transition-all cursor-pointer uppercase ${
                  selectedSubject === subj
                    ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-[#F7F3EF] text-black hover:bg-black/10'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* Phase Filter */}
          <div className="flex items-center gap-1 bg-[#F7F3EF] border border-black p-1">
            <span className="text-[10px] font-bold uppercase text-black/60 px-1">Fase:</span>
            <button
              type="button"
              onClick={() => setSelectedPhase('all')}
              className={`px-2.5 py-0.5 text-[10px] font-bold uppercase cursor-pointer ${
                selectedPhase === 'all' ? 'bg-black text-white' : 'text-black hover:bg-black/10'
              }`}
            >
              Todas
            </button>
            <button
              type="button"
              onClick={() => setSelectedPhase('1a')}
              className={`px-2.5 py-0.5 text-[10px] font-bold uppercase cursor-pointer ${
                selectedPhase === '1a' ? 'bg-black text-white' : 'text-black hover:bg-black/10'
              }`}
            >
              1ª Fase
            </button>
            <button
              type="button"
              onClick={() => setSelectedPhase('2a')}
              className={`px-2.5 py-0.5 text-[10px] font-bold uppercase cursor-pointer ${
                selectedPhase === '2a' ? 'bg-black text-white' : 'text-black hover:bg-black/10'
              }`}
            >
              2ª Fase
            </button>
          </div>
        </div>
      </div>

      {/* Main Syllabus Content Area */}
      <div id="printable-syllabus-area" className="space-y-6">
        {filteredSyllabus.length === 0 ? (
          <div className="bg-white border-2 border-black p-8 text-center space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <AlertTriangle className="w-8 h-8 text-[#FF6321] mx-auto" />
            <h3 className="font-serif font-black text-lg">Nenhum tópico encontrado com os filtros atuais</h3>
            <p className="text-xs text-black/70 max-w-md mx-auto">
              Tente redefinir o termo digitado na busca ou selecionar "Todas as Matérias" no menu superior.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedSubject('TODAS');
                setSelectedPhase('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-black text-white text-xs uppercase font-bold border border-black cursor-pointer hover:bg-[#FF6321] hover:text-black transition-all"
            >
              Restaurar Filtros Padrão
            </button>
          </div>
        ) : (
          filteredSyllabus.map((subjectData) => {
            const isExpanded = expandedSubject === subjectData.subject || searchQuery !== '' || selectedSubject !== 'TODAS';
            const subjectDoneCount = subjectData.topics.filter((t) => completedTopics[t.id]).length;
            const subjectTotalCount = subjectData.topics.length;
            const subjectPct = subjectTotalCount > 0 ? Math.round((subjectDoneCount / subjectTotalCount) * 100) : 0;

            return (
              <div 
                key={subjectData.subject}
                className={`bg-white border-2 ${subjectData.bgColor} shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all`}
              >
                {/* Subject Accordion Header */}
                <div 
                  onClick={() => setExpandedSubject(isExpanded && searchQuery === '' && selectedSubject === 'TODAS' ? null : subjectData.subject)}
                  className="p-4 sm:p-5 bg-[#F7F3EF] border-b-2 border-black flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-black/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`px-2.5 py-1 ${subjectData.badgeColor} font-serif font-black italic text-sm border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                      {subjectData.subject}
                    </div>
                    <div>
                      <h2 className="font-serif font-black text-xl italic text-black">
                        Programa de {subjectData.subject}
                      </h2>
                      <p className="text-[11px] font-sans text-black/70 hidden sm:block">
                        1ª Fase: {subjectData.phase1Format} | 2ª Fase: {subjectData.phase2Format}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Subject Progress Pill */}
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-black/60 block">Progresso:</span>
                      <span className="font-serif font-black text-sm text-black">
                        {subjectDoneCount}/{subjectTotalCount} ({subjectPct}%)
                      </span>
                    </div>

                    <button 
                      type="button"
                      className="p-1 bg-white border border-black hover:bg-black hover:text-white transition-all"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Subject Body Details */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 space-y-6">
                    {/* Format Banner & Books Box */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                      {/* Description & Format */}
                      <div className="md:col-span-2 p-4 bg-[#F7F3EF] border-2 border-black space-y-2">
                        <div className="flex items-center gap-2 font-mono font-bold text-black border-b border-black/20 pb-1.5 uppercase text-[11px]">
                          <Info className="w-4 h-4 text-[#FF6321]" />
                          <span>Perfil & Exigências do ITA</span>
                        </div>
                        <p className="text-xs leading-relaxed text-black/80 font-medium">
                          {subjectData.description}
                        </p>
                      </div>

                      {/* Recommended Bibliography */}
                      <div className="p-4 bg-zinc-900 text-white border-2 border-black space-y-2">
                        <div className="flex items-center gap-2 font-mono font-bold text-[#FF6321] border-b border-zinc-700 pb-1.5 uppercase text-[11px]">
                          <BookOpen className="w-4 h-4" />
                          <span>Bibliografia Consagrada ITA</span>
                        </div>
                        <ul className="space-y-1 text-[11px] text-zinc-300 list-disc list-inside">
                          {subjectData.recommendedBooks.map((book, idx) => (
                            <li key={idx} className="leading-tight">{book}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Topics Table List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b-2 border-black pb-2">
                        <h3 className="font-serif font-black text-base italic text-black flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#FF6321]" />
                          Tópicos Fundamentais do Edital Oficial ({subjectData.topics.length})
                        </h3>
                        <span className="text-[10px] font-mono text-black/60 font-bold uppercase">
                          Clique na caixa para marcar como concluído
                        </span>
                      </div>

                      <div className="space-y-3">
                        {subjectData.topics.map((topic) => {
                          const isDone = completedTopics[topic.id] || false;

                          return (
                            <div 
                              key={topic.id}
                              className={`border-2 border-black p-3.5 sm:p-4 transition-all ${
                                isDone ? 'bg-emerald-50/70 border-emerald-800' : 'bg-white hover:bg-[#F7F3EF]'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                {/* Interactive Checkbox */}
                                <button
                                  type="button"
                                  onClick={() => toggleTopicCompletion(topic.id)}
                                  className="mt-0.5 shrink-0 cursor-pointer text-black hover:text-[#FF6321] transition-colors"
                                  title={isDone ? 'Marcar como não estudado' : 'Marcar como concluído/estudado'}
                                >
                                  {isDone ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-700 fill-emerald-100" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-black/40" />
                                  )}
                                </button>

                                <div className="space-y-1.5 flex-1">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="bg-black text-white text-[10px] font-mono font-bold px-2 py-0.5 border border-black">
                                        {topic.id}
                                      </span>
                                      <h4 className={`font-serif font-bold text-sm sm:text-base ${isDone ? 'line-through text-black/60' : 'text-black'}`}>
                                        {topic.number}. {topic.title}
                                      </h4>
                                    </div>

                                    {/* Importance Badge */}
                                    <div className="flex items-center gap-1.5">
                                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border border-black uppercase ${
                                        topic.importance === 'Extrema (Top ITA)'
                                          ? 'bg-rose-500 text-white'
                                          : topic.importance === 'Alta'
                                          ? 'bg-amber-300 text-black'
                                          : 'bg-zinc-200 text-black'
                                      }`}>
                                        {topic.importance}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Description */}
                                  <p className="text-xs font-sans text-black/80 leading-relaxed">
                                    {topic.description}
                                  </p>

                                  {/* High Yield Note if available */}
                                  {topic.highYieldNotes && (
                                    <div className="p-2 bg-amber-50 border border-amber-300 text-[11px] font-sans text-amber-950 flex items-start gap-1.5 mt-1">
                                      <Flame className="w-3.5 h-3.5 text-[#FF6321] shrink-0 mt-0.5" />
                                      <span>
                                        <strong>Recorrência / Foco ITA:</strong> {topic.highYieldNotes}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
