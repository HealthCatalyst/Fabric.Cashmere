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

import {DocCollection, Processor} from 'dgeni';
import {ExportDoc} from 'dgeni-packages/typescript/api-doc-types/ExportDoc';

/**
 * Processor to filter out Dgeni documents that are exported multiple times. This is necessary
 * to avoid that API entries are showing up multiple times in the docs.
 *
 * ```ts
 *   // Some file in @angular/cdk/scrolling
 *   export {ScrollDispatcher} from './scroll-dispatcher';
 *
 *   // Other file in @angular/cdk/overlay
 *   export {ScrollDispatcher} from '@angular/cdk/scrolling';
 *
 *   // Re-export of the same export with a different name (alias).
 *   export {ScrollDispatcher as X} from './scroll-dispatcher';
 * ```
 *
 * This issue occurs sometimes in the Angular Material repository, because some imports are
 * re-exported with a different name (for deprecation), or from a different secondary entry-point.
 */
export class FilterDuplicateExports implements Processor {
    name = 'filter-duplicate-exports';
    $runBefore = ['categorizer'];

    $process(docs: DocCollection) {
        const duplicateDocs = this.findDuplicateExports(docs);
        return docs.filter(d => !duplicateDocs.has(d));
    }

    findDuplicateExports(docs: DocCollection) {
        const duplicates = new Set<ExportDoc>();

        docs.forEach(doc => {
            if (!(doc instanceof ExportDoc)) {
                return;
            }

            // Check for Dgeni documents that refer to the same TypeScript symbol. Those can be
            // considered as duplicates of the current document.
            const similarDocs = docs.filter(d => d.symbol === doc.symbol);

            if (similarDocs.length > 1) {
                // If there are multiple docs that refer to the same TypeScript symbol, but have a
                // different name than the resolved symbol, we can remove those documents, since they
                // are just aliasing an already existing export.
                similarDocs.filter(d => d.symbol.name !== d.name).forEach(d => duplicates.add(d));

                const docsWithSameName = similarDocs.filter(d => d.symbol.name === d.name);

                // If there are multiple docs that refer to the same TypeScript symbol and have
                // the same name, we need to remove all of those duplicates except one.
                if (docsWithSameName.length > 1) {
                    docsWithSameName.slice(1).forEach(d => duplicates.add(d));
                }
            }
        });

        return duplicates;
    }
}
