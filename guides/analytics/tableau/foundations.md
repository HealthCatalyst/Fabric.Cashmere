# Tableau Foundations

###### Last updated December 16, 2020

:::

##### About the template

The Health Catalyst Tableau template adheres to the overall [Cashmere Foundations](/foundations) as much as possible, while preserving any established usage patterns unique to Tableau.
Whenever beginning a new app, be sure to download the [most current version](/analytics/tableau-template) of the template that your environment supports.

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
Note that if content needs to be further subdivided within the content area, [Tabs](/analytics/tableau-tabs) may included in that space.

<div style="text-align:center"><br>

![Layout Elements](./assets/analytics/tableau/layoutelements.png "Layout Elements")

</div>

### Navbar

The navbar is horizontal container with a fixed 50px height.
Detailed information on the navbar and how to configure it is included in the [navbar section](/analytics/tableau-navbar).

### Sidebar

The sidebar is vertical container with a fixed 200px width.
It typically contains filters, but can also be used as an information panel.
Details about use of the sidebar can be found in the [filters section](/analytics/tableau-filters) and [about section](/analytics/tableau-about).

### Content Area

The background color for the content area is **slate-gray-100**: `#f0f3f6`.

As with Cashmere web applications, content is typically contained within [tiles](/web/components/tile).
Unfortunately Tableau does not support rounded edges or drop-shadows, so tiles within Tableau apps will look slightly different than their Cashmere counterparts.
Layout specifics for the most common tiles can be found in the [KPI Metrics section](/analytics/tableau-metrics), [Charts section](/analytics/tableau-charts), and [Tables section](/analytics/tableau-tables).

In general, a Tableau tile is a vertical container with a **white** `#ffffff` background, and a solid **slate-gray-300** `#c0c5cc` border.
Every tab should include a title, an info button, and a drill-down button (optional).
A 1px horizontal line divides the header from the content of the tile.
Below is an example of a Tableau tile.
Refer to the template or the sections linked above for working examples.

:::
