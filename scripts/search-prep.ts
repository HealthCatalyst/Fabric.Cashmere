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
    link: ""
};

glob('{guides/**/*.md,projects/@(cashmere|cashmere-bits)/src/lib/**/*.md}', function (er, files) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
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
                    content: removeMd(element),
                    link: `${getCategory(mapping.path)}/${mapping.basename}`,
                    category: getCategory(mapping.path)
                });
                if (sectionObj["content"] !== "") {
                    tempArray.push(sectionObj);
                }
            });
        });
    const distFD = fs.openSync(path.join(outputDir) + 'search.json', 'w');
    fs.writeSync(distFD, JSON.stringify(tempArray));
});

function getCategory(fileName: string) {
    const urlSplit = fileName.split('/');
    if (urlSplit.length === 2) {
        return 'guides';
    } else {
        if (urlSplit[1] === 'styles') {
            return 'styles';
        }
        return urlSplit[1] === 'cashmere' ? 'components' : 'bits';
    }
}
