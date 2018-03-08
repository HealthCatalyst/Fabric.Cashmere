:::
##### Angular Component
``` html
    <hc-list>
        <hc-list-item>
            <hc-icon fontSet="fa" fontIcon="fa-snowflake-o" hcListIcon></hc-icon>
            <h4 hcListLine>SnowFlake</h4>
            <span hcListLine>Second Line</span>
        </hc-list-item>
        <hc-list-item>
            <img src="assets/CashmereLogo.svg" hcListAvatar>
            <h4 hcListLine>Address Line 1</h4>
            <span hcListLine>Address Line 2</span>
            <hc-icon fontSet="fa" fontIcon="fa-plus"></hc-icon>
        </hc-list-item>
    </hc-list>
```
:::

:::
##### Directives
**hc-list**

This is the container for the `hc-list-items`.

&nbsp;

**hc-list-item**

Acts as a host element for the individual items found in a `hc-list-item`. Represents an item within the `hc-list-items`.
:::

:::
##### Directives
**hcListIcon**

Positions the element to the left and styled as an icon. Should be used in conjunction with `hc-icon`.

&nbsp;

**hcListAvatar**

Positions the element to the left and gives it a circular border.

&nbsp;

**hcListLine**

This is the main text content of the `hc-list-item`. At the moment it's only styled to provide up to two lines, but in the future you can have as many as you want.
:::
