# PowerBI Tabs

###### Last updated December 30, 2020

:::

##### Overview

Tabs provide secondary navigation within the main sections on your navbar.
The tabs in the Power BI template are based on the styling of the [Cashmere Tabs web component](/web/components/tabs/examples).
Each tab is a button that links to a dashboard with a different tab highlighted.

<div style="text-align:center"><br>

![Power BI Tabs](./assets/analytics/powerbi/pbi-tabs.png "Power BI Tabs")

</div><br>

In order to recreate the styling of the Cashmere web component in Power BI, we leverage buttons and line objects that contain bookmarks to varying dashboards.

:::

:::

##### Formatting

The tab set buttons should be layered on top of a blank text object that extends the entire width of the tab content.
The font size for the button text should be 11px and the font color should be **offblack** `#333333`.
For unselected tabs, the font should be `Segoe UI`.
For the selected tab it should be `Segoe (Bold)`.

### Floating Objects

The positioning of the floating line objects (Tab Selected, and Tab Set Underline) must be set manually.
The Tab Set Underline width should extend from the left edge of the first tab to the right edge of the Spacer in the Tab Set container.
It should always be 1px height with a background color of **slate-gray-300** `#c0c5cc`.
The y position of Tab Set Underline should be equal to the bottom of a tab, minus the padding.
For example, if the tabs have a y value of 215, and a height of 50, with a padding of 5 on all sides, the underline's y position will be 260 (215 + 50 - 5 = 260).

The width of the Tab Selected highlight should match the width of the selected tab.
The height should always be 4px with a background color for **blue** `#00aeff`.
For the y position, subtract 2 from the y position of the Tab Set Underline calculated above.
:::
