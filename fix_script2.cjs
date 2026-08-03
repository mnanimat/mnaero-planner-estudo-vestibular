const fs = require('fs');
let code = fs.readFileSync('src/components/SevenStagesView.tsx', 'utf8');

code = code.replace(/      <\/div>\n    <\/div>\n  \);\n};/, '      </div>\n    </div>\n    </div>\n    </div>\n  );\n};');

fs.writeFileSync('src/components/SevenStagesView.tsx', code, 'utf8');
console.log('Done');
