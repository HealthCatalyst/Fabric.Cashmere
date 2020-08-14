const mark = require('marked');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const removeMd = require('remove-markdown');
const changeCase = require('change-case');

const outputDir = 'dist/user-guide/assets/docs/search/search.json';
const tempArray: object[] = [];
const titleRegex = /(?<=# )(.*)\s/g;
let object = {
    id: "",
    title: "",
    content: "",
    category: "",
    link: ""
};

glob('projects/@(cashmere|cashmere-bits)/src/lib/input/input.md', function (er, files) {
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
            const sections = fileContent.split("\n#");
            sections.forEach((element, index) => {
                object.id = changeCase.snakeCase(found[index]);
                object.title = found[index];
                object.content = removeMd(element);
                object.link = mapping.path;
                object.category = mapping.basename;
                tempArray.push(object);
            });
            console.log(tempArray);
        });
    fs.writeFile(outputDir, 'JSON.stringify(tempArray)');
});