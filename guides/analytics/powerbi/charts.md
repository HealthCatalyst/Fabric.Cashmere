# PowerBI Charts

###### Last updated February 24, 2021

:::

##### Overview

Entire bookshelves could be filled with all that has been written about best practices for data visualization. The styles presented here don't seek to rewrite any of those books, but instead are primarily aimed at maximizing readability and consistency in our charts. But if you are looking for an excellent, no-nonsense guide for improving your visualizations, we highly recommend Scott Berinato's [Good Charts](http://a.co/9uDIcKr).

:::

:::

##### Layout

![Chart Example](./assets/analytics/powerbi/pbi-chart-colors.png "Chart Example")

Charts follow all the general standards for tiles as defined in the [Foundations section](/analytics/powerbi-foundations).
Refer to that **Tile Visual Header** and **Divider** sections of that page for specific parameters to apply to the top of the chart tile.

If a subheader or additional controls are needed for a chart, they should be the next item under the header divider.

The content of the chart appears in the area below.

The exact size of a tile for a chart will be determined by the other content that has to fit on the page and what is required for readability of the data.

:::

:::

##### Grid Styles

Axis lines in charts are set to the following values:
- **Weight**: 1px
- **Color**: offblack `#333333`
- **Label font**: Segoe UI, 9pt
- **Label font color**: offblack `#333333`

Gride lines are set to the following values:
- **Weight**: 1px
- **Style**: Dotted
- **Color**: gray-300 `#cccccc`

![Grid Lines](./assets/analytics/powerbi/pbi-grid-lines.png "Grid Lines")

:::

:::

##### Data Colors

To determine what colors should be used together in charts, you should determine what the data is trying to convey. If it’s a normal reporting chart for general use, blues and cool colors should be used to keep consistency. Refer to the colors in [Cashmere Foundations](/foundations/color) for options that fit within our Health Catalyst palette. Grays should be used for either showing a benchmark or previous years to contrast the difference of the current year.

<div style="text-align:center"><br>

![data colors](/assets/analytics/powerbi/pbi-chart-colors.png "Power BI Chart")

</div>

Charts that are dense, complex, and/or require specialized knowledge or experience to comprehend are well-suited for review by both Health Catalyst's data science team and design teams to ensure that visual elements such as color saturation, line thickness, shapes, label placements, etc., are crafted to best support the data story.

:::

:::

##### Hover States

The specific content of tooltips of the chart will be dictated by the data being displayed.
But in general, they should contain a label and a value.

All text in the tooltip should be formatted accordingly:
- **Font**: Segoe UI
- **Font color**: white `#ffffff`
- **Font size**: 10pt
- **Background**: charcoal-blue `#384655`

<div style="text-align:center"><br>

![Chart Tooltips](./assets/analytics/powerbi/pbi-tooltip.png "Chart Tooltips")
</div>

:::

:::

##### Visual Header Tooltips

Charts should include tooltips that enable and enhance self-service analytics and data exploration.

### Info Tooltip

Every chart should include an info tooltip in its header.

All text in the tooltip should be formatted as follows:
- **Font**: Segoe UI
- **Font color**: white `#ffffff`
- **Font size**: 10pt
- **Background**: charcoal-blue `#384655`
- **Icon color**: slate-gray-400 `#708090`

Refer to the [Foundations section](/analytics/powerbi-foundations) for information on how to configure it.
The info tooltip should provide a longer description of what is being visualized on the chart, how it should read, and any considerations when evaluating it.
If additional controls are included above the chart, the info tooltip can also provide instructions on how to interact with the chart.

<div style="text-align:center"><br>

![Info Tooltips](./assets/analytics/powerbi/pbi-info.png "Info Tooltips")
</div>

### Drill/Expand Tooltips

Every chart should include at least one header hover that encourages users to explore the data within the visualization. Some hovers allow for data drilling (e.g., clicking into a single month) while others enable data expansion (e.g., viewing 12 months of data for a given year). Use your best judgement to carefully choose the most effective header icons for a chart, while weighing the potentially overwhelming effect that providing too many options brings.

<div style="text-align:center"><br>

![Drill Tooltips](./assets/analytics/powerbi/pbi-drilldown-on.png "Drill Tooltips")
</div>

:::
