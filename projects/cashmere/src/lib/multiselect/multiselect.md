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

### Step 4: Use the component

You can use the component in a standalone fashion or wrapped within an hc-form-field:


```
<hc-form-field>
    <hc-label>Choose country:</hc-label>
    <hc-multiselect [valid]="multiselectControl.valid">
        <ng-select
            [items]="countries"
            [formControl]="multiselectControl"
            [readonly]="multiselectDisabled"
        ></ng-select>
    </hc-multiselect>
    <hc-error>The ng-select field is invalid</hc-error>
</hc-form-field>
```

&nbsp;

##### Things to Look Out For

The easiest way to have `ng-select` fit well into a Cashmere form is to use the `hc-multiselect` wrapper. When doing so, the `valid` and `required` properties are set on `hc-multiselect`, but `disabled` is set on the `ng-select` itself using the `[readonly]` property.

**Don't miss the `[appendTo]` property.** This property is helpful for cases where you need to use `ng-select` inside of a scrollable container,
like a modal window. It allows you to choose where the dropdown will be inserted into the DOM. By default, its added as a child of the component, but to
avoid odd scrolling issues, setting `appendTo="body"` can be useful. This will make sure the dropdown appears on top of everything else. For more detail,
visit the ng-select docs: [https://ng-select.github.io/ng-select#/append-to-element](https://ng-select.github.io/ng-select#/append-to-element)
