# Tableau Tables

###### Last updated February 24, 2021

:::

##### Overview

Tables are important tools for displaying large amount of raw data referenced in visualizations.
Tables in the template follow the basic styling of [Cashmere HTML tables](/web/styles/table), with a few alterations to follow Tableau standards.

![Table Example](./assets/analytics/tableau/tableoverview.png "Table Example")

:::

:::

##### Layout

Tables follow all the general standards for tiles as defined in the [Foundations section](/analytics/tableau-foundations).
Refer to that **Tile Header** and **Divider** sections of that page for specific parameters to apply to the top of the chart tile.

If a subheader or additional controls are needed for a table, they should be the next item under the header divider.
The table should leverage the remaining content area of the tile.
The Outer Padding for the tile should be at least 10px on the right and left so it aligns with the edges of the header.

### Table Header Row

The content in the header row of a table should be set to:
- **Color**: dark-blue `#006d9a`
- **Font**: Tableau Bold
- **Font size**: 9pt

### Table Cells

The contents of table cells should be set to:
- **Color**: offblack `#333333`
- **Font**: Tableau Regular
- **Font size**: 9pt


The Shading - Row Banding on table rows for both Panes and Headers is formatted as:

- **Background**: `#f9fafb`

The Border - Default formatting on Cells and Headers should be set to:

- **Color**: `#f1f1f1`
- **Style**: Solid
- **Weight**: 1px

This creates a minimal banding effect without being too distracting for the small font size we use on Tableau tables.

:::

:::

##### Hover States

The specific content of tooltips of the table will be dictated by the data being displayed.
But in general, they should contain a label and a value.

All text in the tooltip should be set to:
- **Font**: 10pt
- **Color**: offblack `#333333`
- **Label font**: Tableau Book
- **Data font**: Tableau Bold

:::

:::

##### Info Tooltip

Info tooltips are optional on table tiles because the data being displayed may be self explanatory.
A tooltip is useful to include if instruction is needed for additional controls on the table, or to explain the source of the data in the table.
If a tooltip is included, it should follow the formatting instructions in the [Foundations section](/analytics/tableau-foundations)

:::
