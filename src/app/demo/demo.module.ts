import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'app/lib/button/button.module';
import { DemoComponent } from 'app/demo/demo.component';
import { SideNavComponent } from 'app/demo/side-nav/side-nav.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { routes } from './demo-routes';

@NgModule({
    imports: [
        BrowserModule,
        ButtonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        ButtonModule
    ],
    declarations: [
        DemoComponent,
        SideNavComponent,
        ButtonDemoComponent
    ]
})
export class DemoModule { }
