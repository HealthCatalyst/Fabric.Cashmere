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
    /**
     * TypeForm survey URI you want to use. Example: https://somecompany.typeform.com/to/surveyId?parameter=parametervalue
     */
    @Input() public surveyUri: string;
    private _id: string = 'typef_orm_share';

    /**
     * Opens the survey specified in the surveyUri
     */
    public open() {
        if (!document.getElementById(this._id)) {
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

    private getScripts(): void {
        if (!this.surveyUri) {
            throwErrorForMissingSurveyUri();
        }
        /* this is directly from the embed
           markup given from TypeForm */
        let embedScript, firstScript;
        if (!document.getElementById(this._id)) {
            // create new embed script with typeform cdn source
            embedScript = document.createElement('script');
            embedScript.id = this._id;
            embedScript.src = `https://embed.typeform.com/embed.js`;

            // insert embed script before other js scripts
            firstScript = document.getElementsByTagName.call(document, 'script')[0];
            if (firstScript.parentNode) {
                firstScript.parentNode.insertBefore(embedScript, firstScript);
            }
        }
    }
}
