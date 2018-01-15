import { Routes } from '@angular/router';
import { ComponentLibraryComponent } from './demo/component-library/component-library.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { NavbarDemoComponent } from 'app/lib/navbar/navbar-demo/navbar-demo.component';
import { PopoverDemoComponent } from 'app/lib/popover/popover-demo/popover-demo.component';

export const routes: Routes = [
    { path: '', redirectTo: 'library', pathMatch: 'full'},
    { path: 'library', component: ComponentLibraryComponent},
    { path: 'library/buttons', component: ButtonDemoComponent },
    { path: 'library/navbar', component: NavbarDemoComponent},
    { path: 'library/popover', component: PopoverDemoComponent},
    { path: '**', redirectTo: 'library' }
];
