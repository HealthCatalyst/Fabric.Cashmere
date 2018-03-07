import { Component, Input } from '@angular/core';

@Component({
    selector: 'hc-progress-spinner',
    templateUrl: 'progress-spinner.component.html'
})
export class ProgressSpinnerComponent {
    @Input() public color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray' | 'white';
    @Input() public isCentered = true;
    @Input() public hasChannel = true;
    @Input() public isDeterminate = false;
    @Input() public set progress(progress: number) { this.setProgress(progress); };
    @Input() public get progress() { return this._progress; };
    @Input() public set diameter(diameter: number) { this._diameter = Math.min(Math.max(this.minDiameter, diameter), this.maxDiameter); };
    public get diameter(): number { return this._diameter; };

    public rightCircleTransform = '';
    public leftCircleTransform = '';
    public rightCircleTransition = '';
    public leftCircleTransition = '';
    public determinateTransitionTime = '';
    private _progress = 0;
    private _diameter = 0;
    private _strokeWidth = 0;
    private minDiameter = 20;
    private maxDiameter = 250;

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
        if ( progress <= 50 && this._progress <= 50 || progress >= 51 && this._progress >= 51) {
            this.leftCircleTransition = `transform ${timing}s ease-in-out 0s`;
            this.rightCircleTransition = `transform ${timing}s ease-in-out 0s`;
        } else if (progress <= 50 && this._progress >= 51) {
            this.leftCircleTransition = `transform ${halfTime}s ease-in 0s`;
            this.rightCircleTransition = `transform ${halfTime}s ease-out ${halfTime - 0.001}s`;
        } else if (progress >= 51 && this._progress <= 50) {
            this.leftCircleTransition = `transform ${halfTime}s ease-out ${halfTime - 0.001}s`;
            this.rightCircleTransition = `transform ${halfTime}s ease-in 0s`;
        }
    }

    /**
     * Using a somewhat complicated set of transforms to achive the animation.
     * For 0% to 50% the right circle element rotates from -135deg to 45deg
     * For 51% to 100% the left circle element rotates from 135deg to 315deg
     */
    private setProgressTransform(progress: number) {
        if (progress <= 50) {
            const rightDegrees = progress / 50 * 180 - 135;
            this.rightCircleTransform = `rotate(${rightDegrees}deg)`;
            this.leftCircleTransform = `rotate(135deg)`;
        } else if (progress >= 51) {
            const leftDegrees = (progress - 50) / 50 * 180 + 135;
            this.leftCircleTransform = `rotate(${leftDegrees}deg)`;
            this.rightCircleTransform = 'rotate(45deg)';
        }
    }
}