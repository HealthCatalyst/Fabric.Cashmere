To use the input element you must include [hcInput] on an input element and nest the input element within a hc-form-field component. hc-form-field acts as a coordinator between multiple components and is essential to be able to use all of the features of hcInput

To add a label use an hc-label within a hc-form-field. If the input is required add the required attribute and an asterisk will be shown next to the label.

```html
<hc-form-field>
    <hc-label>Validate an email address</hc-label>
    <input hcInput [formControl]="formDemo" required>
    <hc-error>Email address is required</hc-error>
</hc-form-field>
```

##### Inputs and Icons

Icons may be included in an input box to indicate its function. Use a `hc-icon` component along with either [hcPrefix] or [hcSuffix] to add an icon

```html
<hc-form-field>
    <input hcInput placeholder="Enter username">
    <hc-icon hcSuffix fontSet="fa" fontIcon="fa-user-circle-o"></hc-icon>
</hc-form-field>
```
