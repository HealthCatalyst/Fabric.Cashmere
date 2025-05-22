import {Component, Input, ViewEncapsulation} from '@angular/core';

const supportedColors = ['blue', 'green', 'purple', 'orange', 'red', 'gray', 'white'];

export function validateColorInput(inputStr: string): void {
    if (supportedColors.indexOf(inputStr) < 0) {
        throw Error('Unsupported progress bar color value: ' + inputStr);
    }
}

@Component({
    selector: 'hc-progress-bar',
    templateUrl: 'progress-bar.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ProgressBarComponent {
    private _color = 'blue';

    /** Color of the bar: `blue`, `green`, `purple`, `orange`, `red`, `gray`, `white` */
    @Input()
    get color(): string {
        return this._color;
    }

    set color(colorVal: string) {
        validateColorInput(colorVal);
        this._color = colorVal;
    }

    /** If true, switches to determinate mode. Must pass in progress (0-100%), instead of having the loader spin freely. */
    @Input()
    public isDeterminate = false;

    /** If true, displays the current percentage of the progress bar and expands the height to accomidate. Only used if "isDeterminate" is set to true.*/
    @Input()
    public showValue = false;

    /** Optional text string to be displayed beneath the progress bar */
    @Input()
    public label: string;

    /** (0-100%) Only used if "isDeterminate" is set to true. */
    @Input()
    public set progress(progress: number) {
        this.setProgress(progress);
    }
    public get progress(): number {
        return this._progress;
    }

    private _progress = 0;

    private setProgress(progress: number) {
        progress = Math.min(100, progress);
        progress = Math.max(0, progress);

        this._progress = progress;
    }
}
