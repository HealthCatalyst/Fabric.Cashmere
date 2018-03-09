:::
##### Angular Component
``` html
<hc-tab-set direction="horizontal" >
    <hc-tab tabTitle="Tab 1">
        Tab content 1
    </hc-tab>
    <hc-tab tabTitle="Tab 2">
        Tab content 2
    </hc-tab>
</hc-tab-set>
```
:::

:::
##### Angular Component (with Router)
``` html
<hc-tab-set>
    <hc-tab tabTitle="Tab 1" routerLink="/components/tabs/tab1"></hc-tab>
    <hc-tab tabTitle="Tab 2" routerLink="/components/tabs/tab2"></hc-tab>
</hc-tab-set>
```
:::

:::
##### Full Screen Tabs
In the case of apps that use vertical tabs as full page navigation structure (as on this Cashmere site), it can be useful to add a line of CSS to `.vertical-container`. This line extends the tabs to the full height of the page, even if the content of the tabs is shorter than that. The 53px in this line compenstates for the navbar, so if you are using a subbnav as well, you'll want to include that height in the subtraction.

``` css
.vertical-container { min-height: calc( 100vh - 53px ); }
```
:::

:::
##### Properties
| Name | Type | Description |
| - | - | - |
|tabTitle|string|Boolean value that enables/disables the radio button|
|routerLink|string|Boolean value that enables/disables the radio button|
|direction|string|`'vertical' | 'horizontal'` (default: `vertical`) On Tab Set component - determines whether horizontal or vertical tabs.|
:::
