:::

##### Angular Component

```html
<button hc-button color="primary" [hcPopover]="options" popperPlacement="bottom" aria-hidden="true">
    <i class="fa fa-gear" aria-hidden="true"></i>
    &nbsp;Options&nbsp;
    <i class="fa fa-angle-down" aria-hidden="true"></i>
</button>

<hc-popover-content #options>
    <ul class="list-options">
        <li>
            <a href="https://www.healthcatalyst.com/" target="_blank">Health Catalyst</a>
        </li>
        <li>
            <a href="https://community.healthcatalyst.com/" target="_blank">Health Catalyst Community</a>
        </li>
        <li>
            <button (click)="aboutClick()">About</button>
        </li>
    </ul>
</hc-popover-content>
```

:::

:::

##### Properties

For more info on the properties, visit [popper.js.org](http://popper.js.org).

&nbsp;

| Name                     | Type            | Description                                                                                                                                                                                                                                           |
| ------------------------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| popperDisableAnimation   | boolean         | default: false                                                                                                                                                                                                                                        |
| popperDisableStyle       | boolean         | default: false                                                                                                                                                                                                                                        |
| popperDisabled           | boolean         | default: false                                                                                                                                                                                                                                        |
| popperDelay              | Number          | default: 0                                                                                                                                                                                                                                            |
| popperTimeout            | Number          | default: 0                                                                                                                                                                                                                                            |
| popperTimeoutAfterShow   | Number          | default: 0                                                                                                                                                                                                                                            |
| popperPlacement          | string          | default: auto `'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'bottom-start' | 'left-start' | 'right-start' | 'top-end' | 'bottom-end' | 'left-end' | 'right-end' | 'auto' | 'auto-top' | 'auto-bottom' | 'auto-left' | 'auto-right' | Function` |
| popperTarget             | HtmlElement     | default: auto                                                                                                                                                                                                                                         |
| popperBoundaries         | string          | default: undefined                                                                                                                                                                                                                                    |
| popperShowOnStart        | Number          | default: 0                                                                                                                                                                                                                                            |
| popperTrigger            | Trigger(string) | default: hover                                                                                                                                                                                                                                        |
| popperPositionFixed      | boolean         | default: false                                                                                                                                                                                                                                        |
| popperHideOnClickOutside | boolean         | default: true                                                                                                                                                                                                                                         |
| popperHideOnScroll       | boolean         | default: false                                                                                                                                                                                                                                        |
| popperForceDetection     | boolean         | default: false                                                                                                                                                                                                                                        |
| popperTrigger            | Trigger(string) | default: hover `'click' | 'mousedown' | 'hover' | 'none'`                                                                                                                                                                                             |
| popperModifiers          | popperModifier  | default: undefined                                                                                                                                                                                                                                    |
| popperOnShown            | EventEmitter    | $event                                                                                                                                                                                                                                                |
| popperOnHidden           | EventEmitter    | $event                                                                                                                                                                                                                                                |

:::
