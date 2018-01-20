import { ButtonModule } from './lib/button/button.module';
import { routes } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ComponentLibraryComponent } from './demo/component-library/component-library.component';
import { SideNavComponent } from './demo/side-nav/side-nav.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { DropdownComponent } from 'app/lib/dropdown/dropdown.component';
import { DropdownDemoComponent } from 'app/lib/dropdown/dropdown-demo/dropdown-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentLibraryComponent,
    SideNavComponent,
    ButtonDemoComponent,
    DropdownComponent,
    DropdownDemoComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
