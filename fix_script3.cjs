const fs = require('fs');
let code = fs.readFileSync('src/components/SummariesView.tsx', 'utf8');

// Remove prop definition
code = code.replace(/  onOpenAIAssistantWithPrompt: \(prompt: string, context: string\) => void;\n/, '');
code = code.replace(/  onOpenAIAssistantWithPrompt,\n/, '');

// Remove button
code = code.replace(/                  <button\s+onClick=\{\(\) =>\s+onOpenAIAssistantWithPrompt\([\s\S]*?\}[\s\S]*?<\/button>/, '');

fs.writeFileSync('src/components/SummariesView.tsx', code, 'utf8');
console.log('Fixed SummariesView');
