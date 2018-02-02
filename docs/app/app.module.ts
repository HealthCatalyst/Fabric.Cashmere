import { routes } from './routes';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DemoModule } from 'app/demo/demo.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        DemoModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
