import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Ellipsis Pipe Overview
 */
@Component({
    selector: 'hc-ellipsis-overview-example',
    templateUrl: 'ellipsis-overview-example.component.html'
})
export class EllipsisOverviewExampleComponent {
    readonly value = new FormControl(`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Pellentesque iaculis ac ante eget sodales. Nulla posuere augue risus, ut
    vestibulum nisi cursus eu. Sed in.`, {nonNullable: true});
    readonly length = new FormControl(15, {nonNullable: true});
    mode: 'characters' | 'words' = 'characters';
    readonly modeControl = new FormControl(this.mode, {nonNullable: true});
}
