#!/usr/bin/env node

const fse = require('fs-extra');
const path = require('path');
const sass = require('sass');
const tildeImporter = require('node-sass-tilde-importer');

const projectName = 'cashmere';
const libSrcDir = '../projects/cashmere';
const libOutDir = '../dist/cashmere';

console.log('resolved Lib: ' + resolvePath(libOutDir));

const assets = [
    [libSrcDir + '/src/lib/sass/', libOutDir + '/scss'],
    [libSrcDir + '/src/lib/scripts/', libOutDir + '/scripts'],
    [libSrcDir + '/src/lib/icon-font/', libOutDir + '/hcicons'],
    [libSrcDir + '/README.md', libOutDir + '/README.md'],
    ['../LICENSE', libOutDir + '/LICENSE'],
    ['../CashmereBanner.png', libOutDir + '/CashmereBanner.png']
];

Promise.all(copyAssets(resolveSrcDestPaths(assets)))
    .then(_ => fse.remove('dist/cashmere.tgz'))
    .then(_ => console.log('Finished copying assets'))
    .catch(e => console.error(e));

sass.render(
    {
        outFile: './dist/cashmere/cashmere.css',
        file: './projects/cashmere/src/lib/static.scss',
        importer: tildeImporter
    },
    function(error, result) {
        if (error) {
            console.error(error);
        }

        if (!result) {
            return;
        }

        fse.writeFile('./dist/cashmere/cashmere.css', result.css, function(err) {
            if (err) {
                console.error(error);
                return;
            }
            console.log('Built dist/cashmere/cashmere.css');
        });
    }
);

function resolveSrcDestPaths(relativeSrcDest) {
    return relativeSrcDest.map(paths => [resolvePath(paths[0]), resolvePath(paths[1])]);
}

function resolvePath(relativePath) {
    return path.resolve(path.join(__dirname, relativePath));
}

function copyAssets(files) {
    return files.map(srcDest => {
        console.log(`Copying ${srcDest[0]} to ${projectName} dist`);
        return fse.copy(srcDest[0], srcDest[1]);
    });
}
