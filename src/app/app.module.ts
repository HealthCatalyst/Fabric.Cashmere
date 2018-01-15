import { ButtonModule } from './lib/button/button.module';
import { routes } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ComponentLibraryComponent } from './demo/component-library/component-library.component';
import { SideNavComponent } from './demo/side-nav/side-nav.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { NavbarModule } from 'app/lib/navbar/navbar.module';
import { NavbarDemoComponent } from './lib/navbar/navbar-demo/navbar-demo.component';
import { PopoverModule } from 'app/lib/popover/popover.module';
import { PopoverDemoComponent } from 'app/lib/popover/popover-demo/popover-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentLibraryComponent,
    SideNavComponent,
    ButtonDemoComponent,
    NavbarDemoComponent,
    PopoverDemoComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    NavbarModule,
    PopoverModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
