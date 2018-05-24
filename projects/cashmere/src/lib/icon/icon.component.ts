import {Attribute, Component, ElementRef, HostBinding, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hc-icon',
    template: '<ng-content></ng-content>',
    styleUrls: ['./icon.component.scss'],
    encapsulation: ViewEncapsulation.None // need to have this to allow users to easily change colors,size, alignment
})
export class IconComponent implements OnChanges {
    private _fontIcon: string = '';
    private _fontSet: string = '';

    private previousFontIcon: string = '';
    private previousFontSet: string = '';

    @HostBinding('class.hc-icon')
    get hcIconClass(): boolean {
        return true;
    }

    @Input()
    get fontIcon(): string {
        return this._fontIcon;
    }

    set fontIcon(icon: string) {
        this._fontIcon = this.cleanupFontValue(icon);
    }

    @Input()
    get fontSet(): string {
        return this._fontSet;
    }

    set fontSet(fontSet: string) {
        this._fontSet = this.cleanupFontValue(fontSet);
    }

    constructor(private elementRef: ElementRef, @Attribute('aria-hidden') ariaHidden: string) {
        // icon should be hidden for accessibility
        if (!ariaHidden) {
            elementRef.nativeElement.setAttribute('aria-hidden', 'true');
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateFontIcon();
    }

    private updateFontIcon(): void {
        const element = this.elementRef.nativeElement;
        if (this.previousFontIcon !== this._fontIcon) {
            if (this.previousFontIcon) {
                element.classList.remove(this.previousFontIcon);
            }
            if (this._fontIcon) {
                element.classList.add(this._fontIcon);
                this.previousFontIcon = this._fontIcon;
            }
        }

        if (this.previousFontSet !== this._fontSet) {
            if (this.previousFontSet) {
                element.classList.remove(this.previousFontSet);
            }
            if (this._fontSet) {
                element.classList.add(this._fontSet);
                this.previousFontSet = this._fontSet;
            }
        }
    }

    // make sure that there are no spaces and that if they sent multiple space separated values grab the first
    private cleanupFontValue(fontValue: string): string {
        return (fontValue || '').trim().split(' ')[0];
    }
}
