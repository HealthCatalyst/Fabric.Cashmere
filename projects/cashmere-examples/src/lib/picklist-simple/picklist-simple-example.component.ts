import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Picklist simple
 */
@Component({
    selector: 'hc-picklist-simple-example',
    templateUrl: 'picklist-simple-example.component.html'
})
export class PicklistSimpleExampleComponent {
    readonly simpleModelControl = new FormControl([]);
}
