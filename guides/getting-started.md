# Getting Started

###### Last updated Mar 20, 2025

:::
## Step 1: Install npm dependencies.

### A) Install Cashmere and the Angular CDK

```BASH
npm install --save @healthcatalyst/cashmere @angular/cdk
```

### B) *(Optional)* Install additional dependencies as needed.
- [Noto Sans](https://fonts.google.com/specimen/Noto+Sans) - Recommended font.
- [Ng-select](https://github.com/ng-select/ng-select) - Needed only if using the multiselect/typeahead component. Look [here](https://github.com/ng-select/ng-select) for which version of ng-select to install based on your Angular version.
- [Ngx-slider](https://www.npmjs.com/package/@angular-slider/ngx-slider) - Needed only if using the slider component.


```BASH
npm install --save notosans-fontface @ng-select/ng-select @angular-slider/ngx-slider
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
    imports: [CashmereModule],
    exports: [CommonModule, CashmereModule]
})
export class SharedModule {}
```

Anywhere you import the Shared module, Cashmere components will also be available.
:::


:::
## Step 3: Add the styles.

### A) Import baseline Cashmere styles.
The root Cashmere stylesheet needs to be imported in your app's global style sheet (`src/styles.scss`).

```scss
@import "@healthcatalyst/cashmere/scss/cashmere";
```

### B) *(Optional)* Add Font Awesome & Noto Sans.
In `angular.json`, place references for each font in your project's build target options in the styles array.

```json
"projects": {
    "<ProjectName>": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "styles": [
                "./node_modules/notosans-fontface/css/notosans-fontface-allweight.css",
                "src/styles.scss" // your app's global stylesheet
            ]
          }
        }
      }
    }
  }
```

### C) *(Optional)* Add Health Catalyst icons (`hcicons2`).
If your app needs access to the [Health Catalyst icon font](/foundations/icons), add the following to your app's global style sheet (`src/styles.scss`):

```scss
@import "@healthcatalyst/cashmere/hcicons2/hcicons2";
```

<span class="icon-bullhorn hc-icon-left"></span>Note: The recommended approach is to hand pick only needed icons and [generate your own icon font](./foundations/icons/#webAppUsage), but direct reference as illustrated above is available as a fallback approach.

:::
