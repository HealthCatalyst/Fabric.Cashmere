##### Getting Started with hc-slider

### Step 1: Install 3rd-party library.

```
npm install --save @angular-slider/ngx-slider
```


### Step 2: Import NgxSliderModule.
```typescript
    import { NgxSliderModule } from '@angular-slider/ngx-slider';

    @NgModule({
        declarations: [AppComponent],
        imports: [NgxSliderModule],
        bootstrap: [AppComponent]
    })
    export class AppModule {}
```


### Step 3: Wrap your ngx-select element in an hc-slider element.

This will ensure the correct Cashmere theme is being applied.

```
<hc-slider>
    <ngx-slider></ngx-slider>
</hc-slider>
```

&nbsp;

##### Things to Look Out For

The `valid` and `required` properties are set on `hc-slider`. But `disabled` is set in the options passed to the `ngx-slider`.
See the Range Slider example for a demo of how to toggle the disabled state.
Any time options are changed, you need to pass a new `Options` object to the slider.
