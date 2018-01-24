import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'hc-swatch-component',
    templateUrl: './swatch.component.html',
    styleUrls: ['./swatch.component.scss']
})
export class SwatchComponent {
    @Input() public name: String;
    @Input() public hex: String;
    @Input() public isLarge = false;
    @Input() public needsBorder = false;
}
