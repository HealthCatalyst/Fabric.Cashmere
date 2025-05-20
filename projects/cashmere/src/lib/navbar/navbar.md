##### Mobile Development Guide

For information on configuring the navbar for responsive web applications, refer to the [mobile development guide](https://cashmere.healthcatalyst.net/web/mobile/mobile-navigation).

##### Help Menu

All Health Catalyst apps should include a help menu in their navbar. This guide provides a standard menu for the content that should appear in that menu. A standard menu provides users with a consistent experience—they know what to expect from Health Catalyst applications. It also gives them the support and information they need to use the app. The help menu is included as a `hc-navbar-icon` that stays pinned to the right side and triggers a popover:

```html
<hc-navbar-icon>
    <hc-icon fontIcon="icon-help" [hcPop]="helpMenu"></hc-icon>
</hc-navbar-icon>
```

&nbsp;

##### What items should go in the help menu?

You may not have all these items available. However, include what you have in this order:

-   [icon-book] **Read the docs** (link to the [docs site](https://www.healthcatalyst.com/docs/) or your help docs repository on HCC)
-   [icon-lightbulb] **Request a feature** (link to your feature request page on Health Catalyst Community)
-   [icon-users] **Ask the community** (link to your Q&A page on Health Catalyst Community)
-   [icon-bullhorn] **Find out what's new** (link to your release notes on Health Catalyst Community)
-   [icon-bug] **Report an issue** (link to open a new ticket on the Support Portal)
-   [icon-comments] **Send feedback** (see the [User Feedback Guide](https://cashmere.healthcatalyst.net/web/components/typeform-survey/examples))
-   [icon-info] **About** see the [associated style page](https://cashmere.healthcatalyst.net/foundations/about) for guidelines)

```html
<hc-pop #helpMenu [autoCloseOnContentClick]="true" [showArrow]="false" horizontalAlign="end">
    <div hcMenu>
        <a hcMenuItem href="http://example.com" target="_blank">
            <hc-icon hcMenuIcon fontSet="fa-solid" fontIcon="icon-book"></hc-icon>
            <span hcMenuText>Read the docs</span>
        </a>
        <a hcMenuItem href="http://example.com" target="_blank">
            <hc-icon hcMenuIcon fontSet="fa-solid" fontIcon="icon-lightbulb"></hc-icon>
            <span hcMenuText>Request a feature</span>
        </a>
        <a hcMenuItem href="http://example.com" target="_blank">
            <hc-icon hcMenuIcon fontSet="fa-solid" fontIcon="icon-users"></hc-icon>
            <span hcMenuText>Ask the community</span>
        </a>
        <a hcMenuItem href="http://example.com" target="_blank">
            <hc-icon hcMenuIcon fontSet="fa-solid" fontIcon="icon-bullhorn"></hc-icon>
            <span hcMenuText>Find out what's new</span>
        </a>
        <a hcMenuItem href="http://example.com" target="_blank">
            <hc-icon hcMenuIcon fontSet="fa-solid" fontIcon="icon-bug"></hc-icon>
            <span hcMenuText>Report an issue</span>
        </a>
        <a hcMenuItem href="http://example.com" target="_blank">
            <hc-icon hcMenuIcon fontSet="fa-solid" fontIcon="icon-comments"></hc-icon>
            <span hcMenuText>Send feedback</span>
        </a>
        <div hcMenuItem hcDivider></div>
        <button hcMenuItem>
            <hc-icon hcMenuIcon fontSet="fa-solid" fontIcon="icon-info"></hc-icon>
            <span hcMenuText>About</span>
        </button>
    </div>
</hc-pop>
```

&nbsp;

##### App Switcher

In addition to the help menu, all Heath Catalyst applications should also include the app switcher in their navbar to the left of the help menu.
For examples and information on adding and configuring the app switcher, visit the [App Switcher component](https://cashmere.healthcatalyst.net/web/components/app-switcher) page.
