##### Checkbox Text Formatting

For both the label on checkboxes and their contents, please use the following formatting:

Capitalize first word only, except in cases where the selection is an actual program name or proper name (e.g. Patient non-adherence or challenges in care management; Duplicate patient; Algorithm incorrect; Comprehensive HIV AIDS Management Program (CHAMP), Grace Program, LSU Diabetes, Salt Lake City, etc.).

&nbsp;

##### Checkbox Labels

Use a colon at the end of checkbox labels (e.g. Email address:). A colon implies a direct connection between the label text and a particular control or set of controls. The only situation where a colon should not be used is when the label and control work together to form a single sentence.

&nbsp;

##### Form Fields

hc-checkbox components may be nested within a hc-form-field component. hc-form-field acts as a coordinator between multiple components including label and error elements.

```html
<hc-form-field>
    <hc-label>Requested notifications:</hc-label>
    <hc-checkbox [formControl]="checkControl">On failure</hc-checkbox>
    <hc-checkbox [formControl]="checkControl">On sucess</hc-checkbox>
    <hc-error>At least one notification must be selected</hc-error>
</hc-form-field>
```
