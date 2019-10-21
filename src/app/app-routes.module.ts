import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NgModule} from '@angular/core';
import {SidenavDemoComponent} from './demos/sidenav-demo/sidenav-demo.component';
import {SidenavDemoModule} from './demos/sidenav-demo/sidenav-demo.module';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {
        path: 'demo',
        children: [
            {
                path: 'sidenav',
                component: SidenavDemoComponent
            }
        ] },
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes), SidenavDemoModule],
    exports: [RouterModule]
})
export class AppRoutesModule {}
