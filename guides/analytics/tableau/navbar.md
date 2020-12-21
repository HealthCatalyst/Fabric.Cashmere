# Tableau Navbar

###### Last updated December 16, 2020

:::

##### Overview

![Navbar Example](./assets/analytics/tableau/navbarexample.png "Navbar Example")

The navbar is one of the most distinguishing elements of a Cashmere application.
It is a hallmark of the Health Catalyst app brand on all platforms.
For this reason, the styling of the navbar should not be altered from the template.

The Navbar is a Horizontal Container with a fixed 50px height.
Below is the hierarchy for the container (a floating item called "Selected Highlight" is also part of the navbar):

![Navbar Hierarchy](./assets/analytics/tableau/navbarhierarchy.png "Navbar Hierarchy")

:::

:::

##### Brand

Brand is a 50 x 50px fixed width horizontal container with a background color set to **blue** `#00aeff`.
Within the container is a SVG of the Health Catalyst tri-flame.
The outer padding of the svg should be set to 8px on all sides.

:::

:::

##### App Name

App Name is the second fixed width horizontal container in the navbar, also containing one SVG image.
The image is the name of your application in the Flexo font (so the font isn't needed).
To obtain an SVG for your application, contact the UX team via the `#design` Slack channel.

Edit the `AppName.svg` Image Object and swap the image file with the one for your application.
`Fit Image` should be checked, but `Center Image` should not.
Don't alter the Outer Padding settings on the image (set to `20, 12, 0 12`).

![App Name](./assets/analytics/tableau/appname.png "App Name Resizing")

**Important:** you will need to change the width of the App Name container to suit the width of your app name.
You want the width to be just wide enough to contain the image without shrinking it.
Right-click on the App Name container and Edit Width.
Begin by making the container very wide (e.g. 300).
Then continue to edit the width and reduce the size of the container until it's almost touching the right side of the image, but the image is not being scaled.

:::

:::

##### Links

Links is a flexible width horizontal container with all the navigation links to the different sections of your application.
The first item in the container is a 25px width spacer to provide padding between the app name and the first link.
Depending on the number of sections in your application, drag additional Navigation Objects (text buttons) into the container.

The Outer Padding on any navbar link should be set to `4, 5, 4, 3`.
These values are important so the bottom of the navbar text aligns with the bottom of the app name.
The background color and border on the button should be set to `None`.

The button for the currently selected page should have its font set to `Tableau Bold` and color set to **white** (the second swatch in the top row of the Font color picker).
Additionally, there is a floating item at the top of the root hierarchy called `Selected Highlight` that should be positioned under the selected item.
The y position of that item should always be set to 46, but the x position should match the x position of the selected button item.
The width of the selected highlight item should also match the selected button item.
Adjust the left & right Outer Padding of Selected Highlight to account for padding and center the blue underline under the bold text.

![Selected Link](./assets/analytics/tableau/selected.png "Selected link")

All other buttons should have their font set to `Tableau Regular` and color set to **gray-200** (the second swatch in the fourth row of the Font color picker).

:::

:::

##### Menu Icons

Menu Icons is fixed width horizontal container that typically only contains the question-mark icon linking to the [About Page](/analytics/tableau-about).
A spacer on the right side is also included to add padding before the co-branding space.

The question-mark icon is an Image Button with its Inner Padding set to 14 on all sides.
Additional menu icon links may be added to the left of the question-mark icon - for example, links to a search page, app switcher, etc.
Guidelines for icon selection can be found in [Cashmere Foundations](/foundations/icons).
They should have the same styling with a width and height set to 50px.
Add 50px to the fixed width of the Menu Icons container for any icons added.
Contact the UX team via the `#design` Slack channel for icon svgs.

:::

:::

##### Co-branding

Co-Branding is the final fixed width horizontal container set to 200px wide with a **white** `#ffffff` background.
This space allows applications to include the logo of your customer.
Ideally you'll want the horizontal version of a customer's logo with a white or transparent background.
To configure this section, you should only have to Edit the Image and swap the file.
It should automatically resize to fit best within the container.

Note that this is an optional section.
If your application does not require co-branding, right-click on the Co-Branding container and "Remove from Dashboard".

:::
