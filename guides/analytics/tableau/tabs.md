# Tableau Tabs

###### Last updated February 24, 2021

:::

##### Overview

Tabs provide secondary navigation within the main sections on your navbar.
The tabs in the Tableau template are based on the styling of the [Cashmere Tabs web component](/web/components/tabs/examples).
Each tab is a button that links to a dashboard with a different tab highlighted.

<div style="text-align:center"><br>

![Tableau Tabs](./assets/analytics/tableau/tabs.png "Tableau Tabs")

</div><br>

In order to recreate the styling of the Cashmere web component in Tableau, we leverage a horizontal container and two floating objects.
The hierarchy below illustrates how tabs are constructed:

![Tab Hierarchy](./assets/analytics/tableau/tabhierarchy.png "Tab Hierarchy")

:::

:::

##### Formatting

The tab set horizontal container should extend the entire width of the tab content.
The font size for the button text should be 11px and the font color should be **offblack** `#333333` (the third row in the first column of the color picker).
For unselected tabs, the font should be `Tableau Regular`.
For the selected tab it should be `Tableau Bold`.

### Floating Items

The positioning of the floating items (Tab Selected, and Tab Set Underline) must be set manually.
The Tab Set Underline width should extend from the left edge of the first tab to the right edge of the Spacer in the Tab Set container.

The Tab Set Underline is formatted as follows:
- **Height**: 1px
- **Background**: slate-gray-300 `#c0c5cc`

The y position of Tab Set Underline should be equal to the bottom of a tab, minus the padding.
For example, if the tabs have a y value of 215, and a height of 50, with a padding of 5 on all sides, the underline's y position will be 260 (215 + 50 - 5 = 260).

The width of the Tab Selected highlight should match the width of the selected tab and is formatted as follows:
- **Height**: 4px
- **Background**: blue `#00aeff`

For the y position, subtract 2 from the y position of the Tab Set Underline calculated above.

:::
