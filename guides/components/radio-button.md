:::
##### Angular Component
``` html
<hc-radio-group [disabled]="false" [name]="myRadioGroup">
    <hc-radio-button>
        Radio Button Label
    </hc-radio-button>
</hc-radio-group>
```
:::

:::
##### Radio Group Properties
| Name | Type | Description |
| - | - | - |
|disabled|boolean|Boolean value that enables/disables the radio group|
|name|string|Name of radio group.  Auto-generated name will be used if no name is set|
|required|boolean|Boolean value of whether the radio group is required|
|value|any|Value of radio buttons|
|change|{source: RadioButtonComponent, value: any}|Event emitted when the value of a radio button changes inside the group.
:::

:::
##### Radio Button Properties
| Name | Type | Description |
| - | - | - |
|checked|boolean|Whether the radio button is checked|
|disabled|boolean|Boolean value that enables/disables the radio button|
|name|string|Name of radio button|
|required|boolean|Boolean value of whether the radio button is required|
|value|any|Value of the radio button|
|change|{source: RadioButtonComponent, value: any}|Event emitted when the value of the radio button changes.
|radioGroup|RadioGroupDirective|The parent radio group|
:::
