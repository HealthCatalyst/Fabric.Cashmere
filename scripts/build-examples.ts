import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';
import * as glob from 'glob';
import {pascalCase} from 'change-case';
import * as ProgressBar from 'progress';

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

const examplesProjectRoot = path.join(__dirname, '../projects/cashmere-examples');
const examplesRoot = path.join(examplesProjectRoot, 'src/lib');
const projectTemplateRoot = path.join(examplesProjectRoot, 'src/project-template');
const outputRoot = path.join(__dirname, '../src/assets/docs/examples');
const cashmereModule = fs.readFileSync(path.join(__dirname, '../src/app/shared/cashmere.module.ts')).toString();

fse.ensureDirSync(outputRoot);
glob.sync('**/*', {cwd: outputRoot}).forEach(f => {
    fs.unlinkSync(path.join(outputRoot, f));
});

fs.writeFileSync(path.join(projectTemplateRoot, 'src/app/cashmere.module.ts'), cashmereModule);
const projectTemplateFiles = glob.sync('**/*', {dot: true, nodir: true, cwd: projectTemplateRoot}).reduce(
    (prev, curr) => {
        const fullPath = path.join(projectTemplateRoot, curr);
        const content = fs.readFileSync(fullPath).toString();
        prev[curr] = content;
        return prev;
    },
    {} as FileHash
);
const appModuleTemplate = projectTemplateFiles['src/app/app.module.ts'];

const exampleList = fs.readdirSync(examplesRoot).filter(f => {
    const file = path.join(examplesRoot, f);
    const stat = fs.statSync(file);
    return stat.isDirectory();
});

const progress = new ProgressBar('[:bar] :percent :exampleName', {total: exampleList.length + 3});
const exampleComponents: ExampleInfo[] = [];
const exampleModules: ExampleModuleInfo[] = [];
for (let example of exampleList) {
    progress.tick({exampleName: example});

    const exampleDir = path.join(examplesRoot, example);
    const exampleBaseName = pascalCase(example);
    const exampleFileList = glob.sync('**/*', {nodir: true, dot: true, cwd: exampleDir});

    const moduleImportCommentPattern = /\/\* example-module-import \*\//g;
    const componentImportCommentPattern = /\/\* example-component-import \*\//g;
    const moduleNameCommentPattern = /\/\* example-module-name \*\//g;
    const componentNameCommentPattern = /\/\* example-component-name \*\//g;
    const componentCommaPattern = /\/\* component-comma \*\//g;
    const moduleCommaPattern = /\/\* module-comma \*\//g;

    let appModuleContents: string;

    const componentName = `${exampleBaseName}ExampleComponent`;
    const componentImport = `import { ${componentName} } from './${example}/${example}-example.component';`;
    if (fs.existsSync(path.join(exampleDir, `${example}-example.module.ts`))) {
        // check to make sure the main component is in NgModule.entryComponents
        const moduleFile = fs.readFileSync(path.join(exampleDir, `${example}-example.module.ts`)).toString();
        const entryComponentsMatch = /entryComponents\: (\[[^\]]*\])/m.exec(moduleFile);
        if (!entryComponentsMatch) {
            throw new Error(`Example module for ${example} is missing an 'entryComponents' entry.`);
        }
        if (!entryComponentsMatch[1].includes(componentName)) {
            throw new Error(`Example module for ${example} must declare ${componentName} as an entry component.`);
        }

        const moduleName: string = `${exampleBaseName}ExampleModule`;
        const moduleImport: string = `import { ${moduleName} } from './${example}/${example}-example.module';`;
        exampleModules.push({
            import: moduleImport,
            name: moduleName,
            exampleName: example,
            mainComponentInfo: {
                import: componentImport,
                name: componentName,
                exampleName: example
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
        exampleComponents.push({import: componentImport, name: componentName, exampleName: example});
        appModuleContents = appModuleTemplate
            .replace(componentImportCommentPattern, componentImport)
            .replace(componentNameCommentPattern, componentName)
            .replace(componentCommaPattern, ',')
            .replace(moduleNameCommentPattern, '')
            .replace(moduleImportCommentPattern, '')
            .replace(moduleCommaPattern, '');
    }

    const exampleFiles = exampleFileList.reduce(
        (prev, curr) => {
            const fullPath = path.join(examplesRoot, example, curr);
            let content = fs.readFileSync(fullPath).toString();
            prev[`src/app/${example}/${curr}`] = content;
            return prev;
        },
        {} as FileHash
    );

    const allFiles = Object.assign({}, projectTemplateFiles, exampleFiles, {'src/app/app.module.ts': appModuleContents});
    fs.writeFileSync(path.join(outputRoot, `${example}.json`), JSON.stringify(allFiles, null, 2));
}

progress.tick({exampleName: 'examples modules'});
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
    ],
    entryComponents: [
        ${exampleComponents.map(x => x.name).join(',\r\n        ')}
    ]
})
export class ExampleModule {}
`;
fs.writeFileSync(path.join(examplesRoot, 'examples.generated.module.ts'), examplesModule);

progress.tick({exampleName: 'example Cashmere module'});
fs.writeFileSync(
    path.join(examplesRoot, 'cashmere.generated.module.ts'),
    `/* This file is auto-generated; do not change! */\r\n${cashmereModule}`
);

progress.tick({exampleName: 'example component mappings'});
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
fs.writeFileSync(path.join(examplesRoot, 'example-mappings.generated.ts'), examplesComponentMappings);

progress.tick({exampleName: ''});
