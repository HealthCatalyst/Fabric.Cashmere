import * as fs from 'fs';
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

glob.sync('**/*', {cwd: outputRoot}).forEach(f => {
    fs.unlinkSync(path.join(outputRoot, f));
});

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

const progress = new ProgressBar('[:bar] :percent :exampleName', { total: exampleList.length });
for (let example of exampleList) {
    progress.tick({ exampleName: example });

    const exampleDir = path.join(examplesRoot, example);
    const exampleBaseName = pascalCase(example);
    const exampleFileList = glob.sync('**/*', {nodir: true, dot: true, cwd: exampleDir});

    const moduleImportCommentPattern = /\/\* example-module-import \*\//g;
    const componentImportCommentPattern = /\/\* example-component-import \*\//g;
    const moduleNameCommentPattern = /\/\* example-module-name \*\//g;
    const componentNameCommentPattern = /\/\* example-component-name \*\//g;

    let appModuleContents: string;

    if (fs.existsSync(path.join(exampleDir, `${example}-example.module.ts`))) {
        appModuleContents = appModuleTemplate
            .replace(
                moduleImportCommentPattern,
                `import { ${exampleBaseName}ExampleModule } from ' ./${example}/${example}-example.module';`
            )
            .replace(moduleNameCommentPattern, `${exampleBaseName}ExampleModule`)
            .replace(componentNameCommentPattern, '')
            .replace(componentImportCommentPattern, '');
    } else {
        appModuleContents = appModuleTemplate
            .replace(
                componentImportCommentPattern,
                `import { ${exampleBaseName}ExampleComponent } from './${example}/${example}-example.component';`
            )
            .replace(componentNameCommentPattern, `${exampleBaseName}ExampleComponent`)
            .replace(moduleNameCommentPattern, '')
            .replace(moduleImportCommentPattern, '');
    }

    const exampleFiles = exampleFileList.reduce(
        (prev, curr) => {
            const fullPath = path.join(examplesRoot, example, curr);
            const content = fs.readFileSync(fullPath).toString();
            prev[`src/app/${example}/${curr}`] = content;
            return prev;
        },
        {} as FileHash
    );

    const allFiles = Object.assign({}, projectTemplateFiles, exampleFiles, {'src/app/app.module.ts': appModuleContents});
    fs.writeFileSync(path.join(outputRoot, `${example}.json`), JSON.stringify(allFiles, null, 2));
}

progress.tick({ exampleName: '' });
