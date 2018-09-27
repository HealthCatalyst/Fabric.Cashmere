/**
 * The MIT License
 *
 * Copyright (c) 2018 Google LLC.

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {sync as glob} from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

interface ExampleMetadata {
    component: string;
    sourcePath: string;
    id: string;
    title: string;
    additionalComponents: string[];
    additionalFiles: string[];
    selectorName: string[];
}

interface ParsedMetadata {
    primary: boolean;
    component: string;
    title: string;
    templateUrl: string;
}

interface ParsedMetadataResults {
    primaryComponent: ParsedMetadata;
    secondaryComponents: ParsedMetadata[];
}

/** Path to find the examples */
const examplesPath = path.join('projects', 'cashmere-examples', 'src', 'lib');

/** Output path of the module that is being created */
const outputModuleFilename = path.join(examplesPath, 'cashmere-example.module.ts');

/** Build ES module import statements for the examples. */
function buildImportsTemplate(metadata: ExampleMetadata): string {
    const components = metadata.additionalComponents.concat(metadata.component);

    // Create a relative path to the source file of the current example.
    // The relative path will be used inside of a TypeScript import statement.
    const relativeSrcPath = path
        .relative(examplesPath, metadata.sourcePath)
        .replace(/\\/g, '/')
        .replace('.ts', '');

    return `import {${components.join(',')}} from './${relativeSrcPath}';
`;
}

/**
 * Builds the examples metadata including title, component, etc.
 */
function buildExamplesTemplate(metadata: ExampleMetadata): string {
    const fields = [`title: '${metadata.title.trim()}'`, `component: ${metadata.component}`];

    // if no additional files or selectors were provided,
    // return null since we don't care about if these were not found
    if (metadata.additionalFiles.length) {
        fields.push(`additionalFiles: ${JSON.stringify(metadata.additionalFiles)}`);
    }

    if (metadata.selectorName.length) {
        fields.push(`selectorName: '${metadata.selectorName.join(', ')}'`);
    }

    const data = '\n' + fields.map(field => '    ' + field).join(',\n');

    return `'${metadata.id}': {${data}
  },
  `;
}

/**
 * Build the list of components template
 */
function buildListTemplate(metadata: ExampleMetadata): string {
    const components = metadata.additionalComponents.concat(metadata.component);
    return `${components.join(',')},
  `;
}

/**
 * Builds the template for the examples module
 */
function generateExampleNgModule(extractedMetadata: ExampleMetadata[]): string {
    return `
/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED VIA GULP 'build-examples-module' */
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CashmereModule} from './cashmere.module';
${extractedMetadata
        .map(r => buildImportsTemplate(r))
        .join('')
        .trim()}

export interface LiveExample {
  title: string;
  component: any;
  additionalFiles?: string[];
  selectorName?: string;
}

export const EXAMPLE_COMPONENTS: {[key: string]: LiveExample} = {
  ${extractedMetadata
      .map(r => buildExamplesTemplate(r))
      .join('')
      .trim()}
};

export const EXAMPLE_LIST = [
  ${extractedMetadata
      .map(r => buildListTemplate(r))
      .join('')
      .trim()}
];

@NgModule({
  declarations: EXAMPLE_LIST,
  entryComponents: EXAMPLE_LIST,
  imports: [
    CashmereModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CashmereExampleModule { }
`;
}

/**
 * Given a string that is a camel or pascal case,
 * this function will convert to dash case.
 */
function convertToDashCase(name: string): string {
    name = name.replace(/[A-Z]/g, ' $&');
    name = name.toLowerCase().trim();
    return name.split(' ').join('-');
}

/**
 * Parse the AST of a file and get metadata about it
 */
function parseExampleMetadata(fileName: string, sourceContent: string): ParsedMetadataResults {
    const sourceFile = ts.createSourceFile(fileName, sourceContent, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);

    const metas: any[] = [];

    const visit = (node: any): void => {
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            const meta: any = {
                component: node.name.text
            };

            if (node.jsDoc && node.jsDoc.length) {
                for (const doc of node.jsDoc) {
                    if (doc.tags && doc.tags.length) {
                        for (const tag of doc.tags) {
                            const tagValue = tag.comment;
                            const tagName = tag.tagName.text;
                            if (tagName === 'title') {
                                meta.title = tagValue;
                                meta.primary = true;
                            }
                        }
                    }
                }
            }

            if (node.decorators && node.decorators.length) {
                for (const decorator of node.decorators) {
                    if (decorator.expression.expression.text === 'Component') {
                        for (const arg of decorator.expression.arguments) {
                            for (const prop of arg.properties) {
                                const name = prop.name.text;
                                const value = prop.initializer.text;
                                meta[name] = value;
                            }
                        }

                        metas.push(meta);
                    }
                }
            }
        }

        ts.forEachChild(node, visit);
    };

    visit(sourceFile);

    return {
        primaryComponent: metas.find(m => m.primary),
        secondaryComponents: metas.filter(m => !m.primary)
    };
}

const results: ExampleMetadata[] = [];
const matchedFiles = glob(path.join(examplesPath, '**/*.ts'));

for (const sourcePath of matchedFiles) {
    const sourceContent = fs.readFileSync(sourcePath, 'utf-8');

    const {primaryComponent, secondaryComponents} = parseExampleMetadata(sourcePath, sourceContent);

    if (primaryComponent) {
        // Generate a unique id for the component by converting the class name to dash-case.
        const id = convertToDashCase(primaryComponent.component.replace('Example', ''));

        const example: ExampleMetadata = {
            sourcePath,
            id,
            component: primaryComponent.component,
            title: primaryComponent.title,
            additionalComponents: [],
            additionalFiles: [],
            selectorName: []
        };

        if (secondaryComponents.length) {
            example.selectorName.push(example.component);

            for (const meta of secondaryComponents) {
                example.additionalComponents.push(meta.component);
                if (meta.templateUrl) {
                    example.additionalFiles.push(meta.templateUrl);
                }
                example.selectorName.push(meta.component);
            }
        }

        results.push(example);
    }
}

const generatedModuleFile = generateExampleNgModule(results);
fs.writeFileSync(outputModuleFilename, generatedModuleFile);
