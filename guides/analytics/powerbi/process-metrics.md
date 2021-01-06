# PowerBI Key Performance Indicators

###### Last updated December 30, 2020

:::

##### Overview

Key Performance Indicators (KPIs) are defined as "critical (key) indicators of progress toward an intended result".
On our accelerators, these KPIs should provide an entry point into the information on a page.
They allow users to make an immediate judgement about the state of the information being tracked, and provide guidance for areas of further investigation.

KPIs are so ubiquitous that they have become a established convention for data-savvy users.
An [eye-tracking study conducted by Tableau](https://www.tableau.com/about/blog/2017/6/eye-tracking-study-5-key-learnings-data-designers-everywhere-72395) in 2017 revealed that big numbers are one of first elements of a dashboard that viewers are drawn to.
It's important for us to take advantage of this convention as a way to guide users through the information we are presenting.

![KPI Tile](./assets/analytics/powerbi/pbi-tile.png "KPI Tile")


:::

:::

##### Layout

KPI Metrics follow all the general standards for tiles as defined in the [Foundations section](/analytics/powerbi-foundations).
Refer to that **Tile Header** and **Divider** sections of that page for specific parameters to apply to the top of the KPI.

The content of the KPI should be centered in tile.
The main KPI value should be `Segoe UI Light`, 24px, **offblack** `#333333`.
KPI metrics often leverage a second line to indicate trend or sources.
The second line should be `Segoe UI`, 10px, **offblack** `#333333`.

Arrows or text indicating positive trends should be set to **green** `#00a859`.
For negative trends, use **red** `#f13c45`.
But never rely solely on color to indicate a positive or negative trend, either text or iconography should also indicate the trend.

:::

:::

##### Tooltip

Every KPI metric should include an info tooltip in its header.
Refer to the [Foundations section](/analytics/powerbi-foundations) for information on how to configure it.
The info tooltip should provide a description of specifically what the metric is meant to indicate, and how it is calculated (equations can be useful).
:::
