##### Overview

The `changeCase` pipe is used to transform the letter casing of the input string to the specified casing.

This pipe is a thin wrapper for the `change-case` NPM package:
<https://www.npmjs.com/package/change-case>

&nbsp;

##### API

```ts
transform(value: string, caseFunction: string): string
```

`value`: the `string` value to transform

`caseFunction`: which function (from the `change-case` package) to call to transform the text

&nbsp;

##### Installing the Pipe

As the pipe has a dependency on the `change-case` package, it is not included in the main Cashmere NPM package. To
install this pipe, use the following NPM command:

```
npm i @bit/healthcatalyst.cashmere.change-case-pipe
```

Note that you will need to configure the `@bit` scope in your project's `.npmrc` file to access the Bit repository:

.npmrc

```
@bit:registry=https://node.bit.dev
```

&nbsp;

##### Importing the Change Case Pipe

To use the `ChangeCasePipe`, import the `ChangeCasePipeModule` into your app's `CashmereModule` (which in turn is imported into your app):

```ts
import {NgModule} from '@angular/core';
import {ChangeCasePipeModule} from '@bit/healthcatalyst.cashmere.change-case-pipe';

@NgModule({
    exports: [ChangeCasePipeModule]
})
export class CashmereModule {}
```

&nbsp;

##### Usage

```html
{{ 'Sample text' | changeCase : 'pascalCase' }}
<!-- will output 'SampleText' -->
{{ 'Sample text' | changeCase : 'paramCase' }}
<!-- will output 'sample-text' -->
```

The available case transformation functions will depend on the version of `change-case` you have installed in your project.
Check the documentation for more details: <https://www.npmjs.com/package/change-case>
