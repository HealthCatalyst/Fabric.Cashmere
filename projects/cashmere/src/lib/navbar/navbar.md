##### Help Menu

All Health Catalyst apps should include a help menu in their navbar. This guide provides a standard menu for the content that should appear in that menu. A standard menu provides users with a consistent experience—they know what to expect from Health Catalyst applications. It also gives them the support and information they need to use the app. The help menu is included as a `hc-navbar-icon` that stays pinned to the right side and triggers a popover:

```html
<hc-navbar-icon>
    <hc-icon fontSet="fa" fontIcon="fa-question-circle-o" [hcPop]="helpMenu"></hc-icon>
</hc-navbar-icon>
```

&nbsp;

##### What items should go in the help menu?

You may not have all these items available. However, include what you have in this order:

- [fa-book] **Read the docs** (link to the [docs site](https://www.healthcatalyst.com/docs/) or your help docs repository on HCC)
- [fa-lightbulb] **Request a feature** (link to your feature request page on Health Catalyst Community)
- [fa-users] **Ask the community** (link to your Q&A page on Health Catalyst Community)
- [fa-bullhorn] **Find out what's new** (link to your release notes on Health Catalyst Community)
- [fa-comments] **Send feedback**  (see the [User Feedback Guide](https://cashmere.healthcatalyst.net/components/typeform-survey/examples))
- [fa-info-circle] **About** see the [associated style page](https://cashmere.healthcatalyst.net/styles/about) for guidelines)


```html
<hc-pop #helpMenu [autoCloseOnContentClick]="true" [showArrow]="false" horizontalAlign="end">
    <div hcMenu>
        <a hcMenuItem href="http://example.com" target="_blank">
            <hc-icon hcMenuIcon fontSet="fa" fontIcon="fa-book"></hc-icon>
            <span hcMenuText>Read the docs</span>
        </a>
        <a hcMenuItem href="http://example.com" target="_blank">
            <hc-icon hcMenuIcon fontSet="fa" fontIcon="fa-lightbulb-o"></hc-icon>
            <span hcMenuText>Request a feature</span>
        </a>
        <a hcMenuItem href="http://example.com" target="_blank">
            <hc-icon hcMenuIcon fontSet="fa" fontIcon="fa-users"></hc-icon>
            <span hcMenuText>Ask the community</span>
        </a>
        <a hcMenuItem href="http://example.com" target="_blank">
            <hc-icon hcMenuIcon fontSet="fa" fontIcon="fa-bullhorn"></hc-icon>
            <span hcMenuText>Find out what's new</span>
        </a>
        <a hcMenuItem href="http://example.com" target="_blank">
            <hc-icon hcMenuIcon fontSet="fa" fontIcon="fa-comments"></hc-icon>
            <span hcMenuText>Send feedback</span>
        </a>
        <div hcMenuItem hcDivider></div>
        <button hcMenuItem>
            <hc-icon hcMenuIcon fontSet="fa" fontIcon="fa-info-circle"></hc-icon>
            <span hcMenuText>About</span>
        </button>
    </div>
</hc-pop>
```

&nbsp;

##### App Switcher

In addition to the help menu, all Heath Catalyst applications should also include the app switcher in their navbar to the left of the help menu. The app switcher allows users to easily switch between the Health Catalyst apps that they have access to. You may set the height of the icons that appear in the app switcher using the `iconHeight` parameter.  The height defaults to 100px, and the width will be set automatically.

```html
<hc-navbar>
    ...
    <hc-icon class="hc-navbar-icon" fontSet="fa" fontIcon="fa-th" [hcPop]="appSwitcher"></hc-icon>
    ...
    <hc-navbar-mobile-menu>
        ...
        <hc-app-switcher-links></hc-app-switcher-links>
    </hc-navbar-mobile-menu>
    ...
    <hc-pop #appSwitcher><hc-app-switcher iconHeight="50"></hc-app-switcher></hc-pop>
</hc-navbar>
```

The app switcher service must be set up in order for the application switcher to function. The discovery service uri is required to set this up

```Typescript
import { NavbarModule, AppSwitcherModule, IconModule, PopModule, ListModule,
    SelectModule } from '@healthcatalyst/cashmere';

@NgModule({
    imports: [
        AppSwitcherModule.forRoot({
            discoveryServiceUri: 'http://localhost/discoveryservice/v1'
        })
    ],
    exports: [NavbarModule, AppSwitcherModule, IconModule, PopModule, ListModule, SelectModule]
})
export class CashmereModule {}
...
```

When the discovery service uri is determined at runtime (via configuration), you must register a custom app switcher config provider.
_(The reason you can't use `forRoot` for this is that the Angular AOT compiler will evaluate the expression (i.e. `window.discoveryServiceUri`)
at build-time using NodeJS and replace it with `null`.)_

```Typescript
import { NavbarModule, AppSwitcherModule, IconModule, PopModule, ListModule,
    SelectModule, APP_SWITCHER_CONFIG, IAppSwitcherConfig } from '@healthcatalyst/cashmere';

@NgModule({
    imports: [
        AppSwitcherModule
    ],
    providers: [
        {provide: APP_SWITCHER_CONFIG, useFactory: getAppSwitcherConfig}
    ],
    exports: [AppSwitcherModule, ...]
})
export class CashmereModule {}

function getAppSwitcherConfig() {
    return {
        discoveryServiceUri: window.discoveryServiceUri
    } as IAppSwitcherConfig;
}
...
```

A custom application switcher service may also be used if you need more control over how applications are retrieved from the discovery service.

```Typescript
import {
    NavbarModule,
    AppSwitcherModule,
    IconModule,
    PopModule,
    ListModule,
    SelectModule,
    APP_SWITCHER_SERVICE,
    IDiscoveryRequest
} from '@healthcatalyst/cashmere';
import { of, Observable } from 'rxjs';

const applications: IDiscoveryRequest = {
    value: [
        {
            ServiceName: 'Example',
            Version: 1,
            DiscoveryServiceId: 1,
            ServiceUrl: 'http://example.com/',
            Heartbeat: null,
            DiscoveryType: 'Application',
            IsHidden: false,
            Icon: '',
            FriendlyName: 'Example',
            Description: 'An example of a web application',
            BuildNumber: '1.0'
        }
    ]
};

class CustomAppSwitcherService {
    readonly allApplicationsUri = 'http://example.com/';

    getApplications(): Observable<IDiscoveryRequest> {
        return of(applications);
    }
}

@NgModule({
    imports: [
        AppSwitcherModule.forRoot({
            discoveryServiceUri: 'http://localhost/discoveryservice/v1'
        })
    ],
    exports: [NavbarModule, AppSwitcherModule, IconModule, PopModule, ListModule, SelectModule],
    providers: [
        {
            provide: APP_SWITCHER_SERVICE,
            useClass: CustomAppSwitcherService
        }
    ]
})
export class NavbarExampleModule {}
...
```
