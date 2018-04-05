:::
##### Angular Component
Labels are often used with select elements.  When a label is included, add `hc-label` to style it and set the `required` property to add a red asterisk to the end of the label.

``` html
<label hc-label required="true">Project Status:</label>
<hc-select highlight="false" placeholder="Select status:">
    <option>Active</option>
    <option>Inactive</option>
</hc-select>
<div class="form-errors" *ngIf="error variable">
    Use the form-errors class for error messages
</div>
```
:::

:::
##### Properties
| Name | Type | Description |
| - | - | - |
|placeholder|String|Optional string of text to appear before selection is made|
|disabled|boolean|Enables or disables the component|
|highlight|boolean|When true, highlights the border red; usually for errors|
:::

:::
##### Template Forms

The Select Component is compatible with both template forms and reactive forms in angular. To interact with template forms use `[(ngModel)]` on the component. Remember to import the `FormsModule` into your application.
:::

:::
##### Reactive Forms

To interact with reactive forms specify a `formControlName` on the component. Remember to import the `ReactiveFormsModule` into your application.
:::
