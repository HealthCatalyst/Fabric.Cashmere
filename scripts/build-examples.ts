import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';
import * as glob from 'glob';
import {pascalCase} from 'change-case';
import * as ProgressBar from 'progress';
import chalk from 'chalk';
import * as prettier from 'prettier';
import * as rimraf from 'rimraf';

interface FileHash {
    [path: string]: string;
}

interface ExampleInfo {
    import: string;
    name: string;
    exampleName: string;
}

interface ExampleModuleInfo extends ExampleInfo {
    mainComponentInfo: ExampleInfo;
}

// paths we'll need later
const examplesProjectRoot = path.join(__dirname, '../projects/cashmere-examples');
const examplesRoot = path.join(examplesProjectRoot, 'src/lib');
const projectTemplateRoot = path.join(examplesProjectRoot, 'src/project-template');
const assetsRoot = path.join(__dirname, '../src/assets/');
const outputRoot = path.join(assetsRoot, 'docs/examples');

const cashmereModule = fs.readFileSync(path.join(__dirname, '../src/app/shared/cashmere.module.ts')).toString();
const exampleComponents: ExampleInfo[] = [];
const exampleModules: ExampleModuleInfo[] = [];
const exampleList = getExampleNames();
const prettierConfig = prettier.resolveConfig.sync(path.join(__dirname, '../.prettierrc.json'));

//////////////////////////////////
/// Generate Cashmere Examples ///
//////////////////////////////////
console.log(chalk.blue('Generating Example Files'));
cleanOutputDirectory();
const projectTemplateFiles = getStackBlitzProjectTemplateFiles();
const appModuleTemplate = projectTemplateFiles['src/app/app.module.ts'];
const progress = new ProgressBar('[:bar] :percent :example', {total: exampleList.length + 4});
for (let example of exampleList) {
    progress.tick({example});
    generateStackBlitzFiles(example);
}
progress.tick({example: 'examples module'});
generateExamplesModule();
progress.tick({example: 'example Cashmere module'});
generateCashmereModule();
progress.tick({example: 'example component mappings'});
generateExampleToComponentMappingsFile();
progress.tick({example: ''}); // clear the progress bar
//////////////////////////////////

function cleanOutputDirectory() {
    fse.ensureDirSync(outputRoot);
    glob.sync('**/*', {cwd: outputRoot}).forEach(f => {
        rimraf.sync(path.join(outputRoot, f));
    });
}

function getStackBlitzProjectTemplateFiles() {
    fs.writeFileSync(
        path.join(projectTemplateRoot, 'src/app/cashmere.module.ts'),
        prettier.format(cashmereModule, {...prettierConfig, filepath: 'cashmere.module.ts'})
    );
    const exampleFiles: FileHash = {};
    // add all project template files to the StackBlitz
    glob.sync('**/*', {dot: true, nodir: true, cwd: projectTemplateRoot, posix: true}).reduce((prev, curr) => {
        const fullPath = path.join(projectTemplateRoot, curr);
        const content = fs.readFileSync(fullPath).toString();
        prev[curr] = content;
        return prev;
    }, exampleFiles);
    return exampleFiles;
}

function getExampleNames() {
    return fs.readdirSync(examplesRoot).filter(f => {
        const file = path.join(examplesRoot, f);
        const stat = fs.statSync(file);
        return stat.isDirectory();
    });
}

function generateStackBlitzFiles(exampleName: string) {
    const exampleDir = path.join(examplesRoot, exampleName);
    const exampleDirFiles = fs.readdirSync(exampleDir);
    if (!exampleDirFiles.length) {
        rimraf.sync(exampleDir);
        return;
    }
    const exampleBaseName = pascalCase(exampleName);
    const exampleFileList = glob.sync('**/*', {nodir: true, dot: true, cwd: exampleDir});

    const moduleImportCommentPattern = /\/\* example-module-import \*\//g;
    const componentImportCommentPattern = /\/\* example-component-import \*\//g;
    const moduleNameCommentPattern = /\/\* example-module-name \*\//g;
    const componentNameCommentPattern = /\/\* example-component-name \*\//g;
    const componentCommaPattern = /\/\* component-comma \*\//g;
    const moduleCommaPattern = /\/\* module-comma \*\//g;

    let appModuleContents: string;

    const componentName = `${exampleBaseName}ExampleComponent`;
    const componentImport = `import { ${componentName} } from './${exampleName}/${exampleName}-example.component';`;

    const mainComponentFilePath = path.join(exampleDir, `${exampleName}-example.component.ts`);
    if (!fs.existsSync(mainComponentFilePath)) {
        throw error(`Cannot find main component file '${mainComponentFilePath}' for example ${exampleName}`);
    }

    const mainComponentFileContents = fs.readFileSync(mainComponentFilePath).toString();
    if (!mainComponentFileContents.includes(`export class ${componentName}`)) {
        throw error(`Expected main component file for example '${exampleName}' to export ${componentName}, but it was not found.`);
    }

    if (!mainComponentFileContents.includes(`selector: 'hc-${exampleName}-example'`)) {
        throw error(`Expected selector for main component for example '${exampleName}' to be 'hc-${exampleName}-example', but it was not.`);
    }

    // if a module file exists, check it and use it (instead of the component) in the generated example module
    if (fs.existsSync(path.join(exampleDir, `${exampleName}-example.module.ts`))) {
        const moduleFile = fs.readFileSync(path.join(exampleDir, `${exampleName}-example.module.ts`)).toString();
        const moduleName: string = `${exampleBaseName}ExampleModule`;
        if (!moduleFile.includes(`export class ${moduleName}`)) {
            throw error(`Expected module file for example '${exampleName}' to export ${moduleName}, but it was not found.`);
        }
        const moduleImport: string = `import { ${moduleName} } from './${exampleName}/${exampleName}-example.module';`;
        exampleModules.push({
            import: moduleImport,
            name: moduleName,
            exampleName,
            mainComponentInfo: {
                import: componentImport,
                name: componentName,
                exampleName
            }
        });
        appModuleContents = appModuleTemplate
            .replace(moduleImportCommentPattern, moduleImport)
            .replace(moduleNameCommentPattern, moduleName)
            .replace(moduleCommaPattern, ',')
            .replace(componentNameCommentPattern, '')
            .replace(componentImportCommentPattern, '')
            .replace(componentCommaPattern, '');
    } else {
        exampleComponents.push({import: componentImport, name: componentName, exampleName});
        appModuleContents = appModuleTemplate
            .replace(componentImportCommentPattern, componentImport)
            .replace(componentNameCommentPattern, componentName)
            .replace(componentCommaPattern, ',')
            .replace(moduleNameCommentPattern, '')
            .replace(moduleImportCommentPattern, '')
            .replace(moduleCommaPattern, '');
    }

    const exampleFiles = exampleFileList.reduce((prev, curr) => {
        // get formatted file contents
        const fullPath = path.join(examplesRoot, exampleName, curr);
        let content = fs.readFileSync(fullPath).toString();
        prev[`src/app/${exampleName}/${curr}`] = prettier.format(content, {...prettierConfig, filepath: fullPath});

        // if the file references any assets, include those too
        const assetPattern = /".\/assets\/([^"]+)"/g;
        let match = assetPattern.exec(content);
        while (match) {
            const assetName = match[1];
            const assetContent = fs.readFileSync(path.join(assetsRoot, assetName)).toString();
            prev[`src/assets/${assetName}`] = assetContent;
            match = assetPattern.exec(content);
        }

        return prev;
    }, {} as FileHash);

    const allFiles = Object.assign({}, projectTemplateFiles, exampleFiles, {
        'src/app/app.module.ts': prettier.format(appModuleContents, {...prettierConfig, filepath: 'app.module.ts'}),
    });
    fs.writeFileSync(
        path.join(outputRoot, `${exampleName}.json`),
        prettier.format(JSON.stringify(allFiles, null, 2), {...prettierConfig, filepath: `${exampleName}.json`})
    );
}

function generateExamplesModule() {
    const examplesModule = `/* This file is auto-generated; do not change! */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashmereModule } from './cashmere.module';
${(exampleModules as ExampleInfo[])
    .concat(exampleComponents)
    .map(x => x.import)
    .join('\n')}

@NgModule({
    imports: [
        CommonModule,
        CashmereModule,
        FormsModule,
        ReactiveFormsModule,
        ${exampleModules.map(x => x.name).join(',\r\n        ')}
    ],
    declarations: [
        ${exampleComponents.map(x => x.name).join(',\r\n        ')}
    ]
})
export class ExampleModule {}
`;
    fs.writeFileSync(
        path.join(examplesRoot, 'examples.generated.module.ts'),
        prettier.format(examplesModule, {...prettierConfig, filepath: 'examples.generated.module.ts'})
    );
}

function generateCashmereModule() {
    fs.writeFileSync(
        path.join(examplesRoot, 'cashmere.generated.module.ts'),
        prettier.format(`/* This file is auto-generated; do not change! */\r\n${cashmereModule}`, {
            ...prettierConfig,
            filepath: 'cashmere.module.ts'
        })
    );
}

function generateExampleToComponentMappingsFile() {
    const allExampleComponents = exampleModules
        .map(m => m.mainComponentInfo)
        .concat(exampleComponents)
        .sort((a, b) => a.exampleName.localeCompare(b.exampleName));
    const mappingLines = allExampleComponents.map(e => `'${e.exampleName}': ${e.name}`);
    const examplesComponentMappings = `/* This file is auto-generated; do not change! */
${allExampleComponents.map(x => x.import).join('\n')}

export const EXAMPLE_COMPONENTS: { [exampleName: string]: any; } = {
    ${mappingLines.join(',\r\n    ')}
};
    `;
    fs.writeFileSync(
        path.join(examplesRoot, 'example-mappings.generated.ts'),
        prettier.format(examplesComponentMappings, {filepath: 'example-mappings.generated.ts'})
    );
}

function error(message: string) {
    console.error(chalk.bold.red(`\nERROR: ${message}`));
    return new Error(message);
}
