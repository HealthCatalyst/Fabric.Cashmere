const md = require('markdown-it')({html: true});
const mdnh = require('markdown-it-named-headers');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const outputDir = 'dist/docs/usage';

// plugin to add id values to header tags
md.use(mdnh);

glob('projects/@(cashmere|cashmere-bits)/src/lib/**/*.md', function(er, files) {
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
            const result = md.render(fileContent);

            const distFD = fs.openSync(path.join(outputDir, mapping.outFile) + '.html', 'w');
            fs.writeSync(distFD, result);
        });
});
