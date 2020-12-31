# PowerBI Navbar

###### Last updated December 30, 2020

:::

##### Overview

![Navbar Example](./assets/analytics/tableau/navbarexample.png "Navbar Example")

The navbar is one of the most distinguishing elements of a Cashmere application.
It is a hallmark of the Health Catalyst app brand on all platforms.
For this reason, the styling of the navbar should not be altered from the template.

The Navbar is a Horizontal text object with a fixed 50px height, set at `x:0, y:0`.

:::

:::

##### Brand

Brand is a 50 x 50px fixed width image object with a background color set to **blue** `#00aeff`.
Within the container is a PNG of the Health Catalyst tri-flame.

:::

:::

##### App Name

App Name is the second fixed width horizontal object in the navbar, also containing one PNG image.
The image is the name of your application in the Flexo font (so the font isn't needed).
To obtain a PNG for your application, contact the UX team via the `#design` Slack channel.

Edit the `AppName.png` Image Object and swap the image file with the one for your application.

The App Name should be about 5px to the right of the tri-flame logo. 

<div style="text-align:center"><br>

![header](/assets/analytics/powerbi/pbi-header.png "Navbar Header")

</div>

--edit this for pbi
**Important:** you will need to change the width of the App Name container to suit the width of your app name.
You want the width to be just wide enough to contain the image without shrinking it.
Right-click on the App Name container and Edit Width.
Begin by making the container very wide (e.g. 300).
Then continue to edit the width and reduce the size of the container until it's almost touching the right side of the image, but the image is not being scaled.

:::

:::

##### Links

Links is a flexible width horizontal slicer object with all the navigation links to the different sections of your application.
-----The first item in the container is a 25px width spacer to provide padding between the app name and the first link.
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

Menu Icons is fixed width `w:30px, h:30px` image object that typically only contains the question-mark icon linking to the [About Page](/analytics/powerbi-about).
The icon is set at about `x:1030, y:5`, depending on the width of the co-branding object. The action enabled on the icon is `page navigation` with the `About` page as the destination.

Additional menu icon links may be added to the left of the question-mark icon - for example, links to a search page, app switcher, etc.
One commonly used icon is for an Advanced Filters page (see the [Filters Section](/analytics/powerbi-filters) for more information).
Guidelines for icon selection can be found in [Cashmere Foundations](/foundations/icons).
They should have the same styling with a width and height set to 50px.
Add 50px to the fixed width of the Menu Icons container for any icons added.
Contact the UX team via the `#design` Slack channel for icon png files.

:::

:::

##### Co-branding

Co-Branding is the final fixed width horizontal object set to 200px wide with a **white** `#ffffff` background.
This space allows applications to include the logo of your customer.
Ideally you'll want the horizontal version of a customer's logo with a white or transparent background.
To configure this section, you need to delete the current image object and insert the new one with the following parameters: `x:, y:, w: 200, h: 50`. 

Note that this is an optional section.
If your application does not require co-branding, click on the Co-Branding image and "Remove" or delete the object.

:::
