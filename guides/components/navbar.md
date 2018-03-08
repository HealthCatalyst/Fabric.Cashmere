:::
##### Angular Component
``` html
<hc-navbar appIcon="./assets/CashmereAppLogo.svg" user="Christine K." [homeUri]="undefined">
    <hc-app-switcher></hc-app-switcher>
    <hc-navbar-link [active]="true" [uri]="undefined">Home</hc-navbar-link>
    <hc-navbar-link [active]="false" [uri]="undefined" exact="true">Buttons</hc-navbar-link>
    <hc-navbar-icon>
            <i class="fa fa-search fa-lg white"></i>
    </hc-navbar-icon>
    <hc-navbar-icon>
            <i class="fa fa-question-circle-o fa-lg question-pos white" [hcPopover]="options" popoverPlacement="bottom"></i>
    </hc-navbar-icon>
    <hc-navbar-menu appSwitcher="true">
        <hc-list>
            <hc-list-item routerLink="undefined" routerLinkActive="active-link">
                <span hcListLine>Home</span>
            </hc-list-item>
            <hc-list-item routerLink="undefined" routerLinkActive="active-link">
                <span hcListLine>Buttons</span>
            </hc-list-item>
        </hc-list>
        <hr>
        <hc-list>
            <a href="https://github.com/HealthCatalyst/Fabric.Cashmere">
                <hc-list-item>
                    <span hcListLine>View on GitHub</span>
                </hc-list-item>
            </a>
        </hc-list>
    </hc-navbar-menu>
</hc-navbar>

<hc-popover-content #options>
    <ul class="list-options">
        <li>
            <a href="https://www.healthcatalyst.com/" target="_blank">Health Catalyst</a>
        </li>
        <li>
            <a href="https://community.healthcatalyst.com/" target="_blank">Health Catalyst Community</a>
        </li>
        <li>
            <button (click)="aboutClick($event)">About</button>
        </li>
    </ul>
</hc-popover-content>
```

_*uri's are purposely left undefined in this example code_
:::

:::
##### App Switcher
To include the app switcher, do the following:
#### HTML
``` html
<hc-app-switcher></hc-app-switcher>
```

#### Typescript
``` typescript
@NgModule({
    imports: [
        AppSwitcherModule.forRoot({discoveryServiceUri: 'http://SERVER/DiscoveryService'})
    ],
...
```
:::

:::
##### Fixed Top
To fix the navigation bar to top of the screen, such that it stays put when your scroll, set the `fixedTop` property to true. You'll need to also add the following to your body style sheet:

``` css
body {
    padding-top: 53px;
}
```
:::

:::
##### Responsive Menu
Unlike some responsive menus that automatically pull content from the navbar into them, we intentially left ours configurable so that developers can determine what should or shouldn't be included on smaller screens. Use the `appSwitcher` property to set whether the "View all applications" button is included at the bottom of the menu. `hc-list` components should be used for the menu options with `<hr>` separators in between. See the demo code at the top of this page for an example of how to define a responsive menu for `hc-navbar`.
:::

:::
##### Navbar Component Properties
| Name | Type | Description |
| - | - | - |
|user|string|Current user|
|appIcon|string|Path to svg of app logo|
|homeUri|string|[RouterLink](https://angular.io/api/router/RouterLink) uri to home page|
|fixedTop|boolean|Statically positions the navbar to the top of the page _(See Fixed Top section above)_|
:::

:::
##### Navbar Link Properties
| Name | Type | Description |
| - | - | - |
|linkText|string|The text to display|
|active|boolean|(optional) forces active state (default = null)|
|uri|string|[RouterLink](https://angular.io/api/router/RouterLink) uri|
|exact|boolean|Sets the [RouterLinkActive](https://angular.io/api/router/RouterLinkActive#description) options to match the url exactly to set active state. (default = false)|
:::

:::
##### Navbar Menu Properties
| Name | Type | Description |
| - | - | - |
|appSwitcher|boolean|Whether to display the "View all applications" button at the bottom of the menu (default = true)|
:::
