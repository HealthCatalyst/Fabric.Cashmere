import {Component} from '@angular/core';

@Component({
    selector: 'hc-login-page',
    template: `
        <div class="demo-content"><div [hcMarkdown]="document"></div></div>
    `
})
export class LoginPageComponent {
    public document: string = require('raw-loader!../../../../guides/styles/login.md');
}
