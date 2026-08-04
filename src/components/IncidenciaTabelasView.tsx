import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Filter, 
  Search, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  HelpCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { Subject } from '../types';

interface IncidenciaTabelasViewProps {
  onStartPomodoroForTopic?: (topicName: string, subject: Subject) => void;
}

interface IncidenciaItem {
  id: string;
  subject: 'Matemática' | 'Física' | 'Química';
  topic: string;
  yearlyCounts: number[]; // 2016-2017 up to 2025-2026 (10 years)
  total10Years: number;
  total5Years: number;
  pct5Years: number;
  pct10Years: number;
  rank5Years: number;
  rank10Years: number;
  keyNote?: string;
}

export const IncidenciaTabelasView: React.FC<IncidenciaTabelasViewProps> = ({
  onStartPomodoroForTopic,
}) => {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<'Todas' | 'Matemática' | 'Física' | 'Química'>('Todas');
  const [timePeriodFilter, setTimePeriodFilter] = useState<'5anos' | '10anos' | 'matriz'>('5anos');
  const [searchTerm, setSearchTerm] = useState('');

  // 10 Years: 2016/17, 2017/18, 2018/19, 2019/20, 2020/21, 2021/22, 2022/23, 2023/24, 2024/25, 2025/26
  const yearLabels = [
    '2016/17', '2017/18', '2018/19*', '2019/20', '2020/21',
    '2021/22', '2022/23', '2023/24', '2024/25*', '2025/26'
  ];

  // MATEMÁTICA
  const matItems: IncidenciaItem[] = [
    {
      id: 'mat-geometria-plana',
      subject: 'Matemática',
      topic: 'Geometria Plana (triângulos, polígonos e círculos)',
      yearlyCounts: [3, 5, 1, 2, 4, 4, 4, 2, 0, 2],
      total10Years: 27,
      total5Years: 12,
      pct5Years: 15.38,
      pct10Years: 14.14,
      rank5Years: 1,
      rank10Years: 1,
      keyNote: 'Assunto #1 mais cobrado no ITA. Quase 16% da 1ª Fase.'
    },
    {
      id: 'mat-geometria-espacial',
      subject: 'Matemática',
      topic: 'Geometria Espacial (prismas, pirâmides, cilindros, cones e esferas)',
      yearlyCounts: [0, 1, 2, 2, 3, 3, 1, 2, 2, 1],
      total10Years: 17,
      total5Years: 9,
      pct5Years: 11.54,
      pct10Years: 8.90,
      rank5Years: 2,
      rank10Years: 3,
      keyNote: 'Alto índice de incidência em sólidos inscritos e circunscritos.'
    },
    {
      id: 'mat-geometria-analitica',
      subject: 'Matemática',
      topic: 'Geometria Analítica (reta, circunferência e cônicas)',
      yearlyCounts: [3, 3, 2, 2, 1, 1, 1, 3, 2, 2],
      total10Years: 20,
      total5Years: 9,
      pct5Years: 11.54,
      pct10Years: 10.47,
      rank5Years: 3,
      rank10Years: 2,
      keyNote: 'Fortemente focado em excentricidade de cônicas e interseções.'
    },
    {
      id: 'mat-complexos',
      subject: 'Matemática',
      topic: 'Números complexos (formas algébrica e trigonométrica)',
      yearlyCounts: [0, 1, 1, 2, 1, 1, 2, 1, 1, 2],
      total10Years: 12,
      total5Years: 8,
      pct5Years: 10.26,
      pct10Years: 6.28,
      rank5Years: 4,
      rank10Years: 9,
      keyNote: 'Cresceu muito nos últimos 5 anos. Raízes da unidade e forma polar.'
    },
    {
      id: 'mat-polinomios',
      subject: 'Matemática',
      topic: 'Polinômios (raízes, fatoração e relações de Girard)',
      yearlyCounts: [0, 2, 2, 3, 1, 1, 1, 2, 1, 1],
      total10Years: 14,
      total5Years: 6,
      pct5Years: 7.69,
      pct10Years: 7.33,
      rank5Years: 5,
      rank10Years: 6,
      keyNote: 'Relações de Girard e raízes complexas de coeficientes reais.'
    },
    {
      id: 'mat-matrizes',
      subject: 'Matemática',
      topic: 'Matrizes e determinantes',
      yearlyCounts: [1, 4, 1, 1, 2, 1, 1, 0, 0, 2],
      total10Years: 13,
      total5Years: 6,
      pct5Years: 7.69,
      pct10Years: 6.81,
      rank5Years: 6,
      rank10Years: 8,
      keyNote: 'Propriedades de determinantes de ordem n e matrizes ortogonais.'
    },
    {
      id: 'mat-pa-pg',
      subject: 'Matemática',
      topic: 'Progressão Aritmética (P.A.) e Progressão Geométrica (P.G.)',
      yearlyCounts: [3, 2, 2, 2, 1, 0, 1, 2, 1, 1],
      total10Years: 15,
      total5Years: 5,
      pct5Years: 6.41,
      pct10Years: 7.85,
      rank5Years: 7,
      rank10Years: 5,
      keyNote: 'Muito misturado com Geometria e Logaritmos.'
    },
    {
      id: 'mat-trigonometria',
      subject: 'Matemática',
      topic: 'Trigonometria e Equações trigonométricas',
      yearlyCounts: [4, 1, 1, 2, 1, 3, 1, 1, 1, 1],
      total10Years: 16,
      total5Years: 5,
      pct5Years: 6.41,
      pct10Years: 8.38,
      rank5Years: 8,
      rank10Years: 4,
      keyNote: 'Transformações em produto e identidades avançadas.'
    },
    {
      id: 'mat-funcoes',
      subject: 'Matemática',
      topic: 'Funções (injetoras, sobrejetoras, bijetoras, compostas e inversas)',
      yearlyCounts: [2, 1, 1, 0, 2, 0, 1, 0, 1, 1],
      total10Years: 9,
      total5Years: 5,
      pct5Years: 6.41,
      pct10Years: 4.71,
      rank5Years: 9,
      rank10Years: 11,
      keyNote: 'Dominío, contradomínio e equações funcionais.'
    },
    {
      id: 'mat-combinatoria',
      subject: 'Matemática',
      topic: 'Análise combinatória e Probabilidade',
      yearlyCounts: [2, 2, 1, 0, 2, 2, 1, 0, 0, 0],
      total10Years: 10,
      total5Years: 5,
      pct5Years: 6.41,
      pct10Years: 5.24,
      rank5Years: 10,
      rank10Years: 10,
      keyNote: 'Princípio da inclusão-exclusão e probabilidade condicional.'
    },
    {
      id: 'mat-equacoes-algebricas',
      subject: 'Matemática',
      topic: 'Equações algébricas e teoria dos números',
      yearlyCounts: [3, 1, 2, 2, 1, 1, 1, 1, 2, 0],
      total10Years: 14,
      total5Years: 5,
      pct5Years: 6.41,
      pct10Years: 7.33,
      rank5Years: 11,
      rank10Years: 7,
      keyNote: 'Congruência modular, divisibilidade e raízes racionais.'
    },
    {
      id: 'mat-exp-log',
      subject: 'Matemática',
      topic: 'Funções exponencial e logarítmica',
      yearlyCounts: [1, 1, 0, 1, 1, 1, 2, 0, 0, 1],
      total10Years: 8,
      total5Years: 4,
      pct5Years: 5.13,
      pct10Years: 4.19,
      rank5Years: 12,
      rank10Years: 12,
      keyNote: 'Inequações logarítmicas e mudança de base.'
    },
    {
      id: 'mat-conjuntos',
      subject: 'Matemática',
      topic: 'Teoria de conjuntos e subconjuntos',
      yearlyCounts: [1, 0, 0, 0, 1, 0, 0, 2, 0, 0],
      total10Years: 4,
      total5Years: 3,
      pct5Years: 3.85,
      pct10Years: 2.09,
      rank5Years: 13,
      rank10Years: 15,
      keyNote: 'Lógica matemática e relações entre conjuntos.'
    },
    {
      id: 'mat-sistemas',
      subject: 'Matemática',
      topic: 'Sistemas lineares (resolução e discussão)',
      yearlyCounts: [1, 2, 1, 0, 0, 1, 0, 1, 0, 1],
      total10Years: 7,
      total5Years: 3,
      pct5Years: 3.85,
      pct10Years: 3.66,
      rank5Years: 14,
      rank10Years: 13,
      keyNote: 'Regra de Cramer e escalonamento paramétrico.'
    },
    {
      id: 'mat-binomio',
      subject: 'Matemática',
      topic: 'Binômio de Newton',
      yearlyCounts: [1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
      total10Years: 5,
      total5Years: 2,
      pct5Years: 2.56,
      pct10Years: 2.62,
      rank5Years: 15,
      rank10Years: 14,
      keyNote: 'Termo geral e somatórias de coeficientes binomiais.'
    }
  ];

  // FÍSICA
  const fisItems: IncidenciaItem[] = [
    {
      id: 'fis-cinematica',
      subject: 'Física',
      topic: 'Cinemática da partícula (escalar e vetorial)',
      yearlyCounts: [2, 8, 1, 2, 2, 2, 4, 1, 1, 2],
      total10Years: 25,
      total5Years: 10,
      pct5Years: 11.90,
      pct10Years: 13.23,
      rank5Years: 2,
      rank10Years: 1,
      keyNote: 'Lançamentos oblíquos e movimento relativo em coordenadas polares.'
    },
    {
      id: 'fis-trabalho-energia',
      subject: 'Física',
      topic: 'Trabalho e energia mecânica, quantidade de movimento, impulso',
      yearlyCounts: [2, 2, 2, 2, 3, 3, 2, 2, 1, 2],
      total10Years: 21,
      total5Years: 10,
      pct5Years: 11.90,
      pct10Years: 11.11,
      rank5Years: 1,
      rank10Years: 2,
      keyNote: 'Colisões bidimensionais e conservação com sistemas de massa variável.'
    },
    {
      id: 'fis-ondas',
      subject: 'Física',
      topic: 'Ondas e fenômenos ondulatórios',
      yearlyCounts: [3, 2, 1, 2, 1, 1, 2, 1, 2, 3],
      total10Years: 18,
      total5Years: 9,
      pct5Years: 10.71,
      pct10Years: 9.52,
      rank5Years: 3,
      rank10Years: 3,
      keyNote: 'Efeito Doppler, interferência em cordas e tubos sonoros.'
    },
    {
      id: 'fis-magnetismo',
      subject: 'Física',
      topic: 'Magnetismo e indução eletromagnética',
      yearlyCounts: [2, 2, 2, 1, 2, 2, 2, 2, 1, 1],
      total10Years: 17,
      total5Years: 8,
      pct5Years: 9.52,
      pct10Years: 8.99,
      rank5Years: 4,
      rank10Years: 4,
      keyNote: 'Força de Lorentz, Lei de Faraday e campo de espiras/solenoides.'
    },
    {
      id: 'fis-gases-termo',
      subject: 'Física',
      topic: 'Gases perfeitos e leis da Termodinâmica',
      yearlyCounts: [1, 2, 1, 2, 1, 0, 2, 0, 2, 2],
      total10Years: 13,
      total5Years: 6,
      pct5Years: 7.14,
      pct10Years: 6.88,
      rank5Years: 5,
      rank10Years: 5,
      keyNote: 'Ciclos de Carnot, politrópicas e rendimento de máquinas térmicas.'
    },
    {
      id: 'fis-newton',
      subject: 'Física',
      topic: 'Leis de Newton e aplicações',
      yearlyCounts: [1, 1, 0, 3, 0, 1, 1, 1, 1, 2],
      total10Years: 11,
      total5Years: 6,
      pct5Years: 7.14,
      pct10Years: 5.82,
      rank5Years: 6,
      rank10Years: 7,
      keyNote: 'Atrito estático/cinético e referenciais não-inerciais (forças fictícias).'
    },
    {
      id: 'fis-mhs',
      subject: 'Física',
      topic: 'Movimento Harmônico Simples (MHS)',
      yearlyCounts: [1, 2, 0, 1, 1, 1, 0, 2, 1, 1],
      total10Years: 10,
      total5Years: 5,
      pct5Years: 5.95,
      pct10Years: 5.29,
      rank5Years: 7,
      rank10Years: 8,
      keyNote: 'Sistemas massa-mola, pêndulos e acoplamentos mecânicos.'
    },
    {
      id: 'fis-eletrostatica',
      subject: 'Física',
      topic: 'Eletrostática (campo, potencial e capacitores)',
      yearlyCounts: [1, 1, 1, 3, 2, 1, 2, 1, 1, 0],
      total10Years: 13,
      total5Years: 5,
      pct5Years: 5.95,
      pct10Years: 6.88,
      rank5Years: 8,
      rank10Years: 6,
      keyNote: 'Capacitores em associação, dieletricos e energia eletrostática.'
    },
    {
      id: 'fis-optica-geometrica',
      subject: 'Física',
      topic: 'Óptica geométrica (espelhos e lentes)',
      yearlyCounts: [0, 1, 2, 1, 1, 2, 0, 2, 1, 0],
      total10Years: 10,
      total5Years: 5,
      pct5Years: 5.95,
      pct10Years: 5.29,
      rank5Years: 9,
      rank10Years: 9,
      keyNote: 'Lei de Snell, dioptros e instrumentos ópticos compostos.'
    },
    {
      id: 'fis-estatica',
      subject: 'Física',
      topic: 'Estática de corpos rígidos',
      yearlyCounts: [4, 0, 1, 0, 0, 2, 1, 0, 1, 0],
      total10Years: 9,
      total5Years: 4,
      pct5Years: 4.76,
      pct10Years: 4.76,
      rank5Years: 10,
      rank10Years: 11,
      keyNote: 'Torque, centro de gravidade e equilíbrio de vínculos.'
    },
    {
      id: 'fis-hidrostatica',
      subject: 'Física',
      topic: 'Hidrostática',
      yearlyCounts: [0, 0, 0, 0, 0, 0, 1, 0, 2, 1],
      total10Years: 4,
      total5Years: 4,
      pct5Years: 4.76,
      pct10Years: 2.12,
      rank5Years: 11,
      rank10Years: 17,
      keyNote: 'Teorema de Stevin, Impulso de Empuxo (Arquimedes) e tubos em U.'
    },
    {
      id: 'fis-[#FF6321]sional',
      subject: 'Física',
      topic: 'Análise dimensional e S.I.',
      yearlyCounts: [1, 1, 0, 1, 1, 2, 0, 0, 0, 1],
      total10Years: 7,
      total5Years: 3,
      pct5Years: 3.57,
      pct10Years: 3.70,
      rank5Years: 12,
      rank10Years: 12,
      keyNote: 'Teorema dos Pi de Buckingham e dimensões de constantes físicas.'
    },
    {
      id: 'fis-gravitacao',
      subject: 'Física',
      topic: 'Gravitação universal e leis de Kepler',
      yearlyCounts: [1, 2, 1, 1, 1, 0, 0, 1, 1, 1],
      total10Years: 9,
      total5Years: 3,
      pct5Years: 3.57,
      pct10Years: 4.76,
      rank5Years: 13,
      rank10Years: 10,
      keyNote: 'Órbita elíptica, velocidade de escape e marés.'
    },
    {
      id: 'fis-[#FF6321]na',
      subject: 'Física',
      topic: 'Física moderna',
      yearlyCounts: [3, 1, 0, 0, 0, 1, 1, 0, 1, 0],
      total10Years: 7,
      total5Years: 3,
      pct5Years: 3.57,
      pct10Years: 3.70,
      rank5Years: 15,
      rank10Years: 13,
      keyNote: 'Efeito fotoelétrico, comprimento de onda de De Broglie e relatividade.'
    },
    {
      id: 'fis-eletrodinamica',
      subject: 'Física',
      topic: 'Eletrodinâmica (leis de Ohm e Kirchhoff)',
      yearlyCounts: [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
      total10Years: 6,
      total5Years: 3,
      pct5Years: 3.57,
      pct10Years: 3.17,
      rank5Years: 16,
      rank10Years: 15,
      keyNote: 'Pontes de Wheatstone, circuitos RC e malhas de Kirchhoff.'
    },
    {
      id: 'fis-hidrodinamica',
      subject: 'Física',
      topic: 'Hidrodinâmica',
      yearlyCounts: [1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
      total10Years: 6,
      total5Years: 2,
      pct5Years: 2.38,
      pct10Years: 3.17,
      rank5Years: 17,
      rank10Years: 14,
      keyNote: 'Equação de Bernoulli e equação da continuidade.'
    },
    {
      id: 'fis-termologia',
      subject: 'Física',
      topic: 'Termologia e escalas termométricas',
      yearlyCounts: [0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
      total10Years: 3,
      total5Years: 2,
      pct5Years: 2.38,
      pct10Years: 1.59,
      rank5Years: 18,
      rank10Years: 18,
      keyNote: 'Dilatação térmica linear, superficial e volumétrica associada a MHS.'
    }
  ];

  // QUÍMICA
  const quiItems: IncidenciaItem[] = [
    {
      id: 'qui-equilibrio',
      subject: 'Química',
      topic: 'Equilíbrio químico e Equilíbrios iônicos',
      yearlyCounts: [2, 2, 1, 3, 0, 3, 4, 3, 1, 1],
      total10Years: 20,
      total5Years: 12,
      pct5Years: 14.29,
      pct10Years: 10.20,
      rank5Years: 1,
      rank10Years: 1,
      keyNote: 'Assunto #1 em Química! Kp, Kc, pH, pOH, tampão e produto de solubilidade (Kps).'
    },
    {
      id: 'qui-solucoes',
      subject: 'Química',
      topic: 'Soluções e titulações',
      yearlyCounts: [1, 2, 1, 1, 3, 2, 2, 3, 1, 1],
      total10Years: 17,
      total5Years: 9,
      pct5Years: 10.71,
      pct10Years: 8.67,
      rank5Years: 2,
      rank10Years: 2,
      keyNote: 'Curvas de titulação ácido-base, diluição e concentração molar.'
    },
    {
      id: 'qui-termoquimica',
      subject: 'Química',
      topic: 'Termoquímica e termodinâmica',
      yearlyCounts: [2, 3, 0, 0, 1, 3, 1, 3, 2, 1],
      total10Years: 16,
      total5Years: 9,
      pct5Years: 10.71,
      pct10Years: 4,
      rank5Years: 3,
      rank10Years: 4,
      keyNote: 'Lei de Hess, energia de ligação, entropia (S) e energia livre de Gibbs (G).'
    },
    {
      id: 'qui-organica-isomeria',
      subject: 'Química',
      topic: 'Química Orgânica, propriedades dos compostos e isomeria',
      yearlyCounts: [2, 4, 2, 0, 3, 2, 2, 1, 0, 1],
      total10Years: 17,
      total5Years: 6,
      pct5Years: 7.14,
      pct10Years: 8.67,
      rank5Years: 4,
      rank10Years: 3,
      keyNote: 'Isomeria óptica (carbono quiral), acidez/basocidade orgânica.'
    },
    {
      id: 'qui-reacoes-organicas',
      subject: 'Química',
      topic: 'Reações orgânicas',
      yearlyCounts: [3, 3, 1, 2, 1, 1, 2, 1, 1, 1],
      total10Years: 16,
      total5Years: 6,
      pct5Years: 7.14,
      pct10Years: 8.16,
      rank5Years: 5,
      rank10Years: 5,
      keyNote: 'Substituição eletrofílica aromática, esterificação, ozonólise.'
    },
    {
      id: 'qui-propriedades-materia',
      subject: 'Química',
      topic: 'Propriedades físicas e químicas da matéria',
      yearlyCounts: [1, 0, 3, 2, 2, 2, 2, 0, 1, 1],
      total10Years: 14,
      total5Years: 6,
      pct5Years: 7.14,
      pct10Years: 7.14,
      rank5Years: 6,
      rank10Years: 6,
      keyNote: 'Ponto de fusão/ebulição, densidade, diagramas de fase.'
    },
    {
      id: 'qui-gases',
      subject: 'Química',
      topic: 'Estudo dos gases (ideais e reais)',
      yearlyCounts: [1, 2, 1, 1, 1, 2, 1, 0, 1, 1],
      total10Years: 11,
      total5Years: 5,
      pct5Years: 5.95,
      pct10Years: 5.61,
      rank5Years: 7,
      rank10Years: 9,
      keyNote: 'Equação de van der Waals, efusão/difusão de Graham.'
    },
    {
      id: 'qui-cinetica',
      subject: 'Química',
      topic: 'Cinética química e catalisadores',
      yearlyCounts: [2, 1, 1, 1, 1, 0, 2, 0, 2, 1],
      total10Years: 11,
      total5Years: 5,
      pct5Years: 5.95,
      pct10Years: 5.61,
      rank5Years: 8,
      rank10Years: 10,
      keyNote: 'Lei de velocidade de reação, mecanismo em etapas e catálise.'
    },
    {
      id: 'qui-coligativas',
      subject: 'Química',
      topic: 'Propriedades coligativas',
      yearlyCounts: [2, 0, 0, 0, 0, 2, 0, 1, 0, 2],
      total10Years: 7,
      total5Years: 5,
      pct5Years: 5.95,
      pct10Years: 3.57,
      rank5Years: 9,
      rank10Years: 14,
      keyNote: 'Pressão osmótica, tonoscopia, ebulioscopia e fator de van t Hoff (i).'
    },
    {
      id: 'qui-reacoes-inorganicas',
      subject: 'Química',
      topic: 'Reações inorgânicas e oxirredução',
      yearlyCounts: [0, 0, 2, 3, 2, 0, 0, 2, 3, 0],
      total10Years: 12,
      total5Years: 5,
      pct5Years: 5.95,
      pct10Years: 6.12,
      rank5Years: 10,
      rank10Years: 8,
      keyNote: 'Balanceamento por NOX, dupla troca, decomposição térmica.'
    },
    {
      id: 'qui-[#FF6321]rica',
      subject: 'Química',
      topic: 'Tabela periódica e propriedades periódicas',
      yearlyCounts: [1, 1, 1, 0, 1, 0, 2, 1, 1, 1],
      total10Years: 9,
      total5Years: 4,
      pct5Years: 4.76,
      pct10Years: 4.59,
      rank5Years: 11,
      rank10Years: 11,
      keyNote: 'Raio atômico, afinidade eletrônica e energia de ionização.'
    },
    {
      id: 'qui-estequiometria',
      subject: 'Química',
      topic: 'Estequiometria e leis ponderais',
      yearlyCounts: [3, 0, 2, 4, 0, 0, 1, 1, 0, 2],
      total10Years: 13,
      total5Years: 4,
      pct5Years: 4.76,
      pct10Years: 6.63,
      rank5Years: 12,
      rank10Years: 7,
      keyNote: 'Pureza de reagentes, rendimento e reagente limitante.'
    },
    {
      id: 'qui-ambiental',
      subject: 'Química',
      topic: 'Química Ambiental e ciclos da natureza',
      yearlyCounts: [0, 2, 0, 0, 0, 2, 0, 1, 0, 1],
      total10Years: 6,
      total5Years: 4,
      pct5Years: 4.76,
      pct10Years: 3.06,
      rank5Years: 13,
      rank10Years: 17,
      keyNote: 'Efeito estufa, chuva ácida, camada de ozônio e tratamento de água.'
    },
    {
      id: 'qui-radioatividade',
      subject: 'Química',
      topic: 'Radioatividade e reações nucleares',
      yearlyCounts: [0, 3, 2, 0, 0, 1, 0, 1, 1, 1],
      total10Years: 9,
      total5Years: 3,
      pct5Years: 3.57,
      pct10Years: 4.59,
      rank5Years: 14,
      rank10Years: 13,
      keyNote: 'Tempo de meia-vida (t1/2), fissão/fusão e decaimentos alfa/beta/gama.'
    },
    {
      id: 'qui-geometria-molecular',
      subject: 'Química',
      topic: 'Geometria molecular e forças intermoleculares',
      yearlyCounts: [0, 0, 1, 0, 2, 1, 0, 0, 1, 1],
      total10Years: 6,
      total5Years: 3,
      pct5Years: 3.57,
      pct10Years: 3.06,
      rank5Years: 15,
      rank10Years: 16,
      keyNote: 'Teoria VSEPR, hibridização e pontes de hidrogênio.'
    },
    {
      id: 'qui-polimeros',
      subject: 'Química',
      topic: 'Polímeros',
      yearlyCounts: [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      total10Years: 3,
      total5Years: 2,
      pct5Years: 2.38,
      pct10Years: 1.53,
      rank5Years: 16,
      rank10Years: 19,
      keyNote: 'Polímeros de adição e condensação (PET, Nylon, Teflon).'
    },
    {
      id: 'qui-eletroquimica',
      subject: 'Química',
      topic: 'Eletroquímica (pilhas e eletrólise)',
      yearlyCounts: [3, 1, 0, 1, 2, 0, 0, 1, 0, 1],
      total10Years: 9,
      total5Years: 2,
      pct5Years: 2.38,
      pct10Years: 4.59,
      rank5Years: 17,
      rank10Years: 12,
      keyNote: 'Potencial padrão de redução (E0), Pilha de Daniell e Eletrólise ígnea/aquosa.'
    },
    {
      id: 'qui-separacao-misturas',
      subject: 'Química',
      topic: 'Métodos de separação de misturas',
      yearlyCounts: [0, 1, 0, 1, 0, 0, 0, 1, 1, 0],
      total10Years: 4,
      total5Years: 2,
      pct5Years: 2.38,
      pct10Years: 2.04,
      rank5Years: 18,
      rank10Years: 18,
      keyNote: 'Destilação fracionada, centrifugação, levigação e flotação.'
    },
    {
      id: 'qui-estrutura-atomica',
      subject: 'Química',
      topic: 'Estrutura atômica e modelos atômicos',
      yearlyCounts: [2, 1, 1, 0, 2, 0, 0, 1, 0, 0],
      total10Years: 7,
      total5Years: 1,
      pct5Years: 1.19,
      pct10Years: 3.57,
      rank5Years: 19,
      rank10Years: 15,
      keyNote: 'Modelos de Bohr, Sommerfeld, mecânica quântica e números quânticos.'
    }
  ];

  const allItems = [...matItems, ...fisItems, ...quiItems];

  // Filtering
  const filteredItems = allItems.filter((item) => {
    const matchesSubject = selectedSubjectFilter === 'Todas' || item.subject === selectedSubjectFilter;
    const matchesSearch = item.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.keyNote && item.keyNote.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  // Sort according to active time period
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (timePeriodFilter === '5anos') {
      return b.pct5Years - a.pct5Years;
    } else {
      return b.pct10Years - a.pct10Years;
    }
  });

  return (
    <div className="space-y-8 pb-12 font-mono">
      {/* Banner Superior */}
      <div className="bg-white border-2 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#FF6321] tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Matriz Estatística do Vestibular ITA // 1ª Fase Objetiva</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black italic text-black">
              Incidência Real de Questões Prova do ITA
            </h2>
            <p className="text-xs sm:text-sm font-sans text-black/80 mt-1 max-w-3xl leading-relaxed">
              Mapeamento minucioso da recorrência de tópicos nas provas objetivas dos <strong>Últimos 5 Anos (2021-2026)</strong> e <strong>Últimos 10 Anos (2016-2026)</strong>. Mantenha seu foco estratégico nos assuntos de maior relevância.
            </p>
          </div>

          <div className="bg-[#F7F3EF] border-2 border-black p-3.5 space-y-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs text-black shrink-0">
            <div className="text-[10px] font-bold uppercase text-black/60 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Fonte dos Dados</span>
            </div>
            <p className="text-[11px] font-sans">
              Base de Dados Extraída de <strong>marishee</strong> (YouTube/Planilha) & Vestibular.ita.br
            </p>
          </div>
        </div>
      </div>

      {/* Highlights / Major Takeaways by Subject */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Matemática */}
        <div className="bg-[#F7F3EF] border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <span className="bg-black text-white text-xs font-bold px-2 py-0.5 uppercase tracking-wider">
              Matemática
            </span>
            <span className="text-xs font-bold text-[#FF6321]">33% Geometria</span>
          </div>
          <h4 className="text-base font-serif font-black italic text-black">
            Geometrias Lideram
          </h4>
          <p className="text-xs font-sans text-black/80 leading-relaxed">
            <strong>Geometria Plana, Espacial e Analítica</strong> somam <strong>33% da prova</strong>. Em seguida, números complexos, polinômios, trigonometria, PA/PG e matrizes representam <strong>38%</strong>.
          </p>
          <div className="text-[10px] font-mono text-black/60 bg-white border border-black p-2 italic">
            * Dica ITA: PA/PG e Probabilidade aparecem muito misturados com Geometria e Funções.
          </div>
        </div>

        {/* Card 2: Física */}
        <div className="bg-[#F7F3EF] border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <span className="bg-black text-white text-xs font-bold px-2 py-0.5 uppercase tracking-wider">
              Física
            </span>
            <span className="text-xs font-bold text-[#FF6321]">50% Top 5 Assuntos</span>
          </div>
          <h4 className="text-base font-serif font-black italic text-black">
            Cinemática & Mecânica
          </h4>
          <p className="text-xs font-sans text-black/80 leading-relaxed">
            <strong>Cinemática, Trabalho/Energia, Ondulatória, Magnetismo e Termodinâmica</strong> correspondem a <strong>metade exata da prova (50%)</strong> e caem impreterivelmente todos os anos!
          </p>
          <div className="text-[10px] font-mono text-black/60 bg-white border border-black p-2 italic">
            * Dica ITA: Gravitação caiu todo ano nos últimos 3 anos. Eletrostática foca muito em capacitores.
          </div>
        </div>

        {/* Card 3: Química */}
        <div className="bg-[#F7F3EF] border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <span className="bg-black text-white text-xs font-bold px-2 py-0.5 uppercase tracking-wider">
              Química
            </span>
            <span className="text-xs font-bold text-[#FF6321]">45% Equilíbrios & Soluções</span>
          </div>
          <h4 className="text-base font-serif font-black italic text-black">
            Equilíbrios e Físico-Química
          </h4>
          <p className="text-xs font-sans text-black/80 leading-relaxed">
            <strong>Equilíbrios (Iônico/Químico), Soluções, Orgânica, Termoquímica e Reações Orgânicas</strong> somam <strong>45% da prova</strong> de Química.
          </p>
          <div className="text-[10px] font-mono text-black/60 bg-white border border-black p-2 italic">
            * Dica ITA: Propriedades coligativas e tabela periódica subiram de frequência nos anos recentes.
          </div>
        </div>
      </div>

      {/* Control Toolbar: Filter by Subject, View Mode, and Search */}
      <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-black uppercase mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#FF6321]" />
            Matéria:
          </span>
          {(['Todas', 'Matemática', 'Física', 'Química'] as const).map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubjectFilter(sub)}
              className={`px-3 py-1.5 text-xs font-bold uppercase transition-all cursor-pointer border-2 border-black ${
                selectedSubjectFilter === sub
                  ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(255,99,33,1)]'
                  : 'bg-[#F7F3EF] hover:bg-black/10 text-black'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* View Period Selector */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <div className="inline-flex bg-[#F7F3EF] p-1 border-2 border-black font-bold text-xs">
            <button
              onClick={() => setTimePeriodFilter('5anos')}
              className={`px-3 py-1 uppercase cursor-pointer transition-all ${
                timePeriodFilter === '5anos'
                  ? 'bg-[#FF6321] text-black font-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                  : 'text-black/70 hover:text-black'
              }`}
            >
              Últimos 5 Anos
            </button>
            <button
              onClick={() => setTimePeriodFilter('10anos')}
              className={`px-3 py-1 uppercase cursor-pointer transition-all ${
                timePeriodFilter === '10anos'
                  ? 'bg-[#FF6321] text-black font-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                  : 'text-black/70 hover:text-black'
              }`}
            >
              Últimos 10 Anos
            </button>
            <button
              onClick={() => setTimePeriodFilter('matriz')}
              className={`px-3 py-1 uppercase cursor-pointer transition-all ${
                timePeriodFilter === 'matriz'
                  ? 'bg-[#FF6321] text-black font-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                  : 'text-black/70 hover:text-black'
              }`}
            >
              Matriz Ano a Ano
            </button>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-black/50" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar assunto no edital (ex: Geometria Plana, Capacitores, Equilíbrio Iônico, Bernoulli...)"
          className="w-full pl-10 pr-4 py-2 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:bg-[#FF6321]/10 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        />
      </div>

      {/* Content Rendering Mode 1: Frequency List (5 or 10 Years) */}
      {(timePeriodFilter === '5anos' || timePeriodFilter === '10anos') && (
        <div className="bg-white border-2 border-black p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <h3 className="text-base sm:text-lg font-serif font-black italic text-black flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FF6321]" />
              Ranking de Incidência ({timePeriodFilter === '5anos' ? 'Últimos 5 Anos: 2021-2026' : 'Últimos 10 Anos: 2016-2026'})
            </h3>
            <span className="text-xs font-mono text-black/70 font-bold">
              {sortedItems.length} tópicos mapeados
            </span>
          </div>

          <div className="space-y-3">
            {sortedItems.map((item, index) => {
              const pct = timePeriodFilter === '5anos' ? item.pct5Years : item.pct10Years;
              const count = timePeriodFilter === '5anos' ? item.total5Years : item.total10Years;
              const rank = timePeriodFilter === '5anos' ? item.rank5Years : item.rank10Years;

              // Color gradient based on incidence high/medium/low
              let barColor = 'bg-[#FF6321]';
              if (pct >= 10) barColor = 'bg-[#FF6321]';
              else if (pct >= 6) barColor = 'bg-amber-400';
              else barColor = 'bg-zinc-800 text-white';

              return (
                <div 
                  key={item.id}
                  className="bg-[#F7F3EF] border-2 border-black p-3.5 space-y-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:border-[#FF6321] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border border-black">
                        #{index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-black text-white text-[9px] font-bold px-1.5 py-0.2 uppercase">
                            {item.subject}
                          </span>
                          <span className="text-xs font-serif font-black text-black italic">
                            {item.topic}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right font-mono">
                        <div className="text-sm font-black text-black">
                          {pct.toFixed(2)}% <span className="text-xs font-normal text-black/60">({count} q.)</span>
                        </div>
                      </div>

                      {onStartPomodoroForTopic && (
                        <button
                          onClick={() => onStartPomodoroForTopic(item.topic, item.subject)}
                          className="px-2.5 py-1 bg-black hover:bg-[#FF6321] hover:text-black text-white text-[10px] font-bold uppercase border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-1"
                          title="Estudar este assunto agora no Pomodoro"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Foco</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Percentage Progress Bar */}
                  <div className="w-full bg-zinc-200 border border-black h-3 overflow-hidden flex">
                    <div
                      className={`h-full ${barColor} transition-all duration-500`}
                      style={{ width: `${Math.min(100, pct * 5.5)}%` }} // scale for visual impact
                    />
                  </div>

                  {item.keyNote && (
                    <div className="text-[10px] font-sans text-black/70 italic flex items-center gap-1.5 pt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-[#FF6321] shrink-0" />
                      <span>{item.keyNote}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Content Rendering Mode 2: Year-by-Year Historical Matrix */}
      {timePeriodFilter === 'matriz' && (
        <div className="bg-white border-2 border-black overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-4 p-5">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-serif font-black italic text-black">
                Matriz Completa de Questões Ano a Ano (2016 - 2026)
              </h3>
              <p className="text-xs text-black/70 font-sans">
                Acompanhamento detalhado do número de questões objetivas por ano do exame de admissão.
              </p>
            </div>
            <span className="text-xs font-mono text-[#FF6321] font-bold">
              * Ano de mudança de estilo de prova
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F7F3EF] text-black font-mono font-bold border-b-2 border-black uppercase text-[10px] tracking-wider">
                  <th className="p-3 min-w-[220px]">Matéria / Assunto</th>
                  {yearLabels.map((yr) => (
                    <th key={yr} className="p-2 text-center border-l border-black/20 min-w-[55px]">
                      {yr}
                    </th>
                  ))}
                  <th className="p-3 text-center bg-black text-white min-w-[70px]">Total 10 Anos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/20 text-black">
                {filteredItems.map((row) => (
                  <tr key={row.id} className="hover:bg-[#F7F3EF] transition-colors">
                    <td className="p-3 font-medium text-black">
                      <span className="bg-black text-white text-[9px] font-mono font-bold px-1.5 py-0.2 uppercase mr-2">
                        {row.subject}
                      </span>
                      <span className="text-xs font-serif font-bold text-black italic">
                        {row.topic}
                      </span>
                    </td>

                    {row.yearlyCounts.map((val, idx) => (
                      <td 
                        key={idx} 
                        className={`p-2 text-center font-mono font-bold border-l border-black/20 ${
                          val > 2 ? 'bg-[#FF6321] text-black' : val > 0 ? 'bg-amber-100 text-black' : 'text-black/30'
                        }`}
                      >
                        {val > 0 ? val : '-'}
                      </td>
                    ))}

                    <td className="p-3 text-center font-mono font-black text-white bg-black">
                      {row.total10Years}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
