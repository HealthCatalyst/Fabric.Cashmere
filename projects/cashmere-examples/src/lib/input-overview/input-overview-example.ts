import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

/**
 * @title Input overview
 */
@Component({
    selector: 'input-overview-example',
    templateUrl: 'input-overview-example.html',
    styleUrls: ['input-overview-example.css']
})
export class InputOverviewExample {
    formDemo = new FormControl('', Validators.required);
}
