##### Button Toggle Text Formatting

For both the label on radio buttons and their contents, please use the following formatting:

Capitalize first word only, except in cases where the selection is an actual program name or proper name (e.g. Patient non-adherence or challenges in care management; Duplicate patient; Algorithm incorrect; Comprehensive HIV AIDS Management Program (CHAMP), Grace Program, LSU Diabetes, Salt Lake City, etc.).

&nbsp;

##### Button Toggle Group Labels

Use a colon at the end of radio group labels (e.g. Email address:). A colon implies a direct connection between the label text and a particular control or set of controls. The only situation where a colon should not be used is when the label and control work together to form a single sentence.

&nbsp;

#### Button Toggle Icons

&nbsp;

##### Form Fields

RadioButtonComponents are contained in a RadioGroupDirective which may be nested within a hc-form-field component. hc-form-field acts as a coordinator between multiple components including label and error elements.

```html
<hc-form-field>
    <hc-label>Select your favorite:</hc-label>
    <hc-button-toggle-group>
        <hc-button-toggle value="one">Button One</hc-button-toggle>
        <hc-button-toggle value="two">Button One</hc-button-toggle>
    </hc-button-toggle-group>
    <hc-error>The radio button selection is not valid</hc-error>
</hc-form-field>
```
