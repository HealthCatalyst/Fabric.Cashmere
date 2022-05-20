import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CashmereModule} from '../cashmere.module';
import {NavbarAppSwitcherExampleComponent} from './navbar-app-switcher-example.component';
import {APP_SWITCHER_SERVICE} from '@healthcatalyst/cashmere';
import {CustomAppSwitcherService} from './custom-app-switcher.service';

@NgModule({
    imports: [CommonModule, CashmereModule],
    declarations: [NavbarAppSwitcherExampleComponent],
    exports: [NavbarAppSwitcherExampleComponent],
    providers: [{ provide: APP_SWITCHER_SERVICE, useClass: CustomAppSwitcherService }]
})
export class NavbarAppSwitcherExampleModule {}
