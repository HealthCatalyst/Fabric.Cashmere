# Getting Started

###### Last updated January 22, 2021

:::
## Step 1: Install npm dependencies.

### A) Install Cashmere.

```BASH
npm install --save @healthcatalyst/cashmere
```

### B) Install [@angular/cdk](https://material.angular.io/cdk), a required peer dependency.
*Note: Version 9.2.4 of the CDK, rather than the latest, is required for compatibility with Cashmere.*

```BASH
npm install --save @angular/cdk@9.2.4
```

### C) *(Optional)* Install additional dependencies as needed.
- [Font Awesome](https://fontawesome.com) - Recommended icon set. *(For healthcare-specific iconography, see step 3.)*
- [Open Sans](https://fonts.google.com/specimen/Open+Sans) - Recommended font.
- [Ng-select](https://github.com/ng-select/ng-select) - Needed only if using the multiselect/typeahead component.

  

```BASH
npm install --save font-awesome npm-font-open-sans @ng-select/ng-select
```
:::

:::
## Step 2: Create a Cashmere module.

### A) Create a module to hold the Cashmere components your app needs. 
This will make for a more organized code base and will help avoid duplicate references throughout your app. Place all the components in the exports field of the `@NgModule` annotation.

```typescript
import {NgModule} from '@angular/core';
import {BreadcrumbsModule, ButtonModule, CheckboxModule, IconModule} from '@healthcatalyst/cashmere';

@NgModule({
    exports: [BreadcrumbsModule, ButtonModule, CheckboxModule, IconModule]
})
export class CashmereModule {}
```

### B) Import the Cashmere module into your SharedModule.

```typescript
@NgModule({
    exports: [CommonModule, CashmereModule]
})
export class SharedModule {}
```

Anywhere you import the Shared module, Cashmere components will also be available.
:::


:::
## Step 3: Add the styles.

### A) Import baseline Cashmere styles.
The root Cashmere stylesheet need to be imported in your app's global style sheet (`src/styles.scss`).

```scss
@import "~@healthcatalyst/cashmere/scss/cashmere";
```

### B) *(Optional)* Add Font Awesome & Open Sans.
In `angular.json`, place references for each font in your project's build target options in the styles array.

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

### C) *(Optional)* Add Health Catalyst icons (`hcicons`).
If your app needs access to Health Catalyst & healthcare-specific icons, perform the following:

1. Download `hcicons` [here](
https://cashmere.healthcatalyst.net/foundations/icons) and decompress the .zip file.
2. Move the included `hcicons` folder into your app's /assets directory
3. Import the `hcicons` stylesheet in your app's global style sheet (`src/styles.scss`):
```scss
@import "assets/hcicons/style.scss";
```

:::
