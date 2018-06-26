import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ComponentsListModule} from './components/component-list/components-list.module';
import {StylesModule} from './styles/styles.module';
import {GuidesModule} from './guides/guides.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutesModule} from './app-routes.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {ComponentViewerModule} from './components/component-viewer/component-viewer.module';
import {HomeComponent} from './home/home.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CoreModule,
        SharedModule,
        ComponentsListModule,
        ComponentViewerModule,
        StylesModule,
        GuidesModule,
        AppRoutesModule
    ],
    declarations: [AppComponent, HomeComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
