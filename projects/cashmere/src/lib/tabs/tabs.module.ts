import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabComponent} from './tab/tab.component';
import {HcTabTitleComponent} from './tab/tab-title.component';
import {TabSetComponent} from './tab-set/tab-set.component';
import {IconModule} from '../icon/icon.module';
import {PopModule} from '../pop/popover.module';
import { MeasurableModule } from '../measurable';

@NgModule({
    imports: [CommonModule, RouterModule, IconModule, PopModule, MeasurableModule],
    declarations: [TabComponent, HcTabTitleComponent, TabSetComponent],
    exports: [TabComponent, HcTabTitleComponent, TabSetComponent]
})
export class TabsModule {}
