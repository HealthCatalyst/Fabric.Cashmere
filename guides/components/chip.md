:::
##### Angular Component
``` html
    <hc-chip>Basic Chip</hc-chip>

    <hc-chip color="red">
        <hc-icon fontSet="fa" fontIcon="fa-exclamation-triangle" icon-sm>
        </hc-icon>
        &nbsp;&nbsp;Alert Chip
    </hc-chip>

    <hc-chip color="yellow">Warning Chip</hc-chip>

    <hc-chip color="green">Success Chip</hc-chip>

    <hc-chip action="true">Action One</hc-chip>

    <hc-chip-row singleRow="false">
        <hc-chip action="true">Hospital (2)</hc-chip>
    </hc-chip-row>
```
:::

:::
##### Chip Usage
The chip module consists of two componenets:
- `hc-chip` - the base component
- `hc-chip-row` - the optional container for chips
:::

:::
##### Chip Component Properties
| Name | Type | Description |
| - | - | - |
|action|boolean|Whether to display a delete button and pointer cursor|
|color|string|`'neutral', 'red', 'yellow', 'green'` (default=`'neutral'`)|
:::

:::
##### Chip Row Properties
| Name | Type | Description |
| - | - | - |
|wrap|boolean|If false, constrain the container to one line with overflow ellipses (default=true)|
:::
