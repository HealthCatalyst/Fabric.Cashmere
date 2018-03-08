:::
##### Angular Component
``` html
    <hc-accordion [triggerAlign]="alignment" [hideToolbar]="showToolbar">
        <hc-accordion-toolbar>Toolbar</hc-accordion-toolbar>
        Accordion content
    </hc-accordion>
```
:::

:::
##### Inputs
| Name | Type | Description |
| - | - | - |
|triggerAlign|string|`'left' | 'right'` (default: 'left')|
|hideToolbar|boolean|Show/Hide the accordion toolbar|
|open|boolean|Set accordion opened state|
:::

:::
##### Events
| Name | Description |
| - | - |
|opened|Accordion is in the open state|
|openStart|Accordion is beginning to open|
|closed|Accordion is in close state|
|closeStart|Accordion is beginning to close|
:::
