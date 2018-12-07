import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';
import * as glob from 'glob';
import {pascalCase} from 'change-case';
import * as ProgressBar from 'progress';

interface FileHash {
    [path: string]: string;
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

const progress = new ProgressBar('[:bar] :percent :exampleName', {total: exampleList.length + 1});
const exampleComponents: Array<{import: string; name: string}> = [];
const exampleModules: Array<{import: string; name: string}> = [];
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

    if (fs.existsSync(path.join(exampleDir, `${example}-example.module.ts`))) {
        const moduleName: string = `${exampleBaseName}ExampleModule`;
        const $import: string = `import { ${moduleName} } from './${example}/${example}-example.module';`;
        exampleModules.push({import: $import, name: moduleName});
        appModuleContents = appModuleTemplate
            .replace(moduleImportCommentPattern, $import)
            .replace(moduleNameCommentPattern, moduleName)
            .replace(moduleCommaPattern, ',')
            .replace(componentNameCommentPattern, '')
            .replace(componentImportCommentPattern, '')
            .replace(componentCommaPattern, '');
    } else {
        const componentName = `${exampleBaseName}ExampleComponent`;
        const $import = `import { ${componentName} } from './${example}/${example}-example.component';`;
        exampleComponents.push({import: $import, name: componentName});
        appModuleContents = appModuleTemplate
            .replace(componentImportCommentPattern, $import)
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
${exampleModules
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
fs.writeFileSync(path.join(examplesRoot, 'examples.generated.module.ts'), examplesModule);
fs.writeFileSync(
    path.join(examplesRoot, 'cashmere.generated.module.ts'),
    `/* This file is auto-generated; do not change! */\r\n${cashmereModule}`
);

progress.tick({exampleName: ''});
