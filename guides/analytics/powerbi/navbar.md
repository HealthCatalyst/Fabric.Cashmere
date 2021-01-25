# PowerBI Navbar

###### Last updated January 13, 2021

:::

##### Overview

![Navbar Example](./assets/analytics/powerbi/pbi-navbar.png "Navbar Example")

The navbar is one of the most distinguishing elements of a Cashmere application.
It is a hallmark of the Health Catalyst app brand on all platforms.
For this reason, the styling of the navbar should not be altered from the template.

The Navbar is a **charcoal-blue** `#384655` horizontal text object with a fixed `50px` height, set at `x:0, y:0`. Toggle the visual header on the object to `off`. 

:::

:::

##### Brand

Brand is a `50px x 50px` fixed width image of the [Health Catalyst tri-flame](/foundations/logo) with a background color set to **blue** `#00aeff` and positioned at `x:0, y:0`. Toggle the visual header on the object to `off`.

:::

:::

##### App Name

App Name is the second fixed width horizontal object in the navbar, also containing one PNG image.
The image is the name of your application in the Flexo font (so the font isn't needed).
To obtain a PNG for your application, contact the UX team via the `#design` Slack channel.

Edit the `AppName.png` image object and swap the image file with the one for your application.

The App Name should be positioned to the right of the tri-flame logo at `x:55, y:0` and centered vertically within the Navbar. 

**Important:** you will need to adjust the width of your app name image.
You want the width to be just wide enough to contain the image without shrinking it.
Begin by making the image very wide (e.g. 300).
Then continue to edit the width and reduce the size of the container until it's almost touching the right side of the image, but the image is not being scaled.

:::

:::

##### Links

Links is a flexible width horizontal series of buttons that provide all the primary navigation links to the different sections of your application.

Provide around `25px` of padding between the app name and the first button.

Depending on the number of sections in your application, create additional, identically-sized Navigation Objects (buttons) with about `8px` of padding between them. The **y-position** for the button objects may need to be adjusted so the bottom of the button's text aligns with the bottom of the app name.

The 50px-high button for the currently selected page should have its font set to `Segoe (Bold), 10px` and the background color and border on the button should be set to `None`. Toggle the visual header on the button to `off`.


Additionally, there is a **blue** `#00aeff` floating line shape that should be positioned under the selected item. Toggle the visual header on the shape to `off`.

The **y position** of that line shape should always be set to `y:50`, but the **x position** should match the **x position** of the selected button item.
The width of the selected highlight line should also match the selected button item. Set the line weight to `4pt`. 

![Selected Link](./assets/analytics/powerbi/pbi-selected-link.png "Selected link")

All other buttons should have their font set to `Segoe UI` and toggle the visual header on each button to `off`.

:::

:::

##### Menu Icons

Menu Icons is a fixed width `w:35px, h:35px` image object that typically only contains the question-mark icon linking to the [About Page](/analytics/powerbi-about).
The icon is set at about `x:1020, y:7`, depending on the width of the co-branding object. The action enabled on the icon is `page navigation` with the `About` page as the destination.

Additional menu icon links may be added to the left of the question-mark icon - for example, links to a search page, app switcher, etc.
One commonly used icon is for an Advanced Filters page (see the [Filters Section](/analytics/powerbi-filters) for more information).
Guidelines for icon selection can be found in [Cashmere Foundations](/foundations/icons).
They should have the same styling with a width and height set to `35px`.

Contact the UX team via the `#design` Slack channel for icon png files.

:::

:::

##### Co-branding

Co-Branding is the final fixed width horizontal object set to 200px wide with a **white** `#ffffff` background.
This space allows applications to include the logo of your customer.
Ideally you'll want the horizontal version of a customer's logo with a white or transparent background.
To configure this section, you need to delete the current image object and insert the new one with the following parameters: `x:around 1050, y:0, w: 200, h: 50`. 

Note that this is an optional section.
If your application does not require co-branding, click on the Co-Branding image and "Remove" or delete the object.

:::
