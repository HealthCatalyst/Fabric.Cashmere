##### Special Usage

In some cases, like before the application is loaded, you may want to use the progress indicators without using the angular component. To do so, import the appropriate sass file (sass/progress-spinner.scss or sass/progress-dots.scss) and use the following HTML:

```html
// for spinner
<div class="hc-spinner indeterminate-spin">
    <div class="spinner-layer spinner-blue spinner-base">
        <div class="circle base-circle"></div>
        <div class="circle-clipper left"><div class="circle"></div>
        </div><div class="gap-patch"><div class="circle"></div>
        </div><div class="circle-clipper right"><div class="circle"></div></div>
    </div>
</div>

// for dots
<div class="hc-dots-loader"><div class="loader-animate"></div></div>
```
