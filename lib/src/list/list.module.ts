import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListAvatarDirective } from './list-item/directives/list-avatar.directive';
import { ListIconDirective } from './list-item/directives/list-icon.directive';
import { ListLineDirective } from './list-item/directives/list-line.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        ListComponent,
        ListItemComponent,
        ListAvatarDirective,
        ListIconDirective,
        ListLineDirective
    ],
    exports: [
        ListComponent,
        ListItemComponent,
        ListAvatarDirective,
        ListIconDirective,
        ListLineDirective
    ]
})
export class ListModule {
}
