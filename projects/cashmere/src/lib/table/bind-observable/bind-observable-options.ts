/* eslint-disable @typescript-eslint/no-explicit-any */
/* Copyright 2017 PSanetra <code@psanetra.de>

Open Source typescript decorator which binds class properties to observable companion properties.
https://github.com/PSanetra/bind-observable

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

export interface BindObservableOpts {
    /**
     * optional custom key of the companion property.
     * If not provided, the decorator will take the name of the original property key with a '$' suffix.
     */
    key?: string;
    /**
     * If true, the observable will emit the raw setter value if the decorated property is an accessor.
     * Otherwise the observable will call the getter once and emit the returned value.
     * This option will be ignored if the decorated property has no get accessor.
     */
    emitRawSetterValue?: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isBindObservableOpts(pet: any): pet is BindObservableOpts {
    return pet && typeof pet === 'object';
}
