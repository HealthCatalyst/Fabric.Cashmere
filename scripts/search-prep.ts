const mark = require('marked');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const removeMd = require('remove-markdown');

const outputDir = 'dist/docs/usage';

glob('projects/@(cashmere|cashmere-bits)/src/lib/breadcrumbs/breadcrumbs.md', function (er, files) {
    const tempArray = [];
    let object = {
        id: "",
        title: "",
        content: "",
        category: "",
        link: ""
    };
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
            const result = mark(fileContent);
            fileContent.split("\n#").forEach(element => {
                console.log(element);
                let title = /\####(.*?)\\n/.exec(element);
                console.log(title);
                object.title = title ? title[0] : "empty";
                object.content = removeMd(element);
            });
            console.log(fileContent);

            fs.writeSync(distFD, result);
        });
    console.log(object);
});