import { Routes } from '@angular/router';
import { DemoComponent } from 'app/demo/demo.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { NavbarDemoComponent } from 'app/lib/navbar/navbar-demo/navbar-demo.component';
import { PopoverDemoComponent } from 'app/lib/popover/popover-demo/popover-demo.component';

export const routes: Routes = [
    {
        path: 'demo',
        component: DemoComponent,
        children: [
            { path: 'buttons', component: ButtonDemoComponent, pathMatch: 'full'},
            { path: 'navbar', component: NavbarDemoComponent, pathMatch: 'full'},
            { path: 'popover', component: PopoverDemoComponent, pathMatch: 'full'},
        ]
    }
];
