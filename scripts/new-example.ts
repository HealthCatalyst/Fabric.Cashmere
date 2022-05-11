// script for generating a new example
// main function is newExample() below

import chalk from 'chalk';
import * as yargs from 'yargs';
import {readdirSync, lstatSync, mkdirSync, readFileSync, writeFileSync, existsSync} from 'fs';
import {join} from 'path';
import {execSync} from 'child_process';
import inquirer = require('inquirer');
import {paramCase, pascalCase, titleCase} from 'change-case';
import {DocItem, DocItemCategory} from 'src/app/core/document-items.service';
import * as prettier from 'prettier';

let prettierConfig: prettier.Options;

console.info(chalk.gray('Gathering information...'));

const cashmereComponentDir = join(__dirname, '../projects/cashmere/src/lib');
const cashmereComponents = readdirSync(cashmereComponentDir)
    .filter(i => lstatSync(join(cashmereComponentDir, i)).isDirectory() && i !== 'pipes')
    .concat(
        readdirSync(join(cashmereComponentDir, 'pipes')).filter(i => lstatSync(join(join(cashmereComponentDir, 'pipes'), i)).isDirectory())
    );

const examplesDir = join(__dirname, '../projects/cashmere-examples/src/lib');
const existingExamples = readdirSync(examplesDir).filter(
    i => lstatSync(join(examplesDir, i)).isDirectory() && readdirSync(join(examplesDir, i)).length
);

const currentExampleDependencies = Object.keys(
    JSON.parse(readFileSync(join(__dirname, '../projects/cashmere-examples/package.json')).toString()).peerDependencies
);


const exampleTypes = ['simple', 'module'];

let args = yargs
    .option('component', {
        alias: 'c',
        describe: `choose which component's documentation this example will be attached to`,
        required: false
    })
    .option('name', {
        alias: 'n',
        describe: 'choose a name for your example',
        type: 'string',
        required: false,
        default: ''
    })
    .option('type', {
        alias: 't',
        describe: 'choose either simple type example or complex requiring module',
        choices: exampleTypes,
        required: false
    })
    .option('requiredPackages', {
        alias: 'r',
        describe: 'are there any additional NPM packages (other than what Cashmere already depends on) required by this example?',
        type: 'array',
        required: false
    })
    .help('help').argv;

async function promptForMissingArguments() {
    const input = await inquirer.prompt([
        {
            name: 'component',
            message: `Which component is this example for?`,
            type: 'list',
            choices: x => cashmereComponents,
            // when the component isn't specified in args or the component that is specified in args is invalid for the specified category
            when: x =>
                !args.component || !(cashmereComponents as any).includes(args.component)
        },
        {
            name: 'name',
            message: 'What is the name of this example?',
            type: 'input',
            validate: x => (!!paramCase(x) && !existingExamples.includes(paramCase(x))) || 'Example name required and must be unique.',
            when: () => !args.name || existingExamples.includes(paramCase(args.name))
        },
        {
            name: 'type',
            message:
                'Is this a simple example (self-contained within single component) or do you need an entire module file for this example?',
            type: 'list',
            choices: exampleTypes,
            when: () => !args.type
        },
        {
            name: 'requiredPackages',
            message: `Specify any new NPM packages (other than the following) required by this example as a comma-separated list:`,
            suffix: currentExampleDependencies.join(','),
            type: 'input',
            required: false,
            // Only prompt if other prompts have happened.  Don't want to prompt if all other required params were given as args.
            when: x => Object.keys(x).length,
            // transforms the user input from comma-separated string to an array of strings
            filter: x => (x || '').split(',')
        }
    ]);

    args = {...args, ...input};
    args.name = paramCase(args.name);
    args.requiredPackages = (args.requiredPackages || [])
        .map((p: string) => p!.trim().toLowerCase())
        .filter(p => !currentExampleDependencies.includes(p));

    prettierConfig = (await prettier.resolveConfig(__dirname))!;
}

(async function newExample() {
    await promptForMissingArguments();
    createFiles();
    await registerWithDocumentItemsService();
    if (args.requiredPackages!.length) {
        installAdditionalPackages();
    }
    runBuild();

    console.log(chalk.green('All done! Check your pending changes for TODOs for completing your example.'));
})();

function createFiles() {
    const newExampleDir = join(examplesDir, args.name);
    if (!existsSync(newExampleDir)) {
        mkdirSync(newExampleDir);
    }

    const exampleComponentFileName = join(newExampleDir, `${args.name}-example.component.ts`);
    console.info(chalk.gray(`creating ${exampleComponentFileName}...`));
    const componentFileContents = `import {Component} from '@angular/core';

@Component({
selector: 'hc-${args.name}-example',
templateUrl: '${args.name}-example.component.html',
// TODO: delete the SCSS file if you don't need it in the example
styleUrls: ['${args.name}-example.component.scss']
})
export class ${pascalCase(args.name)}ExampleComponent {
// TODO: implement your example here
}
`;
    writeFileSync(exampleComponentFileName, prettier.format(componentFileContents, {...prettierConfig, parser: 'typescript'}));

    const exampleHtmlFileName = join(newExampleDir, `${args.name}-example.component.html`);
    console.info(chalk.gray(`creating ${exampleHtmlFileName}...`));
    writeFileSync(exampleHtmlFileName, `\n`);

    const exampleScssFileName = join(newExampleDir, `${args.name}-example.component.scss`);
    console.info(chalk.gray(`creating ${exampleScssFileName}...`));
    writeFileSync(exampleScssFileName, `\n`);

    if (args.type === 'module') {
        const exampleModuleFileName = join(newExampleDir, `${args.name}-example.module.ts`);
        const componentName = `${pascalCase(args.name)}ExampleComponent`;
        console.info(chalk.gray(`creating ${exampleModuleFileName}...`));
        const moduleFileContents =
            `import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CashmereModule} from '../cashmere.module';
import {${componentName}} from './${args.name}-example.component';

@NgModule({
imports: [CommonModule, CashmereModule],
declarations: [${componentName}],
exports: [${componentName}],
entryComponents: [${componentName}]
})
export class ${pascalCase(args.name)}ExampleModule {
}
`.trim() + '\n';
        writeFileSync(exampleModuleFileName, prettier.format(moduleFileContents, {...prettierConfig, parser: 'typescript'}));
    }
}

async function registerWithDocumentItemsService() {
    console.info(chalk.gray(`registering example with document items service...`));
    const docItemsDirectory = join(__dirname, '../src/app/core');
    let docItemsFile: string;
    if (args.category === 'cashmere') {
        docItemsFile = join(docItemsDirectory, './cashmere-components-document-items.json');
    } else {
        console.warn(
            chalk.bold.yellowBright('Warning: cannot register with document items service since an unrecognized category was provided.')
        );
        return;
    }

    const componentString = `${args.component}`;

    const docItems = JSON.parse(readFileSync(docItemsFile).toString());
    if (!docItems[componentString]) {
        console.warn(
            chalk.yellowBright(
                `It seems that the component for this example has not yet been registered with the document items service.  Let's take care of that right now.`
            )
        );
        const answers = await inquirer.prompt([
            {
                name: 'category',
                message: 'What accordion would this component fit under on the Cashmere docs site?',
                choices: ['buttons', 'forms', 'layout', 'nav', 'pipes', 'popups', 'table'] as DocItemCategory[]
            }
        ]);
        docItems[componentString] = {
            category: answers.category,
            name: titleCase(componentString),
            examples: [],
            id: args.component,
            usageDoc: existsSync(
                join(cashmereComponentDir, componentString, `${args.component}.md`)
            ),
            hideApi: false
        } as DocItem;

        const cashmereModulePath = join(__dirname, '../src/app/shared/cashmere.module.ts');
        const cashmereModule = readFileSync(cashmereModulePath).toString();
        if (!cashmereModule.includes(`${pascalCase(componentString)}Module`)) {
            writeFileSync(cashmereModulePath, `// TODO: add ${pascalCase(componentString)}Module to this file\n${cashmereModule}`);
            console.warn(
                chalk.yellowBright(
                    `It seems that the component for this example has not yet been added to the CashmereModule in 'src/app/shared/cashmere.module.ts'. You will need to do this on your own.`
                )
            );
        }
    }
    docItems[componentString].examples.push(args.name);
    const jsonString = JSON.stringify(docItems);
    writeFileSync(docItemsFile, prettier.format(jsonString, {...prettierConfig, parser: 'json'}));
}

function installAdditionalPackages() {
    console.info(chalk.gray('installing additional NPM packages to the docs project...'));
    execSync(`npm install --save ${args.requiredPackages!.join(' ')}`, {cwd: join(__dirname, '../'), stdio: 'inherit'});

    console.info(chalk.gray('installing additional NPM packages to the examples project...'));
    const cashmereExamplesProjectDir = join(__dirname, '../projects/cashmere-examples');
    execSync(`npm install --save ${args.requiredPackages!.join(' ')}`, {cwd: cashmereExamplesProjectDir, stdio: 'inherit'});

    console.info(chalk.gray('moving dependencies to peer dependencies...'));
    const packageJsonPath = join(cashmereExamplesProjectDir, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath).toString());
    packageJson.peerDependencies = {...packageJson.peerDependencies, ...packageJson.dependencies};
    delete packageJson.dependencies;
    const jsonString = JSON.stringify(packageJson);
    writeFileSync(packageJsonPath, prettier.format(jsonString, {...prettierConfig, parser: 'json'}));
}

function runBuild() {
    console.info(chalk.gray('Performing initial build with the new example...'));
    execSync('npm run build', {cwd: join(__dirname, '../'), stdio: 'inherit'});
}
