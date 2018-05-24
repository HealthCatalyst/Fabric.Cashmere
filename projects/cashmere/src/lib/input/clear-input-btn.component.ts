import {ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core';
import {InputComponent} from './input.component';

@Component({
    selector: 'hc-clear-input-btn',
    template: `<hc-icon *ngIf="inputEl?.value.length > 0" icon-sm fontSet="fa" fontIcon="fa-times-circle"
    class="hc-clear-btn" title="Clear" (click)="clear()"></hc-icon>`
})
export class ClearInputBtnComponent implements OnDestroy {
    @Input()
    public set input(input: HTMLInputElement | InputComponent) {
        this.setInput(input);
    }
    public inputEl?: HTMLInputElement;
    private checkShouldShowClearBtn = () => {
        this.cd.detectChanges();
    };

    constructor(private cd: ChangeDetectorRef) {}

    public ngOnDestroy() {
        this.removeEventListenerIfNeeded();
    }

    public setInput(input: HTMLInputElement | InputComponent) {
        this.removeEventListenerIfNeeded();
        this.inputEl = this.isComponent(input) ? input.elementRef.nativeElement : this.input;

        if (this.inputEl) {
            this.inputEl.addEventListener('input', this.checkShouldShowClearBtn);
        }
    }

    public clear() {
        if (!this.inputEl) {
            console.warn('Unable to clear as input element was not provided.');
        } else {
            this.inputEl.value = '';
            this.inputEl.focus();
            this.inputEl.dispatchEvent(new CustomEvent('input')); // forces update of ngModel (if there is one)
            this.inputEl.dispatchEvent(new CustomEvent('keyup')); // fire off a search (for those input where search is tied to keyup)
        }
    }

    private isComponent(input: HTMLInputElement | InputComponent): input is InputComponent {
        const component = <InputComponent>input;
        return component && !!component.elementRef;
    }

    private removeEventListenerIfNeeded() {
        if (this.inputEl) {
            this.inputEl.addEventListener('input', this.checkShouldShowClearBtn);
        }
    }
}
