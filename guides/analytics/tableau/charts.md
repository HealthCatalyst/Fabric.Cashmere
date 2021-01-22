# Tableau Charts

###### Last updated December 21, 2020

:::

##### Overview

Entire bookshelves could be filled with all that has been written about best practices for data visualization. The styles presented here don't seek to rewrite any of those books, but instead are primarily aimed at maximizing readability and consistency in our charts. But if you are looking for an excellent, no-nonsense guide for improving your visualizations, we highly recommend Scott Berinato's [Good Charts](http://a.co/9uDIcKr).

:::

:::

##### Layout

![Chart Example](./assets/analytics/tableau/chartoverview.png "Chart Example")

Charts follow all the general standards for tiles as defined in the [Foundations section](/analytics/tableau-foundations).
Refer to that **Tile Header** and **Divider** sections of that page for specific parameters to apply to the top of the chart tile.

If a subheader or additional controls are needed for a chart, they should be the next item under the header divider.
The content of the chart appears in the area below.
The Outer Padding for the chart should be at least 10px on the right and left so it aligns with the edges of the header.
The exact size of a tile for a chart will be determined by the other content that has to fit on the page and what is required for readability of the data.

:::

:::

##### Grid Styles

For charts that include axis lines, they should be 1px, **offblack** `#333333`.
Axis text/labels should be `Tableau Book`, 9px, **offblack** `#333333`.
Grid lines should be set to 1px, dotted, **gray-300** `cccccc`.

![Grid Lines](./assets/analytics/tableau/gridlines.png "Grid Lines")

:::

:::

##### Data Colors

To determine what colors should be used together in charts, you should determine what the data is trying to convey. If it’s a normal reporting chart for general use, blues and cool colors should be used to keep consistency. Refer to the colors in [Cashmere Foundations](/foundations/color) for options that fit within our Health Catalyst palette. Grays should be used for either showing a benchmark or previous years to contrast the difference of the current year.

:::

:::

##### Hover States

The specific content of tooltips of the chart will be dictated by the data being displayed.
But in general, they should contain a label and a value.
All text in the tooltip should be 10px, **offblack** `#333333`.
The label should `Tableau Book` and the data value should be `Tableau Bold`.

![Chart Tooltips](./assets/analytics/tableau/charttooltip.png "Chart Tooltips")

:::

:::

##### Info Tooltip

Every chart should include an info tooltip in its header.
Refer to the [Foundations section](/analytics/tableau-foundations) for information on how to configure it.
The info tooltip should provide a longer description of what is being visualized on the chart, how it should read, and any considerations when evaluating it.
If additional controls are included above the chart, the info tooltip can also provide instructions on how to interact with the chart.

:::

:::

##### Drill-down

As with KPI metrics, a drill-down button should generally be included with every chart.
The purpose of the drill-down button is to allow the user to look into the raw data being displayed on the chart.
It serves as an opportunity for validation and additional exploration.
Most accelerators will want to include a "Measure Explorer" page similar to that of our decision support application, [Leading Wisely](https://www.healthcatalyst.com/product/leading-wisely/).
The Measure Explorer tab is what the chart drill-down will typically link to with the particular metric selected.
Refer to the template for an example implementation of a Measure Explorer page.
:::
