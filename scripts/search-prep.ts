const mark = require('marked');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const removeMd = require('remove-markdown');
const changeCase = require('change-case');

const outputDir = 'dist/user-guide/assets/docs/search/';
const tempArray: object[] = [];
const sectionRegex = /^#{5} /m;
const titleRegex = /(?<=\s##### )(.*)\s/g;
let object = {
    id: "",
    title: "",
    content: "",
    category: "",
    link: "",
    type: ""
};

// glob for .md files
glob('{guides/**/*.md,projects/@(cashmere|cashmere-bits)/src/lib/**/*.md}', async function (er, files) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    await files
        .map(file => {
            const basename = path.basename(file, path.extname(file));
            return {
                path: file,
                basename: basename,
                outFile: basename
            };
        })
        .forEach(mapping => {
            const fileContent = fs.readFileSync(mapping.path, 'utf8');
            let m;
            let found: string[] = [];
            while ((m = titleRegex.exec(fileContent)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === titleRegex.lastIndex) {
                    titleRegex.lastIndex++;
                }
                m.forEach((match, groupIndex) => {
                    if (groupIndex === 1) {
                        found.push(match);
                    }
                });
            }
            const sections = fileContent.split(sectionRegex);
            sections.forEach((element, index) => {
                const sectionTitle = found[index - 1] ? found[index - 1] : changeCase.noCase(mapping.path);
                const sectionObj = new Object({
                    id: changeCase.snakeCase(sectionTitle),
                    title: sectionTitle,
                    content: mdGetContent(element),
                    link: mdGetLink(mapping),
                    category: mdGetCategory(mapping.path),
                    type: mapping.basename
                });
                if (sectionObj["content"] !== "") {
                    tempArray.push(sectionObj);
                }
            });
        });
    await loadHtml();
});

function mdGetContent(element) {
    // Remove all markdown symbols
    let content = removeMd(element);
    // replace all extra spaces with a single space
    content = content.replace(/\s+/g, " ");
    // Remove all ':::' that is found in the Markdown, then trim it.
    content = content.replace(/(:::)+/g).trim();
    return content;
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

async function loadHtml() {
    glob('projects/cashmere-examples/src/lib/**/*.{html,ts}', async function (er, files) {
        await files
            .map(file => {
                const basename = path.basename(file, path.extname(file));
                return {
                    path: file,
                    basename: basename,
                    outFile: basename
                };
            })
            .forEach(mapping => {
                const fileContent = fs.readFileSync(mapping.path, 'utf8');
                let title = mapping.basename.split('.')[0];
                const sectionObj = new Object({
                    id: changeCase.snakeCase(title),
                    title: changeCase.sentenceCase(title),
                    content: exampleGetContent(fileContent),
                    link: htmlGetLink(mapping),
                    category: 'components',
                    type: mapping.basename.split('-')[0]
                });
                tempArray.push(sectionObj);
            });
        const distFD = fs.openSync(path.join(outputDir) + 'search.json', 'w+');
        fs.writeSync(distFD, JSON.stringify(tempArray));
    });
}

loadHtml();

function exampleGetContent(fileContent) {
    // Remove <div> and </div>
    let content = fileContent.replace(/<div>/gi, '');
    content = content.replace(/<\/div>/gi, '');
    // Remove excess white space
    content = content.replace(/\s+/g, " ");
    // Trim to clean up text
    content = content.trim();
    return content;
}

function htmlGetLink(mapping) {
    let link = '';
    // file category / file name
    link = `components/${mapping.basename.split('-')[0]}`;
    link += '/examples';
    return link;
}
