# Customizing Components

###### Last updated October 10, 2018

:::

##### Components overview

_WARNING: This document refers to the future of Cashmere, not the present. We're currently working to rebuild Cashmere in the way described below._

You can use Cashmere components in a few different ways. They're built from three parts:

1.  A set of SCSS mixins defining the styles for the component, its sub-components, and different states the component can be in (like "invalid" or "loading").
1.  A set of CSS classes that import the mixins and implement them in a default way. Cashmere components don't use view encapsulation, so these CSS classes are global.
1.  An Angular component, which includes HTML markup and basic functionality.

The Angular component is not meant to fit every possible use case. Instead, it focuses narrowly on the most common, expected use cases. For example, Cashmere's button component includes colored buttons, link buttons, icon buttons, and split buttons, but if you want a floating action button or a button that changes its contents on hover, you'll have to build it yourself. The way components are built makes it easy to do that. You can opt in to the level of flexibility or convenience you need. From most flexible to most convenient:

-   You can import the SCSS mixins and use them in a custom stylesheet for your own component.
-   You can import the component and use its CSS classes in the markup for your own component.
-   You can import the component and use it as-is.

:::

:::

##### Converting existing components

As we convert existing components to the described structure, we follow this process:

#### Step 1. Prepare files.

Find the component stylesheet called `{component-name}.component.scss`. Create a SCSS file under `cashmere/src/lib/sass` that follows the format `{component-name}.scss`, e.g. `button.scss`.

**button.component.scss:**

```sass
.hc-checkbox {
    border: 1px solid slategray;

    input {
        background-color: white;

        &:checked {
            background-color: blue;
        }
    }

    &[disabled] input {
        background-color: lightgray;
    }

    .hc-label {
        color: slategray;
    }
}
```

**button.scss:**

```sass
// Nothing here yet
```

#### Step 2. Copy styles.

Copy all component styles into the new SCSS file.

**button.component.scss:**

```sass
// Now empty
```

**button.scss:**

```sass
.hc-checkbox {
    border: 1px solid slategray;

    input {
        background-color: white;

        &:checked {
            background-color: blue;
        }
    }

    &[disabled] input {
        background-color: lightgray;
    }

    .hc-label {
        color: slategray;
    }
}
```

#### Step 3. Move selectors.

Copy the class and element CSS selectors back to the component stylesheet, but leave them as empty rules.

**button.component.scss:**

```sass
.hc-checkbox {
    input {
        &:checked {}
    }

    &[disabled] input {}

    .hc-label {}
}
```

**button.scss:**

```sass
.hc-checkbox {
    border: 1px solid slategray;

    input {
        background-color: white;

        &:checked {
            background-color: blue;
        }
    }

    &[disabled] input {
        background-color: lightgray;
    }

    .hc-label {
        color: slategray;
    }
}
```

#### Step 4. Create mixins.

Replace the CSS selectors in the new stylesheet with mixin declarations, flattening the structure as you go. Follow the Cashmere CSS class naming convention for the mixins: `{company-scope}-{block-modifier}-{element}`.

**button.scss:**

```sass
@mixin hc-checkbox() {
    border: 1px solid slategray;
}

@mixin hc-checkbox-input() {
    background-color: white;
}

@mixin hc-checkbox-input-checked() {
    background-color: blue;
}

@mixin hc-checkbox-input-disabled() {
    background-color: lightgray;
}

@mixin hc-checkbox-label() {
    color: slategray;
}
```

#### Step 5. Implement mixins.

Use the mixins in the component stylesheet. Flatten the structure where possible, keeping in mind that the stylesheet is not encapsulated.

**button.component.scss:**

```sass
@import '../sass/button.scss';

.hc-checkbox {
    @include hc-checkbox();

    input {
        @include hc-checkbox-input();

        &:checked { @include hc-checkbox-input-checked(); }
    }

    &[disabled] input {
        @include hc-checkbox-input-disabled();
    }
}

.hc-label { @include hc-checkbox-label(); }
```

#### Step 6. Review your code.

Build the documentation and ensure that the component looks the same as it did before. Make sure it meets the following expectations:

-   The component stylesheet should not include any CSS declarations. It should only have @import statements, CSS selectors, and @include statements. This ensures that all the component's styles can be used via mixins--none of them are bound to the component.
-   The mixin stylesheet should not include any top-level CSS selectors. Each top-level item should be a mixin.
-   The mixin stylesheet should not include any nested CSS selectors that would make confusing assumptions about the user's HTML structure. That is, the `[disabled]` attribute selector and pseudo-selectors like `:hover` or `:after` are okay, but class or tag names like `.hc-checked` and `input` should be avoided.
-   Both stylesheets should be as flat as possible. Nesting CSS selectors in SCSS files creates extremely specific selectors, which are hard to override. Cashmere should make it easy to override a style rule if needed. CSS classes can be added to component markup to avoid deep nesting.
-   If nesting more than 2 levels deep is unavoidable, an overridable SCSS variable (with `!default`) can be added to the mixins file to allow the user to set the rule before importing the mixins.

:::
