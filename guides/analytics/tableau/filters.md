# Tableau Filters

###### Last updated December 21, 2020

:::

##### Overview

Filters are a foundational element of any analytics accelerator.
They allow users to more deeply investigate the cause of trends or finds areas for improvement.
But filters can be a double-edged sword, because they can also add significant complexity to both the UI and UX of an accelerator.
As a result, care must be taken in what filters are given prominance and how they are displayed.

Another important consideration with filters is ensuring that user has a clear understanding of what filters are currently active.
The sidebar is always visible, so filters being used can be easily seen.
*Be careful about applying any filters that are not easily reset or not visible to the user.*

![Filter Sidebar](./assets/analytics/tableau/filteroverview.png "Filter Sidebar")

:::

:::

##### Sidebar

For consistency, filters should be displayed on the sidebar of the accelerator layout.
A filter sidebar should have a background color of **slate-gray-400** `#708090` and a fixed width of 250px.
There should be 10px of vertical space at the top of the sidebar before the first filter or metric.

### Counts

Frequently it is useful for accelerators to a display a count of key metrics as part of the filter sidebar (e.g. Encounters, Unique Patients).
This gives users a clear indication of the sample size being used to determine the values on their dashboard.
For example, if they've filtered the sample size down too small, the values in the dashboard will no longer be useful.
As many counts may be included as needed, one on top of the other.

![Filter Counts](./assets/analytics/tableau/filtercounts.png "Filter Counts")

These counts should be the first item on the sidebar, and should displayed as a horizontal container with the label on the left and the value on the right.
The label should be `Tableau Regular`, 10px, **white** `#ffffff`.
It should have an Outer Padding of `6, 4, 0, 4`.

The value for the count should be `Tableau Bold`, 17px, **white** `#ffffff`.
The value should be right justified, with an Outer Padding of `0, 0, 6, 0`.

### Controls

Controls should include a label (title) set to `Tableau Regular`, 10px, **white** `#ffffff`.
All controls, regardless of type should have a fixed height of 52px, with Outer Padding set to `8, 2, 8, 2`.

![Filter Control](./assets/analytics/tableau/filtercontrol.png "Filter Control")

### Footer

As with counts, most accelerators benefit from including a footer indicating the last refresh of the data.
This gives users confidence that the values in the dashboard are current and valid.

In general, the footer should be set to a fixed height of 55px with an Outer Padding of `4, 4, 4, 4`.
The label for the footer should be `Tableau Regular`, 9px, **white** `#ffffff`.
The value for the footer should be `Tableau Bold`, 11px, **white** `#ffffff`.

![Filter Footer](./assets/analytics/tableau/filterfooter.png "Filter Footer")

:::

:::

##### Filter Scope

It is often worth dividing filters on the sidebar by their scope.
Some filters, when set, should carry across application from one section to the next.
These should be referred to as **App Filters** and should be visible in the sidebar of every page.

Other filters may only apply to the specific section the user is viewing, and will not carry over to other pages.
These are referred to as **Page Filters**.

To distinguish between these filter types, we use section headers on the sidebar.
Section headers are text items set to `Tableau Bold`, 10px, **white**.
They have a fixed height of 26px, and a background color of **charcoal blue** `#384655`.
The Inner Padding should be set to `6, 5, 0, 6`.
There should also be a 10px height spacer after the header.

![Filter Header](./assets/analytics/tableau/filtersection.png "Filter Header")

:::
