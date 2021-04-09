# Tableau Filters

###### Last updated February 24, 2021

:::

##### Overview

Filters are a foundational element of any analytics accelerator.
They allow users to more deeply investigate the cause of trends or finds areas for improvement.
But filters can be a double-edged sword, because they can also add significant complexity to both the UI and UX of an accelerator.
As a result, care must be taken in what filters are given prominence and how they are displayed.

Another important consideration with filters is ensuring that user has a clear understanding of what filters are currently active.
The sidebar is always visible, so filters being used can be easily seen.
*Be careful about applying any filters that are not easily reset or not visible to the user.*

![Filter Sidebar](./assets/analytics/tableau/filteroverview.png "Filter Sidebar")

:::

:::

##### Sidebar

For consistency, filters should be displayed on the sidebar of the accelerator layout.

A filter sidebar should be formatted as following:
- **Background**: slate-gray-400 `#708090`
- **Width**: 250px
There should be 10px of vertical space at the top of the sidebar before the first filter or metric.

### Counts

Frequently it is useful for accelerators to a display a count of key metrics as part of the filter sidebar (e.g. Encounters, Unique Patients).
This gives users a clear indication of the sample size being used to determine the values on their dashboard.
For example, if they've filtered the sample size down too small, the values in the dashboard will no longer be useful.
As many counts may be included as needed, one on top of the other.

![Filter Counts](./assets/analytics/tableau/filtercounts.png "Filter Counts")

These counts should be the first item on the sidebar, and should displayed as a horizontal container with the label on the left and the value on the right.

Counts labels are formatted as:
- **Font**: Tableau Regular, 10pt
- **Font color**: white `#ffffff`
- **Padding (outer)**: `6, 4, 0, 4`

Counts values are formatted as:
- **Font**: Tableau Bold, 17pt
- **Font color**: white `#ffffff`
- **Padding (outer)**: `0, 0, 6, 0`
- **Alignment**: right-justified

### Controls

Control labels are formatted as follows:
- **Label**: Tableau Regular, 10pt
- **Font color**: white `#ffffff`


All controls, regardless of type should have the following values:
- **Height**: 52px
- **Padding (outer)**: `8, 2, 8, 2`

![Filter Control](./assets/analytics/tableau/filtercontrol.png "Filter Control")

### Footer

As with counts, most accelerators benefit from including a footer indicating the last refresh of the data.
This gives users confidence that the values in the dashboard are current and valid.

In general, the footer should be set to
- **Font color**: white `#ffffff`
- **Font (label)**: Tableau Regular, 9pt
- **Font (value)**: Tableau Bold, 11pt
- **Height**: 55px
- **Padding (outer)**: `4, 4, 4, 4`

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

Section headers are text items set to the following values:
- **Font**: Tableau Bold
- **Font size**: 10pt
- **Font color**: white `#ffffff`
- **Height**: 26px
- **Background**: charcoal-blue `#384655`
- **Padding (inner)**: `6, 5, 0, 6`

There should also be a 10px height spacer after the header.

![Filter Header](./assets/analytics/tableau/filtersection.png "Filter Header")

:::

:::

##### Advanced Filters

![Advanced Filters](./assets/analytics/tableau/advancedfilters.png "Advanced Filters")

The sidebar filters should be the primary mechanic for filtering that most users leverage.
However, there may be power users of your accelerator who require the ability to define more precise or detailed cohorts.
For those users, you may want to include an "Advanced Filters" page that includes a wider array of filter options.

From a UX perspective, the risk with a page like this is that a user will define filters and then forget they turned them on.
That's why we want to limit this page primarily to power users.
You can link to it via an icon in the navbar (use the *AdvancedFilters.svg* image included with the template), which keeps it somewhat hidden for typical users.

On the Advanced Filters page, arrange the available filters into tiles as defined in the [Foundations section](/analytics/tableau-foundations).

:::
