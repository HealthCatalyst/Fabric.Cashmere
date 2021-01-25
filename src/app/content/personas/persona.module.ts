import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {PersonaOrgComponent} from './persona-org/persona-org.component';
import {PersonaListComponent} from './persona-list/persona-list.component';
import {PersonaViewerComponent} from './persona-viewer/persona-viewer.component';
import {PersonaService} from './persona-list.service';

@NgModule({
    imports: [SharedModule, RouterModule],
    providers: [PersonaService],
    declarations: [
        PersonaOrgComponent,
        PersonaListComponent,
        PersonaViewerComponent
    ]
})
export class PersonaModule {}
