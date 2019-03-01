import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
    selector: 'hc-xanthos-file-upload-overview-example',
    templateUrl: 'xanthos-file-upload-overview-example.component.html'
})
export class XanthosFileUploadOverviewExampleComponent {
    formGroup = new FormGroup({
        xanthosFile: new FormControl()
    });
    submittedValue: any;
    onSubmit() {
        this.submittedValue = this.formGroup.value;
    }
}
