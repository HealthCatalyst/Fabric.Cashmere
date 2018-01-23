import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'app/lib/button/button.module';
import { DemoComponent } from 'app/demo/demo.component';
import { SideNavComponent } from 'app/demo/side-nav/side-nav.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { routes } from './demo-routes';
import { CheckboxDemoComponent } from 'app/lib/checkbox/checkbox-demo/checkbox-demo.component';
import { CheckboxModule } from 'app/lib/checkbox/checkbox.module';
import { CheckboxComponent } from 'app/lib/checkbox/checkbox.component';

@NgModule({
    imports: [
        BrowserModule,
        ButtonModule,
        CheckboxModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        ButtonModule
    ],
    declarations: [
        DemoComponent,
        SideNavComponent,
        ButtonDemoComponent,
        CheckboxDemoComponent
    ]
})
export class DemoModule { }
