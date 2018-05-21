:::

##### Angular Component

```html
<hc-drawer-container>
    <hc-drawer>
        Drawer Content
    </hc-drawer>
    Main Content
</hc-drawer-container>
```

:::

:::

##### Input Properties

| Name   | Type    | Description                                 |
| ------ | ------- | ------------------------------------------- |
| mode   | string  | `'over' | 'push'` (default: 'push')         |
| align  | string  | `'left' | 'right'` (default: 'left')        |
| opened | boolean | Whether the drawer starts out opened/closed |

\*_Note: An error will be thrown if there are more than two drawers in `hc-drawer-container` or if both drawers have the same alignment_
:::
