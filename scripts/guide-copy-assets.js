const fs = require('fs-extra');
const path = require('path');

// Copy api documentation into UserGuide assets/
fs.copySync(getAbsolutePath('../dist/docs/api'), getAbsolutePath('../src/assets/docs/api'));

// Copy examples source files(ts, css, html)
fs.copySync(getAbsolutePath('../dist/docs/examples'), getAbsolutePath('../src/assets/docs/examples'));

fs.copySync(getAbsolutePath('../dist/docs/usage'), getAbsolutePath('../src/assets/docs/usage'));

function getAbsolutePath(relativePath) {
    return path.resolve(path.join(__dirname, relativePath));
}
