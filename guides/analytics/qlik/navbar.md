# Qlik Navbar

###### Last updated February 24, 2021

:::

##### Overview

![Navbar Example](./assets/analytics/qlik/qlik-navbar.png "Navbar Example")

The navbar is one of the most distinguishing elements of a Cashmere application.
It is a hallmark of the Health Catalyst app brand on all platforms.
For this reason, the styling of the navbar should not be altered from the template.

The Navbar is formatted accordingly:
- **Background**: charcoal-blue `#384655 RGB(56,70,85)`
- **Type**: horizontal text object
- **Height**: `50px`
- **Position**: x:0, y:0

:::

:::

##### Brand

Brand is an image of the [Health Catalyst tri-flame](/foundations/logo) formatted as follows:
- **Background**: blue `#00aeff RGB(0,174,255)`
- **Type**: image
- **Height**: 50px
- **Width**: 50px
- **Position**: x:0, y:0

:::

:::

##### App Name

App Name is the second fixed-width image object in the navbar, also containing one PNG image, fomatted with the following values:

- **Type**: image
- **Height**: 50px
- **Position**: To the right of the logo (~65px) and centered vertically within the Navbar
- **Image stretch**: Keep Aspect
- **Text margin**: 2pt

The image is the name of your application in the Flexo font (so the font isn't needed).
To obtain a PNG for your application, contact the UX team via the `#design` Slack channel.

Edit the `AppName.png` image object and swap the image file with the one for your application.

**Important:** you will need to adjust the width of your app name image.
You want the width to be just wide enough to contain the image without shrinking it.
Begin by making the image very wide (e.g. 300).
Then continue to edit the width and reduce the size of the container until it's almost touching the right side of the image, but the image is not being scaled.

:::

:::

##### Links

Links is a flexible series of horizontal text objects that contain page navigation actions to the different sections of your application. Utilizing actions turns the text objects into button objects. These buttons have the following values:

- **Background**: None
- **Border**: None
- **Type**: text object with actions
- **Height**: 35px
- **Weidth**: 100px
- **Font alignment**: horizontally centered
- **Position**: To the right of the logo, with vertical sides touching, and centered vertically within the Navbar
- **Image stretch**: Keep Aspect
- **Font color**: white `#ffffff RGB(255,255,255)`
- **Text margin**: 2pt

Additionally, there is a floating line item called `Selected Highlight` that should be positioned under the selected item.
The y position of that item should always be set to the bottom of the selected item, but the x position should match the x position of the selected item.
The width of the selected highlight item should also match the selected text object item.

![Selected Link](./assets/analytics/qlik/qlik-selected.png "Selected link")

Text indicating a selection has been made is formatted differently than the rest of the text within Links
- **Font (selected)**: Arial (Bold), 10pt
- **Font (unselected)**: Arial, 10pt

:::

:::

##### Menu Icons

Menu Icons is fixed width horizontal text object that typically only contains the question-mark icon linking to the [About Page](/analytics/qlik-about).
There is about 15px of padding before the co-branding space.

Additional menu icon links may be added to the left of the question-mark icon - for example, links to a search page, app switcher, etc.
One commonly used icon is for an Advanced Filters page (see the [Filters Section](/analytics/qlik-filters) for more information).
Guidelines for icon selection can be found in [Cashmere Foundations](/foundations/icons).

Contact the UX team via the `#design` Slack channel for icon images if they aren't in the ASO repository.

:::

:::

##### Co-branding

Co-Branding is the final fixed width horizontal container set to 200px wide with a **white** `#ffffff RGB(255,255,255)` background.
This space allows applications to include the logo of your customer.
Ideally you'll want the horizontal version of a customer's logo with a white or transparent background.
To configure this section, you should only have to Edit the Image and swap the file.
It should automatically resize to fit best within the container.

Note that this is an optional section.
If your application does not require co-branding, right-click on the Co-Branding container and "Remove" from the dashboard.

:::
