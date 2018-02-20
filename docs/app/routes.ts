import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from '../app/components/components.component';
import { StylesComponent } from '../app/styles/styles.component';
import { HomeComponent } from '../app/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'components', component: ComponentsComponent},
    {path: 'styles', component: StylesComponent},
    {path: '**', redirectTo: 'home'}
];
