import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title IfNullOrEmptyString Pipe Overview
 */
@Component({
    selector: 'hc-null-or-empty-string-overview-example',
    templateUrl: 'null-or-empty-string-overview-example.component.html'
})
export class NullOrEmptyStringOverviewExampleComponent {
    readonly valueControl = new FormControl('');
}
