const fs = require('fs');
const content = fs.readFileSync('src/data/itaData.ts', 'utf8');

const regex = /export function generateFullSyllabusSummaries\(\)[\s\S]*?export const INITIAL_SUMMARIES[^;]+;/m;
const match = content.match(regex);
if(match) {
  const replacement = match[0];
  let newContent = content.replace(regex, '');
  // add it at the very end
  newContent = newContent + '\n' + replacement + '\n';
  fs.writeFileSync('src/data/itaData.ts', newContent, 'utf8');
  console.log('Moved successfully');
} else {
  console.log('Could not find match');
}
