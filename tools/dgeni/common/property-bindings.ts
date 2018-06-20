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

import {PropertyMemberDoc} from 'dgeni-packages/typescript/api-doc-types/PropertyMemberDoc';
import {hasMemberDecorator} from './decorators';

/** Interface that describes an Angular property binding. Can be either an input or output. */
export interface PropertyBinding {
    name: string;
    alias?: string;
}

/**
 * Detects whether the specified property member is an input. If the property is an input, the
 * alias and input name will be returned.
 */
export function getInputBindingData(doc: PropertyMemberDoc, metadata: Map<string, any>): PropertyBinding | undefined {
    return getBindingPropertyData(doc, metadata, 'inputs', 'Input');
}

/**
 * Detects whether the specified property member is an output. If the property is an output, the
 * alias and output name will be returned.
 */
export function getOutputBindingData(doc: PropertyMemberDoc, metadata: Map<string, any>): PropertyBinding | undefined {
    return getBindingPropertyData(doc, metadata, 'outputs', 'Output');
}

/**
 * Method that detects the specified type of property binding (either "output" or "input") from
 * the directive metadata or from the associated decorator on the property.
 */
function getBindingPropertyData(doc: PropertyMemberDoc, metadata: Map<string, any>, propertyName: string, decoratorName: string) {
    if (metadata) {
        const metadataValues: string[] = metadata.get(propertyName) || [];
        const foundValue = metadataValues.find(value => value.split(':')[0] === doc.name);

        if (foundValue) {
            return {
                name: doc.name,
                alias: foundValue.split(':')[1]
            };
        }
    }

    if (hasMemberDecorator(doc, decoratorName)) {
        return {
            name: doc.name,
            alias: doc.decorators!.find(d => d.name === decoratorName)!.arguments![0]
        };
    }
}
