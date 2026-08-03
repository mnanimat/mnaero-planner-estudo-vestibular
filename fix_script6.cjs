const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/          onOpenAIAssistant=\{\(\) => \{[\s\S]*?\}\}\n/g, '');
code = code.replace(/                onOpenAIAssistant=\{\(\) => \{[\s\S]*?\}\}\n/g, '');

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('Fixed App.tsx');
