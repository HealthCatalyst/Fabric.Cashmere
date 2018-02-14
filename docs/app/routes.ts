import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from '../app/demo/demo.component';
import { HomeComponent } from '../app/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'demo', component: DemoComponent},
    {path: '**', redirectTo: 'home'}
];
