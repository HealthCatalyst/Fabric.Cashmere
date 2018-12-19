/*
* The MIT License
*
* Copyright (c) 2018 Google LLC.
*
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

import {DocCollection, Document, Processor} from 'dgeni';
import {InterfaceExportDoc} from 'dgeni-packages/typescript/api-doc-types/InterfaceExportDoc';
import * as path from 'path';
import {CategorizedClassDoc} from '../common/dgeni-definitions';

/** Component group data structure. */
export class ComponentGroup {
    /** Unique document type for Dgeni. */
    docType = 'componentGroup';

    /** Name of the component group. */
    name: string;

    /** Display name of the component group */
    displayName: string;

    /** Module import path for the component group. */
    moduleImportPath: string;

    /** Name of the package, either material or cdk */
    packageName: string;

    /** Display name of the package. */
    packageDisplayName: string;

    /** Unique id for the component group. */
    id: string;

    /** Known aliases for the component group. */
    aliases: string[] = [];

    /** List of categorized class docs that are defining a directive. */
    directives: CategorizedClassDoc[] = [];

    /** List of categorized class docs that are defining a service. */
    services: CategorizedClassDoc[] = [];

    /** Additional classes that belong to the component group. */
    additionalClasses: CategorizedClassDoc[] = [];

    /** Additional interfaces that belong to the component group. */
    additionalInterfaces: InterfaceExportDoc[] = [];

    /** NgModule that defines the current component group. */
    ngModule: CategorizedClassDoc | null = null;

    constructor(name: string) {
        this.name = name;
        this.id = `component-group-${name}`;
    }
}

/**
 * Processor to group docs into top-level "Components" WRT material design, e.g., "Button", "Tabs",
 * where each group may conists of several directives and services.
 */
export class ComponentGrouper implements Processor {
    name = 'component-grouper';
    $runBefore = ['docs-processed'];

    $process(docs: DocCollection) {
        // Map of group name to group instance.
        const groups = new Map<string, ComponentGroup>();

        docs.forEach(doc => {
            const documentInfo = getDocumentPackageInfo(doc);

            const packageName = documentInfo.packageName;
            const packageDisplayName = 'Cashmere';

            const moduleImportPath = `@wcf-insurance/${packageName}`;
            const groupName = packageName + '-' + documentInfo.name;

            // Get the group for this doc, or, if one does not exist, create it.
            let group;
            if (groups.has(groupName)) {
                group = groups.get(groupName)!;
            } else {
                group = new ComponentGroup(groupName);
                groups.set(groupName, group);
            }

            group.displayName = documentInfo.name;
            group.moduleImportPath = moduleImportPath;
            group.packageName = packageName;
            group.packageDisplayName = packageDisplayName;

            // Put this doc into the appropriate list in this group.
            if (doc.isDirective) {
                group.directives.push(doc);
            } else if (doc.isService) {
                group.services.push(doc);
            } else if (doc.isNgModule) {
                group.ngModule = doc;
            } else if (doc.docType === 'class') {
                group.additionalClasses.push(doc);
            } else if (doc.docType === 'interface') {
                group.additionalInterfaces.push(doc);
            }
        });

        return Array.from(groups.values());
    }
}

/** Resolves package information for the given Dgeni document. */
function getDocumentPackageInfo(doc: Document) {
    // Full path to the file for this doc.
    const basePath = doc.fileInfo.basePath;
    const filePath = doc.fileInfo.filePath;

    // All of the component documentation is under either `src/lib` or `src/cdk`.
    // We group the docs up by the directory immediately under that root.
    const pathSegments = path.relative(basePath, filePath).split(path.sep);
    let groupName = pathSegments[1];

    // For the ripples there should be a component group in the docs. Even it's not a
    // secondary-entry point it can be still documented with its own `material-ripple.html` file.
    if (pathSegments[1] === 'core' && pathSegments[2] === 'ripple') {
        groupName = 'ripple';
    }

    return {
        name: groupName,
        packageName: pathSegments[0] === 'lib' ? 'cashmere' : pathSegments[0],
        entryPointName: pathSegments[1]
    };
}
