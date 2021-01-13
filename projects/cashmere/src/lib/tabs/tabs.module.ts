import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabComponent} from './tab/tab.component';
import {HcTabTitleComponent} from './tab/tab-title.component';
import {TabSetComponent} from './tab-set/tab-set.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [TabComponent, HcTabTitleComponent, TabSetComponent],
    exports: [TabComponent, HcTabTitleComponent, TabSetComponent]
})
export class TabsModule {}
