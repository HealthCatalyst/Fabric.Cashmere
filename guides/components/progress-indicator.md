:::
##### Angular Component
``` html
    <hc-progress-spinner
        [diameter]="50"
        [color]="blue"
        [hasChannel]="true"
        [isCentered]="true"
        [isDeterminate]="true"
        [progress]="25"></hc-progress-spinner>

    <hc-progress-dots
        [color]="dotsColor"
        [isMini]="dotsMini"
        [isCentered]="dotsCentered"></hc-progress-dots>
```
:::

:::
##### Special Usage
In some cases, like before the application is loaded, you may want to use the progress indicators without using the angular component. To do so, import the appropriate sass file (`sass/progress-spinner.scss` or `sass/progress-dots.scss`) and use the following HTML:

``` html
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
:::

:::
##### Progress Spinner Properties
| Name | Type | Description |
| - | - | - |
|diameter|Number|Set the diameter of the circle, in pixels. Minimum is 20, maximum is 250.|
|color|string|`'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray' | 'white'`|
|hasChannel|boolean|If true, include background "channel" circle|
|isCentered|boolean|If true, the spinner will center itself inside its container|
|isDeterminate|boolean|If true, switches to determinate mode. Must pass in `progress` (0-100%), instead of having the loader spin freely.|
|progress|Number|(0-100%) Only used if `isDeterminate` is set to true.|
:::

:::
##### Progress Dots Properties
| Name | Type | Description |
| - | - | - |
|color|string|`'light' | 'dark'` Use a light or dark version, depending on your background.|
|isMini|boolean|If true, you'll get a teeny tiny little loader.|
|isCentered|boolean|If true, the loader will center itself inside its container|
:::
