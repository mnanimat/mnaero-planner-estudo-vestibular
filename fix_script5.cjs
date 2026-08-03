const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove import
code = code.replace(/import \{ AIAssistantModal \} from '.\/components\/AIAssistantModal';\n/, '');

// Remove modal logic
code = code.replace(/  const \[isAIOpen, setIsAIOpen\] = useState\(false\);\n/, '');
code = code.replace(/  const \[aiPrompt, setAiPrompt\] = useState\(''\);\n/, '');
code = code.replace(/  const \[aiContext, setAiContext\] = useState\(''\);\n/, '');

code = code.replace(/  const handleOpenAIAssistantWithPrompt = \(prompt: string, context: string\) => \{[\s\S]*?\};\n/, '');

// Remove onOpenAIAssistantWithPrompt={handleOpenAIAssistantWithPrompt} from any component
code = code.replace(/\s+onOpenAIAssistantWithPrompt=\{handleOpenAIAssistantWithPrompt\}/g, '');

// Remove AIAssistantModal block
const aiModalRegex = /\s*\{\/\* Local AI Assistant Tutor Modal \*\/\}[\s\S]*?<AIAssistantModal[\s\S]*?\/>\n/;
code = code.replace(aiModalRegex, '\n');

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('Fixed App.tsx');
