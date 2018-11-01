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
    /* example-component-name */
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CashmereModule,
    /* example-module-name */
  ],
  providers: [],
  entryComponents: [/* example-component-name */],
  bootstrap: [AppComponent]
})
export class AppModule { }
