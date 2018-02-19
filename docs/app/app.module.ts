import { routes } from './routes';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { StylesModule } from './styles/styles.module';
import { IconModule } from '../../lib/src/icon/icon.module';
import { ListModule } from '../../lib/src/list/list.module';
import { GuidesModule } from './guides/guides.module';
import { MarkdownDirective } from './markdown.directive';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        ComponentsModule,
        StylesModule,
        GuidesModule,
        IconModule,
        ListModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
