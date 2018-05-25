import {Component, Input} from '@angular/core';

export function throwErrorForMissingSurveyUri() {
    throw Error(`SurveyUri must be specified on element hc-typeform-survey`);
}

export class TypeformWindow extends Window {
    public typeformEmbed: any;
}

@Component({
    selector: 'hc-typeform-survey',
    template: `<a class="typeform-share link"
                [href]="surveyUri"
                data-mode="drawer_right"
                data-auto-open="true"
                data-submit-close-delay="0"
                target="_blank"
                rel="noopener">
              </a>
              `,
    styles: []
})
export class TypeformSurveyComponent {
    @Input() public surveyUri: string | undefined;
    private id: string = 'typef_orm_share';

    public getScripts(): void {
        if (!this.surveyUri) {
            throwErrorForMissingSurveyUri();
        }
        /* this is directly from the embed
           markup given from TypeForm */
        let embedScript;
        let firstScript;
        const baseUri = 'https://embed.typeform.com/';
        if (!document.getElementById(this.id)) {
            // create new embed script with typeform cdn source
            embedScript = document.createElement('script');
            embedScript.id = this.id;
            embedScript.src = `${baseUri}embed.js`;

            // insert embed script before other js scripts
            firstScript = document.getElementsByTagName.call(document, 'script')[0];
            if (firstScript.parentNode) {
                firstScript.parentNode.insertBefore(embedScript, firstScript);
            }
        }
    }

    public open() {
        if (!document.getElementById(this.id)) {
            this.getScripts();
        } else {
            (<TypeformWindow>window).typeformEmbed.makePopup(this.surveyUri, {
                mode: 'drawer_right',
                autoOpen: true,
                opacity: 100,
                autoClose: 0,
                hideScrollbars: true
            });
        }
    }
}
