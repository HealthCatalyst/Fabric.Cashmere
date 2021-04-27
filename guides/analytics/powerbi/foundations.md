# PowerBI Foundations

###### Last updated February 24, 2021

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
Within that space, the layout is divided into four primary areas: Navbar, Subnav, Content Area, and Filters.
Note that if content needs to be further subdivided within the content area, [Tabs](/analytics/powerbi-tabs) may be included in that space.

<div style="text-align:center"><br>

![Layout Elements](./assets/analytics/powerbi/pbi-layoutelements.png "Layout Elements")

</div>

### Navbar

The navbar is a horizontal text object with a fixed 50px height.
Detailed information on the navbar and how to configure it is included in the [navbar section](/analytics/powerbi-navbar).

### Subnav

The subnav is used as an information panel to display dashboard-wide metrics, such as refresh timestamps or "stickied" metrics, such as population counts.

Format the subnav with the following parameters:
- **Type**: Text object
- **Height**: 30px
- **Width**: 1280px
- **Position**: `x:0, y:50`
- **Background**: slate-gray-400 `#708090`
- **Visual header toggle**: Off

<div style="text-align:center"><br>

![Static Bar](./assets/analytics/powerbi/pbi-subnav.png "Subnav")

</div>

### Content Area

Options for a background color for the content area are:
- **Background option**: slate-gray-100 `#f0f3f6`
- **Background option**: white `#ffffff`

Objects in the content area should be placed about 30px from the outer edges.

### Filters

Information about the dynamic filters pane is included in the [filters section](/analytics/powerbi-filters).

:::

:::

##### Tiles

Visualization objects such as charts, graphs, tables, and KPIs should be styled like the Cashmere [tile component](/web/components/tile) and will be referred to as tiles within this section.

In general, a Power BI tile is formatted accordingly:

- **Background**: white `#ffffff`
- **Border**: white `#ffffff`
- **Border radius**: 5px
- **Padding**: At least 10px of padding between each tile (5px on either side)


Each tile should also have shadow with the following values:
- **Color**: black `#000000`
- **Shadow position**: Outside
- **Preset**: Custom
- **Size**: 1px
- **Blur**: 3px
- **Angle**: 90º
- **Distance**: 1px
- **Transparency**: 85%

Layout specifics for the most common visual objects can be found in the [KPI Metrics section](/analytics/powerbi-metrics), [Charts section](/analytics/powerbi-charts), and [Tables section](/analytics/powerbi-tables). Refer to the template or these sections for working examples.

<div style="text-align:center"><br>

![Power BI Tiles](./assets/analytics/powerbi/pbi-tile.png "Power BI Tiles")

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

Utilize Power BI's alignment capabilities by selecting each object and choosing the appropriate distribution option within the *Align* section under the *Format* toolbar

<div style="text-align:center"><br>

![alignment toolbar](/assets/analytics/powerbi/pbi-align-how.png "How To Align")

</div>

### Tile Title

Every tile should include title with the following formatting:
- **Alignment**: left-aligned
- **Font**: Segoe UI
- **Font color**: offblack `#333333`
- **Font size**: 10pt

### Tile Visual Header

Every tile should always include the info and filter icons within the visual header.
Icon color should be **slate-gray-400**`#708090`.

Some header elements, such as drill-down icons, are object-specific and more details can be found in the [KPI Metrics section](/analytics/powerbi-metrics), [Charts section](/analytics/powerbi-charts), and [Tables section](/analytics/powerbi-tables). Refer to the template or these sections for working examples.

### Divider

A horizontal line divides the header from the content of the visual object. Leave about 2px of space on the left and right and format accordingly:
- **Weight**: 1pt
- **Height**: 12px
- **Color**: slate-gray-300 `#c0c5cc`
- **Visual header toggle**: Off

<div style="text-align:center"><br>

![divider](/assets/analytics/powerbi/pbi-chart-colors.png "Power BI Divider")

</div>

### Content

The remaining area of the tile can be used for any type of content.
Refer to the other sections of this style guide for details about specific types of tiles such as [KPI metrics](/analytics/powerbi-metrics), [charts](/analytics/powerbi-charts), and [tables](/analytics/powerbi-tables).

:::
