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
import {ClassExportDoc} from 'dgeni-packages/typescript/api-doc-types/ClassExportDoc';
import {MemberDoc} from 'dgeni-packages/typescript/api-doc-types/MemberDoc';

/**
 * Processor that merges inherited properties of a class with the class doc. This is necessary
 * to properly show public properties from TypeScript mixin interfaces in the API.
 */
export class MergeInheritedProperties implements Processor {
    name = 'merge-inherited-properties';
    $runBefore = ['categorizer'];

    $process(docs: DocCollection) {
        return docs.filter(doc => doc.docType === 'class').forEach(doc => this.addInheritedProperties(doc));
    }

    private addInheritedProperties(doc: ClassExportDoc) {
        doc.implementsClauses
            .filter(clause => clause.doc)
            .forEach(clause => {
                clause.doc!.members.forEach(member => this.addMemberDocIfNotPresent(doc, member));
            });

        doc.extendsClauses
            .filter(clause => clause.doc)
            .forEach(clause => {
                clause.doc!.members.forEach(member => this.addMemberDocIfNotPresent(doc, member));
            });
    }

    private addMemberDocIfNotPresent(destination: ClassExportDoc, memberDoc: MemberDoc) {
        if (!destination.members.find(member => member.name === memberDoc.name)) {
            // To be able to differentiate between member docs from the heritage clause and the
            // member doc for the destination class, we clone the member doc. It's important to keep
            // the prototype and reference because later, Dgeni identifies members and properties
            // by using an instance comparison.
            const newMemberDoc = Object.assign(Object.create(memberDoc), memberDoc);
            newMemberDoc.containerDoc = destination;

            destination.members.push(newMemberDoc);
        }
    }
}
