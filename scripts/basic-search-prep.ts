import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import * as changeCase from 'change-case';

const outputDir = 'dist/user-guide/assets/docs/search/';
const basicSearchArray: object[] = [];
let object = {
    id: "",
    title: "",
    link: "",
    category: ""
};

function readGuideFiles() {
    glob('{guides/**/*.md,projects/@(cashmere|cashmere-bits)/src/lib/**/*.md}', async function (er, files) {
        files
            .map(file => {
                const basename = path.basename(file, path.extname(file));
                return {
                    path: file,
                    basename: basename,
                    outFile: basename
                };
            })
            .forEach(mapping => {
                let title = mapping.basename.split('.')[0];
                const sectionObj = object = ({
                    id: changeCase.snakeCase(title),
                    title: changeCase.sentenceCase(title) + ' Guide',
                    link: mdGetLink(mapping),
                    category: "Guide"
                });
                basicSearchArray.push(sectionObj);
            });
        readExampleFiles();
    });
}

function readExampleFiles() {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    // Reads the public api to get more simple data that we use
    const fileContent = fs.readFileSync('projects/cashmere/src/public_api.ts', 'utf8');
    const splitContent = fileContent.split(';');
    splitContent.forEach(content => {
        // removes the first lines
        let title = content.replace(`*\r\n * Public API Surface of cashmere\r\n */\r\n\r\n`, '');
        // We just want the folder name so we remove all the extra stuff we don't need
        title = title.replace(`export * from './lib/`, '');
        title = title.replace(`/index'`, '');
        title = title.replace('\r\n', '');
        const sectionObj = object = ({
            id: changeCase.snakeCase(title),
            title: changeCase.sentenceCase(title) + ' Component',
            link: `components/${title}/examples`,
            category: 'Component'
        });
        // if id is empty we don't want to push it
        if (sectionObj['id'] !== '') {
            basicSearchArray.push(sectionObj);
        }
    });
    const distFD = fs.openSync(path.join(outputDir) + 'basic-search.json', 'w');
    fs.writeSync(distFD, JSON.stringify(basicSearchArray));
}

function mdGetLink(mapping) {
    let link = '';
    // file category / file name
    link = `${mdGetCategory(mapping.path)}/${mapping.basename}`;
    // If the file is a component and a guide add /usage to the end
    if (mapping.path.split('.')[1] === 'md' && mdGetCategory(mapping.path) === 'components') {
        link += '/usage';
    }
    return link;
}

function mdGetCategory(fileName: string) {
    const urlSplit = fileName.split('/');
    // Since guides are only 2 folders deep from root the length will be 2
    if (urlSplit.length === 2) {
        return 'guides';
    } else {
        if (urlSplit[1] === 'styles') {
            return 'styles';
        }
        // Since components are in the cashmere folder we need to rename it.
        return urlSplit[1] === 'cashmere' ? 'components' : 'bits';
    }
}

readGuideFiles();
