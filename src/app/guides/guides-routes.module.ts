import {RouterModule, Routes} from '@angular/router';
import {GuidesComponent} from './guides.component';
import {GuideComponent} from './guide/guide.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {
        path: 'web/guides',
        component: GuidesComponent,
        children: [
            {
                path: ':id',
                component: GuideComponent
            },
            {path: '**', redirectTo: 'getting-started'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class GuidesRoutesModule {}
