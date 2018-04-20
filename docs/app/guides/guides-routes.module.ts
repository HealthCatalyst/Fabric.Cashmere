import { RouterModule, Routes } from '@angular/router';
import { GuidesComponent } from './guides.component';
import { GuideComponent } from './guide/guide.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
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

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuidesRoutesModule {
}
