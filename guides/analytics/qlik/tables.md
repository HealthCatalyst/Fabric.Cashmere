# Qlik Tables

###### Last updated January 21, 2021

:::

##### Overview

Tables are important tools for displaying large amount of raw data referenced in visualizations and are frequently used to enable easier comparisons between related values.

Tables in the template follow the basic styling of [Cashmere HTML tables](/web/styles/table), with a few alterations to follow Power BI standards.

![Table Example](./assets/analytics/qlik/qlik-table.png "Table Example")

:::

:::

##### Layout

Tables follow all the general standards for tiles as defined in the [Foundations section](/analytics/qlik-foundations).
Refer to that **Tile Visual Header** and **Divider** sections of that page for specific parameters to apply to the top of the chart tile.

If a subheader or additional controls are needed for a table, they should be the next item under the header divider.
The table should leverage the remaining content area of the tile.

### Table Header Row

The content in the header row of a table should be **dark-blue** `#006d9a RGB(0,109,154)`, `Arial (Bold)`, 9px. The easiest way to format a table's header is to be in **design grid** mode. Then, you should be able to right-click on a header cell and choose **custom format cell**.

### Table Cells

The contents of table cells should be `Arial`, **offblack** `#333333 RGB(51,51,51)`, 9px.
The Shading - Row Banding on table rows should be set to a background color of `#f9fafb RGB(249,250,251)` for both Panes and Headers.
The Border - Default on Cells and Headers should be set to 1px, solid, **gray-100** `#f1f1f1 RGB(241,241,241)`.
This creates a minimal banding effect without being too distracting for the small font size we use on Qlik tables.

:::

:::

##### Info Tooltip

Info tooltips are optional on table tiles because the data being displayed may be self explanatory.
A tooltip is useful to include if instruction is needed for additional controls on the table, or to explain the source of the data in the table.
If a tooltip is included, it should follow the formating instructions in the [Foundations section](/analytics/qlik-foundations)

:::
