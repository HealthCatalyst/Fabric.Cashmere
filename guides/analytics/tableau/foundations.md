# Tableau Foundations

###### Last updated February 24, 2021

:::

##### About the template

The Health Catalyst Tableau template adheres to the overall [Cashmere Foundations](/foundations) as much as possible, while preserving any established usage patterns unique to Tableau.
Whenever beginning a new app, be sure to download the [most current version](/analytics/tableau-template) of the template that your environment supports.

![Tableau Template](./assets/analytics/tableau/templatescreenshot.png "Tableau Template")

Updates to the template are version controlled, and notes are provided to explain what changed between updates.
Versions follow the [semantic versioning](https://semver.org/) system which utilizes three numbers (MAJOR.MINOR.PATCH) indicating the following:

- **MAJOR** version is a significant change with new compatibility requirements, such as dropping support for an older version of Tableau
- **MINOR** version adds functionality in a backward compatible manner
- **PATCH** version includes bug fixes or style tweaks that are backwards compatible

:::

:::

##### Type

The Health Catalyst brand includes [two fonts](/foundations/typography): **Flexo** and **Open Sans**. However, Tableau does not easily support embedding custom fonts, and we don't want to rely on users having these fonts installed. The following guidelines translate the Cashmere standard into a Tableau-friendly format:

### App Name

Use of the Flexo font in the Health Catalyst brand is generally limited to logos and app names. In the Tableau template, we only feature it in the app name on the navbar. The font is baked into an image so there is no type dependency. Information on obtaining a logo image for your app can be found on in the [navbar section](/analytics/tableau-navbar).

### Primary Font

Health Catalyst's primary font is Open Sans - a clean, readable, sans-serif typeface.
Although Tableau doesn't allow us to use Open Sans, it does come packaged with a very similar typeface called *Tableau* which includes several weights.
So in Health Catalyst Tableau applications, we leverage **Tableau Regular**, **Tableau Bold**, and **Tableau Book**.
Information about specific font sizes and weights can be found throughout this style guide, and examples of correct usage can be found in the template.

<div style="text-align:center">

![Tableau Book Typeface](./assets/analytics/tableau/tableaubook.png "Tableau Book Typeface")

</div>

:::

:::

##### Color

Tableau doesn't always render color values exactly the same as a web browser would.
But for consistency we still use all the same colors from the [Cashmere Foundations](/foundations/color) for colors in Tableau.
Specific color usage information can be found throughout the style guide and within the template.
For information related to the use of color in data visualizations, refer to the [charts section](/analytics/tableau-charts).

:::

:::

##### Customer Branding

Health Catalyst regards our analytic accelerators as products every bit as much as our web applications.
As with our web applications, we allow our products to be co-branded, but not white-labeled.
Customers may incorporate their logo into the navbar ([same as our web applications](/web/components/navbar/examples?section=navbar-cobrand)),
but any Health Catalyst brand elements (colors, fonts, logos, etc) should not be removed or altered.

Refer to the [navbar section](/analytics/tableau-navbar) section for more information about adding a customer's logo to your Tableau app's navbar.

:::

:::

##### Layout

The standard size for a Health Catalyst Tableau application is **1280 x 900** pixels.
Within that space, the layout is divided into three primary areas: Navbar, Sidebar, and Content Area.
Note that if content needs to be further subdivided within the content area, [Tabs](/analytics/tableau-tabs) may be included in that space.

<div style="text-align:center"><br>

![Layout Elements](./assets/analytics/tableau/layoutelements.png "Layout Elements")

</div>

### Navbar

The navbar is a horizontal container with a fixed 50px height.
Detailed information on the navbar and how to configure it is included in the [navbar section](/analytics/tableau-navbar).

### Sidebar

The sidebar is a vertical container with a fixed 250px width.
It typically contains filters, but can also be used as an information panel.
Details about use of the sidebar can be found in the [filters section](/analytics/tableau-filters) and [about section](/analytics/tableau-about).

### Content Area

<article>

The background color for the content area can be one of the following values:
- **Background**: slate-gray-100 `#f0f3f6`
- **Background**: white `#ffffff` 
</article>

The Inner Padding for the content area on dashboards should be at least `20, 20, 20, 10`.
Note that the content area on the [About Page](/analytics/tableau-about) applies padding to the contained items instead.

:::

:::

##### Tiles

As with Cashmere web applications, content is typically contained within [tiles](/web/components/tile).
Unfortunately Tableau does not support rounded edges or drop-shadows, so tiles within Tableau apps will look slightly different than their Cashmere counterparts.
Layout specifics for the most common tiles can be found in the [KPI Metrics section](/analytics/tableau-metrics), [Charts section](/analytics/tableau-charts), and [Tables section](/analytics/tableau-tables). Refer to the template or these sections for working examples.

<article>

In general, a Tableau tile is a vertical container formatted with the following values:
- **Background**: white `#ffffff` 
- **Border style**: solid
- **Border**: slate-gray-300 `#c0c5cc`
</article>

Tiles should have at least 10px of padding between each other (5px on either side).

<div style="text-align:center"><br>

![Tableau Tiles](./assets/analytics/tableau/tiles.png "Tableau Tiles")

</div>

### Tile Header

Every tile should include a header horizontal container with a title, an info button, and a drill-down button (optional).
<article>

The header container is formatted as follows: 
- **Height**: 35px
- **Padding (outer)**: `10, 5, 10, 0`

The header text should be 
- **Font**: Tableau Bold, 
- **Color**: offblack `#333333`
- **Size**: 10pt

</article>

For the info tooltip, we leverage a worksheet with a shape.
The shape used is included in the folder called "HealthCatalystShapes" in the template zip file.
Copy the HealthCatalystShapes folder to Documents/My Tableau Repository/Shapes folder.

Duplicate one of the existing tooltip worksheets from the template to ensure consistent sizing of the button.
From the worksheet, click the Tooltip button in the *Marks* panel.
There you can edit the information you'd like to appear in the tooltip.
Back on the dashboard, drag the duplicated tooltip sheet to the header horizontal container.
Hide the title of the sheet, remove all outer padding, and set the fixed width to 30px.
Finally, set the inner padding to `0, 3, 0, 0` to adjust the vertical position.

![Header Tooltip](./assets/analytics/tableau/tooltipsheet.png "Header Tooltip")

Use of the drill-down function will be specific to your application.
In general, it should allow the user to explore raw data used to calculate the metric or data visualization.
They may mean using a navigation button, or a worksheet as with the info button.
For a worksheet, follow the same steps above but swap the shape to the query button within HealthCatalystShapes.
For a navigation button, remove all outer padding, set the fixed width to 30px, and then set the inner padding to 5px on all sides.

### Divider

<article>

A horizontal line divides the header from the content of the tile and is formatted as follows:
- **Weight**: 1px

Add a blank item to the tile vertical container and format it with the following values:
- **Padding (outer)**: `10, 0, 10, 5`
- **Height**: 6px
- **Background**: slate-gray-300 `#c0c5cc`

</article>

### Content

The remaining area of the tile can be used for any type of content.
Refer to the other sections of this style guide for details about specific types of tiles such as KPI Metrics, charts, and tables.

:::
