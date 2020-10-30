##### Overview

The Number Abbreviator pipe is used to format numbers in a shortened form using common character abbreviation formats,
like so `
- Quadrillions: Q
- Trillions: T
- Billions: B
- Millions: M
- Thousands: K

##### API

```ts
transform(value: number, decimalPoints: number = 2, threshold: number = 1000000): string
```
`value`: the number to be abbreviated

`decimalPoints`: how many decimal points to round to

`threshold`: represents the number at which we should start abbreviating; if the threshold is 1 million, numbers less than 1 million will NOT be abbreviated (but will be formatted with commas & decimal points)

##### Importing the Number Abbreviator Pipe

To use the `NumberAbbreviatorPipe`, import the `NumberAbbreviatorPipeModule` into your app's `CashmereModule` (which in turn is imported into your app):

```ts
import {NgModule} from '@angular/core';
import {NumberAbbreviatorPipeModule} from '@healthcatalyst/cashmere';

@NgModule({
    exports: [NumberAbbreviatorPipeModule]
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

##### Using the Number Abbreviator pipe

Pass a `number` value to the Number Abbreviator pipe to have it translated. Numbers into the quarillions are supported.
Regardless of size, numbers will be formatted with needed commas or decimal points. You can optionally specify the number of decimal places to round the value to, or the threshold at which numbers should be abbreviated.

```html
{{ 1234234 | abbreviateNumber }}
<!-- will output '1.23M' -->

{{ 1940 | abbreviateNumber }}
<!-- will output '1,940' -->

{{ 1234567890 | abbreviateNumber : 3 }}
<!-- will output '1.235B' -->

{{ 8467 | abbreviateNumber : 2 : 999 }}
<!-- will output '8.47K' -->

```

