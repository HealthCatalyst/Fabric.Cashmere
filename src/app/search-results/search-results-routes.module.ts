import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: 'results',
        component: SearchResultsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchResultsRoutesModule { }