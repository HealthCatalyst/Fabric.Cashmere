##### Mobile Development Guide

For information on configuring input elements for responsive web applications, refer to the mobile development guide for information on [mobile form fields](https://cashmere.healthcatalyst.net/web/mobile/form-fields) and [input tag types](https://cashmere.healthcatalyst.net/web/mobile/input-tag-types).

##### Input Text Formatting

For input labels please use the following formatting:

Capitalize first word only, except in cases where the selection is an actual program name or proper name (e.g. Patient non-adherence or challenges in care management; Duplicate patient; Algorithm incorrect; Comprehensive HIV AIDS Management Program (CHAMP), Grace Program, LSU Diabetes, Salt Lake City, etc.).

&nbsp;

##### Input Labels

Use a colon at the end of input labels (e.g. Email address:). A colon implies a direct connection between the label text and a particular control or set of controls. The only situation where a colon should not be used is when the label and control work together to form a single sentence.

&nbsp;

##### Form Fields

To use the input element you must include [hcInput] on an input element and nest the input element within a hc-form-field component. hc-form-field acts as a coordinator between multiple components and is essential to be able to use all of the features of hcInput

To add a label use an hc-label within a hc-form-field. If the input is required add the required attribute and an asterisk will be shown next to the label.

```html
<hc-form-field>
    <hc-label>Validate an email address:</hc-label>
    <input hcInput [formControl]="formDemo" required />
    <hc-error>Email address is required</hc-error>
</hc-form-field>
```

##### Inputs and Icons

Icons may be included in an input box to indicate its function. Use a `hc-icon` component along with either [hcPrefix] or [hcSuffix] to add an icon

```html
<hc-form-field>
    <input hcInput placeholder="Enter username" />
    <hc-icon hcSuffix fontSet="fa" fontIcon="fa-user-circle-o"></hc-icon>
</hc-form-field>
```
