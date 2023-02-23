import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

/**
 * @title Ellipsis Pipe Overview
 */
@Component({
    selector: 'hc-ellipsis-overview-example',
    templateUrl: 'ellipsis-overview-example.component.html'
})
export class EllipsisOverviewExampleComponent {
    readonly value = new UntypedFormControl(`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Pellentesque iaculis ac ante eget sodales. Nulla posuere augue risus, ut
    vestibulum nisi cursus eu. Sed in.`);
    readonly length = new UntypedFormControl(15);
    mode: 'characters' | 'words' = 'characters';
    readonly modeControl = new UntypedFormControl(this.mode);
}
