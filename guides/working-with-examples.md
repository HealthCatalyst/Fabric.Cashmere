# Working with Examples

Adding meaningful examples can greatly enrich the documentation of components in the Cashmere library. Here are some things to remember when creating or modifying examples.

## Examples files

The following files are used in the creation of examples for the Cashmere documentation website.

### Files you may need to modify

-   `projects/cashmere-examples/src/lib/{EXAMPLE_NAME}` - the directory containing all files for an example
-   `src/app/shared/cashmere.module.ts` - the `CashmereModule` for the documentation site, which is also used in the examples
-   `src/app/core/document-items.service.ts` - the service that associates examples with components for display on the docs site

### Files used in the build process (which you shouldn't need to modify)

-   `src/assets/docs/examples` - the output directory for StackBlitz example project files
-   `projects/cashmere-examples/src/lib/cashmere.module.ts` - if your example contains a module file, you will need to import this CashmereModule
-   `projects/cashmere-examples/src/lib/cashmere.generated.module.ts` - a generated copy of `src/app/shared/cashmere.module.ts`, used for both examples and StackBlitz
-   `projects/cashmere-examples/src/lib/example-mappings.generated.ts` - this generated file maps example names to the main component for the example, used by the `ExampleViewerComponent`
-   `projects/cashmere-examples/src/lib/examples.generated.module.ts` - the generated module file containing all the examples, imported into the documentation site for rendering the examples
-   `projects/cashmere-examples/src/project-template` - the directory containing Angular CLI project files used in the StackBlitz
-   `scripts/build-examples.ts` - the script used to generate the support files needed for the docs site and StackBlitz

## Creating a new example

_Please pay close attention to the naming conventions used here, otherwise your example may not work on the documentation site and/or StackBlitz._

1. Name the example (the [hardest part](https://bit.ly/2VI8ZI5)). Figure out what you want the title of the example to be on the documentation site.
2. Derive the example name from the example title by converting it to kebab case (for instance, if your example is titled "Format Hard Drive", the example name would be `format-hard-drive`)
3. Create a directory under `projects/cashmere-examples/src/lib/` named your example name, i.e. `projects/cashmere-examples/src/lib/format-hard-drive`
4. Create the component file `{EXAMPLE_NAME}-example.component.ts`, i.e. `projects/cashmere-examples/src/lib/format-hard-drive/format-hard-drive-example.component.ts`
5. In the example component, export the example class `{EXAMPLE_NAME}ExampleComponent`, i.e. `FormatHardDriveExampleComponent`
6. Add the corresponding HTML template file and (only if needed) the SCSS style file and register them with the component, i.e. `format-hard-drive-example.component.html`
7. Register your example with the appropriate component(s) by adding the example name to the list of examples in `src/app/core/document-items.service.ts`. For example, you may add your example to the SubNav component examples by adding it thus:
    ```
    {id: 'subnav', name: 'Subnav', examples: ['subnav-overview', 'format-hard-drive']},
    ```
8. If you are creating an example to a new Cashmere component, make sure that the corresponding module is added to `src/app/shared/cashmere.module.ts`. The example build process will use this file to generate the `CashmereModule` for both the example modules as well as the StackBlitz project.
9. Implement your example.

### Creating a more complex example

Sometimes your example needs more than a single component, such as when you are demonstrating modals. In this case you can create an example module file named `{EXAMPLE_NAME}-example.module.ts` which will declare all components used in your example. When doing this it is important to do the following in your module file:

-   Make sure the exported class name is `{EXAMPLE_NAME}ExampleModule`
-   Import both `CommonModule` from `@angular/common` and `CashmereModule` from `../cashmere.module`
-   In addition to any normal `entryComponents` you wire up (such as modal components), also include the main example component in `entryComponents`. This way the component can be created dynamically by the docs site.
