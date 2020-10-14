import { NgModule } from '@angular/core';
import { SearchService } from '../shared/search.service';
import { SearchResultsComponent } from './search-results.component';
import { SearchResultsRoutesModule } from './search-results-routes.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule, SearchResultsRoutesModule],
    declarations: [SearchResultsComponent],
    providers: [SearchService]
})
export class SearchResultsModule { }
