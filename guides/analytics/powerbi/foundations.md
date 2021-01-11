# PowerBI Foundations

###### Last updated December 30, 2020

:::

##### About the template

The Health Catalyst Power BI template adheres to the overall [Cashmere Foundations](/foundations) as much as possible, while preserving any established usage patterns unique to Power BI.
Whenever beginning a new app, be sure to download the [most current version](/analytics/powerbi-template) of the template that your environment supports.

![Power BI Template](./assets/analytics/powerbi/pbi-template.png "Power BI Template")

Updates to the template are version controlled, and notes are provided to explain what changed between updates.
Versions follow the [semantic versioning](https://semver.org/) system which utilizes three numbers (MAJOR.MINOR.PATCH) indicating the following:

- **MAJOR** version is a significant change with new compatibility requirements, such as dropping support for an older version of Power BI
- **MINOR** version adds functionality in a backward compatible manner
- **PATCH** version includes bug fixes or style tweaks that are backwards compatible

:::

:::

##### Type

The Health Catalyst brand includes [two fonts](/foundations/typography): **Flexo** and **Open Sans**. However, Power BI does not easily support embedding custom fonts, and we don't want to rely on users having these fonts installed. The following guidelines translate the Cashmere standard into a Power BI-friendly format:

### App Name

Use of the Flexo font in the Health Catalyst brand is generally limited to logos and app names. In the Power BI template, we only feature it in the app name on the navbar. The font is baked into an image so there is no type dependency. Information on obtaining a logo image for your app can be found on in the [navbar section](/analytics/powerbi-navbar).

### Primary Font

Health Catalyst's primary font is Open Sans - a clean, readable, sans-serif typeface.
Although Power BI doesn't easily allow us to use Open Sans, it does come packaged with a very similar typeface called *Segoe* which includes several weight variations. Because Power BI doesn't consistently provide access to formatting options such as bolding, 
in Health Catalyst Power BI applications, we leverage **Segoe UI**, **Segoe (Bold)**, and **Segoe UI Light**.
Information about specific font sizes and weights can be found throughout this style guide, and examples of correct usage can be found in the template.

<div style="text-align:center">

![Segoe UI](/assets/analytics/powerbi/segoe_ui_01.png "Segoe Typeface")

</div>

:::

:::

##### Icons
Icons should come from Health Catalyst's [icon set](https://cashmere.healthcatalyst.net/styles/icons) and should be sized similarly to adjacent text.

:::

:::

##### Color

Power BI doesn't always render color values exactly the same as a web browser would.
But for consistency we still use all the same colors from the [Cashmere Foundations](/foundations/color) for colors in Power BI.
Specific color usage information can be found throughout the style guide, within the template's object visuals, and in the underlying JSON theme code packaged with the template.
For information related to the use of color in data visualizations, refer to the [charts section](/analytics/powerbi-charts).

:::

:::

##### Customer Branding

Health Catalyst regards our analytic accelerators as products every bit as much as our web applications.
As with our web applications, we allow our products to be co-branded, but not white-labeled.
Customers may incorporate their logo into the navbar ([same as our web applications](/web/components/navbar/examples?section=navbar-cobrand)),
but any Health Catalyst brand elements (colors, fonts, logos, etc) should not be removed or altered.

Refer to the [navbar section](/analytics/powerbi-navbar) section for more information about adding a customer's logo to your Power BI app's navbar.

:::

:::

##### Layout

The standard aspect ratio for a Health Catalyst Power BI application is **16:9**.
Within that space, the layout is divided into four primary areas: Navbar, Static Bar, Content Area, and Filters.
Note that if content needs to be further subdivided within the content area, [Tabs](/analytics/powerbi-tabs) may be included in that space.

<div style="text-align:center"><br>

![Layout Elements](./assets/analytics/tableau/layoutelements.png "Layout Elements")

</div>

### Navbar

The navbar is a horizontal text object with a fixed 50px height.
Detailed information on the navbar and how to configure it is included in the [navbar section](/analytics/powerbi-navbar).

### Static Bar

The static bar is horizontal text object with a fixed `30px height and 1280px width`.
It is used as an information panel to display dashboard-wide metrics, such as refresh timestamps or "stickied" metrics, such as population counts.
Position the object at `x:0, y:50`, set the background color to **slate-gray-400** `#708090`, toggle the visual header to `off`.

<div style="text-align:center"><br>

![Static Bar](./assets/analytics/powerbi/pbi-static-bar.png "Static Bar")

</div>

### Content Area

The background color for the content area is either **slate-gray-100** `#f0f3f6` or **white** `#ffffff` depending on the page.

Objects in the content area should be placed about 30px from the outer edges.

### Filters

Information about the dynamic filters pane is included in the [filters section](/analytics/powerbi-filters).

:::

:::

##### Tiles

Visualization objects such as charts, graphs, tables, and KPIs should be styled like the Cashmere [tile component](/web/components/tile) and will be referred to as tiles within this section.

In general, a Power BI tile has a **white** `#ffffff` background and a solid **white** `#ffffff` border with a 5px wide radius. Each tile should also have an outside-positioned **slate-gray-200** `#e0e0e0` shadow that is sized at 2px with a blur factor of 5px. Tiles should have at least 10px of padding between each other (5px on either side).

Layout specifics for the most common visual objects can be found in the [KPI Metrics section](/analytics/powerbi-metrics), [Charts section](/analytics/powerbi-charts), and [Tables section](/analytics/powerbi-tables). Refer to the template or these sections for working examples.

<div style="text-align:center"><br>

![Power BI Tiles](./assets/analytics/powerbi/pbi-tile.png "Power BI Tiles")

</div>

### Alignment
Tiles should be evenly aligned horizontally and/or vertically 

<div style="text-align:center"><br>

![correct alignment](/assets/analytics/powerbi/pbi-alignment.png "Correct Alignment")

</div>

Tiles should not be distributed unevenly 

<div style="text-align:center"><br>

![incorrect alignment](/assets/analytics/powerbi/pbi-alignment-wrong.PNG "Incorrect Alignment")

</div>

Utilize Power BI's alignment capabilities by selecting each object and choosing the appropriate distribution option within the *Align* section under the *Format* toolbar 

<div style="text-align:center"><br>

![alignment toolbar](/assets/analytics/powerbi/pbi-alignment-how.PNG "How To Align")

</div>

### Tile Title
Every tile should include a `left-aligned` title. The title text should be `Segoe (Bold)`, **offblack** `#333333`, with a font size of 10px.

### Tile Visual Header

Every tile should always include the info and filter icons within the visual header.
Icon color should be **slate-gray-400**`#708090`.

Some header elements, such as drill-down icons, are object-specific and more details can be found in the [KPI Metrics section](/analytics/powerbi-metrics), [Charts section](/analytics/powerbi-charts), and [Tables section](/analytics/powerbi-tables). Refer to the template or these sections for working examples.

### Divider

A horizontal line with a weight of `1pt` divides the header from the content of the visual object. Leave about 2px of space on the left and right.
Set its fixed height to `12px` and set the line color to **slate-gray-300** `#c0c5cc`. Turn off all visual header icons.

<div style="text-align:center"><br>

![divider](/assets/analytics/powerbi/pbi-divider.png "Power BI Divider")

</div>

### Content

The remaining area of the tile can be used for any type of content.
Refer to the other sections of this style guide for details about specific types of tiles such as [KPI metrics](/analytics/powerbi-metrics), [charts](/analytics/powerbi-charts), and [tables](/analytics/powerbi-tables).

:::
