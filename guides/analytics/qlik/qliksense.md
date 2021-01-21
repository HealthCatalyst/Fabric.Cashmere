# Qlik Sense

###### Last updated December 11, 2020

:::

##### Overview

QlikView is still a popular BI tool but its parent company, Qlik, has been devoting more development and resources to Qlik Sense. Health Catalyst anticipates increased demand for Qlik Sense developers and will continue to expand this style guide as the need for standardization grows.

For a more in-depth review comparing major BI tools, including QlikView and Qlik Sense, we recommend a [white paper](https://healthcarequalitycatalyst.sharepoint.com/:b:/s/DOSVisualization/ERgnumWAEjJGlaJ3upnQpo0BKvEReltxHG8deNjnoRp4sA?e=yM0Kmj) created by the Health Catalyst Visualization Infrastructure team.

:::

:::

##### Template

Download links to the default qlik sense template(s)

:::

:::

##### Layout

General HTML page layout considerations

:::

:::

##### Stylesheets

The recommended method for applying Health Catalyst's Cashmere web style in Qlik Sense apps is to import the style theme. Typically, the theme will already be pre-loaded. To check, open up a Qlik Sense application. Navigate to the upper left-hand side of the top navigation bar and click the three dots that pop up next to the application's name. Then open up the app settings (gear icon) and access the **App Theme** dropdown list within the **Appearance** section. There should be an option to choose Health Catalyst's theme.

If necessary, color variables may also be set up in the load script.

:::

:::

##### Navbar

To create Health Catalyst's navbar, navigate to a Qlik Sense application's app settings (gear icon). 

Import the tri-flame.png image from the ASO repository, set the background color to **blue** `#00aeff RGB(0,174,255)`, and left-align the image.

Set the title font color to `white #ffffff`.

:::
