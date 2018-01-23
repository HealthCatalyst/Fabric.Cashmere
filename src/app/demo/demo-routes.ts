import { Routes } from '@angular/router';
import { DemoComponent } from 'app/demo/demo.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { CheckboxDemoComponent } from 'app/lib/checkbox/checkbox-demo/checkbox-demo.component';

export const routes: Routes = [
    {
        path: 'demo',
        component: DemoComponent,
        children: [
            {
                path: 'button',
                component: ButtonDemoComponent
            },
            {
                path: 'checkbox',
                component: CheckboxDemoComponent
            }
        ]
    }
];
