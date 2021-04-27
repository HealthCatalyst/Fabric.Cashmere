# PowerBI Navbar

###### Last updated February 24, 2021

:::

##### Overview

![Navbar Example](./assets/analytics/powerbi/pbi-navbar.png "Navbar Example")

The navbar is one of the most distinguishing elements of a Cashmere application.
It is a hallmark of the Health Catalyst app brand on all platforms.
For this reason, the styling of the navbar should not be altered from the template.

The Navbar is a horizontal text object with the following formatting:
- **Type**: Text object
- **Background**: charcoal-blue `#384655`
- **Height**: 50px
- **Position**: `x:0, y:0`
- **Visual header toggle**: Off

:::

:::

##### Brand

Brand is an image of the [Health Catalyst tri-flame](/foundations/logo) and formatted as follows:
- **Type**: Image object
- **Height**: 50px
- **Width**: 50px
- **Background**: blue `#00aeff`
- **Position**: `x:0, y:0`
- **Visual header toggle**: Off

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

The button for the currently selected page is formatted as follows:
- **Type**: Button
- **Height**: 50px
- **Font**: Segoe (Bold), 10pt
- **Background**: None
- **Border**: None
- **Visual header toggle**: Off

Additionally, there is a floating line shape that is positioned under the selected item

- **Type**: Shape
- **Color**: blue `#00aeff`
- **Visual header toggle**: Off
- **Weight**: 4px
- **Position**: `y:50` and the **x position** must match the **x position** of the selected button item
- **Width**: Must match the selected button item's width

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

Co-Branding is the final fixed width horizontal object formatted as follows:
- **Type**: Image
- **Width**: 200px
- **Background**: white `#ffffff`

This space allows applications to include the logo of your customer.
Ideally you'll want the horizontal version of a customer's logo with a **white or transparent** background.
To configure this section, you need to delete the current image object and insert the new one with the following parameters:

- **Position**: `x: ~1050, y:0`
- **Height**: 50px

Note that this is an optional section.
If your application does not require co-branding, click on the Co-Branding image and "Remove" or delete the object.

:::
