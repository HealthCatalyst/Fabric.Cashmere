##### Overview

The File Size pipe is used to transform a number of bytes into the largest possible unit (up to petabyte).

##### API

```ts
transform(bytes: number, precision: number = 2): string
```

`bytes`: the number of bytes

`precision`: the number of decimal points to display (defaults to `2`)

##### Importing the File Size Pipe

To use the `FileSizePipe`, import the `FileSizePipeModule` into your app's `CashmereModule` (which in turn is imported into your app):

```ts
import {NgModule} from '@angular/core';
import {FileSizePipeModule} from '@healthcatalyst/cashmere';

@NgModule({
    exports: [FileSizePipeModule]
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

##### Using the File Size pipe

Pipe a `number` value to the File Size pipe representing the number of bytes. You can optionally specify the number of decimal places to truncate the value to. If the number divides evenly into the unit, the value is returned as an integer.

```html
{{ 230 | fileSize }}
<!-- will output '230 bytes' -->
{{ 123456789 | fileSize : 3 }}
<!-- will output '117.738 MB' -->
```

##### Edge cases

If the File Size Pipe is given a value other than a nonnegative number, it returns the given value as a string.
