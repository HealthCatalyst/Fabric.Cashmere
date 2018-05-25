import {RouterModule, Routes} from '@angular/router';
import {ComponentsComponent} from './components/components.component';
import {StylesComponent} from './styles/styles.component';
import {HomeComponent} from './home/home.component';
import {GuidesComponent} from './guides/guides.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'components', component: ComponentsComponent},
    {path: 'styles', component: StylesComponent},
    {path: 'guides', component: GuidesComponent},
    {path: '**', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutesModule {}
