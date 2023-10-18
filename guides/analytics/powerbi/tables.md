# PowerBI Tables

###### Last updated February 24, 2021

:::

##### Overview

Tables are important tools for displaying large amount of raw data referenced in visualizations and are frequently used to enable easier comparisons between related values.

Tables in the template follow the basic styling of [Cashmere HTML tables](/web/styles/table), with a few alterations to follow Power BI standards.

![Table Example](./assets/analytics/powerbi/pbi-table.png "Table Example")

:::

:::

##### Layout

Tables follow all the general standards for tiles as defined in the [Foundations section](/analytics/powerbi-foundations).
Refer to that **Tile Visual Header** and **Divider** sections of that page for specific parameters to apply to the top of the chart tile.

If a subheader or additional controls are needed for a table, they should be the next item under the header divider.
The table should leverage the remaining content area of the tile.

### Table Header Row

The content in the header row of a table is formatted as:
- **Font**: Segoe (Bold)
- **Font color**: dark-blue `#006d9a`
- **Font size**: 9pt

### Table Cells

The contents of table cells should be
- **Font**: Segoe UI
- **Font color**: offblack `#333333`
- **Font size**: 9pt

The Shading - Row Banding on table rows should be set to a background color of `#f9fafb` for both Panes and Headers.

The Border - Default formatting values on Cells and Headers should be set to
- **Weight**: 1px
- **Style**: Solid
- **Color**: `#f1f1f1`

This creates a minimal banding effect without being too distracting for the small font size we use on Power BI tables.

:::

:::

##### Hover States

The specific content of tooltips of the table will be dictated by the data being displayed.
But in general, they should contain a label and a value.

All text in the tooltip should be
- **Font**: Segoe UI
- **Font color**: white `#ffffff`
- **Font size**: 10pt
- **Background**: charcoal-blue `#384655`

</article

![Table Hover Example](./assets/analytics/powerbi/pbi-table-hover.png "Table Hover Example")

:::

:::

##### Info Tooltip

Info tooltips are optional on table tiles because the data being displayed may be self explanatory.
A tooltip is useful to include if instruction is needed for additional controls on the table, or to explain the source of the data in the table.
If a tooltip is included, it should follow the formatting instructions in the [Foundations section](/analytics/powerbi-foundations)

:::
