import {Component} from '@angular/core';

/**
 * @title Ellipsis Pipe Overview
 */
@Component({
    selector: 'hc-ellipsis-overview-example',
    templateUrl: 'ellipsis-overview-example.component.html'
})
export class EllipsisOverviewExampleComponent {
    value: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Pellentesque iaculis ac ante eget sodales. Nulla posuere augue risus, ut
    vestibulum nisi cursus eu. Sed in.`;
    length: number = 15;
    mode: 'characters' | 'words' = 'characters';
}
