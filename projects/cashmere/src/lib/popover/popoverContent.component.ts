import {Component, ElementRef, EventEmitter, HostListener, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import Popper from 'popper.js';
import {PopperContentOptions} from './popover.model';

@Component({
    styleUrls: ['./popoverContent.component.scss'],
    selector: 'hc-popover-content',
    templateUrl: './popoverContent.component.html'
})
export class PopoverContentComponent implements OnDestroy {
    /** Default options */
    _popperOptions: PopperContentOptions = <PopperContentOptions>{
        disableAnimation: false,
        disableDefaultStyling: false,
        placement: 'auto',
        boundariesElement: '',
        trigger: 'hover',
        positionFixed: false,
        popperModifiers: {}
    };

    _referenceObject: HTMLElement;

    _isMouseOver: boolean = false;

    _onHidden = new EventEmitter();

    _text: string;

    _popperInstance: Popper;

    _displayType: string = 'none';

    _opacity: number = 0;

    private globalResize: any;

    @ViewChild('popperViewRef')
    _popperViewRef: ElementRef;

    @HostListener('mouseover')
    _onMouseOver() {
        this._isMouseOver = true;
    }

    @HostListener('mouseleave')
    _showOnLeave() {
        this._isMouseOver = false;
        if (this._popperOptions.trigger !== 'hover') {
            return;
        }
        this._hide();
    }

    _onDocumentResize() {
        this._update();
    }

    constructor(private renderer: Renderer2) {}

    ngOnDestroy() {
        if (!this._popperInstance) {
            return;
        }
        (this._popperInstance as any).disableEventListeners();
        this._popperInstance.destroy();
    }

    _show(): void {
        if (!this._referenceObject) {
            return;
        }

        let popperOptions: Popper.PopperOptions = <Popper.PopperOptions>{
            placement: this._popperOptions.placement,
            positionFixed: this._popperOptions.positionFixed,
            modifiers: {
                arrow: {
                    element: this._popperViewRef.nativeElement.querySelector('.arrow')
                }
            }
        };

        let boundariesElement = this._popperOptions.boundariesElement && document.querySelector(this._popperOptions.boundariesElement);

        if (popperOptions.modifiers && boundariesElement) {
            popperOptions.modifiers.preventOverflow = {boundariesElement};
        }

        popperOptions.modifiers = Object.assign(popperOptions.modifiers, this._popperOptions.popperModifiers);

        this._popperInstance = new Popper(this._referenceObject, this._popperViewRef.nativeElement, popperOptions);
        (this._popperInstance as any).enableEventListeners();
        this._scheduleUpdate();
        this._toggleVisibility(true);
        this.globalResize = this.renderer.listen('document', 'resize', this._onDocumentResize.bind(this));
    }

    _update(): void {
        if (this._popperInstance) {
            (this._popperInstance as any).update();
        }
    }

    _scheduleUpdate(): void {
        if (this._popperInstance) {
            (this._popperInstance as any).scheduleUpdate();
        }
    }

    _hide(): void {
        if (this._popperInstance) {
            this._popperInstance.destroy();
        }
        this._toggleVisibility(false);
        this._onHidden.emit();
    }

    _toggleVisibility(state: boolean) {
        if (!state) {
            this._opacity = 0;
            this._displayType = 'none';
        } else {
            this._opacity = 1;
            this._displayType = 'block';
        }
    }

    public _clearGlobalResize() {
        if (this.globalResize && typeof this.globalResize === 'function') {
            this.globalResize();
        }
    }
}
