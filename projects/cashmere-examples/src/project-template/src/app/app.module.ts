import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExampleContainerComponent} from './example-container.component';
import {CashmereModule} from './cashmere.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
/* example-module-import */
/* example-component-import */

@NgModule({
    declarations: [
        AppComponent,
        ExampleContainerComponent /* component-comma */
        /* example-component-name */
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        CashmereModule /* module-comma */
        /* example-module-name */
    ],
    providers: [],
    entryComponents: [
        /* example-component-name */
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
