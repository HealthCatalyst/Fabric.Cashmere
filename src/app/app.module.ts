import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FoundationsModule } from './foundations/foundations.module';
import { ContentModule } from './content/content.module';
import { StylesModule } from './styles/styles.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { GuidesModule } from './guides/guides.module';
import { MobileDevModule } from './mobile/mobile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutesModule } from './app-routes.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './home/home.component';
import { SearchResultsModule } from './search-results/search-results.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CoreModule,
        SharedModule,
        ComponentsModule,
        StylesModule,
        AnalyticsModule,
        FoundationsModule,
        ContentModule,
        GuidesModule,
        MobileDevModule,
        SearchResultsModule,
        AppRoutesModule
    ],
    declarations: [AppComponent, HomeComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
