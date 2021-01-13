const fs = require('fs');
const path = require('path');

const bitPackageJsonPath = path.join(process.cwd(), 'node_modules/@bit/healthcatalyst.cashmere.change-case-pipe/package.json');
const bitPackageJson = fs.readFileSync(bitPackageJsonPath).toString();
const bitPackage = JSON.parse(bitPackageJson);

['es2015', 'esm5', 'esm2015', 'fesm5', 'fesm2015', 'module', 'typings'].forEach(e => {
    if (!bitPackage[e].startsWith('dist')) {
        bitPackage[e] = `dist/${bitPackage[e]}`;
    }
});

fs.writeFileSync(bitPackageJsonPath, JSON.stringify(bitPackage, null, 2));
