/**
 * Local AI Tutor Engine for MNAero Planner - ITA
 * Fully offline, instant AI Tutor tailored specifically for ITA preparation.
 */

interface TutorResponse {
  answer: string;
  topic?: string;
  keyFormulas?: string[];
  itaTips?: string[];
}

export function generateLocalAITutorResponse(prompt: string, context?: string): TutorResponse {
  const p = prompt.toLowerCase();

  // 1. Redação / Essay Analysis & Guidelines
  if (p.includes('redação') || p.includes('disserta') || p.includes('argumento') || p.includes('tese') || p.includes('repertório')) {
    return {
      topic: 'Redação ITA - Tese & Estrutura Dissertativa-Argumentativa',
      answer: `**Análise & Orientação do Tutor IA MNAero para a Redação do ITA:**

Para alcançar nota máxima na Redação do ITA (2ª Fase), a banca avalia 4 critérios rigorosos: **Tema**, **Estrutura/Tipo Textual**, **Coerência/Coesão** e **Modalidade Culta**.

### Estrutura de Ouro em 4 Parágrafos (25 a 30 Linhas):
1. **Introdução (5-6 linhas):**
   - *Apresentação do Tema + Repertório Filosófico/Sociológico.* (ex: Hannah Arendt, Zygmunt Bauman, Immanuel Kant, Byung-Chul Han).
   - *Tese Clara:* explicite os 2 focos argumentativos (A1 e A2) que sustentam sua posição.
2. **Desenvolvimento 1 (7-8 linhas):**
   - *Tópico Frasal + Aprofundamento do Argumento 1.*
   - Evite frases prontas e clichês de vestibular tradicional. O ITA exige análise das causas profundas da questão contemporânea.
3. **Desenvolvimento 2 (7-8 linhas):**
   - *Tópico Frasal + Aprofundamento do Argumento 2.*
   - Articule a relação dialética entre o indivíduo, o avanço tecnológico/científico e a ética social.
4. **Conclusão (5-6 linhas):**
   - *Síntese dos Argumentos + Reafirmação da Tese.*
   - **IMPORTANTE:** Ao contrário do ENEM, o ITA **NÃO exige** uma Proposta de Intervenção detalhada com 5 elementos. Concentre-se em fechar o raciocínio filosófico de forma contundente.

*Dica do Tutor:* O ITA desqualifica redações baseadas em modelos "prontos/engessados". Valoriza-se o raciocínio autônomo e maduro!`,
      itaTips: [
        'Nunca use primeira pessoa do singular ("eu acho"). Use 3ª pessoa.',
        'Mantenha conectivos interparágrafos variados: "Em primeira análise...", "Outrossim...", "Depreende-se, portanto..."'
      ]
    };
  }

  // 2. Complex Numbers / Números Complexos
  if (p.includes('complex') || p.includes('moivre') || p.includes('argand') || p.includes('euler') || p.includes('raízes da unidade')) {
    return {
      topic: 'Matemática - Números Complexos & Leis de Moivre',
      answer: `**Resolução Teórica & Prática de Números Complexos Nível ITA:**

No vestibular do ITA, números complexos são explorados em 3 frentes principais:
1. **Forma Polar / Trigonométrica:** $z = |z| (\\cos\\theta + i\\sin\\theta) = |z| e^{i\\theta}$.
2. **1ª Lei de Moivre (Potenciação):** $z^n = |z|^n (\\cos(n\\theta) + i\\sin(n\\theta))$.
3. **Soma das Raízes $n$-ésimas da Unidade:** $z^n = 1 \\implies \\sum_{k=0}^{n-1} e^{i \\frac{2k\\pi}{n}} = 0$.

### Aplicação Clássica no ITA:
Para simplificar somatórios trigonométricos como $S = \\cos\\theta + \\cos(2\\theta) + \\dots + \\cos(n\\theta)$, considere a parte real da soma da progressão geométrica complexa $\\sum_{k=1}^n e^{ik\\theta}$.

Multiplicar um vetor no plano de Argand-Gauss por $i = e^{i\\pi/2}$ rotaciona o vetor em $90^\\circ$ no sentido anti-horário!`,
      keyFormulas: [
        'z = |z| e^{i\\theta}',
        'z^n = |z|^n (\\cos(n\\theta) + i \\sin(n\\theta))',
        '\\sum_{k=0}^{n-1} w_k = 0'
      ],
      itaTips: [
        'Use a propriedade $|z|^2 = z \\cdot \\bar{z}$ para simplificar equações algébricas com módulo.',
        'Ao extrair raízes de um complexo, lembre-se que os argumentos formam uma P.A. de razão $2\\pi/n$.'
      ]
    };
  }

  // 3. Mechanics / Mecânica e Energia
  if (p.includes('mecânica') || p.includes('energia') || p.includes('colisão') || p.includes('impulso') || p.includes('trabalho') || p.includes('quantidade de movimento')) {
    return {
      topic: 'Física - Mecânica, Conservação de Energia & Impulso',
      answer: `**Guia Passo a Passo de Mecânica ITA:**

1. **Conservação de Quantidade de Movimento ($P = m v$):**
   - Se a força resultante externa no sistema for nula ($\vec{F}_{\\text{ext}} = \\vec{0}$), a quantidade de movimento total SE CONSERVA.
   - Em colisões bidimensionais/oblíquas, decomponha $P_x$ e $P_y$.

2. **Coeficiente de Restituição ($e$):**
   - $e = \\frac{v_{\\text{afastamento}}}{v_{\\text{aproximação}}}$.
   - Colisão Elástica: $e = 1$ (energia cinética total se conserva).
   - Colisão Perfeitamente Inelástica: $e = 0$ (os corpos grudam e a perda de $E_k$ é máxima).

3. **Teorema do Trabalho e Energia Cinética (TEC):**
   - $W_{\\text{total}} = \\Delta E_k = \\frac{1}{2} m v_f^2 - \\frac{1}{2} m v_i^2$.`,
      keyFormulas: [
        'W = \\int F(x) dx',
        'e = \\frac{v_{\\text{afastamento}}}{v_{\\text{aproximação}}}',
        '\\vec{I} = \\Delta \\vec{P} = \\vec{F}_{\\text{médio}} \\cdot \\Delta t'
      ],
      itaTips: [
        'Analise a conservação de quantidade de movimento no Referencial do Centro de Massa (CM) para simplificar contas difíceis!',
        'A força normal de impacto atua unicamente ao longo da linha que une os centros dos corpos.'
      ]
    };
  }

  // 4. Equilibrium / Físico-Química
  if (p.includes('equilíbrio') || p.includes('ksp') || p.includes('ph') || p.includes('tampão') || p.includes('solubilidade') || p.includes('ostwald')) {
    return {
      topic: 'Química - Equilíbrio Iônico & Produto de Solubilidade ($K_{sp}$)',
      answer: `**Cálculo de Equilíbrio Iônico e $K_{sp}$ para o ITA:**

1. **Efeito do Íon Comum:**
   - Adicionar um sal solúvel contendo um íon em comum (ex: $NaCl$ em solução de $AgCl$) desloca o equilíbrio no sentido dos reagentes sólidos, reduzindo a solubilidade $S$.

2. **Condição de Precipitação:**
   - Calcule o Produto Iônico $Q_{sp} = [A^{m+}]^n [B^{n-}]^m$.
   - Se $Q_{sp} < K_{sp}$: Solução insaturada (sem precipitado).
   - Se $Q_{sp} = K_{sp}$: Solução saturada em equilíbrio.
   - Se $Q_{sp} > K_{sp}$: Formação imediata de precipitado até que $Q_{sp}$ retorne a $K_{sp}$.

3. **pH de Soluções Tampão:**
   - $pH = pK_a + \\log \\left( \\frac{[\\text{Base Conjugada}]}{[\\text{Ácido Fraco}]} \\right)$.`,
      keyFormulas: [
        'K_{sp} = [A^{m+}]^n [B^{n-}]^m',
        'pH = pK_a + \\log \\left( \\frac{[\\text{Sal}]}{[\\text{Ácido}]} \\right)',
        'K_a = \\frac{\\alpha^2 C}{1 - \\alpha}'
      ],
      itaTips: [
        'Fique atento às variações de temperatura, pois $K_{sp}$ e $K_a$ dependem da temperatura.',
        'Em misturas de reagentes, calcule sempre as novas concentrações considerando o volume total final!'
      ]
    };
  }

  // 5. Default General ITA Tutor Assistance
  return {
    topic: 'Tutor IA MNAero - Estratégia de Estudos ITA',
    answer: `**Orientação do Tutor IA MNAero para o Vestibular ITA:**

Você perguntou: *"${prompt}"*

### Plano Diretor para Resolução de Questões do ITA:
1. **Fase de Diagnóstico:** Identifique se a questão pertence à 1ª Fase (Objetiva - foco em velocidade e identificação de pegadinhas) ou 2ª Fase (Discursiva - foco em rigor formal, hipóteses simplificadoras explicitadas e deduções passo a passo).
2. **Organização dos Dados:** Anote todas as variáveis com as unidades do Sistema Internacional (SI).
3. **Seleção de Princípios:** Identifique as leis de conservação (Energia, Quantidade de Movimento, Carga Elétrica) ou teoremas matemáticos aplicáveis.
4. **Verificação de Consistência:** Faça análise dimensional do resultado final antes de concluir a resolução!

*Gostaria de uma explicação detalhada de algum tópico específico de Matemática, Física, Química, Português, Inglês ou Redação?*`,
    itaTips: [
      'Anote os erros no Banco de Erros de 3 Cores (Verde = atenção/fórmula, Amarelo = lacuna teórica, Vermelho = erro recorrente de raciocínio).',
      'Revise flashcards diariamente para fixação via Repetição Espaçada (SRS).'
    ]
  };
}
