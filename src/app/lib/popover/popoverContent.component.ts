import {
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
    EventEmitter,
    HostListener, Renderer2,
} from '@angular/core';
import Popper from 'popper.js';
import { Placements, Triggers, PopperContentOptions } from 'app/lib/popover/popover.model';

@Component({
    styleUrls: ['./popoverContent.component.scss'],
    selector: 'hc-popover-content',
    templateUrl: './popoverContent.component.html',
})
export class PopoverContentComponent implements OnDestroy {
    popperOptions: PopperContentOptions = <PopperContentOptions>{
        disableAnimation: false,
        disableDefaultStyling: false,
        placement: Placements.Auto,
        boundariesElement: '',
        trigger: Triggers.HOVER,
        positionFixed: false,
        popperModifiers: {}
    };

    referenceObject: HTMLElement;

    isMouseOver: boolean = false;

    onHidden = new EventEmitter();

    text: string;

    popperInstance: Popper;

    displayType: string = 'none';

    opacity: number = 0;

    private globalResize: any;

    @ViewChild('popperViewRef')
    popperViewRef: ElementRef;

    @HostListener('mouseover')
    onMouseOver() {
        this.isMouseOver = true;
    }

    @HostListener('mouseleave')
    showOnLeave() {
        this.isMouseOver = false;
        if (this.popperOptions.trigger !== Triggers.HOVER) {
            return;
        }
        this.hide();
    }

    onDocumentResize() {
        this.update();
    }

    constructor(private renderer: Renderer2) {
    }

    ngOnDestroy() {
        if (!this.popperInstance) {
            return;
        }
        (this.popperInstance as any).disableEventListeners();
        this.popperInstance.destroy();

    }

    show(): void {
        if (!this.referenceObject) {
            return;
        }

        let popperOptions: Popper.PopperOptions = <Popper.PopperOptions>{
            placement: this.popperOptions.placement,
            positionFixed: this.popperOptions.positionFixed,
            modifiers: {
                arrow: {
                    element: this.popperViewRef.nativeElement.querySelector('.arrow')
                }
            }
        };

        let boundariesElement = this.popperOptions.boundariesElement && document.querySelector(this.popperOptions.boundariesElement);

        if (popperOptions.modifiers && boundariesElement) {
            popperOptions.modifiers.preventOverflow = { boundariesElement };
        }

        popperOptions.modifiers = Object.assign(popperOptions.modifiers, this.popperOptions.popperModifiers);

        this.popperInstance = new Popper(
            this.referenceObject,
            this.popperViewRef.nativeElement,
            popperOptions,
        );
        (this.popperInstance as any).enableEventListeners();
        this.scheduleUpdate();
        this.toggleVisibility(true);
        this.globalResize = this.renderer.listen('document', 'resize', this.onDocumentResize.bind(this))
    }

    update(): void {
        if (this.popperInstance) {
            (this.popperInstance as any).update();
        }
    }

    scheduleUpdate(): void {
        if (this.popperInstance) {
            (this.popperInstance as any).scheduleUpdate();
        }
    }

    hide(): void {
        if (this.popperInstance) {
            this.popperInstance.destroy();
        }
        this.toggleVisibility(false);
        this.onHidden.emit();
    }

    toggleVisibility(state: boolean) {
        if (!state) {
            this.opacity = 0;
            this.displayType = 'none';
        } else {
            this.opacity = 1;
            this.displayType = 'block';
        }
    }

    public clearGlobalResize() {
        if (this.globalResize && typeof this.globalResize === 'function') {
            this.globalResize();
        }
    }
}
