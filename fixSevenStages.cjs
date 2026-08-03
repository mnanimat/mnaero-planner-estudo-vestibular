const fs = require('fs');
const content = fs.readFileSync('src/components/SevenStagesView.tsx', 'utf8');

const regex = /<button[\s\S]*?onClick=\{\(\) =>[\s\S]*?onOpenAIAssistantWithPrompt\([\s\S]*?\}[\s\S]*?<\/button>/;
const match = content.match(regex);
if(match) {
  const newContent = content.replace(regex, '');
  fs.writeFileSync('src/components/SevenStagesView.tsx', newContent, 'utf8');
  console.log('Removed button');
} else {
  console.log('Could not find match');
}
