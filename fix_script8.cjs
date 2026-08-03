const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

code = code.replace(/  onOpenAIAssistant: \(\) => void;\n/, '');
code = code.replace(/  onOpenAIAssistant,\n/, '');
const aiBtnRegex = /            \{\/\* AI Tutor Toggle \*\/\}(.|\n)*?<\/button>/;
code = code.replace(aiBtnRegex, '');

fs.writeFileSync('src/components/Navbar.tsx', code, 'utf8');

let code2 = fs.readFileSync('src/components/RedacaoItaView.tsx', 'utf8');
code2 = code2.replace(/  onOpenAIAssistant\?: \(\) => void;\n/, '');
code2 = code2.replace(/export const RedacaoItaView: React.FC<RedacaoItaViewProps> = \(\{ onOpenAIAssistant \}\) => \{/, 'export const RedacaoItaView: React.FC<RedacaoItaViewProps> = () => {');

fs.writeFileSync('src/components/RedacaoItaView.tsx', code2, 'utf8');
console.log('Fixed Navbar and RedacaoItaView');
