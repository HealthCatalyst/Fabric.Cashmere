# Getting Started
###### Last updated March 10, 2018

:::
##### Setting up angular
The easiest way to start with Angular is to use the [Angular CLI Tool](https://github.com/angular/angular-cli). To scaffold your project structure, follow its [installation instructions](https://github.com/angular/angular-cli#installation).

The library uses Angular 5, if you have a previous version of angular see [the update guide](https://angular-update-guide.firebaseapp.com/)
:::

:::
##### Setting up project
#### Step 1. Install npm module

``` BASH
npm i --save @healthcatalyst/cashmere
```

#### Install peer dependencies on [popper.js](https://popper.js.org/), [font awesome](https://fontawesome.com), and [open sans](https://fonts.google.com/specimen/Open+Sans) (optional)

``` BASH
npm install --save popper.js font-awesome npm-font-open-sans
```

#### Step 2. Import components/modules

``` typescript
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
#### Step 3. Adding the styles

Now, import the SCSS file from the package in `src/styles.scss`:

``` scss
@import "~@cashmere/sass/cashmere";
```

#### Step 4. Add references to dependencies (optional)
Add a reference to popper.js in `.angular-cli.json`
``` json
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

Add a reference to font awesome ([official instructions](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/include-font-awesome.md)) and open sans by adding a reference in `src/styles.scss`

``` scss
$fa-font-path: '../node_modules/font-awesome/fonts';
@import '../node_modules/font-awesome/scss/font-awesome';

$FontPathOpenSans: "../node_modules/npm-font-open-sans/fonts";
@import '../node_modules/npm-font-open-sans/open-sans';
```
:::