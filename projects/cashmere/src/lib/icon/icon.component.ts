import {Attribute, Component, ElementRef, HostBinding, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';

/** Object used to pass values that will be used in an IconComponent */
export interface HcIcon {
    /** Font set icon is a part of */
    fontSet: string;
    /** Name of icon within a font set */
    fontIcon: string;
    /** Optional height in pixels of the icon; defaults to 37 */
    fontSize?: number;
}

/** Makes using a font icon easier. */
@Component({
    selector: 'hc-icon',
    template: '<ng-content></ng-content>',
    styleUrls: ['./icon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IconComponent implements OnChanges {
    private _fontIcon: string = '';
    private _fontSet: string = '';

    private _previousFontIcon: string = '';
    private _previousFontSet: string = '';

    @HostBinding('class.hc-icon')
    _hostClass = true;

    /** Name of icon within a font set. */
    @Input()
    get fontIcon(): string {
        return this._fontIcon;
    }

    set fontIcon(icon: string) {
        this._fontIcon = this._cleanupFontValue(icon);
    }

    /** Font set icon is a part of. */
    @Input()
    get fontSet(): string {
        return this._fontSet;
    }

    set fontSet(fontSet: string) {
        this._fontSet = this._cleanupFontValue(fontSet);
    }

    constructor(private elementRef: ElementRef, @Attribute('aria-hidden') ariaHidden: string) {
        // icon should be hidden for accessibility
        if (!ariaHidden) {
            elementRef.nativeElement.setAttribute('aria-hidden', 'true');
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._updateFontIcon();
    }

    private _updateFontIcon(): void {
        const element = this.elementRef.nativeElement;
        if (this._previousFontIcon !== this._fontIcon) {
            if (this._previousFontIcon) {
                element.classList.remove(this._previousFontIcon);
            }
            if (this._fontIcon) {
                element.classList.add(this._fontIcon);
                this._previousFontIcon = this._fontIcon;
            }
        }

        if (this._previousFontSet !== this._fontSet) {
            if (this._previousFontSet) {
                element.classList.remove(this._previousFontSet);
            }
            if (this._fontSet) {
                element.classList.add(this._fontSet);
                this._previousFontSet = this._fontSet;
            }
        }
    }

    // make sure that there are no spaces and that if they sent multiple space separated values grab the first
    private _cleanupFontValue(fontValue: string): string {
        return (fontValue || '').trim().split(' ')[0];
    }
}
