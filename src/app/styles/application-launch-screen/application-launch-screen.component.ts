import {Component} from '@angular/core';

@Component({
    selector: 'hc-application-launch-screen-guide',
    template: `
        <div class="demo-content"><div [hcMarkdown]="document"></div></div>
    `
})
export class ApplicationLaunchScreenGuideComponent {
    public document: string = require('raw-loader!../../../../guides/styles/launch-screen.md');
}
