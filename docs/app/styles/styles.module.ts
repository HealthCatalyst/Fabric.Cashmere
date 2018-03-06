import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TabsModule } from '../../../lib/src/tabs/tabs.module';
import { StylesComponent } from './styles.component';
import { SubnavModule } from '../../../lib/src/subnav/subnav.module';
import { TileModule } from '../../../lib/src/tile/tile.module';
import { SelectModule } from '../../../lib/src/select/select.module';

import { ColorDemoComponent } from './color/color-demo.component';
import { TableDemoComponent } from './table/table-demo.component';
import { SwatchDemoComponent } from './color/swatch-demo.component';
import { routes } from './styles-routes';
import { TypographyDemoComponent } from './typography/typography-demo.component';
import { CodeDemoComponent } from './code/code-demo.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        TabsModule,
        SubnavModule,
        TileModule,
        SelectModule,
        SharedModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        StylesComponent,
        ColorDemoComponent,
        TableDemoComponent,
        SwatchDemoComponent,
        TypographyDemoComponent,
        CodeDemoComponent
    ]
})
export class StylesModule {
}
