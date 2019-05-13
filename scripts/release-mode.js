const fs = require('fs');
const path = require('path');

copy('../tsconfig.release.json', '../tsconfig.json');

function copy(relativeFromPath, relativeToPath) {
    fs.writeFileSync(path.join(__dirname, relativeToPath), fs.readFileSync(path.join(__dirname, relativeFromPath)));
}
