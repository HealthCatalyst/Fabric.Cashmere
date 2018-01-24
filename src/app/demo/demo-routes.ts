import { Routes } from '@angular/router';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { ColorDemoComponent } from 'app/lib/color-demo/color-demo.component';
import { DemoComponent } from 'app/demo/demo.component';

export const routes: Routes = [
    {
        path: 'demo',
        component: DemoComponent,
        children: [
            {
                path: 'color',
                component: ColorDemoComponent
            },
            {
                path: 'buttons',
                component: ButtonDemoComponent
            }
        ]
    }
];
