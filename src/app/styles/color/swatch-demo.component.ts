import {Component, Input} from '@angular/core';

@Component({
    selector: 'hc-swatch-demo-component',
    templateUrl: './swatch-demo.component.html',
    styleUrls: ['./swatch-demo.component.scss']
})
export class SwatchDemoComponent {
    @Input()
    public name: String;
    @Input()
    public hex: String;
    @Input()
    public isLarge = false;
    @Input()
    public needsBorder = false;
    @Input()
    public rgb: String;
    @Input()
    public cmyk: String;
}
