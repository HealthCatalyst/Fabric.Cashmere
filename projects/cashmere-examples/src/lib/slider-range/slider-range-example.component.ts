import { Component } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { UntypedFormControl } from '@angular/forms';

/**
 * @title Range Slider
 */
@Component({
    selector: 'hc-slider-range-example',
    templateUrl: 'slider-range-example.component.html',
    styleUrls: ['slider-range-example.component.scss']
})
export class SliderRangeExampleComponent {
    private invalid = false;
    sliderDisabled = false;
    sliderControl = new UntypedFormControl([20, 80]);
    options: Options = {
        floor: 0,
        ceil: 250
    };

    toggleDisabled(): void {
        // Disabled is set on the ngx-slider
        // Due to change detection rules in Angular, we need to re-create the options object to apply the change
        const newOptions: Options = Object.assign({}, this.options);
        newOptions.disabled = !this.options.disabled;
        this.options = newOptions;
    }

    toggleValid(): void {
        this.invalid = !this.invalid;
        if (this.invalid) {
            this.sliderControl.setErrors({invalid: true});
        } else {
            this.sliderControl.setErrors(null);
        }
    }

    resetValid(): void {
        this.invalid = false;
    }
}
