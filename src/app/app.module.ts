import { routes } from './routes';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavComponent } from './demo/side-nav/side-nav.component';
import { HomeComponent } from 'app/home/home.component';
import { DemoComponent } from 'app/demo/demo.component';
import { DemoModule } from 'app/demo/demo.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    DemoModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
