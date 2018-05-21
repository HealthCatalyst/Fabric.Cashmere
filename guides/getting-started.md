# Getting Started

###### Last updated March 10, 2018

:::

##### Setting up angular

The easiest way to start with Angular is to use the [Angular CLI tool](https://github.com/angular/angular-cli). To scaffold your project structure, follow its [installation instructions](https://github.com/angular/angular-cli#installation).

The library uses Angular 5, if you have a previous version of angular see [the update guide](https://angular-update-guide.firebaseapp.com/)

#### Use scss style preprocessing

When you are creating your project with angular cli try this:

`ng new My_New_Project --style=scss`

This generating all your components with predifined scss files.

If you are changing your existing style in your project

`ng set defaults.styleExt scss`

Cli handles the rest of it.
The library uses Angular 5. If you have a previous version of angular, see [the Angular update guide](https://angular-update-guide.firebaseapp.com/).
:::

:::

##### Setting up the project

#### Step 1. Install the npm module.

```BASH
npm i --save @healthcatalyst/cashmere
```

#### Install peer dependencies on [Popper.js](https://popper.js.org/), [Font Awesome](https://fontawesome.com), and [Open Sans](https://fonts.google.com/specimen/Open+Sans) (optional).

```BASH
npm install --save popper.js font-awesome npm-font-open-sans
```

#### Step 2. Import the components/modules.

```typescript
import { ButtonModule } from '@healthcatalyst/cashmere';

@NgModule({
    imports: [
        ...,
    ButtonModule,
    ],
    declarations: [...],
    exports: [..]
})
export class SomeModule { }
```

#### Step 3. Add the styles.

Import the SCSS file from the package in `src/styles.scss`.

```
@import "~@healthcatalyst/cashmere/cashmere";
```

#### Step 4. (Optional) Add references to dependencies.

Add a reference to Popper.js in `.angular-cli.json`.

```json
{
    ...
    "apps": [
        {
            ...
            "scripts": [
                "../node_modules/popper.js/dist/umd/popper.min.js"
            ]
            ...
        }
    ]
    ...
}
```

Add a reference to Font Awesome ([official instructions](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/include-font-awesome.md)) and Open Sans by adding references in `src/styles.scss`.

```scss
$fa-font-path: '../node_modules/font-awesome/fonts';
@import '../node_modules/font-awesome/scss/font-awesome';

$FontPathOpenSans: '../node_modules/npm-font-open-sans/fonts';
@import '../node_modules/npm-font-open-sans/open-sans';
```

:::
