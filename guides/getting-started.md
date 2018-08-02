# Getting Started

###### Last updated August 2, 2018

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

#### Step 2. Create a module to hold Cashmere components.

Create a module that will hold the Cashmere components that your app will need. Place all the components in the exports field of the NgModule annotation.

```typescript
import {NgModule} from '@angular/core';
import {BreadcrumbsModule, ButtonModule, CheckboxModule, IconModule} from '@healthcatalyst/cashmere';

@NgModule({
    exports: [BreadcrumbsModule, ButtonModule, CheckboxModule, IconModule]
})
export class CashmereModule {}
```

_By creating a module that holds all of Cashmere's components you will keep things more organized and you won't have references throughout your code base for the same components._

Now what you can do is import the Cashmere module into your SharedModule.

```typescript
@NgModule({
    exports: [CommonModule, CashmereModule]
})
export class SharedModule {}
```

Anywhere you import the Shared module, all of the Cashmere components will be made available to you.

#### Step 3. Add the styles.

Import baseline scss file into your app's global style sheet `(src/styles.scss)`

```
@import "~@healthcatalyst/cashmere/scss/cashmere";
```

#### Step 4. Add references to dependencies.

Add a reference to Popper.js to scripts option within `angular.json`.

```json
"projects": {
    "<ProjectName>": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "scripts": [
                "../node_modules/popper.js/dist/umd/popper.js"
            ]
          }
        }
      }
    }
  }
```

Add a reference to Font Awesome ([official instructions](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/include-font-awesome.md)) and Open Sans by adding it via the styles option inside your project's build target options in `angular.json`

```json
"projects": {
    "<ProjectName>": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "styles": [
                "../node_modules/font-awesome/css/font-awesome.css",
                "../node_modules/npm-font-open-sans/open-sans.css",
                "src/styles.scss"
            ]
          }
        }
      }
    }
  }
```

:::
