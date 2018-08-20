# Help Menu Guide

###### Last updated August 6, 2018

:::

##### Overview

All Health Catalyst apps should include a help menu in their navbar. This guide provides a standard menu for the content that should appear in that menu. A standard menu provides users with a consistent experience—they know what to expect from Health Catalyst applications. It also gives them the support and information they need to use the app.
:::

:::

##### How to include in the navbar

Using the `hc-navbar` component, the help menu is included as a `hc-navbar-icon` that stays pinned to the right side and triggers a popover:

```
<hc-navbar-icon>
    <hc-icon fontSet="fa" fontIcon="fa-question-circle-o"
        [hcPopover]="helpMenu" popperPlacement="bottom"></hc-icon>
</hc-navbar-icon>
```

:::

:::

##### What items should go in the menu?

You may not have all these items available. However, include what you have in this order:

*   **Help Topics** (if available—reach out to the Content Team for support)
*   **Release Notes** (if applicable, again reach out to the Content Team for support)
*   **About** (a modal containing app reference information - see the [associated style page](https://cashmere.healthcatalyst.net/styles/about) for guidelines)
*   **Health Catalyst Community** (link to community space specific to the app)
*   **Send us your feedback** (see the [User Feedback Guide](https://cashmere.healthcatalyst.net/guides/user-feedback))

:::

:::

##### Example Popover

The following example includes all of the above elements:

```
<hc-popover-content #helpMenu>
    <ul class="list-options">
        <li>
            <a href="" target="_blank">Help Topics</a>
        </li>
        <li>
            <a href="" target="_blank">Release Notes</a>
        </li>
        <li>
            <button (click)="aboutClick($event)">About</button>
        </li>
        <li>
            <a href="https://community.healthcatalyst.com/" target="_blank">Health Catalyst Community</a>
        </li>
        <li>
           <button (click)="feedbackClick($event)">Send us your feedback</button>
        </li>
    </ul>
</hc-popover-content>
```

:::
