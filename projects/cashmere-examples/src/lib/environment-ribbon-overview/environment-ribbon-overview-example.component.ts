import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'hc-environment-ribbon-overview-example',
    templateUrl: './environment-ribbon-overview-example.component.html',
    styleUrls: ['./environment-ribbon-overview-example.component.scss']
})
export class EnvironmentRibbonOverviewExampleComponent {

    environment: string = 'prod';
    inputControl = new FormControl(this.environment);

    changeEnvironment() {
        this.environment = this.inputControl.value;
    }

}
