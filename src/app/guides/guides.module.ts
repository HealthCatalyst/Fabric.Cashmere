import {NgModule} from '@angular/core';
import {GuidesComponent} from './guides.component';
import {GuideComponent} from './guide/guide.component';
import {GuidesService} from './guides.service';
import {SharedModule} from '../shared/shared.module';
import {GuidesRoutesModule} from './guides-routes.module';

@NgModule({
    imports: [SharedModule, GuidesRoutesModule],
    declarations: [GuidesComponent, GuideComponent],
    providers: [GuidesService]
})
export class GuidesModule {}
