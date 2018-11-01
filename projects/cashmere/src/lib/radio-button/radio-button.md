RadioButtonComponents are contained in a RadioGroupDirective which may be nested within a hc-form-field component. hc-form-field acts as a coordinator between multiple components including label and error elements.

```html
<hc-form-field>
    <hc-label>Select your favorite:</hc-label>
    <hc-radio-group>
        <hc-radio-button value="one">Button One</hc-radio-button>
        <hc-radio-button value="two">Button One</hc-radio-button>
    </hc-radio-group>
    <hc-error>The radio button selection is not valid</hc-error>
</hc-form-field>
```
