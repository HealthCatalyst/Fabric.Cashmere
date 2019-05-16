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

-   **Help Topics** (if available—reach out to the Content Team for support)
-   **Release Notes** (if applicable, again reach out to the Content Team for support)
-   **About** (a modal containing app reference information - see the [associated style page](https://cashmere.healthcatalyst.net/styles/about) for guidelines)
-   **Health Catalyst Community** (link to community space specific to the app)
-   **Send us your feedback** (see the [User Feedback Guide](https://cashmere.healthcatalyst.net/components/typeform-survey/usage))

```html
<hc-pop #helpMenu>
    <ul class="list-options">
        <li><a href="" target="_blank">Help Topics</a></li>
        <li><a href="" target="_blank">Release Notes</a></li>
        <li><button (click)="aboutClick($event)">About</button></li>
        <li><a href="https://community.healthcatalyst.com/" target="_blank">Health Catalyst Community</a></li>
        <li><button (click)="feedbackClick($event)">Send us your feedback</button></li>
    </ul>
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
    <hc-pop #appSwitcher><hc-app-switcher iconHeight="100"></hc-app-switcher></hc-pop>
</hc-navbar>
```

The app switcher service must be set up in order for the application switcher to function. The discovery service uri is required to set this up

```Typescript
import { NavbarModule, AppSwitcherModule, IconModule, PopoverModule, ListModule,
    SelectModule } from '@wcf-insurance/cashmere';

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
} from '@wcf-insurance/cashmere';
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
