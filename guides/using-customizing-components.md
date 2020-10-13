# Customizing Components

###### Last updated August 24, 2020

:::

##### Components overview

You can use Cashmere components in a few different ways. They're built from three parts:

1.  A set of SCSS mixins defining the styles for the component, its sub-components, and different states the component can be in (like "invalid" or "loading").
1.  A set of CSS classes that import the mixins and implement them in a default way. Cashmere components don't use view encapsulation, so these CSS classes are global.
1.  An Angular component, which includes HTML markup and basic functionality.

The Angular component is not meant to fit every possible use case. Instead, it focuses on the most common, expected use cases. For example, Cashmere's button component includes various colors of buttons, link buttons, icon buttons, and split buttons, but if you want a floating action button or a button that changes its contents on hover, you'll have to build it yourself. The way components are built makes it easy to do that. You can opt in to the level of flexibility or convenience you need. From most flexible to most convenient:

-   You can import the SCSS mixins and use them in a custom stylesheet for your own component, overriding rules as needed.
-   You can import the component and use its CSS classes in the markup for your own component.
-   You can import the component and use it as-is.

All components in this documentation use the last method. For examples of the other two, see the repository [cashmere-integration-examples](https://github.com/isaaclyman/cashmere-integration-examples). It includes a vanilla HTML site that uses Cashmere via CSS classes, and a Vue app that uses Cashmere via SCSS mixins.

:::

:::

##### Style guidelines for new components

All Cashmere components should meet the following expectations:

-   The component stylesheet (e.g. `button.component.scss`) should not include any CSS rules. It should only have @import statements, CSS selectors, and @include statements. This ensures that all the component's styles can be used via mixins--none of them are bound to the component.
-   CSS selectors in the component stylesheet should be prefixed with `hc-{component name}-`. Remember that component CSS is not view-encapsulated, so good prefixing helps us avoid style collisions.
-   The mixin stylesheet (e.g. `sass/button.scss`) should not include any top-level CSS selectors. Each top-level item should be a mixin.
-   The mixin stylesheet should not include any nested CSS selectors that would make confusing assumptions about the user's HTML structure. That is, the `[disabled]` attribute selector and pseudo-selectors like `:hover` or `:after` are okay, but class or tag names like `.hc-checked` and `input` should be avoided.
-   Both stylesheets should be as flat as possible. Nesting CSS selectors in SCSS files creates extremely specific selectors which are hard to override. Cashmere should make it easy to override a style rule if needed. CSS classes can be added to component markup to avoid nesting.
-   If nesting more than 2 levels deep is unavoidable, an overridable SCSS variable (with `!default`) can be added to the mixins file to allow the user to set the rule before importing the mixins.

:::
