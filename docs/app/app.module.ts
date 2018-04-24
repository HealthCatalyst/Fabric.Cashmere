import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { StylesModule } from './styles/styles.module';
import { IconModule } from '../../lib/src/icon/icon.module';
import { ListModule } from '../../lib/src/list/list.module';
import { GuidesModule } from './guides/guides.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutesModule } from './app-routes.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        IconModule,
        ListModule,
        ComponentsModule,
        StylesModule,
        GuidesModule,
        AppRoutesModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
