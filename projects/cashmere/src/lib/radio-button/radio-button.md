##### Radio Text Formatting

For both the label on radio buttons and their contents, please use the following formatting:

Capitalize first word only, except in cases where the selection is an actual program name or proper name (e.g. Patient non-adherence or challenges in care management; Duplicate patient; Algorithm incorrect; Comprehensive HIV AIDS Management Program (CHAMP), Grace Program, LSU Diabetes, Salt Lake City, etc.).

&nbsp;

##### Radio Group Labels

Use a colon at the end of radio group labels (e.g. Email address:). A colon implies a direct connection between the label text and a particular control or set of controls. The only situation where a colon should not be used is when the label and control work together to form a single sentence.

&nbsp;

##### Form Fields

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
