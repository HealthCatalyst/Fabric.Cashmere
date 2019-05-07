const fs = require('fs');
const path = require('path');

copy('../tsconfig.dev.json', '../tsconfig.json');
copy('../projects/cashmere/src/public_api.ts', '../projects/cashmere/src/index.ts');
copy('../projects/cashmere-examples/src/public_api.ts', '../projects/cashmere-examples/src/index.ts');

function copy(relativeFromPath, relativeToPath) {
    fs.writeFileSync(path.join(__dirname, relativeToPath), fs.readFileSync(path.join(__dirname, relativeFromPath)));
}
