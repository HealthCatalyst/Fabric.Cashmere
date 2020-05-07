##### Getting Started with ng-select

### Step 1: Install 3rd-party library.

```
npm install --save @ng-select/ng-select
```

**Version Compatibility**
Make sure to install the ng-select version compatible with the angular version in your app.

| Angular| ng-select|
| ------|:------:| 
| >=9.0.0 <10.0.0 | v4.x |
| >=8.0.0 <9.0.0  | v3.x |
| >=6.0.0 <8.0.0  | v2.x |
| v5.x.x  | v1.x |


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
