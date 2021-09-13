import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CashmereModule} from '../cashmere.module';
import {NavbarEnvironmentSwitcherExampleComponent} from './navbar-environment-switcher-example.component';
import {ENV_SWITCHER_SERVICE} from '@healthcatalyst/cashmere';
import {CustomEnvSwitcherService} from './custom-environment-switcher.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, CashmereModule, FormsModule],
    declarations: [NavbarEnvironmentSwitcherExampleComponent],
    entryComponents: [NavbarEnvironmentSwitcherExampleComponent],
    exports: [NavbarEnvironmentSwitcherExampleComponent],
    providers: [{provide: ENV_SWITCHER_SERVICE, useClass: CustomEnvSwitcherService}]
})
export class NavbarEnvironmentSwitcherExampleModule {}
