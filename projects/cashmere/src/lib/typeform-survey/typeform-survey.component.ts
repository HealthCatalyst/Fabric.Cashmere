import {Component, Input, ViewEncapsulation} from '@angular/core';

export function throwErrorForMissingSurveyUri() {
    throw Error(`SurveyUri must be specified on element hc-typeform-survey`);
}

export class TypeformWindow extends Window {
    public typeformEmbed: any;
}

@Component({
    selector: 'hc-typeform-survey',
    template: `
        <a
            class="typeform-share link"
            [href]="_fullUri"
            data-mode="drawer_right"
            data-auto-open="true"
            data-submit-close-delay="0"
            target="_blank"
            rel="noopener"
        ></a>
    `,
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class TypeformSurveyComponent {
    /**
     * TypeForm survey URI you want to use. Example: https://somecompany.typeform.com/to/surveyId?parameter=parametervalue
     */
    @Input() public set surveyUri(uri: string) {
        this._surveyUri = uri;
        this.refreshFullUri();
    }
    public get surveyUri(): string {
        return this._surveyUri;
    }
    /**
     * App version which will be passed to the survey in a hidden field. Ensures you know what version the feedback is referencing.
     */
    @Input() public set appVersion(version: string) {
        this._appVersion = version;
        this.refreshFullUri();
    }
    public get appVersion(): string {
        return this._appVersion;
    }
    public _fullUri: string;
    private _surveyUri: string = "";
    private _appVersion: string;
    private _id: string = 'typef_orm_share';

    /**
     * Opens the survey specified in the surveyUri
     */
    public open() {
        if (!document.getElementById(this._id)) {
            this.getScripts();
        } else {
            (<TypeformWindow>(<unknown>window)).typeformEmbed.makePopup(this._fullUri, {
                mode: 'drawer_right',
                autoOpen: true,
                opacity: 100,
                autoClose: 0,
                hideScrollbars: true
            });
        }
    }

    private refreshFullUri() {
        let varChar: string = this.surveyUri.includes('?') ? '&' : '?';
        this._fullUri = this.appVersion ? this.surveyUri + varChar + 'app_version=' + this.appVersion : this.surveyUri;
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
