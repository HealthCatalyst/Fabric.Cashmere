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

import {ApiDoc} from 'dgeni-packages/typescript/api-doc-types/ApiDoc';
import {ClassExportDoc} from 'dgeni-packages/typescript/api-doc-types/ClassExportDoc';
import {ClassLikeExportDoc} from 'dgeni-packages/typescript/api-doc-types/ClassLikeExportDoc';
import {PropertyMemberDoc} from 'dgeni-packages/typescript/api-doc-types/PropertyMemberDoc';
import {ParsedDecorator} from 'dgeni-packages/typescript/services/TsParser/getDecorators';
import {NormalizedMethodMemberDoc} from './normalize-method-parameters';

/** Interface that describes categorized docs that can be deprecated. */
export interface DeprecationDoc extends ApiDoc {
    isDeprecated: boolean;
    deletionTarget: string | null;
}

/** Interface that describes Dgeni documents that have decorators. */
export interface HasDecoratorsDoc {
    decorators?: ParsedDecorator[] | undefined;
}

/** Extended Dgeni class-like document that includes separated class members. */
export interface CategorizedClassLikeDoc extends ClassLikeExportDoc, DeprecationDoc {
    methods: CategorizedMethodMemberDoc[];
    properties: CategorizedPropertyMemberDoc[];
}

/** Extended Dgeni class document that includes extracted Angular metadata. */
export interface CategorizedClassDoc extends ClassExportDoc, CategorizedClassLikeDoc {
    isDirective: boolean;
    isService: boolean;
    isNgModule: boolean;
    directiveExportAs?: string | null;
    directiveSelectors?: string[];
    directiveMetadata: Map<string, any> | null;
    extendedDoc: ClassLikeExportDoc | null;
}

/** Extended Dgeni property-member document that includes extracted Angular metadata. */
export interface CategorizedPropertyMemberDoc extends PropertyMemberDoc, DeprecationDoc {
    description: string;
    isDirectiveInput: boolean;
    isDirectiveOutput: boolean;
    directiveInputAlias: string;
    directiveOutputAlias: string;
}

/** Extended Dgeni method-member document that simplifies logic for the Dgeni template. */
export interface CategorizedMethodMemberDoc extends NormalizedMethodMemberDoc, DeprecationDoc {
    showReturns: boolean;
}
