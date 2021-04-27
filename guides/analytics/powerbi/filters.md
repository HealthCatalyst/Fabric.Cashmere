# PowerBI Filters

###### Last updated February 24, 2021

:::

##### Overview

Filters are a foundational element of any analytics accelerator.
They allow users to more deeply investigate the cause of trends or finds areas for improvement.
But filters can be a double-edged sword, because they can also add significant complexity to both the UI and UX of an accelerator.
As a result, care must be taken in what filters are given prominence and how they are displayed.

*Be careful about applying any filters that are not easily reset or not visible to the user.*

Because Power BI includes several native filtering features for users who access reports within a web browser, the layout for a Power BI dashboard looks different than the template layouts for other BI platform tools.

An important consideration with filters is ensuring that user has a clear understanding of what filters are currently active. For most objects, the filter icon within the visual header should always be enabled so that users have a quick way to see which filters are active on each visual.

<div style="text-align:center">

![Filter Icon](./assets/analytics/powerbi/pbi-filter-icon.png "Filter Icon")

</div>

The sliding filter pane should always be accessible to users, so that all filters that are either active or available can be easily seen at once.

<div style="text-align:center">

![Filter Pane Show](./assets/analytics/powerbi/pbi-filter-pane-option.png "Filter Pane Show")

</div>

:::

:::

##### Color

Power BI allows developers to format the Filters pane and cards. The same colors from [Cashmere Foundations](/foundations/color) are used.

### Filter Pane

The Filters pane is set to the following values:
- **Width**: 250px
- **Background**: slate-gray-400 `#708090`
- **Font color**: white `#ffffff`
- **Font (title)**: Segoue UI, 12pt
- **Font (headers)**: Segoe UI, 10pt
- **Font (search)**: 10pt
- **Border**: slate-gray-300 `#c0c5cc`
- **Input box background**: charcoal-blue `#384655`

<div style="text-align:center">

![Filter Pane](./assets/analytics/powerbi/pbi-filter-pane.png "Filter Pane")

</div>

### Filter Cards: Available

Filter cards that are available to users are formatted as follows:
- **Background**: charcoal-blue `#384655`
- **Input box background**: white `#ffffff`
- **Border**: slate-gray-300 `#c0c5cc`
- **Font**: Segoe UI, 9pt
- **Font color**: white `#ffffff`

### Filter Cards: Applied

Filters actively being used within the dashboard, page, or an object, are formatted in filter cards as follows:
- **Background**: gray-200 `#e0e0e0`
- **Input box background**: white `#ffffff`
- **Border**: slate-gray-300 `#c0c5cc`
- **Font**: Segoe UI, 9pt
- **Font color**: offblack `#333333`

##### Filter Scope

Power BI divides filters on the filters pane by their scope.
Some filters, when set, should carry across application from one page to the next.
These are grouped together in a section titled **Filters on all pages**.

Other filters may only apply to the specific page the user is viewing, and will not carry over to other pages.
These are grouped together in a section titled **Filters on this page**.

The section titles are formatted as:
- **Font**: Segoe (Bold)
- **Font size**: 10pt
- **Font color**: white `#ffffff`
- **Background**: charcoal-blue `#384655`

Some filters may only apply to the specific visual the user is viewing. These are grouped in a section within the filters pane titled **Filters on this visual**. You may also consider placing a slicer object next to the visual.

:::

:::

##### Advanced Filters

![Advanced Filters](./assets/analytics/tableau/advancedfilters.png "Advanced Filters")

The filters pane should be the primary mechanic for filtering that most users leverage.
However, there may be power users of your accelerator who require the ability to define more precise or detailed cohorts.
For those users, you may want to include an "Advanced Filters" page that includes a wider array of filter options.

From a UX perspective, the risk with a page like this is that a user will define filters and then forget they turned them on.
That's why we want to limit this page primarily to power users.
You can link to it via an icon in the navbar (use the *AdvancedFilters.svg* image included with the template), which keeps it somewhat hidden for typical users.

On the Advanced Filters page, arrange the available filters into tiles as defined in the [Foundations section](/analytics/powerbi-foundations).

:::
