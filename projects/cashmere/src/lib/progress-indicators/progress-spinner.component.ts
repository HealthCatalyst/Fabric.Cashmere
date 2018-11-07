import {Component, Input} from '@angular/core';

const supportedColors = ['blue', 'green', 'purple', 'orange', 'red', 'gray', 'white'];

export function validateColorInput(inputStr: string) {
    if (supportedColors.indexOf(inputStr) < 0) {
        throw Error('Unsupported progress spinner color value: ' + inputStr);
    }
}

@Component({
    selector: 'hc-progress-spinner',
    templateUrl: 'progress-spinner.component.html'
})
export class ProgressSpinnerComponent {
    private _color = 'blue';

    /** Color of the spinner: `blue`, `green`, `purple`, `orange`, `red`, `gray`, `white` */
    @Input()
    get color(): string {
        return this._color;
    }

    set color(colorVal: string) {
        validateColorInput(colorVal);
        this._color = colorVal;
    }

    /** If true, the spinner will center itself inside its container. */
    @Input()
    public isCentered = true;

    /** If true, include background "channel" circle. */
    @Input()
    public hasChannel = true;

    /** If true, switches to determinate mode. Must pass in progress (0-100%), instead of having the loader spin freely. */
    @Input()
    public isDeterminate = false;

    /** (0-100%) Only used if "isDeterminate" is set to true. */
    @Input()
    public set progress(progress: number) {
        this.setProgress(progress);
    }
    public get progress() {
        return this._progress;
    }

    /** Set the diameter of the circle, in pixels. Minimum is 20, maximum is 250. */
    @Input()
    public set diameter(diameter: number) {
        this._diameter = Math.min(Math.max(this._minDiameter, diameter), this._maxDiameter);
    }
    public get diameter(): number {
        return this._diameter;
    }

    public _rightCircleTransform = '';
    public _leftCircleTransform = '';
    public _rightCircleTransition = '';
    public _leftCircleTransition = '';
    private _progress = 0;
    private _diameter = 0;
    private _minDiameter = 20;
    private _maxDiameter = 250;

    private setProgress(progress: number) {
        progress = Math.min(100, progress);
        progress = Math.max(0, progress);

        this.setProgressTransition(progress);
        this.setProgressTransform(progress);

        this._progress = progress;
    }

    private setProgressTransition(progress: number) {
        const sizeBasedTime = this.diameter > 150 ? 0.6 : 0.4;
        const timing = Math.abs(progress - this._progress) > 40 ? sizeBasedTime : sizeBasedTime / 2;
        const halfTime = timing / 2;
        if ((progress <= 50 && this._progress <= 50) || (progress >= 51 && this._progress >= 51)) {
            this._leftCircleTransition = `transform ${timing}s ease-in-out 0s`;
            this._rightCircleTransition = `transform ${timing}s ease-in-out 0s`;
        } else if (progress <= 50 && this._progress >= 51) {
            this._leftCircleTransition = `transform ${halfTime}s ease-in 0s`;
            this._rightCircleTransition = `transform ${halfTime}s ease-out ${halfTime - 0.001}s`;
        } else if (progress >= 51 && this._progress <= 50) {
            this._leftCircleTransition = `transform ${halfTime}s ease-out ${halfTime - 0.001}s`;
            this._rightCircleTransition = `transform ${halfTime}s ease-in 0s`;
        }
    }

    /**
     * Using a somewhat complicated set of transforms to achive the animation.
     * For 0% to 50% the right circle element rotates from -135deg to 45deg
     * For 51% to 100% the left circle element rotates from 135deg to 315deg
     */
    private setProgressTransform(progress: number) {
        if (progress <= 50) {
            const rightDegrees = (progress / 50) * 180 - 135;
            this._rightCircleTransform = `rotate(${rightDegrees}deg)`;
            this._leftCircleTransform = `rotate(135deg)`;
        } else if (progress >= 51) {
            const leftDegrees = ((progress - 50) / 50) * 180 + 135;
            this._leftCircleTransform = `rotate(${leftDegrees}deg)`;
            this._rightCircleTransform = 'rotate(45deg)';
        }
    }
}
