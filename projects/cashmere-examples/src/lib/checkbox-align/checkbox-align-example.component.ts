import {Component} from '@angular/core';

/**
 * @title Checkbox Alignment
 */
@Component({
    selector: 'hc-checkbox-align-example',
    templateUrl: 'checkbox-align-example.component.html',
    styleUrls: ['checkbox-align-example.component.scss'],
    standalone: false
})
export class CheckboxAlignExampleComponent {
    checkboxLabels = [
        "This is a center aligned checkbox (default) with a lot of associated text. The align parameter is used to position the checkbox relative to its label.",
        "This checkbox is top aligned. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo dolor sed justo ullamcorper mattis.",
        "This checkbox is bottom aligned. Praesent dignissim fermentum auctor. Nulla nibh lectus, dignissim ultrices condimentum et, rutrum eu tortor."
    ];
}
