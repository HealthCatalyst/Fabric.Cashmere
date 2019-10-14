import {Component, Input} from '@angular/core';

@Component({
    selector: 'hc-environment-ribbon',
    templateUrl: './environment-ribbon.component.html',
    styleUrls: ['./environment-ribbon.component.scss']
})
export class EnvironmentRibbonComponent {

    private _environment: string = '';
    _hidden: boolean = true;

    /** Environment name that will be displayed on the ribbon (as long as it does not start with prod) */
    @Input() set environment(value: string) {
        this._environment = value;
        this.shouldShow();
    }

    get environment(): string {
        return this._environment;
    }

    private shouldShow() {
        this._hidden = (!this._environment || this._environment.indexOf('prod') > -1);
    }
}
