import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'hc-clear-input-btn',
    template: `
        <div class="hc-clear-input-btn" [class.hc-clear-input-btn-show]="inputEl?.value.length > 0" title="Clear" (click)="clear()"></div>
    `,
    styleUrls: ['clear-input.component.scss']
})
export class ClearInputComponent {
    /** A reference to the HTML input element */
    @Input() public inputEl: HTMLInputElement;
    @Output() public clearClicked = new EventEmitter<void>();
    public clear(): void {
        this.inputEl.value = '';
        this.inputEl.focus();
        this.inputEl.dispatchEvent(new CustomEvent('input')); // forces update of ngModel (if there is one)
        this.inputEl.dispatchEvent(new CustomEvent('keyup')); // fire off a keyup (for those inputs functioning as a search that are tied to keyup)
        this.clearClicked.emit();
    }
}
