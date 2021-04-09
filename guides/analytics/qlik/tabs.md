# Qlik Tabs

###### Last updated February 24, 2021

:::

##### Overview

Tabs provide secondary navigation within the main sections on your navbar.
The tabs in the Qlik template are based on the styling of the [Cashmere Tabs web component](/web/components/tabs/examples).
Each tab is a text object that utilizes actions to create a conditionally-shown variable when selected. This allows for multiple, similar visualizations to be displayed on a single sheet.

<div style="text-align:center"><br>

![Qlik Tabs](./assets/analytics/qlik/qlik-tabs.PNG "Qlik Tabs")

</div><br>

:::
:::

##### Formatting

In order to recreate the styling of the Cashmere web component in Qlik, each text object is on the same y-position and adjusted until their vertical sides touch.
Each object follows these general guidelines:

Object:
- **Height**: 35px
- **Width**: 100px
- **Text alignment**: Horizontal

Object label:
- **Background**: None
- **Border**: None
- **Font (selected)**: Arial(Bold), 11pt
- **Font (unselected)**: Arial, 11pt
- **Font color**: off-black `#333333 RGB(51,51,51)`

### Selection Items

The y position of the Tab Set Underline should be equal to the bottom of the tabs. The width should extend from the left edge of the first tab to the right edge of the page.
Format the Tab Set Underline as follows:

- **Background**: Transparent
- **Weight**: 1px
- **Color**: slate-gray-300 `#c0c5cc RGB(192,197,204)`

The positioning of the Tab Selected Highlight must be set manually and must utilize conditional show-hide functionality to disappear when a tab is de-selected. The width of the Tab Selected highlight should match the width of the selected tab.
It should be formatted as:

- **Background**: blue `#00aeff RGB(0,174,255)`
- **Height**: 4px

:::
