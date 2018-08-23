# Source Code Naming Conventions

###### Last updated August 22, 2018

:::

##### Overview

For the highest degree of consistency across the library, the naming conventions below should be followed when creating new components or classes. This will reduce the effort needed to read and understand code from multiple contributors to the library.
:::

:::

##### CSS Classes

The following general format should be followed when naming classes:

`{company-scope}-{block-modifier}-{element}`

*   {company scope} scopes all of our css to our company
*   {block modifier} is an element that can standalone within our company scope
*   {element} is element that can't standalone and requires the block modifier

&nbsp;

Example class name: `.hc-form-field-label-wrapper`

*   **company-scope**: hc
*   **block-modifier**: form-field (component name)
*   **element**: label-wrapper (css put on element within the component)

:::

:::

##### Angular Components

Components typically have a one word name following generally accepted descriptions of the item you are creating. If you're looking for examples of how similar elements are named, [Google's Material Design](https://material.io/develop/web/) system is a good baseline. If multiple words are needed in the name, they should be separated by a hyphen ("-") in their filename.

Class names should be written as follows:

`{component-name}-{component-type}`

*   **component-name**: Same as the file name; upper camel case should be used for component definitions with multiple words ("RadioButton")
*   **component-type**: "Component", "Directive", etc

&nbsp;

Below is an example of component naming following the above rules:

*   Filename: `app-switcher.component.ts`
*   Class name: `AppSwitcherComponent`

:::
