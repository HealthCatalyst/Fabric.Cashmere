const fs = require('fs-extra');
const path = require('path');

const sourceDir = '../dist/docs/';
const destDir = process.env.TRAVIS ? '../dist/user-guide/assets/docs/' : '../src/assets/docs/';

// Copy api documentation into UserGuide assets/
fs.copySync(getAbsolutePath(sourceDir + 'api'), getAbsolutePath(destDir + 'api'));

fs.copySync(getAbsolutePath(sourceDir + 'usage'), getAbsolutePath(destDir + 'usage'));

function getAbsolutePath(relativePath) {
    return path.resolve(path.join(__dirname, relativePath));
}
