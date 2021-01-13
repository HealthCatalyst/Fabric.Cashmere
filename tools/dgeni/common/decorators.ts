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

import {ClassExportDoc} from 'dgeni-packages/typescript/api-doc-types/ClassExportDoc';
import {PropertyMemberDoc} from 'dgeni-packages/typescript/api-doc-types/PropertyMemberDoc';
import {MemberDoc} from 'dgeni-packages/typescript/api-doc-types/MemberDoc';
import {CategorizedClassDoc, DeprecationDoc, HasDecoratorsDoc} from './dgeni-definitions';

/**
 * We want to avoid emitting selectors that are deprecated but don't have a way to mark
 * them as such in the source code. Thus, we maintain a separate blacklist of selectors
 * that should not be emitted in the documentation.
 */
const SELECTOR_BLACKLIST = new Set(['[portal]', '[portalHost]', 'textarea[mat-autosize]', '[overlay-origin]', '[connected-overlay]']);

export function isMethod(doc: MemberDoc) {
    return doc.hasOwnProperty('parameters') && !doc.isGetAccessor && !doc.isSetAccessor;
}

export function isGenericTypeParameter(doc: MemberDoc) {
    if (doc.containerDoc instanceof ClassExportDoc) {
        return doc.containerDoc.typeParams && `<${doc.name}>` === doc.containerDoc.typeParams;
    }
    return false;
}

export function isProperty(doc: MemberDoc) {
    if (
        doc instanceof PropertyMemberDoc ||
        // The latest Dgeni version no longer treats getters or setters as properties.
        // From a user perspective, these are still properties and should be handled the same
        // way as normal properties.
        (!isMethod(doc) && (doc.isGetAccessor || doc.isSetAccessor))
    ) {
        return !isGenericTypeParameter(doc);
    }
    return false;
}

export function isDirective(doc: ClassExportDoc) {
    return hasClassDecorator(doc, 'Component') || hasClassDecorator(doc, 'Directive');
}

export function isService(doc: ClassExportDoc) {
    return hasClassDecorator(doc, 'Injectable');
}

export function isNgModule(doc: ClassExportDoc) {
    return hasClassDecorator(doc, 'NgModule');
}

export function isDeprecatedDoc(doc: any) {
    return ((doc.tags && doc.tags.tags) || []).some((tag: any) => tag.tagName === 'deprecated');
}

export function getDirectiveSelectors(classDoc: CategorizedClassDoc) {
    if (!classDoc.directiveMetadata) {
        return;
    }

    const directiveSelectors: string = classDoc.directiveMetadata.get('selector');

    if (directiveSelectors) {
        // Filter blacklisted selectors and remove line-breaks in resolved selectors.
        return directiveSelectors
            .replace(/[\r\n]/g, '')
            .split(/\s*,\s*/)
            .filter(s => s !== '' && !s.includes('md') && !SELECTOR_BLACKLIST.has(s));
    }
}

export function hasMemberDecorator(doc: MemberDoc, decoratorName: string) {
    return doc.docType === 'member' && hasDecorator(doc, decoratorName);
}

export function hasClassDecorator(doc: ClassExportDoc, decoratorName: string) {
    return doc.docType === 'class' && hasDecorator(doc, decoratorName);
}

export function hasDecorator(doc: HasDecoratorsDoc, decoratorName: string) {
    return !!doc.decorators && doc.decorators.length > 0 && doc.decorators.some(d => d.name === decoratorName);
}

export function getDeletionTarget(doc: any): string | null {
    if (!doc.tags) {
        return null;
    }

    const deletionTarget = doc.tags.tags.find((t: any) => t.tagName === 'deletion-target');

    return deletionTarget ? deletionTarget.description : null;
}

/**
 * Decorates public exposed docs. Creates a property on the doc that indicates whether
 * the item is deprecated or not.
 */
export function decorateDeprecatedDoc(doc: DeprecationDoc) {
    doc.isDeprecated = isDeprecatedDoc(doc);
    doc.deletionTarget = getDeletionTarget(doc);

    if (doc.isDeprecated && !doc.deletionTarget) {
        console.warn('Warning: There is a deprecated item without a @deletion-target tag.', doc.id);
    } else if (doc.deletionTarget && !doc.isDeprecated) {
        console.warn('Warning: There is an item with a @deletion-target which is not deprecated.', doc.id);
    }
}
