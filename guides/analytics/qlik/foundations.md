# QlikView Foundations

###### Last updated February 24, 2021

:::

##### About the template

The Health Catalyst Qlik template adheres to the overall [Cashmere Foundations](/foundations) as much as possible, while preserving any established usage patterns unique to Qlik.
Whenever beginning a new app, be sure to download the [most current version](/analytics/qlik-template) of the template that your environment supports.

![Qlik Template](./assets/analytics/qlik/qlik-template.PNG "Qlik Template")

Updates to the template are version controlled, and notes are provided to explain what changed between updates.
Versions follow the [semantic versioning](https://semver.org/) system which utilizes three numbers (MAJOR.MINOR.PATCH) indicating the following:

- **MAJOR** version is a significant change with new compatibility requirements, such as dropping support for an older version of Qlik
- **MINOR** version adds functionality in a backward compatible manner
- **PATCH** version includes bug fixes or style tweaks that are backwards compatible

:::

:::

##### Type

The Health Catalyst brand includes [two fonts](/foundations/typography): **Flexo** and **Open Sans**. However, Qlik does not easily support embedding custom fonts, and we don't want to rely on users having these fonts installed. The following guidelines translate the Cashmere standard into a Qlik-friendly format:

### App Name

Use of the Flexo font in the Health Catalyst brand is generally limited to logos and app names. In the Qlik template, we only feature it in the app name on the navbar. The font is baked into an image so there is no type dependency. Information on obtaining a logo image for your app can be found on in the [navbar section](/analytics/qlik-navbar).

### Primary Font

Health Catalyst's primary font is Open Sans - a clean, readable, sans-serif typeface.
Although Qlik doesn't easily allow us to use Open Sans, it does come packaged with a very similar typeface called *Arial* which includes several weight variations. Because Power BI doesn't consistently provide access to formatting options such as bolding,
in Health Catalyst Power BI applications, we leverage **Arial**, **Arial Bold**, and **Segoe UI Light**.
Information about specific font sizes and weights can be found throughout this style guide, and examples of correct usage can be found in the template.

<div style="text-align:center">

![Arial](/assets/analytics/qlik/arial_1.png "Arial Typeface")

</div>

:::

:::

##### Icons
Icons should come from Health Catalyst's [icon set](https://cashmere.healthcatalyst.net/styles/icons) and should be sized similarly to adjacent text.

:::

:::

##### Color

Qlik doesn't always render color values exactly the same as a web browser would.
But for consistency we still use all the same colors from the [Cashmere Foundations](/foundations/color) for colors in Qlik.
Specific color usage information can be found throughout the style guide, within the template's object visuals, and in the underlying load script code packaged with the template.
For information related to the use of color in data visualizations, refer to the [charts section](/analytics/qlik-charts).

:::

:::

##### Customer Branding

Health Catalyst regards our analytic accelerators as products every bit as much as our web applications.
As with our web applications, we allow our products to be co-branded, but not white-labeled.
Customers may incorporate their logo into the navbar ([same as our web applications](/web/components/navbar/examples?section=navbar-cobrand)),
but any Health Catalyst brand elements (colors, fonts, logos, etc) should not be removed or altered.

Refer to the [navbar section](/analytics/qlik-navbar) section for more information about adding a customer's logo to your Qlik app's navbar.

:::

:::

##### Layout

The standard page size for a Health Catalyst Qlik application is **1280x900px**.

Within that space, the layout is divided into three primary areas: Navbar, Sidebar, and Content Area.
Note that if content needs to be further subdivided within the content area, [Tabs](/analytics/qlik-tabs) may be included in that space.

<div style="text-align:center"><br>

![Layout Elements](./assets/analytics/tableau/layoutelements.png "Layout Elements")

</div>

### Navbar

The navbar is a horizontal container with a fixed `50px` height.
Detailed information on the navbar and how to configure it is included in the [navbar section](/analytics/qlik-navbar).

### Sidebar

The sidebar is a vertical container with a fixed `250px` width.
It typically contains filters, but can also be used as an information panel.
Details about use of the sidebar can be found in the [filters section](/analytics/qlik-filters) and [about section](/analytics/qlik-about).

### Content Area

<article>

The background color for the content area can be one of the following values:
- **Background**: slate-gray-100 `#f0f3f6 RGB(240,243,246)`
- **Background**: white `#ffffff RGB(255,255,255)`

</article>


:::

:::

##### Tiles

Visualization objects such as charts, graphs, tables, and KPIs should be styled like the Cashmere [tile component](/web/components/tile) and will be referred to as tiles within this section.

<article>

In general, a Qlik tile should be formatted accordingly: 
- **Background**: white `#ffffff RGB(255,255,255)`
- **Border**: white `#ffffff RGB(255,255,255)`
- **Radius**: 5px

Each tile should also have shadow with the following values:

- **Color**: black `#000000 RGB(0,0,0)`
- **Intensity**: soft
- **Transparency**: 85%

Tiles should have at least 10px of padding between each other (5px on either side).

</article>

Layout specifics for the most common visual objects can be found in the [KPI Metrics section](/analytics/qlik-metrics), [Charts section](/analytics/qlik-charts), and [Tables section](/analytics/qlik-tables). Refer to the template or these sections for working examples.

<div style="text-align:center"><br>

![Tiles](./assets/analytics/qlik/qlik-tile.PNG "Tiles")

</div>

### Alignment
Tiles should be evenly aligned horizontally and/or vertically

<div style="text-align:center"><br>

![correct alignment](/assets/analytics/powerbi/pbi-align.png "Correct Alignment")

</div>

Tiles should not be distributed unevenly

<div style="text-align:center"><br>

![incorrect alignment](/assets/analytics/powerbi/pbi-align-wrong.png "Incorrect Alignment")

</div>

Utilize Qlik's alignment capabilities by selecting each object and choosing the appropriate distribution option within the *Align/Distribute* menu under the *Layout* toolbar.

<div style="text-align:center"><br>

![alignment toolbar](/assets/analytics/qlik/qlik-alignment-how.png "How To Align")

</div>

### Tile Title

<article>

Tile tiles should be formatted accordingly:
- **Alignment**: left
- **Font**: Arial Bold, 10pt
- **Color**: offblack `#333333 RGB(51,51,51)`

</article>

### Tile Visual Header

Every tile should always include info and filter icons within the visual header.
Icon color should be **slate-gray-400**`#708090 RGB(112,128,144)`.

Some header elements, such as drill-down icons, are object-specific and more details can be found in the [KPI Metrics section](/analytics/qlik-metrics), [Charts section](/analytics/qlik-charts), and [Tables section](/analytics/qlik-tables). Refer to the template or these sections for working examples.

### Divider

<article>

A horizontal line divides the header from the rest of the content in the object and is formatted with the following values:
- **Weight**: 1px
- **Padding**: 2px on left and right sides
- **Height**: 10px
- **Color**: slate-gray-300 `#c0c5cc RGB(192,197,204)`

</article>

<div style="text-align:center"><br>

![divider](/assets/analytics/qlik/qlik-chart.png "Qlik Divider")

</div>

### Content

The remaining area of the tile can be used for any type of content.
Refer to the other sections of this style guide for details about specific types of tiles such as [KPI metrics](/analytics/qlik-metrics), [charts](/analytics/qlik-charts), and [tables](/analytics/qlik-tables).

:::
