const glob = require('glob');
const path = require('path');
const hljs = require('highlight.js');
const fs = require('fs');

const outputDir = 'dist/docs/examples';
const languageMap = {ts: 'typescript'};

glob('projects/cashmere-examples/src/lib/**/*.+(html|css|ts)', function(er, files) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    files
        .map(file => {
            const ext = path.extname(file).slice(1);
            const basename = path.basename(file, path.extname(file));
            return {
                path: file,
                basename: basename,
                ext: ext,
                outFile: basename + '-' + ext
            };
        })
        .forEach(mapping => {
            const fileContent = fs.readFileSync(mapping.path, 'utf8');
            const language = languageMap[mapping.ext] || mapping.ext;
            const result = hljs.highlight(language, fileContent);

            const distFD = fs.openSync(path.join(outputDir, mapping.outFile) + '.html', 'w');
            fs.writeSync(distFD, result.value);
        });
});
