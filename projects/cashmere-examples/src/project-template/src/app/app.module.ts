import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleContainerComponent } from './example-container.component';
import { CashmereModule } from './cashmere.module';
/* example-module-import */
/* example-component-import */

@NgModule({
  declarations: [
    AppComponent,
    ExampleContainerComponent,
    /* example-component-declaration */
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CashmereModule,
    /* example-module-import */
  ],
  providers: [],
  entryComponents: [/* example-component-declaration */],
  bootstrap: [AppComponent]
})
export class AppModule { }
