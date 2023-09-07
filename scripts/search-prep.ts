import * as fs from 'file-system';
import * as path from 'path';
import {glob} from 'glob';
import * as removeMd from 'remove-markdown';
import * as changeCase from 'change-case';

const outputDir = 'src/assets/docs/search/';
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
    glob('{guides/*.md,guides/mobile/*.md}', {posix: true}).then(function (files) {
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
                        title: changeCase.titleCase( sectionTitle ) + ' - ' + changeCase.titleCase( mapping.basename ),
                        // Remove all the markdown from the file content and set it so we can search through it
                        content: mdGetContent(element),
                        link: mapping.path.includes('mobile') ? 'web/mobile/' + mapping.basename : 'web/guides/' + mapping.basename,
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
            readFoundationsFiles();
    });
}

// Index the foundations content which is a combination of markdown and components
function readFoundationsFiles() {
    // Start by parsing the style markdown files
    glob('guides/foundations/*.md', {posix: true}).then(function (files) {
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
                        title: changeCase.titleCase(sectionTitle) + ' - ' + changeCase.titleCase(mapping.basename),
                        // Remove all the markdown from the file content and set it so we can search through it
                        content: mdGetContent(element),
                        link: 'foundations/' + mapping.basename,
                        category: 'foundations',
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

    // Then parse the foundations components
    glob('src/app/foundations/*/*.html', {posix: true}).then(function (files) {
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
                const pathArray = mapping.path.split('/');
                const parentName = pathArray[ pathArray.length - 2 ];
                let title = mapping.basename.split('.')[0];
                title = title.replace( /-/g, ' ' );

                // Split up the file content by header-link anchors
                const sections = fileContent.split('<h5 id="');
                sections.forEach((element, index) => {
                    if ( index > 0 ) {
                        const quoteIndex = element.indexOf('"');
                        title = element.substr(0, quoteIndex);
                    }

                    const sectionObj = object = ({
                        id: mapping.basename.split('.')[0],
                        // Set the title to the title with propare capitalization
                        title: changeCase.titleCase(title) + ' - ' + changeCase.titleCase(parentName.replace(/-/g, ' ')),
                        content: exampleGetContent(element),
                        link: 'foundations/' + parentName,
                        category: 'foundations',
                        displayName: title,
                        type: 'doc',
                        section: changeCase.paramCase(title)
                    });
                    searchArray.push(sectionObj);
                });
            });

            readAdditionalStylesFiles();
    });
}

// Index the web app additional styles section which is a combination of markdown and components
function readAdditionalStylesFiles() {
    // Start by parsing the style markdown files
    glob('guides/styles/*.md', {posix: true}).then(function (files) {
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
                        title: changeCase.titleCase(sectionTitle) + ' - ' + changeCase.titleCase(mapping.basename),
                        // Remove all the markdown from the file content and set it so we can search through it
                        content: mdGetContent(element),
                        link: 'web/styles/' + mapping.basename,
                        category: 'components',
                        // Set displayName to basename for display purposes
                        displayName: mapping.basename,
                        type: 'example',
                        section: changeCase.paramCase(sectionTitle)
                    });
                    // if the content is empty don't push it
                    if (sectionObj["content"] !== "") {
                        searchArray.push(sectionObj);
                    }
                });
            });
    });

    // Then parse the styles components
    glob('src/app/styles/*/*.html', {posix: true}).then(function (files) {
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
                const pathArray = mapping.path.split('/');
                const parentName = pathArray[ pathArray.length - 2 ];
                let title = mapping.basename.split('.')[0];
                title = title.replace( /-/g, ' ' );

                // Split up the file content by header-link anchors
                const sections = fileContent.split('<h5 id="');
                sections.forEach((element, index) => {
                    if ( index > 0 ) {
                        const quoteIndex = element.indexOf('"');
                        title = element.substr(0, quoteIndex);
                    }

                    const sectionObj = object = ({
                        id: mapping.basename.split('.')[0],
                        // Set the title to the title with propare capitalization
                        title: changeCase.titleCase(title) + ' - ' + changeCase.titleCase(parentName.replace(/-/g, ' ')),
                        content: exampleGetContent(element),
                        link: 'web/styles/' + parentName,
                        category: 'components',
                        displayName: title,
                        type: 'example',
                        section: changeCase.paramCase(title)
                    });
                    searchArray.push(sectionObj);
                });
            });

            readContentFiles();
    });
}

// Index the content section which is a combination of markdown and components
function readContentFiles() {
    // Start by parsing the markdown files
    glob('{guides/content/*.md,guides/content/*/*.md}', {posix: true}).then(function (files) {
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
                    const pathParts = mapping.path.split('/');
                    pathParts.shift();
                    pathParts[pathParts.length - 1] = mapping.basename;
                    const sectionObj = object = ({
                        // Set id to the sectionTitle in snake case
                        id: changeCase.snakeCase(sectionTitle),
                        title: changeCase.titleCase(sectionTitle) + ' - ' + changeCase.titleCase(mapping.basename),
                        // Remove all the markdown from the file content and set it so we can search through it
                        content: mdGetContent(element),
                        link: pathParts.join('/'),
                        category: 'content',
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

    // Then parse the content components
    glob('src/app/content/*/*.html', {posix: true}).then(function (files) {
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
                const pathArray = mapping.path.split('/');
                const parentName = pathArray[ pathArray.length - 2 ];
                let title = mapping.basename.split('.')[0];
                title = title.replace( /-/g, ' ' );

                // Split up the file content by header-link anchors
                const sections = fileContent.split('<h5 id="');
                sections.forEach((element, index) => {
                    if ( index > 0 ) {
                        const quoteIndex = element.indexOf('"');
                        title = element.substr(0, quoteIndex);
                    }

                    const sectionObj = object = ({
                        id: mapping.basename.split('.')[0],
                        // Set the title to the title with propare capitalization
                        title: changeCase.titleCase(title) + ' - ' + changeCase.titleCase(parentName.replace(/-/g, ' ')),
                        content: exampleGetContent(element),
                        link: 'content/' + parentName,
                        category: 'content',
                        displayName: title,
                        type: 'doc',
                        section: changeCase.paramCase(title)
                    });
                    searchArray.push(sectionObj);
                });
            });

            readAnalyticsFiles();
    });
}

// Index the analytics section which is a combination of markdown and components
function readAnalyticsFiles() {
    // Start by parsing the main content markdown files
    glob('guides/analytics/*/*.md', {posix: true}).then(function (files) {
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
                    const pathArray = mapping.path.split('/');
                    let parentName = pathArray[ pathArray.length - 2 ];
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
                        title: changeCase.titleCase(sectionTitle) + ' - ' + changeCase.titleCase(mapping.basename),
                        // Remove all the markdown from the file content and set it so we can search through it
                        content: mdGetContent(element),
                        link: 'analytics/' + parentName + '-' + mapping.basename,
                        category: 'analytics',
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

    // Then parse the analytics components
    glob('src/app/analytics/*/*.html', {posix: true}).then(function (files) {
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
                const pathArray = mapping.path.split('/');
                const parentName = pathArray[ pathArray.length - 2 ];
                let title = mapping.basename.split('.')[0];
                title = title.replace( /-/g, ' ' );

                // Split up the file content by header-link anchors
                const sections = fileContent.split('<h5 id="');
                sections.forEach((element, index) => {
                    if ( index > 0 ) {
                        const quoteIndex = element.indexOf('"');
                        title = element.substr(0, quoteIndex);
                    }

                    const sectionObj = object = ({
                        id: mapping.basename.split('.')[0],
                        // Set the title to the title with propare capitalization
                        title: changeCase.titleCase(title) + ' - ' + changeCase.titleCase(parentName.replace(/-/g, ' ')),
                        content: exampleGetContent(element),
                        link: 'analytics/' + parentName,
                        category: 'analytics',
                        displayName: title,
                        type: 'doc',
                        section: changeCase.paramCase(title)
                    });
                    searchArray.push(sectionObj);
                });
            });

            readComponentUsage();
    });
}

// Index the usage markdown files for components
function readComponentUsage() {
    glob('projects/cashmere/src/lib/**/*.md', {posix: true}).then(function (files) {
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
                    const typeStr = 'components';
                    const sectionObj = object = ({
                        // Set id to the sectionTitle in snake case
                        id: changeCase.snakeCase(sectionTitle),
                        title: sectionTitle + ' - ' + changeCase.titleCase(parentName),
                        // Remove all the markdown from the file content and set it so we can search through it
                        content: mdGetContent(element),
                        link: 'web/' + typeStr + '/' + parentName + '/usage',
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
    glob('dist/docs/api/*.html', {posix: true}).then(function (files) {
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

                // Split up the file content by header-link anchors
                const sections = fileContent.split('<span header-link="');
                sections.forEach((element, index) => {
                    let title = mapping.basename.split('.')[0];
                    const parentName = title.substr(9);

                    if ( index > 0 ) {
                        const quoteIndex = element.indexOf('"');
                        title = element.substr(0, quoteIndex);
                    } else {
                        title = title.replace( 'cashmere-', '' );
                        title = title.replace( /-/g, ' ' );
                    }
                    const sectionObj = object = ({
                        id: mapping.basename.split('.')[0],
                        // Set the title to the title with propare capitalization
                        title: changeCase.titleCase(title) + ' - ' + changeCase.titleCase(parentName.replace(/-/g, ' ')),
                        content: apiGetContent(element),
                        link: 'web/components/' + parentName + '/api',
                        category: 'components',
                        displayName: title,
                        type: 'api',
                        section: title
                    });
                    searchArray.push(sectionObj);
                });
            });

            readComponentExamples();
    });
}

// Index the code in the examples for components
function readComponentExamples() {
    const componentItemsFile = 'src/app/core/cashmere-components-document-items.json';
    const componentExamples = JSON.parse(fs.readFileSync(componentItemsFile).toString());

    glob('projects/cashmere-examples/src/lib/*/*.{ts,html,scss}', {posix: true}).then(function (files) {
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

                const fileExArray = mapping.path.split('.');
                let selectedStr = changeCase.upperCase( fileExArray[ fileExArray.length - 1 ] );
                if ( mapping.basename.includes( '.module') ) {
                    selectedStr = 'Module';
                }

                const sectionStr = changeCase.paramCase(title.replace( '-example', ''));
                const sectionObj = object = ({
                    id: mapping.basename.split('.')[0],
                    // Set the title to the title with propare capitalization
                    title: changeCase.titleCase(title.replace( /-/g, ' ' )),
                    content: exampleGetContent(fileContent),
                    link: 'web/' + typeStr + '/' + parentItem + '/examples',
                    category: typeStr,
                    displayName: selectedStr,
                    type: 'example',
                    section: sectionStr
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
