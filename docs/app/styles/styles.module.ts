import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabsModule } from '../../../lib/src/tabs/tabs.module';
import { StylesComponent } from './styles.component';
import { SubnavModule } from '../../../lib/src/subnav/subnav.module';
import { TileModule } from '../../../lib/src/tile/tile.module';
import { ProgressIndicatorsModule } from '../../../lib/src/progress-indicators/progress-indicators.module';
import { SelectModule } from '../../../lib/src/select/select.module';
import { IconModule } from '../../../lib/src/icon/icon.module';
import { ModalModule } from '../../../lib/src/modal/modal.module';
import { ButtonModule } from '../../../lib/src/button/button.module';
import { PopoverModule } from '../../../lib/src/popover/popover.module';

import { ColorDemoComponent } from './color/color-demo.component';
import { TableDemoComponent } from './table/table-demo.component';
import { SwatchDemoComponent } from './color/swatch-demo.component';
import { TypographyDemoComponent } from './typography/typography-demo.component';
import { CodeDemoComponent } from './code/code-demo.component';
import { SharedModule } from '../shared/shared.module';
import { ChartDemoComponent } from './chart/chart-demo.component';
import { BarchartComponent } from './chart/barchart/barchart.component';
import { LinechartComponent } from './chart/linechart/linechart.component';
import { ErrorPagesComponent } from './error/error-pages.component';
import { StylesRoutesModule } from './styles-routes.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabsModule,
        SubnavModule,
        TileModule,
        SelectModule,
        SharedModule,
        ProgressIndicatorsModule,
        IconModule,
        ModalModule,
        ButtonModule,
        PopoverModule,
        StylesRoutesModule
    ],
    declarations: [
        StylesComponent,
        ColorDemoComponent,
        TableDemoComponent,
        SwatchDemoComponent,
        TypographyDemoComponent,
        CodeDemoComponent,
        ChartDemoComponent,
        BarchartComponent,
        LinechartComponent,
        ErrorPagesComponent
    ]
})
export class StylesModule {
}
