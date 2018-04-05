:::
##### Angular Component

``` html
<hc-navbar appIcon="./assets/CashmereAppLogo.svg" brandIcon="./assets/TriFlame.svg" user="Christine K." [homeUri]="undefined"  [fixedTop]="false">
    <hc-app-switcher></hc-app-switcher>
    <hc-navbar-link [active]="true" [uri]="undefined">Home</hc-navbar-link>
    <hc-navbar-link [active]="false" [uri]="undefined">Buttons</hc-navbar-link>
    <hc-navbar-icon>
        <hc-icon fontSet="fa" fontIcon="fa-search"></hc-icon>
    </hc-navbar-icon>
    <hc-navbar-icon>
        <hc-icon fontSet="fa" fontIcon="fa-question-circle-o" [hcPopover]="options" popperPlacement="bottom"></hc-icon>
    </hc-navbar-icon>
    <hc-navbar-mobile-menu appSwitcher="true">
        <hc-list>
            <hc-list-item routerLink="/home" routerLinkActive="active-link">
                <span hcListLine>Home</span>
            </hc-list-item>
            <hc-list-item routerLink="/styles" routerLinkActive="active-link">
                <span hcListLine>Styles</span>
            </hc-list-item>
            <hc-list-item routerLink="/components" routerLinkActive="active-link">
                <span hcListLine>Components</span>
            </hc-list-item>
            <hc-list-item routerLink="/guides" routerLinkActive="active-link">
                <span hcListLine>Guides</span>
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
    </hc-navbar-mobile-menu>
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
##### app.module.ts

``` typescript
import { NavbarModule, PopoverModule, AppSwitcherModule, IconModule, MockAppSwitcherService, ListModule} from '@healthcatalyst/cashmere';

@NgModule({
  imports: [NavbarModule, PopoverModule, AppSwitcherModule, IconModule],
  providers: [
        {
            provide: 'IAppSwitcherService',
            useClass: MockAppSwitcherService
        }
    ]
})
export class AppModule {}
```
_*uris are purposely left undefined in this example code_
:::


::: 
##### Icon Files

[App Icon File](https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/master/docs/assets/CashmereAppLogo.svg) - Flexo font is used to generate  for `appIcon="./assets/CashmereAppLogo.svg"`

[Brand Icon File](https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/master/docs/assets/TriFlame.svg) -  `brandIcon="./assets/TriFlame.svg"`

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

To fix the navigation bar to top of the screen, such that it stays put when your scroll, set the `fixedTop` property to `true`. You'll need to also add the following to your body style sheet:

``` css
body {
    padding-top: 53px;
}
```
:::

:::
##### Responsive Menu

Unlike some responsive menus that automatically pull content from the navbar into them, we intentionally left ours configurable so that developers can determine what should or shouldn't be included on smaller screens. Use the `appSwitcher` property to set whether the "View all applications" button is included at the bottom of the menu. `hc-list` components should be used for the menu options with `<hr>` separators in between. See the demo code at the top of this page for an example of how to define a responsive menu for `hc-navbar`.
:::

:::
##### Navbar Component 

| Property | Type | Description |
| - | - | - |
|user|string|Current user|
|appIcon|string|Path to svg of app logo|
|brandIcon|string|Path to svc of brand icon|
|homeUri|string|[RouterLink](https://angular.io/api/router/RouterLink) uri to home page|
|fixedTop|boolean|Statically positions the navbar to the top of the page _(See [Fixed Top](#fixedtop))_|

<br><br>

##### Children 

- `<hc-app-switcher>` - Enables app switcher when the app logo is clicked
- `<hc-navbar-link>` - Primary navigation links
- `<hc-navbar-icon>` - Secondary actions mainly displayed as icons
- `<hc-navbar-mobile-menu>` - Enables a mobile menu when the browser width is smaller than a defined breakpoint (default: 768px)
:::

:::
##### Navbar Link

| Property | Type | Description |
| - | - | - |
|linkText|string|The text to display. This can also optionally be the contents within the element|
|active|boolean|(optional) forces active state (default = null)|
|uri|string|[RouterLink](https://angular.io/api/router/RouterLink) uri|
|exact|boolean|Sets the [RouterLinkActive](https://angular.io/api/router/RouterLinkActive#description) options to match the url exactly to set active state. (default = false)|
:::

:::
##### Navbar Link

No properties, just used for positioning
:::

:::
##### Navbar Mobile Menu

List of links built within the list component. See list component for details
:::