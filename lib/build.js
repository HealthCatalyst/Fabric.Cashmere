// Additional files to be included in the NPM package
const includeFiles = [
    'src/colors.scss',
    'src/functions.scss',
    'src/tables.scss',

    // these make it look pretty on NPM
    '../README.md',
    '../LICENSE',
    '../CashmereBanner.png'
];




//////////////////////////////////////////////////
// You shouldn't need to change anything below. //
//////////////////////////////////////////////////

const fs = require('fs');
if (!fs.existsSync('./node_modules')) {
    require('child_process').execSync('npm i shelljs chalk');
}

const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk').default;

//make sure that we are in the correct directory
if (__dirname !== process.cwd()) {
    shell.cd(__dirname);
    shell.echo(chalk.gray(`Running in the '${__dirname}' directory...`));
}

const packageDir = './dist/';
const metadata = require('./package.json');

exec('npm i', `installing library dependencies for ${metadata.name}`);
exec('npm run lint', 'linting the library');
exec(
    'npx ng-packagr -p package.json',
    `Packaging '${metadata.name}' version '${metadata.version}'`
);

includeFiles.forEach(f => {
    shell.echo(`copying '${f}'...`);
    shell.cp(f, packageDir);
});

if (process.argv.includes('--local')) {
    shell.cd('dist');
    const dir = shell.pwd().stdout.trim();
    const packageFileName = exec('npm pack', 'creating NPM package file').trim();
    success(`Test this package in another Angular app by running the following command in the app's directory:

    npm install ${path.join(dir, packageFileName)}
    `);
}

////////////////////////////////////////////////////

function exec(command, description) {
    if (description) {
        info(`${description} (${command})...`);
    } else {
        info(`Running '${command}'...`);
    }
    const result = shell.exec(command);
    if (result.code !== 0) {
        error(`Running '${command} failed.'`);
        shell.exit(result.code);
    }
    success(`'${command}' completed successfully.`);
    return result.stdout;
}

function info(message) {
    shell.echo(chalk.cyan(message));
}

function error(message) {
    shell.echo(chalk.bold.red(message));
}

function success(message) {
    shell.echo(chalk.green(message));
}
