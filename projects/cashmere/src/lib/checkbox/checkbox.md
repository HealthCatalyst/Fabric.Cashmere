hc-checkbox components may be nested within a hc-form-field component. hc-form-field acts as a coordinator between multiple components including label and error elements.

```html
<hc-form-field>
    <hc-label>Requested Notifications:</hc-label>
    <hc-checkbox [formControl]="checkControl">On failure</hc-checkbox>
    <hc-checkbox [formControl]="checkControl">On sucess</hc-checkbox>
    <hc-error>At least one notification must be selected</hc-error>
</hc-form-field>
```
