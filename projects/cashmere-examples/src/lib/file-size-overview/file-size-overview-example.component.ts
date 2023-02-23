import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

/**
 * @title File Size Pipe overview example
 */
@Component({
    selector: 'hc-file-size-overview-example',
    templateUrl: 'file-size-overview-example.component.html'
})
export class FileSizeOverviewExampleComponent {
    readonly bytes = new UntypedFormControl(123456789);
    readonly precision = new UntypedFormControl(2);
}
