import {Component} from '@angular/core';

/**
 * @title File Size Pipe overview example
 */
@Component({
    selector: 'hc-file-size-overview-example',
    templateUrl: 'file-size-overview-example.component.html'
})
export class FileSizeOverviewExampleComponent {
    bytes: number = 123456789;
    precision: number = 2;
}
