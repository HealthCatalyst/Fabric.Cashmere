# Getting Started
###### Last updated February 20, 2018

:::
##### Setting up angular
The easiest way to start with Angular is to use the [Angular CLI Tool](https://github.com/angular/angular-cli). To scaffold your project structure, follow its [installation instructions](https://github.com/angular/angular-cli#installation). 

The library uses Angular 5, if you have a previous version of angular see [the update guide](https://angular-update-guide.firebaseapp.com/)
:::

:::
## Step 1. Install npm module

```BASH
npm i --save @healthcatalyst/cashmere
```

**Install peer dependencies (optional)**

```BASH
npm install --save popper.js font-awesome npm-font-open-sans
```

## Step 2. Import components/modules

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
## Step 3. Adding the styles

Now, import the SCSS file from the package in `src/styles.scss`:

```scss
/* You can add global styles to this file, and also import other style files */

@import "~@cashmere/sass/cashmere";
```
:::
