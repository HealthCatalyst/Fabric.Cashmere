import { routes } from './routes';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DemoModule } from './demo/demo.module';
import { IconModule } from '../../lib/src/icon/icon.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        DemoModule,
        IconModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
