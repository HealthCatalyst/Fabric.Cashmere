# Qlik Tabs

###### Last updated December 11, 2020

:::

##### Overview

Tabs provide secondary navigation within the main sections on your navbar.
The tabs in the Qlik template are based on the styling of the [Cashmere Tabs web component](/web/components/tabs/examples).
Each tab is a text object that creates a conditionally-shown variable when selected. This allows for multiple, similar visualizations to be displayed on a single sheet.

<div style="text-align:center"><br>

![Qlik Tabs](./assets/analytics/qlik/qlik-selected.png "Qlik Tabs")

</div><br>

In order to recreate the styling of the Cashmere web component in Qlik, each text object is on the same y-position and adjusted until their vertical sides touch. Generally speaking, each object is about 100px wide and 35px tall. Text is centered horizontally.

##### Formatting
The background color and border on each text object should be set to `None`.
The object for the currently selected tab should have its font set to `Arial Bold 11pt` and the font color set to **offblack**. 
For unselected tabs, the font should be `Arial 11pt`.

### Floating Items

The positioning of the floating items (Tab Selected, and Tab Set Underline) must be set manually.
The Tab Set Underline width should extend from the left edge of the first tab to the right edge of the page.
It should always be 1px height, **slate-gray-300** `#c0c5cc`, with a transparent background.
The y position of Tab Set Underline should be equal to the bottom of a tab.

The width of the Tab Selected highlight should match the width of the selected tab.
The height should always be 4px with a background color for **blue** `#00aeff`.
:::