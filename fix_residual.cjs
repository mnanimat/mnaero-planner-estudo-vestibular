const fs = require('fs');

// 1. Fix Navbar.tsx
let navCode = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
navCode = navCode.replace(/            \{\/\* Local AI Tutor Button \*\/\}\s*<button[\s\S]*?<\/button>/g, '');
fs.writeFileSync('src/components/Navbar.tsx', navCode, 'utf8');

// 2. Fix FlashcardsView.tsx
let fcCode = fs.readFileSync('src/components/FlashcardsView.tsx', 'utf8');
fcCode = fcCode.replace(/            \{\/\* AI Flashcard Generator Banner \*\/\}\s*<div[\s\S]*?<\/div>\n/g, '');
fs.writeFileSync('src/components/FlashcardsView.tsx', fcCode, 'utf8');

console.log('Cleaned residual references in Navbar and FlashcardsView');
