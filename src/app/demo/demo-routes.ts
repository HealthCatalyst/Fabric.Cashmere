import { Routes } from '@angular/router';
import { ColorDemoComponent } from 'app/lib/color-demo/color-demo.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { SelectDemoComponent } from 'app/lib/select/select-demo/select-demo.component';
import { DemoComponent } from 'app/demo/demo.component';
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
            { path: 'select', component: SelectDemoComponent, pathMatch: 'full' },
            { path: 'color', component: ColorDemoComponent, pathMatch: 'full'  }
        ]
    }
];
