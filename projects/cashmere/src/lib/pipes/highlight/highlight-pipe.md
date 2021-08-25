##### Overview

The Highlight pipe is used to identify any text from the user's query.

##### API

```ts
transform(value: string): string
```

`value`: the `string` value to query

##### Importing the Highlight Pipe

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

##### Case Sensitivity

Pipe a `string` value to the Highlight pipe representing query. If the query is found in the text, the value is then highlighted disregarding case sensitivity.

```html
{{ 'at' }}
<!-- will highlight At…at…  -->
{{ 'At' }}
<!-- will highlight At…at…  -->
```

##### Preserving HTML tags

By default, the highlight pipe will escape HTML tags and search on the escaped text.
However, if you would prefer to preserve the HTML tags in your text along with highlighting, you may set the `preserveHTML` parameter on the pipe to true.


##### Edge cases

*   When the Highlight Pipe search term is multiple words, it should wrap each adjacent word in the match with its own highlight span.
*   When the Highlight Pipe search term is multiple words and if those multiple words are not adjacent in the text, should wrap each matching word from the search in its own highlight span.
*   When the Highlight Pipe search term is a partial word found in the string, it should wrap the match with a highlight span.
*   When the Highlight Pipe search term is found multiple times in the string, it should wrap all matches with highlight spans.
*   When the Highlight Pipe search term is not found in the string, it should return the input string.
*   When the Highlight Pipe search term is `undefined`, it should return the input string.
*   When the Highlight Pipe text contains HTML, it should highlight matches on the escaped HTML.
*   When the Highlight Pipe search term contains HTML, it should highlight matches on the escaped HTML.
*   When the Highlight Pipe search term is blank, it should still escape the HTML in the text.
*   When the Highlight Pipe text is `undefined`, it should return the empty string.
*   When the Highlight Pipe search term and text are `undefined`, it should return the empty string.
