# Qlik Filters

###### Last updated January 13, 2021

:::

##### Overview

Filters are a foundational element of any analytics accelerator.
They allow users to more deeply investigate the cause of trends or finds areas for improvement.
But filters can be a double-edged sword, because they can also add significant complexity to both the UI and UX of an accelerator.
As a result, care must be taken in what filters are given prominence and how they are displayed.

Another important consideration with filters is ensuring that user has a clear understanding of what filters are currently active.
The sidebar is always visible, so filters being used can be easily seen.
*Be careful about applying any filters that are not easily reset or not visible to the user.*

![Filter Sidebar](./assets/analytics/qlik/qlik-filter-pane.png "Filter Sidebar")

:::

:::

##### Sidebar

For consistency, filters should be displayed on the sidebar of the accelerator layout.
A filter sidebar should have a background color of **slate-gray-400** `#708090 RGB(112,128,144)` and a fixed width of 250px.
There should be 10px of vertical space at the top of the sidebar before the first filter or metric.

### Counts

Frequently it is useful for accelerators to a display a count of key metrics as part of the filter sidebar (e.g. Encounters, Unique Patients).
This gives users a clear indication of the sample size being used to determine the values on their dashboard.
For example, if they've filtered the sample size down too small, the values in the dashboard will no longer be useful.
As many counts may be included as needed, one on top of the other.

![Filter Counts](./assets/analytics/qlik/qlik-filter-counts.png "Filter Counts")

These counts should be the first item on the sidebar, and should displayed with the data label left-justified and the value on the right.
The label should be `Arial`, 10pt, **white** `#ffffff RGB(255,255,255)`.
The value for the count should be `Arial Bold`, 17pt, **white** `#ffffff RGB(255,255,255)`.
Retain a `6pt` margin within each object.

### Controls

Controls should include a label (title) set to `Arial`, 11pt, **white** `#ffffff RGB(255,255,255)`.
Sub-controls should be set to `Arial`, 10pt.

![Filter Control](./assets/analytics/qlik/qlik-filter-control.png "Filter Control")

### Footer

As with counts, most accelerators benefit from including a footer indicating the last refresh of the data.
This gives users confidence that the values in the dashboard are current and valid.

In general, the footer should be set to a fixed height of 55px with an Outer Padding of `4, 4, 4, 4`.
The label for the footer should be `Arial`, 9pt, **white** `#ffffff RGB(255,255,255)`.
The value for the footer should be `Arial Bold`, 11pt, **white** `#ffffff RGB(255,255,255)`.

![Filter Footer](./assets/analytics/qlik/qlik-filter-footer.png "Filter Footer")

:::

:::


##### Advanced Filters

![Advanced Filters](./assets/analytics/qlik/qlik-advanced-filters.png "Advanced Filters")

The sidebar filters should be the primary mechanic for filtering that most users leverage.
However, there may be power users of your accelerator who require the ability to define more precise or detailed cohorts.
For those users, you may want to include an "Advanced Filters" page that includes a wider array of filter options.

From a UX perspective, the risk with a page like this is that a user will define filters and then forget they turned them on.
That's why we want to limit this page primarily to power users.
You can link to it via an icon in the navbar (use the *AdvancedFilters.png* image included with the other [icons](https://dev.azure.com/healthcatalyst/Analytic%20Solutions/_git/ASO?path=%2F_references%2F_includes%2Fimages%2FHealthCatalystStockSet%2Fhcicons%2FPNG) within the code repository), which keeps it somewhat hidden for typical users.

:::