The Highlight pipe is used to identify any text from the user's query.

#### API

```ts
transform(value: string): string
```

`value`: the `string` value to query

#### Importing the Highlight Pipe

To use the `HighlightPipe`, import the `HighlightPipeModule` into your app's `CashmereModule` (which in turn is imported into your app):

```ts
import {NgModule} from '@angular/core';
import {HighlightPipeModule} from '@healthcatalyst/cashmere';

@NgModule({
    exports: [HighlightPipeModule]
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

#### Case Sensitivity

Pipe a `string` value to the Highlight pipe representing query. If the query is found in the text, the value is then highlighted disregarding case sensitivity.

```html
{{ 'at' }}
<!-- will highlight At…at…  -->
{{ 'At' }}
<!-- will highlight At…at…  -->
```

#### Edge cases

When the text value for the Highlight Pipe contains HTML, it should highlight matches on the escaped HTML

When the text value for the highlight Pipe is `undefined`, it should return the empty string

When both search term and text value are `undefined`, it should return the empty string
