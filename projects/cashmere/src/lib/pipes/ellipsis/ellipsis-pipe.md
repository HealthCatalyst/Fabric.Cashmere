##### Overview

The Ellipsis pipe is used to truncate long text to a specified number of characters or words.

##### API

```ts
transform(value: string, length: number, mode?: 'characters' | 'words'): string
```

`value`: the `string` value to truncate

`length`: the maximum length (in characters or words) before truncation occurs

`mode`: which mode to use to determine the maximum length (defaults to `'characters'`)

##### Importing the Ellipsis Pipe

To use the `EllipsisPipe`, import the `EllipsisPipeModule` into your app's `CashmereModule` (which in turn is imported into your app):

```ts
import {NgModule} from '@angular/core';
import {EllipsisPipeModule} from '@healthcatalyst/cashmere';

@NgModule({
    exports: [EllipsisPipeModule]
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

##### Using the Ellipsis Pipe in character mode

In character mode, when the length of the string exceeds the specified number of characters, it is truncated at that number of characters then the ellipsis character (`…`) is appended. If the string is shorter or the same length as the specified length, the original value is returned.

```html
{{ 'A long string' | ellipsis : 4 }}
<!-- will output 'A lo…' -->
{{ 'A long string' | ellipsis : 45 }}
<!-- will output 'A long string' -->
```

##### Using the Ellipsis Pipe in word mode

In word mode, when the number of words in the string exceeds the specified number of words, it is truncated at that number of words then the ellipsis character (`…`) is appended. If the string contains fewer or the same number of words as the specified length, the original value is returned.

```html
{{ 'A \r\n long string' | ellipsis : 2 : 'words' }}
<!-- will output 'A  \r\n  long…' -->
{{ 'A \r\n long string' | ellipsis : 45 : 'words' }}
<!-- will output 'A  \r\n  long string' -->
```

##### Edge cases

If the Ellipsis Pipe is given a value other than a `string` or a length other than a valid `number`, it returns the provided value unchanged.
