import * as fs from 'file-system';
import * as path from 'path';
import * as glob from 'glob';
import * as removeMd from 'remove-markdown';
import * as changeCase from 'change-case';
import { forEachChild } from 'typescript';

const outputDir = 'dist/search/';
const searchArray: object[] = [];
// Looks for '##### '
const guideSectionRegex = /^#{5} /m;
// Looks for new line '##### ' with positive look ahead
// With this we get the text after the 5 #'s, which is the title of the section
const guideTitleRegex = /(?<=\s##### )(.*)\s/g;
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

// Index the markdown content from the Guides section of the site
function readGuideFiles() {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    glob('guides/*.md', function (er, files) {
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
                while ((matches = guideTitleRegex.exec(fileContent)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (matches.index === guideTitleRegex.lastIndex) {
                        guideTitleRegex.lastIndex++;
                    }
                    matches.forEach((match: string, groupIndex: number) => {
                        if (groupIndex === 1) {
                            found.push(match);
                        }
                    });
                }

                // Split up the file content by title
                const sections = fileContent.split(guideSectionRegex);
                sections.forEach((element, index) => {
                    let sectionTitle: string;
                    if ( index > 0 ) {
                        // Set the sectionTitle to the first index of the found array if null set to default path
                        sectionTitle = found[index - 1] ? found[index - 1] : changeCase.noCase(mapping.path);
                    } else {
                        // The part element of a guide is its title which needs to be parsed differently
                        const endOfLine = element.indexOf( '\n' );
                        sectionTitle = element.substr( 2, endOfLine - 2);
                    }
                    const sectionObj = object = ({
                        // Set id to the sectionTitle in snake case
                        id: changeCase.snakeCase(sectionTitle),
                        title: sectionTitle,
                        // Remove all the markdown from the file content and set it so we can search through it
                        content: mdGetContent(element),
                        link: 'guides/' + mapping.basename,
                        category: 'guides',
                        // Set displayName to basename for display purposes
                        displayName: mapping.basename,
                        type: 'doc',
                        section: changeCase.paramCase(sectionTitle)
                    });
                    // if the content is empty don't push it
                    if (sectionObj["content"] !== "") {
                        searchArray.push(sectionObj);
                    }
                });
            });
            readStyleFiles();
    });
}

// Index the styles content which is a combination of markdown and components
function readStyleFiles() {
    // Start by parsing the style markdown files
    glob('guides/styles/*.md', function (er, files) {
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
                while ((matches = guideTitleRegex.exec(fileContent)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (matches.index === guideTitleRegex.lastIndex) {
                        guideTitleRegex.lastIndex++;
                    }
                    matches.forEach((match: string, groupIndex: number) => {
                        if (groupIndex === 1) {
                            found.push(match);
                        }
                    });
                }

                // Split up the file content by title
                const sections = fileContent.split(guideSectionRegex);
                sections.forEach((element, index) => {
                    let sectionTitle: string;
                    if ( index > 0 ) {
                        // Set the sectionTitle to the first index of the found array if null set to default path
                        sectionTitle = found[index - 1] ? found[index - 1] : changeCase.noCase(mapping.path);
                    } else {
                        // The part element of a guide is its title which needs to be parsed differently
                        const endOfLine = element.indexOf( '\n' );
                        sectionTitle = element.substr( 2, endOfLine - 2);
                    }
                    const sectionObj = object = ({
                        // Set id to the sectionTitle in snake case
                        id: changeCase.snakeCase(sectionTitle),
                        title: sectionTitle,
                        // Remove all the markdown from the file content and set it so we can search through it
                        content: mdGetContent(element),
                        link: 'styles/' + mapping.basename,
                        category: 'styles',
                        // Set displayName to basename for display purposes
                        displayName: mapping.basename,
                        type: 'doc',
                        section: changeCase.paramCase(sectionTitle)
                    });
                    // if the content is empty don't push it
                    if (sectionObj["content"] !== "") {
                        searchArray.push(sectionObj);
                    }
                });
            });
    });

    // Then parse the style components
    glob('src/app/styles/**/*.html', function (er, files) {
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
                let title = mapping.basename.split('.')[0];
                title = title.replace( /-/g, ' ' );
                const pathArray = mapping.path.split('/');
                const parentName = pathArray[ pathArray.length - 2 ];
                const sectionObj = object = ({
                    id: mapping.basename.split('.')[0],
                    // Set the title to the title with propare capitalization
                    title: changeCase.titleCase(parentName.replace(/-/g, ' ')),
                    content: exampleGetContent(fileContent),
                    link: 'styles/' + parentName,
                    category: 'styles',
                    displayName: title,
                    type: 'doc',
                    section: changeCase.paramCase(title)
                });
                searchArray.push(sectionObj);
            });

            readComponentUsage();
    });
}

// Index the usage markdown files for components & bits
function readComponentUsage() {
    glob('projects/{cashmere,cashmere-bits}/src/lib/**/*.md', function (er, files) {
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
                while ((matches = guideTitleRegex.exec(fileContent)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (matches.index === guideTitleRegex.lastIndex) {
                        guideTitleRegex.lastIndex++;
                    }
                    matches.forEach((match: string, groupIndex: number) => {
                        if (groupIndex === 1) {
                            found.push(match);
                        }
                    });
                }

                // Split up the file content by title
                const sections = fileContent.split(guideSectionRegex);
                sections.forEach((element, index) => {
                    let sectionTitle: string;
                    const endOfLine = element.indexOf( '\n' );
                    sectionTitle = element.substr( 0, endOfLine);
                    const pathArray = mapping.path.split('/');
                    let parentName = pathArray[ pathArray.length - 2 ];
                    parentName += mapping.path.includes('pipes') ? '-pipe' : '';
                    const typeStr = mapping.path.includes('cashmere-bits') ? 'bits' : 'components';
                    const sectionObj = object = ({
                        // Set id to the sectionTitle in snake case
                        id: changeCase.snakeCase(sectionTitle),
                        title: sectionTitle,
                        // Remove all the markdown from the file content and set it so we can search through it
                        content: mdGetContent(element),
                        link: typeStr + '/' + parentName + '/usage',
                        category: typeStr,
                        // Set displayName to basename for display purposes
                        displayName: mapping.basename,
                        type: 'usage',
                        section: changeCase.paramCase(sectionTitle)
                    });
                    // if the content is empty don't push it
                    if (sectionObj["content"] !== "") {
                        searchArray.push(sectionObj);
                    }
                });
            });

            readComponentAPI();
    });
}

// Index the generated API docs for Cashmere components
function readComponentAPI() {
    glob('dist/docs/api/*.html', function (er, files) {
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
                let title = mapping.basename.split('.')[0];
                const parentName = title.substr(9);
                title = title.replace( 'cashmere-', '' );
                title = title.replace( /-/g, ' ' );
                const sectionObj = object = ({
                    id: mapping.basename.split('.')[0],
                    // Set the title to the title with propare capitalization
                    title: changeCase.titleCase(parentName.replace(/-/g, ' ')),
                    content: apiGetContent(fileContent),
                    link: 'components/' + parentName + '/api',
                    category: 'components',
                    displayName: title,
                    type: 'api',
                    section: changeCase.paramCase(title)
                });
                searchArray.push(sectionObj);
            });

            readComponentExamples();
    });
}

// Index the code in the examples for components & bits
function readComponentExamples() {
    const componentItemsFile = 'src/app/core/cashmere-components-document-items.json';
    const componentExamples = JSON.parse(fs.readFileSync(componentItemsFile).toString());

    const bitItemsFile = 'src/app/core/cashmere-bits-document-items.json';
    const bitExamples = JSON.parse(fs.readFileSync(bitItemsFile).toString());

    glob('projects/cashmere-examples/src/lib/*/*.{ts,html}', function (er, files) {
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
                let title = mapping.basename.split('.')[0];
                const pathArray = mapping.path.split('/');
                const parentName = pathArray[ pathArray.length - 2 ];
                let parentItem = '';
                let typeStr = '';

                const bitKeys = Object.keys( bitExamples );
                for ( let j = 0; j < bitKeys.length && parentItem === ''; j++ ) {
                    if ( bitExamples[ bitKeys[j] ].examples ) {
                        for ( let i = 0; i < bitExamples[ bitKeys[j] ].examples.length; i++ ) {
                            if ( bitExamples[ bitKeys[j] ].examples[i] === parentName ) {
                                parentItem = bitKeys[j];
                                typeStr = 'bits';
                                break;
                            }
                        }
                    }
                }

                if ( parentItem === '' ) {
                    const componentKeys = Object.keys( componentExamples );
                    for ( let j = 0; j < componentKeys.length && parentItem === ''; j++ ) {
                        if ( componentExamples[ componentKeys[j] ].examples ) {
                            for ( let i = 0; i < componentExamples[ componentKeys[j] ].examples.length; i++ ) {
                                if ( componentExamples[ componentKeys[j] ].examples[i] === parentName ) {
                                    parentItem = componentKeys[j];
                                    typeStr = 'components';
                                    break;
                                }
                            }
                        }
                    }
                }

                const sectionObj = object = ({
                    id: mapping.basename.split('.')[0],
                    // Set the title to the title with propare capitalization
                    title: changeCase.titleCase(title.replace( /-/g, ' ' )),
                    content: exampleGetContent(fileContent),
                    link: typeStr + '/' + parentItem + '/examples',
                    category: typeStr,
                    displayName: title.replace( /-/g, ' ' ),
                    type: 'example',
                    section: changeCase.paramCase(title)
                });
                searchArray.push(sectionObj);
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
    content = content.replace(/(:::)+/g, '').trim();
    return content;
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

function apiGetContent(fileContent: string) {
    // Remove html comments
    let content = fileContent.replace(/<!--(.*?)-->/gi, '');
    // Remove excess white space
    content = content.replace(/\s+/g, " ");
    // Trim to clean up text
    content = content.trim();
    return content;
}

readGuideFiles();
