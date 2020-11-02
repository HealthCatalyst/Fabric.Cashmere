const fs = require('fs');
const path = require('path');

const bitPackageJsonPath = path.join(
    __dirname,
    '../projects/cashmere-examples/node_modules/@bit/healthcatalyst.cashmere.change-case-pipe/package.json'
);
const bitPackageJson = fs.readFileSync(bitPackageJsonPath).toString();
const bitPackage = JSON.parse(bitPackageJson);

if (!bitPackage.typings.startsWith('dist')) {
    bitPackage.typings = `dist/${bitPackage.typings}`;
}

fs.writeFileSync(bitPackageJsonPath, JSON.stringify(bitPackage, null, 2));
