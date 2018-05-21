:::

##### Angular Component

Labels are often used with input elements. When a label is included, add `hc-label` to style it and set the `required` property to add a red asterisk to the end of the label.

```html
<label hc-label required="true">Validate an email address:</label>
<input hc-input name="inputEmail" required highlight="false">
<div class="form-errors" *ngIf="inputEmail.invalid">
    Use the form-errors class for error messages
</div>
```

:::

:::

##### Inputs and Icons

Icons may be included in an input box to indicate its function. Use a `hc-icon` component to add an icon, and it will automatically be positioned to the right side of the input with extra padding added.

```html
<div hcInputIcon>
    <input hc-input name="search" placeholder="search" />
    <hc-icon icon-sm fontSet="fa" fontIcon="fa-search"></hc-icon>
</div>
```

:::

:::

##### Input with Clear Button

Inputs can have a clear button, with or without another icon present. The button will only appear if the input currently has text. Clicking the icon will clear out that text.

```html
<div hcInputIcon hcInputClearable>
    <input #searchInput hc-input name="search" placeholder="Search" width="250px" />
    <hc-clear-input-btn [input]="searchInput"></hc-clear-input-btn>
    <hc-icon icon-sm fontSet="fa" fontIcon="fa-search"></hc-icon>
</div>
```

:::

:::

##### Input Properties

| Name      | Type    | Description                                                                         |
| --------- | ------- | ----------------------------------------------------------------------------------- |
| highlight | boolean | When true, highlights the border red - often tied to the valid state of the element |

:::

:::

##### Directives

**hcInputIcon**

Should be applied to a tag that contains both an `hc-input` element and `hc-icon` element. This will format both the input and position the icon to the right side of the box.
:::
