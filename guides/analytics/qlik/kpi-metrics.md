# Qlik Key Performance Indicators

###### Last updated February 24, 2021

:::

##### Overview

Key Performance Indicators (KPIs) are defined as "critical (key) indicators of progress toward an intended result".
On our accelerators, these KPIs should provide an entry point into the information on a page.
They allow users to make an immediate judgement about the state of the information being tracked, and provide guidance for areas of further investigation.

KPIs are so ubiquitous that they have become a established convention for data-savvy users.
An [eye-tracking study conducted by Tableau](https://www.tableau.com/about/blog/2017/6/eye-tracking-study-5-key-learnings-data-designers-everywhere-72395) in 2017 revealed that big numbers are one of first elements of a dashboard that viewers are drawn to.
It's important for us to take advantage of this convention as a way to guide users through the information we are presenting.
Since Qlik users are accustomed to both traditional tiles and multi-select functionality within dynamic tiles, both types are discussed within this section. 

![KPI Tile](./assets/analytics/qlik/qlik-tile.PNG "KPI Tile")

:::

:::

##### Static Tile

KPI tiles follow all the general standards for tiles as defined in the [Foundations section](/analytics/tableau-foundations).
Refer to that **Tile Header** and **Divider** sections of that page for specific parameters to apply to the top of the KPI.

### Layout
Format the content within the tile as follows:

<article>

- **Text alignnment**: Centered horizontally
- **Font color**: offblack `#333333 RGB(51,51,51)`
- **Font (primary value)**: Arial, 24pt

KPI metrics often leverage a second line to indicate trend or sources.
- **Font (secondary value)**: Arial, 10pt

Arrows or text indicating positive trends should be set to **green** `#00a859`.
For negative trends, use **red** `#f13c45`.
But never rely solely on color to indicate a positive or negative trend, either text or iconography should also indicate the trend.

### Tooltip
Every KPI metric should include an info tooltip in its header.
Refer to the [Foundations section](/analytics/qlik-foundations) for information on how to configure it.
The info tooltip should provide a description of specifically what the metric is meant to indicate, and how it is calculated (equations can be useful).

:::

:::

##### Multi-select Tile

Multi-select tiles follow all the general standards for tiles as defined in the [Foundations section](/analytics/tableau-foundations).
Refer to that **Tile Header** and **Divider** sections of that page for specific parameters to apply to the top of the visualization.

<div style="text-align:center"><br>

![Multi-select](./assets/analytics/qlik/qlik-multi-select-tile.PNG "Multi-select layout")

</div>

### Layout

Multi-select tile functionality should be as clear as possible to users. In the example below, the sub-header: "(select to display below)" makes it clear that each measure selection will dynamically update the following charts on the page. The checkboxes help users understand that more than one measure can be simultaneously displayed on the charts. 

<article>

The checkboxes and measure labels are within a listbox object that is 1 cell high. 
- **Font (label)**: Arial (Bold), 10pt

The measure values are within individual transparent textboxes that are formatted as:

- **Alignment**: Left-aligned to checkbox 
- **Font**: Arial, 24pt
- **Text margin**: 0pt

:::