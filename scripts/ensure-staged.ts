const {execSync} = require('child_process');

const stagedFiles = execSync('git diff --name-only --cached')
    .toString()
    .split(/\r?\n/g);

if (stagedFiles.length < 2) {
    throw new Error(`You can't commit until after you have staged some files!`);
}
