##### Help Menu

All Health Catalyst apps should include a help menu in their navbar. This guide provides a standard menu for the content that should appear in that menu. A standard menu provides users with a consistent experience—they know what to expect from Health Catalyst applications. It also gives them the support and information they need to use the app. The help menu is included as a `hc-navbar-icon` that stays pinned to the right side and triggers a popover:

```html
<hc-navbar-icon>
    <hc-icon fontSet="fa" fontIcon="fa-question-circle-o"
        [hcPopover]="helpMenu" popperPlacement="bottom"></hc-icon>
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

&nbsp;

##### App Switcher

In addition to the help menu, all Heath Catalyst applications should also include the app switcher in their navbar to the left of the help menu. The app switcher allows users to easily switch between the Health Catalyst apps that they have access to.

```html
<hc-navbar>
    ...
    <hc-icon class="hc-navbar-icon" fontSet="fa" fontIcon="fa-th" [hcPopover]="appSwitcher" popperPlacement="bottom"></hc-icon>
    ...
    <hc-navbar-mobile-menu>
        ...
        <hc-app-switcher-links></hc-app-switcher-links>
    </hc-navbar-mobile-menu>
    ...
    <hc-popover-content #appSwitcher>
        <hc-app-switcher></hc-app-switcher>
    </hc-popover-content>
</hc-navbar>
```

The app switcher service must be setup in order for the application switcher to function. The discovery service uri is required to set this up

```Typescript
import { NavbarModule, AppSwitcherModule, IconModule, PopoverModule, ListModule,
    SelectModule } from '@wcf-insurance/cashmere';

@NgModule({
    imports: [
        AppSwitcherModule.forRoot({
            discoveryServiceUri: 'http://localhost/discoveryservice/v1'
        })
    ],
    exports: [NavbarModule, AppSwitcherModule, IconModule, PopoverModule, ListModule, SelectModule]
})
export class CashmereModule {}
...
```

A custom application switcher service may also be used if you need more control over how applications are retrieved from the discovery service.

```Typescript
import {
    NavbarModule,
    AppSwitcherModule,
    IconModule,
    PopoverModule,
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
    exports: [NavbarModule, AppSwitcherModule, IconModule, PopoverModule, ListModule, SelectModule],
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
