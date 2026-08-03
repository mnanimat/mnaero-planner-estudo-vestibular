const fs = require('fs');
let code = fs.readFileSync('src/components/FlashcardsView.tsx', 'utf8');

// Remove props definition
code = code.replace(/  onOpenAIAssistantWithPrompt: \(prompt: string, context: string\) => void;\n/, '');
code = code.replace(/  onOpenAIAssistantWithPrompt,\n/, '');

// Remove button Aprofundar com IA in FlashcardsView
code = code.replace(/                  <button\s+onClick=\{\(\) =>\s+onOpenAIAssistantWithPrompt\([\s\S]*?\}[\s\S]*?<\/button>/, '');
code = code.replace(/                  <button\s+onClick=\{\(\) =>\s+onOpenAIAssistantWithPrompt\([\s\S]*?\}[\s\S]*?<\/button>/, '');

// Remove handleGenerateAICards
code = code.replace(/  const handleGenerateAICards = async \(\) => \{[\s\S]*?\}\s*};\n/g, '');

// Remove button calling handleGenerateAICards
code = code.replace(/                <button\s+onClick=\{handleGenerateAICards\}[\s\S]*?<\/button>/g, '');

// Also remove `const \[isGenerating, setIsGenerating\] = useState\(false\);`
code = code.replace(/  const \[isGenerating, setIsGenerating\] = useState\(false\);\n/, '');

fs.writeFileSync('src/components/FlashcardsView.tsx', code, 'utf8');
console.log('Fixed FlashcardsView');
