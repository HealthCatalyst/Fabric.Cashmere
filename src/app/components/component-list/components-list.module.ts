import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ComponentsListComponent} from './components-list.component';
import {ComponentsListRouterModule} from './components-list-router.module';

@NgModule({
    imports: [SharedModule, ComponentsListRouterModule],
    declarations: [ComponentsListComponent]
})
export class ComponentsListModule {}
