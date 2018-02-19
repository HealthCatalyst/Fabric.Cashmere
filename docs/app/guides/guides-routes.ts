import { Routes } from '@angular/router';
import { GuidesComponent } from './guides.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';

export const routes: Routes = [
    {
        path: 'guides',
        component: GuidesComponent,
        children: [
            {
                path: 'getting-started',
                component: GettingStartedComponent
            },
            {
                path: '**',
                redirectTo: 'getting-started'
            }
        ]
    }
];