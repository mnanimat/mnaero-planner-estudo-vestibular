const fs = require('fs');
let fcCode = fs.readFileSync('src/components/FlashcardsView.tsx', 'utf8');

const orphanBlockRegex = /<\/button>\s*<\/div>\s*<button\s+type="button"\s+onClick=\{handleGenerateAICards\}[\s\S]*?<\/button>\s*<\/div>/;
fcCode = fcCode.replace(orphanBlockRegex, '</button>\n            </div>');

fs.writeFileSync('src/components/FlashcardsView.tsx', fcCode, 'utf8');
console.log('Fixed FlashcardsView orphan tags');
