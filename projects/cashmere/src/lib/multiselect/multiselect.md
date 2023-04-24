##### Getting Started with ng-select

### Step 1: Install 3rd-party library.

```
npm install --save @ng-select/ng-select
```

**Version Compatibility**
Make sure to install the ng-select version compatible with the angular version in your app.

| Angular| ng-select|
| ------|:------:|
| >=14.0.0 <15.0.0 *(latest version of Cashmere)* | v9.x |
| >=13.0.0 <14.0.0 | v8.x |
| >=12.0.0 <13.0.0 | v7.x |
| >=11.0.0 <12.0.0 | v6.x |
| >=10.0.0 <11.0.0 | v5.x |


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
@import "@healthcatalyst/cashmere/scss/cashmere";
```

&nbsp;

### Step 4: Import the pagination component (optional)

If you are using the typeahead capabilites of `ng-select` and are expecting the potential results to be large,
you can improve the user experience by paginating those results. Cashmere includes a standard pagination component
to make that easier. Import the `MultiselectPaginationModule`:

```
import { MultiselectPaginationModule } from '@healthcatalyst/cashmere';
```

and then add the `<hc-multiselect-pagination>` component to your `ng-select` template:

```typescript
    <ng-select>
        <ng-template>
            <hc-multiselect-pagination></hc-multiselect-pagination>
        </ng-template>
    </ng-select>
```

&nbsp;

##### Things to Look Out For

**Don't miss the `[appendTo]` property.** This property is helpful for cases where you need to use `ng-select` inside of a scrollable container,
like a modal window. It allows you to choose where the dropdown will be inserted into the DOM. By default, its added as a child of the component, but to
avoid odd scrolling issues, setting `appendTo="body"` can be useful. This will make sure the dropdown appears on top of everything else. For more detail,
visit the ng-select docs: [https://ng-select.github.io/ng-select#/append-to-element](https://ng-select.github.io/ng-select#/append-to-element)
