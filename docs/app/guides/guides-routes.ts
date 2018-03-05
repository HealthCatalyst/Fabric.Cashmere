import { Routes } from '@angular/router';
import { GuidesComponent } from './guides.component';
import { GuideComponent } from './guide/guide.component';

export const routes: Routes = [
    {
        path: 'guides',
        component: GuidesComponent,
        children: [
            {
                path: ':id',
                component: GuideComponent
            }
        ]
    }
];