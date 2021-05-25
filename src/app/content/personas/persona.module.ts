import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {PersonaOrgComponent} from './persona-org/persona-org.component';
import {PersonaListComponent} from './persona-list/persona-list.component';
import {PersonaViewerComponent} from './persona-viewer/persona-viewer.component';
import {PersonaService} from './persona-list.service';
import {ProductCentricIndexComponent} from './product-centric-index/product-centric-index.component';
import {ProductPersonasViewerComponent} from './product-personas-viewer/product-personas-viewer.component';
import {ProductCentricIndexService} from './product-centric-index-service';

@NgModule({
    imports: [SharedModule, RouterModule],
    providers: [PersonaService, ProductCentricIndexService],
    declarations: [
        PersonaOrgComponent,
        PersonaListComponent,
        PersonaViewerComponent,
        ProductCentricIndexComponent,
        ProductPersonasViewerComponent
    ]
})
export class PersonaModule {}
