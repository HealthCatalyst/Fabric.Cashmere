import { NgModule } from '@angular/core';
import { SearchResultsComponent } from './search-results.component';
import { SearchResultsRoutesModule } from './search-results-routes.module';
import { SharedModule } from '../shared/shared.module';
import { ApplicationInsightsService } from '../shared/application-insights/application-insights.service';


@NgModule({
    imports: [SharedModule, SearchResultsRoutesModule],
    declarations: [SearchResultsComponent],
    providers: [ApplicationInsightsService]
})
export class SearchResultsModule { }
