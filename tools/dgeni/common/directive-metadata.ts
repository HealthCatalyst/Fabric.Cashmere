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

import {CategorizedClassDoc} from './dgeni-definitions';
import {ArrayLiteralExpression, CallExpression, ObjectLiteralExpression, PropertyAssignment, StringLiteral, SyntaxKind} from 'typescript';

/**
 * Determines the component or directive metadata from the specified Dgeni class doc. The resolved
 * directive metadata will be stored in a Map.
 *
 * Currently only string literal assignments and array literal assignments are supported. Other
 * value types are not necessary because they are not needed for any user-facing documentation.
 *
 * ```ts
 * @Component({
 *   inputs: ["red", "blue"],
 *   exportAs: "test"
 * })
 * export class MyComponent {}
 * ```
 */
export function getDirectiveMetadata(classDoc: CategorizedClassDoc): Map<string, any> | null {
    const declaration = classDoc.symbol.valueDeclaration;

    if (!declaration || !declaration.decorators) {
        return null;
    }

    const directiveDecorator = declaration.decorators
        .filter(decorator => decorator.expression)
        // TODO(devversion): fix this cast
        .filter(decorator => (decorator.expression.kind as any) === SyntaxKind.CallExpression)
        .find(
            decorator =>
                (decorator.expression as any).expression.getText() === 'Component' ||
                (decorator.expression as any).expression.getText() === 'Directive'
        );

    if (!directiveDecorator) {
        return null;
    }

    // Since the actual decorator expression is by default a LeftHandSideExpression, and TypeScript
    // doesn't allow a casting it to a CallExpression, we have to cast it to "any" before.
    const expression = (directiveDecorator.expression as any) as CallExpression;

    // The argument length of the CallExpression needs to be exactly one, because it's the single
    // JSON object in the @Component/@Directive decorator.
    if (expression.arguments.length !== 1) {
        return null;
    }

    const objectExpression = expression.arguments[0] as ObjectLiteralExpression;
    const resultMetadata = new Map<string, any>();

    objectExpression.properties.forEach((prop: PropertyAssignment) => {
        // Support ArrayLiteralExpression assignments in the directive metadata.
        if (prop.initializer.kind === SyntaxKind.ArrayLiteralExpression) {
            const arrayData = (prop.initializer as ArrayLiteralExpression).elements.map((literal: StringLiteral) => literal.text);

            resultMetadata.set(prop.name.getText(), arrayData);
        }

        // Support normal StringLiteral and NoSubstitutionTemplateLiteral assignments
        if (prop.initializer.kind === SyntaxKind.StringLiteral || prop.initializer.kind === SyntaxKind.NoSubstitutionTemplateLiteral) {
            resultMetadata.set(prop.name.getText(), (prop.initializer as StringLiteral).text);
        }
    });

    return resultMetadata;
}
