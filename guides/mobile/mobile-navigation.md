# Mobile Navigation

###### Last updated November 17, 2021

:::

##### User Context

*Occasionally I need to be able to access my Health Catalyst applications from my phone while I’m away from my desk.  I need to be able to easily navigate to the sections I’m interested in from a small-screen, touch-based interface.  I don’t want to have to do a lot of zooming in/out or have important sections of the app unavailable to me.*

:::

:::

##### Explanation

Navigation is among the most central pieces of functionality that a web app should deliver smoothly for users. Users should always know where they can go and how to get there. Within Cashmere, navigation components also constitute the central element of our branding. But translating the navigation of a desktop web app to smaller screens can be a challenge with limited visual real estate, and the need to prioritize content over navigation elements.

The following navigation patterns are suggested for Cashmere applications. The UX is described below, and any setup required is included in the **How to Use** section.

### Priority Navigation

Within the [standard Cashmere navbar](https://cashmere.healthcatalyst.net/web/components/navbar/), a developer may add as many links as needed with no character limits on the names of those links.  But there is no guarantee that a user will always be running the application in a browser window wide enough to display them all. Cashmere progressively trims the available navigation options before entirely collapsing the menu on the smallest screens. The navbar will automatically collect all navigation options that fall outside of the visible area into a "More" dropdown.

<br>

![Mobile Navigation More Menu](./assets/guides/mobile-navigation-more.jpg "Mobile Navigation More Menu")

<br>

The "More" menu will always collect the rightmost elements first, so care should be given to the ordering of items in your navbar.  The highest priority, most-used items should be included first so they have the least chance of dropping into the "More" menu. Additionally, the Cashmere navbar supports developer-created dropdown menus.  These can be used to create a leaner navbar and by grouping similar items together.

<br>

![Mobile Navigation Dropdown](./assets/guides/mobile-navigation-dropdown.jpg "Mobile Navigation Dropdown")

### Hamburger Menu

When the Cashmere navbar reaches the `md` breakpoint (visit the [responsive breakpoints](https://cashmere.healthcatalyst.net/web/mobile/responsive-breakpoints/) page for more information), the screen is small enough that the navigation experience needs to be further collapsed to optimize for the available space. At that point, all navigation links are collected into a "hamburger" menu – so called because the button to trigger the menu looks like a hamburger (if you’re feeling particularly hungry). The hamburger menu allows for a high degree of customization within Cashmere and gives the developer the freedom to decide what navigation items they would like to include for smaller screens.

<br>

![Hamburger Menu](./assets/guides/mobile-navigation-hamburger.jpg "Hamburger Menu")

<br>

Although all the navigation links collapse to the hamburger menu, the app may still display a collection of navigation icons on the right side of the navbar.  This is useful if the developer would like to preserve a few extremely high priority navigational elements outside of the hamburger menu (i.e. search, create new, settings, etc).

### Secondary Navigation

Often pages of a web application feature secondary navigation to child pages.  In a desktop environment, a user might use tabs or other UI elements to navigate to those child pages.  In a small screen environment with limited horizontal real estate, a common pattern leveraged in Cashmere applications is to switch from tabs to a Select component in a Subnav for secondary navigation. The Select component serves both as a navigation control as well as an indicator of the current page.

<br>

![Mobile Secondary Navigation](./assets/guides/mobile-navigation-secondary.jpg "Mobile Secondary Navigation")

:::

:::

##### How to Use

All `<hc-navbar-link>` and `<hc-navbar-dropdown>` elements will automatically be collected into the "More" menu based on the browser width. However, in situations where links are added dynamically or triggered with `*ngIf` statements, the app may need to force the navbar to recalculate widths after all elements are finished rendering. To do so, include a reference to the navbar and call its associated `refreshNavLinks()` function.

### Navbar Dropdowns

To group navigation elements into a dropdown menu, use the `<hc-navbar-dropdown>`. As mentioned above, dropdown menus will automatically be collected into the "More" menu if they fall outside the bounds of the browser width. The content of a dropdown may be anything that would fit in a popover, but most typically it uses the `hcMenu` directive:

```
<hc-navbar-dropdown linkText="Reports">
    <div hcMenu>
        <button hcMenuItem>
                <hc-icon hcMenuIcon fontSet="fa-solid" fontIcon="fa-building-columns"></hc-icon>
                <span hcMenuText>Finance</span>
        </button>
        <button hcMenuItem>
            <hc-icon hcMenuIcon fontSet="fa-solid" fontIcon="fa-scale-balanced"></hc-icon>
            <span hcMenuText>Legal</span>
        </button>
        <button hcMenuItem>
            <hc-icon hcMenuIcon fontSet="fa-solid" fontIcon="fa-hospital"></hc-icon>
            <span hcMenuText>Clinical</span>
        </button>
    </div>
</hc-navbar-dropdown>
```

### Hamburger Menu

Unlike the "More" menu, the hamburger menu requires some setup. This was done intentionally to give the developer additional control over the options to be displayed in the menu and how they should be displayed. The hamburger menu is defined within the `<hc-navbar>` tag using the `<hc-navbar-mobile-menu>` element. Navigation links are grouped using `<hc-list>`, and dividers between groups may added using `<hr>`.

Additionally, if the [Cashmere app switcher](https://cashmere.healthcatalyst.net/web/components/navbar/usage?section=app-switcher&selected=navbar) is being used in the navbar, you may add the `<hc-app-switcher-links>` element to automatically populate the available apps from the app switcher.

```
<hc-navbar-mobile-menu>
    <hc-list>
        <hc-list-item routerLink="" routerLinkActive="active-link"><span hcListLine>Home</span></hc-list-item>
        <hc-list-item routerLink="" routerLinkActive="active-link"><span hcListLine>Oncology</span></hc-list-item>
        <hc-list-item routerLink="" routerLinkActive="active-link"><span hcListLine>Surgery</span></hc-list-item>
    </hc-list>
    <hr>
    <hc-list>
        <a href="">
            <hc-list-item><span hcListLine>View on GitHub</span></hc-list-item>
        </a>
    </hc-list>
    <hc-app-switcher-links></hc-app-switcher-links>
</hc-navbar-mobile-menu>
```

### Secondary Navigation

After the `<hc-navbar>`, secondary navigation can be implemented using the `<hc-subnav>` and `<hc-select>` elements. The subnav typically has its `fixedTop` param set to true, and its `display` style is set to `none` until the `md` breakpoint is reached. To trigger page navigation, one option is to use a `change` event on the select control which calls the `navigate()` function of an Angular `Router` object.

```
<hc-subnav class="responsive-subnav" fixedTop="true">
    <span>Label Name: </span>
    <span>
        <hc-select (change)="handleNavigation($event)">
            <option value="pageOne">Page One</option>
            <option value="pageTwo">Page Two</option>
        </hc-select>
    </span>
</hc-subnav>
```

:::

:::

##### Next Steps

- [Basic Patterns For Mobile Navigation: Pros And Cons, Smashing Magazine](https://www.smashingmagazine.com/2017/05/basic-patterns-mobile-navigation/)
- [The Priority+ Navigation Pattern, CSS Tricks](https://css-tricks.com/the-priority-navigation-pattern/)
- [Cashmere Navbar](https://cashmere.healthcatalyst.net/web/components/navbar/)
- [Understanding Navigation, Material Design](https://material.io/design/navigation/understanding-navigation.html)

:::
