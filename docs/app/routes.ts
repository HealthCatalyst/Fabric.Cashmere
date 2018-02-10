import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from 'app/demo/demo.component';
import { HomeComponent } from 'app/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full', data: { breadcrumb: "Sign In" }},
    {path: 'home', component: HomeComponent, data: { breadcrumb: "Sign In" }},
    {path: 'demo', component: DemoComponent, data: { breadcrumb: "Sign In" }},
    {path: '**', redirectTo: 'home', data: { breadcrumb: "Sign In" }}
];
