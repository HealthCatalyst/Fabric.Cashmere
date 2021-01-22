import {Component, Input} from '@angular/core';

@Component({
    selector: 'hc-swatch-demo-component',
    templateUrl: './swatch-demo.component.html',
    styleUrls: ['./swatch-demo.component.scss']
})
export class SwatchDemoComponent {
    @Input()
    public name: string;
    @Input()
    public hex: string;
    @Input()
    public isLarge = false;
    @Input()
    public needsBorder = false;
    @Input()
    public rgb: string;
    @Input()
    public cmyk: string;
    @Input()
    public lab: string;
    @Input()
    public pantone: string;
    @Input()
    public gradient: string[] = [];
}
