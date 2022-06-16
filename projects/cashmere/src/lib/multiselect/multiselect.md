##### Getting Started with ng-select

### Step 1: Install 3rd-party library.

```
npm install --save @ng-select/ng-select
```

**Version Compatibility**
Make sure to install the ng-select version compatible with the angular version in your app.

| Angular| ng-select|
| ------|:------:|
| >=12.0.0 <13.0.0 | v7.x |
| >=11.0.0 <12.0.0 | v6.x |
| >=10.0.0 <11.0.0 | v5.x |
| >=9.0.0 <10.0.0  | v4.x |
| >=8.0.0 <9.0.0   | v3.x |
| >=6.0.0 <8.0.0   | v2.x |
| v5.x.x           | v1.x |


### Step 2: Import NgSelectModule and FormsModule.
```typescript
    import { NgSelectModule } from '@ng-select/ng-select';
    import { FormsModule } from '@angular/forms';

    @NgModule({
        declarations: [AppComponent],
        imports: [NgSelectModule, FormsModule],
        bootstrap: [AppComponent]
    })
    export class AppModule {}
```


### Step 3: Include the Cashmere theme.

By importing the Cashmere styles in your app's global style sheet, you'll automatically include the `ng-select` theming.
(It's likely you completed this step when installing cashmere.)

```
@import "node_modules/@healthcatalyst/cashmere/scss/cashmere";
```

&nbsp;

##### Things to Look Out For

**Don't miss the `[appendTo]` property.** This property is helpful for cases where you need to use `ng-select` inside of a scrollable container,
like a modal window. It allows you to choose where the dropdown will be inserted into the DOM. By default, its added as a child of the component, but to
avoid odd scrolling issues, setting `appendTo="body"` can be useful. This will make sure the dropdown appears on top of everything else. For more detail,
visit the ng-select docs: [https://ng-select.github.io/ng-select#/append-to-element](https://ng-select.github.io/ng-select#/append-to-element)
