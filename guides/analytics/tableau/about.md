# Tableau About Page

###### Last updated December 17, 2020

:::

##### Overview

The About Page is the primary source of supporting information for users about the application.
It is a standard element of every analytics accelerator, and should always be accessed by clicking the question-mark icon in the top right of the navbar.
We do **not** include open analytics accelerators with splash pages any longer.
It's a better user experience to open directly to the Summary page of the accelerator, and include all app information on this about page.

<div style="text-align:center"><br>

![About Page](./assets/analytics/tableau/aboutoverview.png "About Page")

</div>

In general, the about page should include the following (but you may adjust based on the specific needs of your accelerator):

- **Technical Details** - server, database, metadata, last updates, etc
- **Owners & Contacts** - email links to the application owners and data stewards in case a user has concerns about the data
- **Description** - an explanation of why this accelerator was created and how it works
- **What to use the app for** - a list of the suggested use cases for this accelerator
- **What NOT to use the app for** - a list of the limitations of the accelerator, and the use cases it should not be used for
- **Release Notes** - for each update to an accelerator, include a list of what enhancements have been made and what bugs have been fixed
- **Tab Descriptions** - a brief description of what can be found on each link in the navbar
- **Definitions** - a glossary of terms or calculations used within the application

:::

:::

##### Sidebar

Within the Body horizontal container, the Sidebar vertical container is used on the About page for app details.
The Sidebar should have a fixed width of 250px and a background color of **slate-gray-100** `#f0f3f6`.
Inner Padding is set to 12px on the left and right of the Sidebar container.

The first two items in the sidebar should be the name of the accelerator and the current version number.
You should be able to simply edit the text in the template.

The remaining items in the sidebar are unique to your application.
Examples are included in the template, but they may be edited or removed as needed.
The label is `Tableau Bold` with a font size of 11px and the content on the line below is `Tableau Regular` with a font size of 10px.
Each info item in the Sidebar is separated by a 25px blank spacer.

:::

:::

##### Content Area

The Content Area in the Body horizonal container has a **white** `#ffffff` background for the About Page.
The first item in Content Area vertical container is the full Health Catalyst horizontal logo, with top inner padding set to 30px.

The second item in the content area is a banner with the name of the accelerator.
You'll need to right-click on the AppName.svg image and Edit Image.
Swap the image file to the same image svg that you are using for the navbar.
All other sizing and padding for the banner should adjust automatically.

### Tabs

The next item in the content area is Tab Set horizontal container.
The styling and setup of the tabs follow the guidelines for described in the [Tabs section](/analytics/tableau-tabs).
The first tab should almost always be "About this App", where an overview of the app and usage guidelines are provided.

For the remaining tabs, you may choose what is most appropriate for your application.
The text within each tab should be set to a font of `Tableau Book`, a font-color of **offblack** `#333333`, and a font size of 10px.
Headers within the text should be set to `Tableau Bold`, font size 12px, and font color of **dark-blue** `#006d9a`.

### Pagination

If there is more text than fits onto a single page within a tab, you may incorporate pagination into your tab.
Refer to the "Definitions" tab in the template for an example of a pagination controller.
The pagination horizontal container includes Page Buttons centered with a blank spacer on either side.

<div style="text-align:center"><br>

![Pagination Controller](./assets/analytics/tableau/pagination.png "Pagination Controller")

</div>

Each button should have a 1px solid border with a color set to **slate-gray-300** `#c0c5cc`.
The text in each button should be `PAGE X` with page in uppercase letters.
The should be `Tableau Bold` with a font size of 11px.
The selected page's button should have a background color of **blue** `#00aeff` and font color of **white** `#ffffff`.
For the other page's font color, Tableau doesn't let us select a custom color, so we have to use the closest blue to our palette.
Select the blue swatch in the first row, seventh column of the color picker.

:::
