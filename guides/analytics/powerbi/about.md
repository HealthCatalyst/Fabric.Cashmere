# PowerBI About Page

###### Last updated January 13, 2021

:::

##### Overview

The About Page is the primary source of supporting information for users about the application.
It is a standard element of every analytics accelerator, and should always be accessed by clicking the question-mark icon in the top right of the navbar.
We do **not** include open analytics accelerators with splash pages any longer.
It's a better user experience to open directly to a Summary page of the accelerator (such as the Outcomes page), and include all app information on this about page.

<div style="text-align:center"><br>

![About Page](./assets/analytics/powerbi/pbi-aboutoverview.png "About Page")

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

The Sidebar vertical text box is used on the About page for app details.
The Sidebar should have a fixed width of `250px` and a background color of **slate-gray-100** `#f0f3f6`.
All items within the sidebar have about `12px` of padding on the left and right sides.

The first two items in the sidebar should be the name of the accelerator and the current version number.
You should be able to simply edit the text in the template.

The remaining items in the sidebar are unique to your application. Card visuals are used to display items that rely upon data fields (such as a last refresh date). 
Examples are included in the template, but they may be edited or removed as needed.
The label is `Segoe (Bold)` with a font size of `11px` and the content on the line below is `Segoe UI` with a font size of `10px`.
Each info item in the sidebar is separated by `25px` of blank space.

:::

:::

##### Content Area

The Content Area has a **white** `#ffffff` background for the About Page.
The first item in the Content Area is the full Health Catalyst horizontal logo, located at about `x:514, y:87` and sized at `w:463, h:146`. Scaling should be set to `normal` and the aspect lock should be set to `on`.

The second item in the content area is a banner with the name of the accelerator.
--edit with right sizing and directions You'll need to swap the image file to the same image png file that you are using for the navbar.

### Tabs

The next item in the content area is a horizontal slicer object.
The styling and setup of the tabs follow the guidelines for described in the [Tabs section](/analytics/powerbi-tabs).
The first tab should almost always be "About this App", where an overview of the app and usage guidelines are provided.

For the remaining tabs, you may choose what is most appropriate for your application.
The text within each tab should be set to a font of `Segoe UI`, a font-color of **offblack** `#333333`, and a font size of `10px`.
Headers within the text should be set to `Segoe (Bold)`, font size `12px`, and font color of **dark-blue** `#006d9a`.

### Pagination

If there is more text than fits onto a single page within a tab, you may incorporate pagination into your tab.
Refer to the "Definitions" tab in the template for an example of a pagination controller.
The pagination controller is comprised of Page Buttons horizontally aligned with each other. The text within the buttons should be vertically and horizontally aligned.

<div style="text-align:center"><br>

![Pagination Controller](./assets/analytics/tableau/pagination.png "Pagination Controller")

</div>

Each button should have a `1px` solid border with a color set to **slate-gray-300** `#c0c5cc`.
The text in each button should be `PAGE X` with page in uppercase letters.
The should be `Sego (Bold)` with a font size of `11px`.
The selected page's button should have a background color of **blue** `#00aeff` and font color of **white** `#ffffff`.
De-selected page buttons should have a background color of **white** `#ffffff` and a font color of **dark-blue** `#006d9a`.

:::
