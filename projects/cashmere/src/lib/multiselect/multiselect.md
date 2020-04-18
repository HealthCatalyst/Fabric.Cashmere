##### Getting Started with ng-select

### Step 1: Install 3rd-party library.

```
npm install --save @ng-select/ng-select
```

_**NOTE:** Make sure to install the ng-select version compatible with the angular version in your app.
Details in the ([ng-select documentation]("https://github.com/ng-select/ng-select"))._


### Step 2: Import NgSelectModule and FormsModule.
```typescript
    import { NgSelectModule } from '@ng-select/ng-select';
    import { FormsModule } from '@angular/forms';

    @NgModule({
        declarations: [AppComponent],
        imports: [NgSelectModule, FormsModule],
        bootstrap: [AppComponent]
    })
    export class AppModule {}
```


### Step 3: Include the Cashmere theme.

By importing the Cashmere styles in your app's global style sheet, you'll automatically include the `ng-select` theming.
(It's likely you completed this step when installing cashmere.)

```
@import "~@healthcatalyst/cashmere/scss/cashmere";
```
