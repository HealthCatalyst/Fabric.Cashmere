:::

##### Angular Component

```html
<button hc-button title="Button Tile" color="primary" disabled="false">
    <hc-icon fontSet="fa" fontIcon="fa-cog" class="btn-icon-left"></hc-icon>
    Button Name
</button>

<a hc-button title="Anchor Button" disabled="false">Anchor Button</a>

<hc-split-button disabled="true">
    Disabled Split Button
    <div hcButtonItem>Button menu</div>
</hc-split-button>
```

:::

:::

##### Properties

| Name     | Type    | Description                                                                                          |
| -------- | ------- | ---------------------------------------------------------------------------------------------------- |
| color    | string  | Sets the button's theme color `primary | primary-alt | destructive | neutral | secondary | tertiary` |
| disabled | boolean | Boolean value that enables/disables the button                                                       |

:::

:::

##### Split Buttons

**hc-split-button**

To use `hc-split-button` you encapsulate the content you want to be shown on the button. Anything marked with the directive `hcButtonItem` will get transferred into the dropdown menu. Everything else will be shown as the main button's content

&nbsp;

**hcButtonItem**

Marks an element for being put into the dropdown menu of the button. Multiple things can be marked with this directive
:::
