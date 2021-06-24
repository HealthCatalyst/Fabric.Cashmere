import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ExampleContainerComponent} from './example-container.component';

const routes: Routes = [
    {
        path: '',
        component: ExampleContainerComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
