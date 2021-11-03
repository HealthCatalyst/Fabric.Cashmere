const fs = require('fs-extra');
const path = require('path');

const sourceDir = '../dist/docs/';
const destDirs = [
    '../dist/user-guide/assets/docs/', 
    '../src/assets/docs/'
];

console.log('copying api and usage docs to user guide assets directory...');
// Copy api documentation into UserGuide assets/
destDirs.forEach(destDir => {
    fs.copySync(getAbsolutePath(sourceDir + 'api'), getAbsolutePath(destDir + 'api'));
    fs.copySync(getAbsolutePath(sourceDir + 'usage'), getAbsolutePath(destDir + 'usage'));
});

function getAbsolutePath(relativePath) {
    return path.resolve(path.join(__dirname, relativePath));
}
