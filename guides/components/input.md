:::
##### Angular Component
``` html
    <hc-input valid="true" required="true">
        <label>Validate an email address:</label>
        <input required>
        <div hcInputErrors>
            Error messages are added here
        </div>
    </hc-input>
```
:::

:::
##### Properties
| Name | Type | Description |
| - | - | - |
|valid|boolean|When true, highlights the border red and makes any items with the `hcInputErrors` directive visible|
|required|boolean|Adds a red asterisk to any labels in the component; form values should still be set to required individually|
:::

:::
##### Directives
**hcInputErrors**

Should be added to an element or group of elements that contain error messages to be displayed when the component's `valid` flag is set to true.
:::
