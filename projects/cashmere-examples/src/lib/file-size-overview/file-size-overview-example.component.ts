import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title File Size Pipe overview example
 */
@Component({
    selector: 'hc-file-size-overview-example',
    templateUrl: 'file-size-overview-example.component.html',
    standalone: false
})
export class FileSizeOverviewExampleComponent {
    readonly bytes = new FormControl(123456789, {nonNullable: true});
    readonly precision = new FormControl(2, {nonNullable: true});
}
