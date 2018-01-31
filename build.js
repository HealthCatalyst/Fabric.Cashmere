'use strict';

const shell = require('shelljs');
const chalk = require('chalk');

const PACKAGE = `cashmere`;
const NPM_DIR = `dist`;
const STAGE = `lib`;
const SOURCE = `src/app/lib`;
const ESM2015_DIR = `${NPM_DIR}/esm2015`;
const ESM5_DIR = `${NPM_DIR}/esm5`;
const BUNDLES_DIR = `${NPM_DIR}/bundles`;
const OUT_DIR_ESM5 = `${NPM_DIR}/package/esm5`;
const GLOBAL_SCSS = `lib/colors.scss`;
const EXTERNAL_LIBRARIES = [`node_modules/popper.js/dist/umd/popper.min.js`];

shell.echo(`Start building...`);

shell.rm(`-Rf`, `${NPM_DIR}/*`);
shell.rm(`-Rf`, `${STAGE}/*`);
shell.mkdir(`-p`, `./${ESM2015_DIR}`);
shell.mkdir(`-p`, `./${ESM5_DIR}`);
shell.mkdir(`-p`, `./${BUNDLES_DIR}`);
shell.mkdir(`-p`, `./${STAGE}`);
/* generate stage directory to inline templates/styles */
if (shell.cp('-R', `${SOURCE}/*`, STAGE).code !== 0) {
    shell.echo(chalk.red(`Unable to create stage directory`));
    shell.exit(1);
}
shell.echo(chalk.green(`Stage Directory Created`));

/* Compile sass */
if (shell.exec(`node-sass ./lib -o ./lib`).code !== 0) {
    shell.echo(chalk.red(`Sass compilation failed`));
    shell.exit(1);
}
shell.echo(chalk.green(`Sass compiled successfully`));

/* Replace .scss with .css in component.ts files */
shell.ls('lib/**/*.component.ts').forEach(function(file) {
    shell.sed('-i', '.scss', '.css', file);
});
shell.echo(chalk.green(`.scss replaced with .css successfully`));

/* Inline Templates */
if (shell.exec(`node ./inline-templates.js`).code !== 0) {
    shell.echo(chalk.red(`Unable to Inline Templates and Styles`));
    shell.exit(1);
}
shell.echo(chalk.green(`Templates and Styles Inlined`));

shell.cp('-P', GLOBAL_SCSS, NPM_DIR);

for (let lib of EXTERNAL_LIBRARIES) {
    shell.cp('-P', lib, NPM_DIR);
}

/* TSLint with Codelyzer */
// https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts
// https://github.com/mgechev/codelyzer
shell.echo(`Start TSLint`);
shell.exec(`tslint -c tslint.json -t stylish src/**/*.ts`);
shell.echo(chalk.green(`TSLint completed`));

/* AoT compilation */
shell.echo(`Start AoT compilation`);
if (shell.exec(`"./node_modules/.bin/ngc" -p tsconfig-build.json`).code !== 0) {
    shell.echo(chalk.red(`Error: AoT compilation failed`));
    shell.exit(1);
}
shell.echo(chalk.green(`AoT compilation completed`));

/* BUNDLING PACKAGE */
shell.echo(`Start bundling`);
shell.echo(`Rollup package`);
if (
    shell.exec(
        `rollup -c rollup.es.config.js -i ${NPM_DIR}/${PACKAGE}.js -o ${ESM2015_DIR}/${PACKAGE}.js`
    ).code !== 0
) {
    shell.echo(chalk.red(`Error: Rollup package failed`));
    shell.exit(1);
}

shell.echo(`Produce ESM5 version`);
shell.exec(
    `"./node_modules/.bin/ngc" -p tsconfig-build.json --target es5 -d false --outDir ${OUT_DIR_ESM5} --importHelpers true --sourceMap`
);
if (
    shell.exec(
        `rollup -c rollup.es.config.js -i ${OUT_DIR_ESM5}/${PACKAGE}.js -o ${ESM5_DIR}/${PACKAGE}.js`
    ).code !== 0
) {
    shell.echo(chalk.red(`Error: ESM5 version failed`));
    shell.exit(1);
}

shell.echo(`Run Rollup conversion on package`);
if (
    shell.exec(
        `rollup -c rollup.config.js -i ${ESM5_DIR}/${PACKAGE}.js -o ${BUNDLES_DIR}/${PACKAGE}.umd.js`
    ).code !== 0
) {
    shell.echo(chalk.red(`Error: Rollup conversion failed`));
    shell.exit(1);
}

shell.echo(`Minifying`);
shell.cd(`${BUNDLES_DIR}`);
shell.exec(
    `"../../node_modules/.bin/uglifyjs" ${PACKAGE}.umd.js -c --comments -o ${PACKAGE}.umd.min.js --source-map "filename='${PACKAGE}.umd.min.js.map', includeSources"`
);
shell.cd(`..`);
shell.cd(`..`);

shell.echo(chalk.green(`Bundling completed`));

shell.rm(`-Rf`, `${NPM_DIR}/package`);
shell.rm(`-Rf`, `${NPM_DIR}/node_modules`);
shell.rm(`-Rf`, `${NPM_DIR}/*.js`);
shell.rm(`-Rf`, `${NPM_DIR}/*.js.map`);
shell.rm(`-Rf`, `${NPM_DIR}/src/**/*.js`);
shell.rm(`-Rf`, `${NPM_DIR}/src/**/*.js.map`);

shell.cp(`-Rf`, [`package.json`, `LICENSE`, `README.md`], `${NPM_DIR}`);
shell.sed('-i', 'dependencies','peerDependencies','dist/package.json');

shell.echo(chalk.green(`End building`));
