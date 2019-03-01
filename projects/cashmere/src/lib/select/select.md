The hc-select component may be nested within a hc-form-field component. hc-form-field acts as a coordinator between multiple components including label and error elements.

Note that for IE11 compatibility, a value must be specified for each `<option>` in `<hc-select>`. Otherwise the select box will not display the selected option.

To add a label use an hc-label within a hc-form-field. If the select box is required add the required attribute and an asterisk will be shown next to the label.

```html
<hc-form-field>
    <hc-label>Select your facility:</hc-label>
    <hc-select required placeholder="Select a city:">
        <option value="1">Philadelphia</option>
        <option value="2">Atlanta</option>
    </hc-select>
    <hc-error>Facility is required</hc-error>
</hc-form-field>
```
