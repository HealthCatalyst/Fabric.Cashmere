import { Routes } from '@angular/router';
import { ComponentLibraryComponent } from './demo/component-library/component-library.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';

export const routes: Routes = [
    { path: '', redirectTo: 'library', pathMatch: 'full'},
    { path: 'library', component: ComponentLibraryComponent},
    { path: 'library/buttons', component: ButtonDemoComponent },
    { path: '**', redirectTo: 'library' }
];
