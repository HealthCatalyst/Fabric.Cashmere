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
    const apiSourceDir = getAbsolutePath(sourceDir + 'api');
    const usageSourceDir = getAbsolutePath(sourceDir + 'usage');
    if (!fs.existsSync(apiSourceDir)) {
        fs.mkdirSync(apiSourceDir, { recursive: true });
    }
    fs.copySync(apiSourceDir, getAbsolutePath(destDir + 'api'));

    if (!fs.existsSync(usageSourceDir)) {
        fs.mkdirSync(usageSourceDir, { recursive: true });
    }
    fs.copySync(usageSourceDir, getAbsolutePath(destDir + 'usage'));
});

function getAbsolutePath(relativePath) {
    return path.resolve(path.join(__dirname, relativePath));
}
