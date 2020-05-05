The NullOrEmptyStringPipe pipe is used to quickly check a string variable for a value, and supply an alternate if it is empty. For this pipe, empty means either an empty string, a whitespace only string, `null`, or `undefined`.

#### API

```ts
transform(value: string, altText: string): string
```

`value`: the `string` value to evaluate

`altText`: the alternate value to return if the string is empty

#### Importing the NullOrEmptyStringPipe Pipe

To use the `NullOrEmptyStringPipe`, import the `NullOrEmptyStringPipeModule` into your app's `CashmereModule` (which in turn is imported into your app):

```ts
import {NgModule} from '@angular/core';
import {NullOrEmptyStringPipeModule} from '@healthcatalyst/cashmere';

@NgModule({
    exports: [NullOrEmptyStringPipeModule]
})
export class CashmereModule {}
```

Alternatively, each pipe in Cashmere is also exported from `PipesModule`, if you wish to import all pipes from the `@healthcatalyst/cashmere` package:

```ts
import {NgModule} from '@angular/core';
import {PipesModule} from '@healthcatalyst/cashmere';

@NgModule({
    exports: [PipesModule]
})
export class CashmereModule {}
```

#### Edge cases

If the NullOrEmptyStringPipe is given a value other than a `string`, it will return the value unchanged.
