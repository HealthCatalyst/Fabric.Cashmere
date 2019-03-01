import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
    selector: 'hc-file-input-overview-example',
    templateUrl: 'file-input-overview-example.component.html'
})
export class FileInputOverviewExampleComponent {
    formGroup = new FormGroup({
        file: new FormControl()
    });
    submittedValue: any;
    onSubmit() {
        this.submittedValue = this.formGroup.value;
    }
}
