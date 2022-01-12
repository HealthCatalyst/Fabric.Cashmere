##### Mobile Development Guide

For information including the app switcher in responsive web applications, refer to the [mobile development guide](https://cashmere.healthcatalyst.net/web/mobile/mobile-navigation).

<br>

##### App Switcher

Along with a help menu, all Heath Catalyst applications should also include the app switcher in their navbar to the left of the help menu. The app switcher allows users to easily switch between the Health Catalyst apps that they have access to. You may set the height of the icons that appear in the app switcher using the `iconHeight` parameter. The height defaults to 60px, and the width will be set automatically
(but constrained to a max-width equal to the `iconHeight` value).
To disable switching for your own app you can pass in the service name and version number you have registered with the discovery service in the `serviceName` and `serviceVersion` parameters respectively. The icon will still be displayed but won't be clickable.

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
    <hc-pop #appSwitcher><hc-app-switcher serviceName="MyService" serviceVersion="1"></hc-app-switcher></hc-pop>
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
