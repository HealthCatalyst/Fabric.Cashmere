# Tableau Key Performance Indicators

###### Last updated February 24, 2021

:::

##### Overview

Key Performance Indicators (KPIs) are defined as "critical (key) indicators of progress toward an intended result".
On our accelerators, these KPIs should provide an entry point into the information on a page.
They allow users to make an immediate judgement about the state of the information being tracked, and provide guidance for areas of further investigation.

KPIs are so ubiquitous that they have become a established convention for data-savvy users.
An [eye-tracking study conducted by Tableau](https://www.tableau.com/about/blog/2017/6/eye-tracking-study-5-key-learnings-data-designers-everywhere-72395) in 2017 revealed that big numbers are one of first elements of a dashboard that viewers are drawn to.
It's important for us to take advantage of this convention as a way to guide users through the information we are presenting.

![KPI Tile](./assets/analytics/tableau/kpitile.png "KPI Tile")

:::

:::

##### Layout

KPI Metrics follow all the general standards for tiles as defined in the [Foundations section](/analytics/tableau-foundations).
Refer to that **Tile Header** and **Divider** sections of that page for specific parameters to apply to the top of the KPI.

The content of the KPI should be centered in tile.

The main KPI value should be formatted as:
- **Font**: Tableau Light
- **Font size**: 24pt
- **Font color**: offblack `#333333`
KPI metrics often leverage a second line to indicate trend or sources. A secondary metric should be formatted as:
- **Font**: Tableau Book
- **Font size**: 10pt
- **Font color**: offblack `#333333`

Arrows or text colors indicating positive trends should be set to
- **Color**: green `#00a859`

For negative trends, use
- **Color**: red `#f13c45`

But never rely solely on color to indicate a positive or negative trend, either text or iconography should also indicate the trend.

:::

:::

##### Info Tooltip

Every KPI metric should include an info tooltip in its header.
Refer to the [Foundations section](/analytics/tableau-foundations) for information on how to configure it.
The info tooltip should provide a description of specifically what the metric is meant to indicate, and how it is calculated (equations can be useful).


:::

:::

##### Drill-down

A drill-down button should generally be included with every KPI metric header as well.
The purpose of the drill-down button is to allow the user to look into the raw data used to calculate the metric.
It serves as an opportunity for validation and additional exploration.
Most accelerators will want to include a "Measure Explorer" page similar to that of our decision support application, [Leading Wisely](https://www.healthcatalyst.com/product/leading-wisely/).
The Measure Explorer tab is what the KPI drill-down will typically link to with the particular metric selected.
Refer to the template for an example implementation of a Measure Explorer page.

:::
