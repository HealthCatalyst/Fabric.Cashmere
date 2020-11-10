# Working with Examples

###### Last updated September 21, 2019

:::

##### Overview

Adding meaningful examples can greatly enrich the documentation of components in the Cashmere library. Here are some things to remember when creating or modifying examples.

:::

:::

##### Creating a new example

From the root of the Cashmere repository, run `npm run new:example`. This will start an interactive prompt to gather all the information needed to create your example.

_Please don't mess with any of the generated names in the files, otherwise your example may not work on the documentation site and/or StackBlitz._

:::

:::

##### Example files

The following files are used in the creation of examples for the Cashmere documentation website.

### Files you may need to modify

-   `projects/cashmere-examples/src/lib/{EXAMPLE_NAME}` - the directory containing all files for an example
-   `src/app/shared/cashmere.module.ts` - the `CashmereModule` for the documentation site, which is also used in the examples
-   `src/app/core/cashmere-components-document-items.json` or `src/app/core/cashmere-bits-document-items.json` - the documentation metadata files

### Files used in the build process (which you shouldn't need to modify)

-   `src/assets/docs/examples` - the output directory for StackBlitz example project files
-   `projects/cashmere-examples/src/lib/cashmere.module.ts` - if your example contains a module file, you will need to import this CashmereModule
-   `projects/cashmere-examples/src/lib/cashmere.generated.module.ts` - a generated copy of `src/app/shared/cashmere.module.ts`, used for both examples and StackBlitz
-   `projects/cashmere-examples/src/lib/example-mappings.generated.ts` - this generated file maps example names to the main component for the example, used by the `ExampleViewerComponent`
-   `projects/cashmere-examples/src/lib/examples.generated.module.ts` - the generated module file containing all the examples, imported into the documentation site for rendering the examples
-   `projects/cashmere-examples/src/project-template` - the directory containing Angular CLI project files used in the StackBlitz
-   `scripts/build-examples.ts` - the script used to generate the support files needed for the docs site and StackBlitz

:::
