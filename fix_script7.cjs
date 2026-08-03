const fs = require('fs');
let code = fs.readFileSync('src/components/FlashcardsView.tsx', 'utf8');

const regex = /            \{\/\* AI Generation Card \*\/\}(.|\n)*?<\/div>\n\n            <form/;
code = code.replace(regex, '            <form');

fs.writeFileSync('src/components/FlashcardsView.tsx', code, 'utf8');
console.log('Fixed FlashcardsView');
