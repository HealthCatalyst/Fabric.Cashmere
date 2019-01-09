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

import {CategorizedMethodMemberDoc, CategorizedPropertyMemberDoc} from './dgeni-definitions';

/** Combined type for a categorized method member document. */
type CategorizedMemberDoc = CategorizedMethodMemberDoc & CategorizedPropertyMemberDoc;

/** Sorts members by deprecated status, member decorator, and name. */
export function sortCategorizedMembers(docA: CategorizedMemberDoc, docB: CategorizedMemberDoc) {
    // Sort deprecated docs to the end
    if (!docA.isDeprecated && docB.isDeprecated) {
        return -1;
    }

    if (docA.isDeprecated && !docB.isDeprecated) {
        return 1;
    }

    // Sort in the order of: Inputs, Outputs, neither
    if (
        (docA.isDirectiveInput && !docB.isDirectiveInput) ||
        (docA.isDirectiveOutput && !docB.isDirectiveInput && !docB.isDirectiveOutput)
    ) {
        return -1;
    }

    if (
        (docB.isDirectiveInput && !docA.isDirectiveInput) ||
        (docB.isDirectiveOutput && !docA.isDirectiveInput && !docA.isDirectiveOutput)
    ) {
        return 1;
    }

    // Break ties by sorting alphabetically on the name
    if (docA.name < docB.name) {
        return -1;
    }

    if (docA.name > docB.name) {
        return 1;
    }

    return 0;
}
