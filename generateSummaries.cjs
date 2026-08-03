const fs = require('fs');

const content = fs.readFileSync('src/data/itaData.ts', 'utf8');

const startIdx = content.indexOf('export const INITIAL_SUMMARIES: DidacticSummary[] = [');
const endIdx = content.indexOf('export const INITIAL_FLASHCARDS: Flashcard[] = [');

const replacement = `
export function generateFullSyllabusSummaries(): DidacticSummary[] {
  return OFFICIAL_ITA_SYLLABUS_LIST.map((item, index) => {
    return {
      id: \`sum-official-\${index + 1}\`,
      subject: item.subject,
      frenteId: item.frenteId,
      topic: item.topicName,
      title: \`Resumo Detalhado: \${item.topicName.replace(/^\\d+\\.\\s*/, '')}\`,
      subtitle: item.notes,
      phase: 'ambas',
      summaryText: \`Este é o resumo teórico focado no vestibular do ITA para o assunto: \${item.topicName.replace(/^\\d+\\.\\s*/, '')}.

Este tópico aborda \${item.notes}

### Aprofundamento Teórico
Para o ITA, é fundamental não apenas saber a teoria básica, mas entender as demonstrações, os casos limites e as aplicações não triviais. 
As questões frequentemente misturam este assunto com outras áreas da matéria, exigindo uma base matemática muito forte.

### Dicas Práticas
- Revise as deduções das fórmulas principais.
- Resolva as questões discursivas das provas da 2ª fase dos últimos 10 anos.
- Esteja preparado para manipulações algébricas pesadas.
\`,
      formulas: [
        {
          name: 'Fórmula Principal',
          latex: 'f(x) = \\dots',
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

`;

const newContent = content.substring(0, startIdx) + replacement + content.substring(endIdx);
fs.writeFileSync('src/data/itaData.ts', newContent, 'utf8');
console.log('Summaries replaced successfully');
