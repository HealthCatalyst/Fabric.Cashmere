import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GuidesComponent} from './guides.component';
import {FormsModule} from '@angular/forms';
import {SubnavModule} from '../../../lib/src/subnav/subnav.module';
import {TileModule} from '../../../lib/src/tile/tile.module';
import {TabsModule} from '../../../lib/src/tabs/tabs.module';
import {SelectModule} from '../../../lib/src/select/select.module';
import {GuideComponent} from './guide/guide.component';
import {GuidesService} from './guides.service';
import {SharedModule} from '../shared/shared.module';
import {GuidesRoutesModule} from './guides-routes.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabsModule,
        SubnavModule,
        TileModule,
        CommonModule,
        SharedModule,
        SelectModule,
        GuidesRoutesModule
    ],
    declarations: [GuidesComponent, GuideComponent],
    providers: [GuidesService]
})
export class GuidesModule {}
