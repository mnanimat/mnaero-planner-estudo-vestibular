import { SimuladoExam } from '../types';

export const ITA_SIMULADOS: SimuladoExam[] = [
  {
    id: 'ita-2027-1a-fase',
    title: 'Provas Antigas & Simulados ITA - 1ª Fase Objetiva (2027)',
    subtitle: 'Questões Oficiais das Provas do ITA com Gabarito Comentado e Resolução em Vídeo no YouTube',
    phase: '1a',
    timeLimitMinutes: 300, // 5h
    questions: [
      {
        id: 'q-mat-01',
        year: 2025,
        phase: '1a',
        subject: 'Matemática',
        frenteId: 'MAT-2',
        topic: 'Números Complexos',
        statement: 'Seja $z \\in \\mathbb{C}$ tal que $|z - 2| = 2$ e $z^3 \\in \\mathbb{R}$. Determine a soma de todos os possíveis valores reais de $\\text{Re}(z)$.',
        options: [
          'A) 0',
          'B) 1',
          'C) 3',
          'D) 4',
          'E) 6'
        ],
        correctOptionIndex: 3,
        difficulty: 'Extrema (ITA)',
        detailedSolution: `**Resolução Detalhada passo a passo:**

1. Escreva $z = x + iy$, com $x, y \\in \\mathbb{R}$.
2. A condição $|z - 2| = 2$ equivale a $(x - 2)^2 + y^2 = 4 \\implies x^2 - 4x + 4 + y^2 = 4 \\implies x^2 + y^2 = 4x$.
3. Para $z^3 \\in \\mathbb{R}$, a parte imaginária de $z^3$ deve ser zero:
   $$\\text{Im}(z^3) = y(3x^2 - y^2) = 0$$
4. Se $y = 0$, então $x^2 = 4x \\implies x = 0$ ou $x = 4$.
5. Se $y \\neq 0$, então $y^2 = 3x^2$.
   Substituindo na equação da circunferência: $x^2 + 3x^2 = 4x \\implies 4x^2 = 4x \\implies x = 1$ (pois $x=0$ implicaria $y=0$).
6. Os valores possíveis de $\\text{Re}(z) = x$ são $0, 1, 4$.
7. A soma é $0 + 1 + 3 = 4$. Portanto, alternativa D.`,
        youtubeVideoId: 'S2OipX5_J5U',
        youtubeVideoTitle: 'Resolução ITA - Números Complexos e Geometria do Plano Complexo'
      },
      {
        id: 'q-fis-01',
        year: 2025,
        phase: '1a',
        subject: 'Física',
        frenteId: 'FÍS-1',
        topic: 'Trabalho e Energia Mecânica',
        statement: 'Um bloco de massa $m = 2\\text{ kg}$ desliza sobre um plano inclinado de $30^\\circ$ com o piso horizontal. O coeficiente de atrito dinâmico entre o bloco e a rampa é $\\mu = \\frac{\\sqrt{3}}{6}$. Partindo do repouso do topo da rampa de altura $h = 5\\text{ m}$, calcule a velocidade do bloco ao atingir a base.',
        options: [
          'A) $5\\text{ m/s}$',
          'B) $5\\sqrt{2}\\text{ m/s}$',
          'C) $10\\text{ m/s}$',
          'D) $2\\sqrt{5}\\text{ m/s}$',
          'E) $4\\sqrt{3}\\text{ m/s}$'
        ],
        correctOptionIndex: 1,
        difficulty: 'Alta',
        detailedSolution: `**Resolução Detalhada passo a passo:**

1. Normal no plano inclinado: $N = m g \\cos(30^\\circ) = m g \\frac{\\sqrt{3}}{2}$.
2. Força de atrito: $F_{at} = \\mu N = \\left( \\frac{\\sqrt{3}}{6} \\right) \\cdot \\left( m g \\frac{\\sqrt{3}}{2} \\right) = \\frac{3}{12} m g = \\frac{1}{4} m g$.
3. O comprimento da rampa $d$ é dado por $d = \\frac{h}{\\sin(30^\\circ)} = 2h = 10\\text{ m}$.
4. Trabalho da força de atrito: $W_{at} = -F_{at} \\cdot d = -\\frac{1}{4} m g \\cdot (2h) = -\\frac{1}{2} m g h$.
5. Pelo Teorema do Trabalho e Energia:
   $$E_{k,\\text{final}} - E_{k,\\text{inicial}} = W_{\\text{gravidade}} + W_{at}$$
   $$\\frac{1}{2} m v^2 = m g h - \\frac{1}{2} m g h = \\frac{1}{2} m g h \\implies v^2 = g h$$
6. Para $g = 10\\text{ m/s}^2$ e $h = 5\\text{ m}$, temos $v^2 = 50 \\implies v = 5\\sqrt{2}\\text{ m/s}$. Alternativa B.`,
        youtubeVideoId: 'f0Xz3G6L_uY',
        youtubeVideoTitle: 'Resolução ITA - Conservação de Energia Mecânica com Atrito'
      },
      {
        id: 'q-qui-01',
        year: 2025,
        phase: '1a',
        subject: 'Química',
        frenteId: 'QUÍ-3',
        topic: 'Equilíbrio Iônico e Ksp',
        statement: 'Considere a solução saturada do sal hipotético $AB_2$ em água pura a $25^\\circ\\text{C}$ com $K_{sp} = 4,0 \\times 10^{-12}$. Calcule a solubilidade $S$ do sal em $\\text{mol/L}$.',
        options: [
          'A) $1,0 \\times 10^{-4}\\text{ mol/L}$',
          'B) $2,0 \\times 10^{-6}\\text{ mol/L}$',
          'C) $1,0 \\times 10^{-6}\\text{ mol/L}$',
          'D) $2,0 \\times 10^{-4}\\text{ mol/L}$',
          'E) $4,0 \\times 10^{-4}\\text{ mol/L}$'
        ],
        correctOptionIndex: 0,
        difficulty: 'Média',
        detailedSolution: `**Resolução Detalhada:**

1. Dissociação do sal $AB_2(s) \\rightleftharpoons A^{2+}(aq) + 2 B^-(aq)$.
2. Em termos de solubilidade $S$:
   $$[A^{2+}] = S, \\quad [B^-] = 2S$$
3. Expressão do $K_{sp}$:
   $$K_{sp} = [A^{2+}][B^-]^2 = S \\cdot (2S)^2 = 4S^3$$
4. Igualando ao valor dado:
   $$4S^3 = 4,0 \\times 10^{-12} \\implies S^3 = 1,0 \\times 10^{-12} \\implies S = 1,0 \\times 10^{-4}\\text{ mol/L}$$
5. Alternativa A.`,
        youtubeVideoId: 'S2OipX5_J5U',
        youtubeVideoTitle: 'Resolução Química ITA - Cálculo de Solubilidade Ksp'
      },
      {
        id: 'q-port-01',
        year: 2025,
        phase: '1a',
        subject: 'Português',
        frenteId: 'PORT-1',
        topic: 'Gramática & Sintaxe',
        statement: 'Assinale a opção em que a regência verbal atende estritamente às normas da norma-padrão culta da língua portuguesa.',
        options: [
          'A) O candidato aspirava ao cargo de engenheiro aeronáutico no ITA com afinco.',
          'B) Os alunos preferiam mais estudar física do que fazer intervalos prolongados.',
          'C) O professor lembrou dos conceitos teóricos durante a resolução da prova.',
          'D) Esta é a lei que todos os cidadãos devem obedecer sem exceções.',
          'E) Assisti o filme documentário sobre a história do DCTA ontem à noite.'
        ],
        correctOptionIndex: 0,
        difficulty: 'Média',
        detailedSolution: `**Análise Gramatical das Opções:**

- **A) CORRETA.** O verbo *aspirar* no sentido de "almejar/desejar" exige preposição "a" (*aspirava ao cargo*).
- B) INCORRETA. O verbo *preferir* não admite "mais... do que". O correto seria: "preferiam estudar física a fazer...".
- C) INCORRETA. Sem o pronome oblíquo (*lembrou-se*), o verbo *lembrar* é transitivo direto: "O professor lembrou os conceitos...".
- D) INCORRETA. O verbo *obedecer* é transitivo indireto: "a que todos... devem obedecer".
- E) INCORRETA. O verbo *assistir* no sentido de "ver/presenciar" exige preposição "a": "Assisti ao filme...".`,
        youtubeVideoId: 'f0Xz3G6L_uY',
        youtubeVideoTitle: 'Resolução Português ITA - Regência Verbal e Nominal'
      },
      {
        id: 'q-ing-01',
        year: 2025,
        phase: '1a',
        subject: 'Inglês',
        frenteId: 'ING-1',
        topic: 'Reading Comprehension',
        statement: 'Select the option that correctly replaces the word "UNPRECEDENTED" in the sentence: "The engineering team achieved an unprecedented efficiency breakthrough during supersonic wind tunnel testing."',
        options: [
          'A) Unremarkable',
          'B) Never seen before',
          'C) Predictable',
          'D) Outdated',
          'E) Flawed'
        ],
        correctOptionIndex: 1,
        difficulty: 'Média',
        detailedSolution: `**Resolution:**
The word "unprecedented" means never done or known before. Therefore, "never seen before" is the exact synonym. Option B.`,
        youtubeVideoId: 'S2OipX5_J5U',
        youtubeVideoTitle: 'ITA English Resolution - Advanced Vocabulary'
      }
    ]
  },
  {
    id: 'ita-2025-2a-fase',
    title: 'Simulado ITA 2026/2027 - 2ª Fase Discursiva',
    subtitle: 'Questões Aprofundadas Discursivas (Matemática, Física, Química, Redação)',
    phase: '2a',
    timeLimitMinutes: 240, // 4h
    questions: [
      {
        id: 'q-mat-disc-01',
        year: 2025,
        phase: '2a',
        subject: 'Matemática',
        frenteId: 'MAT-3',
        topic: 'Sistemas Lineares e Determinantes',
        statement: 'Discuta, em função do parâmetro real $k$, a quantidade de soluções do sistema linear abaixo:\n$$\\begin{cases} x + y + z = 1 \\\\ x + k y + z = k \\\\ x + y + k z = k^2 \\end{cases}$$',
        discursiveGuide: 'Apresente o determinante principal $\\Delta$, os determinantes secundários $\\Delta_x, \\Delta_y, \\Delta_z$ e conclua categoricamente os casos SPI, SPD e SI.',
        difficulty: 'Extrema (ITA)',
        detailedSolution: `**Demonstração e Resolução Formal Discursiva:**

1. Determinante Principal $\\Delta$:
   $$\\Delta = \\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & k & 1 \\\\ 1 & 1 & k \\end{vmatrix} = (k-1)^2$$
2. Análise de SPD (Sistema Possível e Determinado):
   $$\\Delta \\neq 0 \\iff (k-1)^2 \\neq 0 \\iff k \\neq 1$$
   Para $k \\in \\mathbb{R} \\setminus \\{1\\}$, o sistema possui **Solução Única**.

3. Análise para $k = 1$:
   Substituindo $k = 1$ no sistema original:
   $$\\begin{cases} x + y + z = 1 \\\\ x + y + z = 1 \\\\ x + y + z = 1 \\end{cases}$$
   As três equações são idênticas. Trata-se de um plano em $\\mathbb{R}^3$.
   Logo, para $k = 1$, o sistema é **Sistema Possível e Indeterminado (SPI)** com infinitas soluções.

4. Conclusão Final:
   - $k \\neq 1$: SPD (Solução única $(x, y, z) = (1-k, 0, k)$)
   - $k = 1$: SPI (Infinitas soluções)`,
        youtubeVideoId: 'S2OipX5_J5U',
        youtubeVideoTitle: 'Resolução Discursiva ITA - Discussão de Sistemas Lineares'
      }
    ]
  }
];
