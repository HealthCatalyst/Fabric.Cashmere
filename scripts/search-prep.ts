import * as fs from 'file-system';
import * as path from 'path';
import * as glob from 'glob';
import * as removeMd from 'remove-markdown';
import * as changeCase from 'change-case';

const outputDir = 'dist/search/';
const searchArray: object[] = [];
// Looks for '##### '
const sectionRegex = /^#{5} /m;
// Looks for new line '##### ' with positive look ahead
// With this we get the text after the 5 #'s, which is the title of the section
const titleRegex = /(?<=\s##### )(.*)\s/g;
// Base Object that we use for output
let object = {
    id: "",
    title: "",
    content: "",
    category: "",
    link: "",
    displayName: "",
    type: "",
    section: ""
};

function readGuideFiles() {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    glob('{guides/**/*.md,projects/@(cashmere|cashmere-bits)/src/lib/**/*.md}', function (er, files) {
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
                // Go through each file and find titles
                let matches: RegExpExecArray | null;
                let found: string[] = [];
                while ((matches = titleRegex.exec(fileContent)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (matches.index === titleRegex.lastIndex) {
                        titleRegex.lastIndex++;
                    }
                    matches.forEach((match: string, groupIndex: number) => {
                        if (groupIndex === 1) {
                            found.push(match);
                        }
                    });
                }

                // Split up the file content by title
                const sections = fileContent.split(sectionRegex);
                sections.forEach((element, index) => {
                    // Set the sectionTitle to the first index of the found array if null set to default path
                    const sectionTitle = found[index - 1] ? found[index - 1] : changeCase.noCase(mapping.path);
                    const sectionObj = object = ({
                        // Set id to the sectionTitle in snake case
                        id: changeCase.snakeCase(sectionTitle),
                        title: sectionTitle,
                        // Remove all the markdown from the file content and set it so we can search through it
                        content: mdGetContent(element),
                        link: mdGetLink(mapping),
                        category: mdGetCategory(mapping.path),
                        // Set displayName to basename for display purposes
                        displayName: mapping.basename,
                        type: 'Guides',
                        section: changeCase.paramCase(sectionTitle.replace('-example', ''))
                    });
                    // if the content is empty don't push it
                    if (sectionObj["content"] !== "") {
                        searchArray.push(sectionObj);
                    }
                });
            });
        readExampleFiles();
    });
}

function readExampleFiles() {
    glob('projects/cashmere-examples/src/lib/**/*.{html,ts}', function (er, files) {
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
                // Uses the basename to get the title and displayName
                // example basename: 'tabs-horizontal-example.component'
                let title = mapping.basename.split('.')[0];
                let name = mapping.basename.split('-')[0];
                const sectionObj = object = ({
                    id: changeCase.snakeCase(title),
                    // Set the title to the title with propare capitalization
                    title: changeCase.sentenceCase(title),
                    content: exampleGetContent(fileContent),
                    link: htmlGetLink(mapping),
                    category: 'components',
                    displayName: name,
                    type: getFileEnding(mapping.path).toUpperCase(),
                    section: changeCase.paramCase(title.replace('-example', ''))
                });
                if (sectionObj["id"] !== 'cashmere') {
                    searchArray.push(sectionObj);
                }
            });
        // Open the search.json file and write the object Array
        const distFD = fs.openSync(path.join(outputDir) + 'search.json', 'w');
        fs.writeSync(distFD, JSON.stringify(searchArray));
    });
}


function mdGetContent(element: string) {
    // Remove all markdown symbols
    let content = removeMd(element);
    // replace all extra spaces with a single space
    content = content.replace(/\s+/g, " ");
    // Remove all ':::' that is found in the Markdown, then trim it.
    content = content.replace(/(:::)+/g).trim();
    return content;
}

function mdGetLink(mapping: { path: any; basename: any; outFile?: string; }) {
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


function exampleGetContent(fileContent: string) {
    // Remove <div> and </div>
    let content = fileContent.replace(/<div>/gi, '');
    content = content.replace(/<\/div>/gi, '');
    // Remove excess white space
    content = content.replace(/\s+/g, " ");
    // Trim to clean up text
    content = content.trim();
    return content;
}

function htmlGetLink(mapping: { path?: string; basename: any; outFile?: string; }) {
    let link = '';
    // file category / file name
    link = `components/${mapping.basename.split('-')[0]}`;
    link += '/examples';
    return link;
}

function getFileEnding(path: string) {
    let type = path.split('.');
    return type[2];
}

readGuideFiles();