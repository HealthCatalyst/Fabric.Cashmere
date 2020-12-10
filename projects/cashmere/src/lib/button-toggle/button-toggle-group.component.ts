
import { AfterContentInit, Component, ContentChildren, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ButtonToggleChangeEvent } from './button-toggle-change-event';
import { parseBooleanAttribute } from '../util';
import { ButtonToggleComponent } from './button-toggle.component';

const supportedStyles = ['primary', 'primary-alt', 'destructive', 'neutral', 'secondary'];
const supportedColors = ['blue', 'green', 'purple', 'red', 'orange', 'ruby-red', 'deep-red', 'red-orange', 'magenta', 'pink', 'light-pink', 'azure', 'teal', 'dark-green', 'brown', 'purple-gray', 'yellow', 'yellow-orange', 'tan'];
const supportedSizes = ['sm', 'md', 'lg'];

export function validateStyleInput(style: string) {
    console.log(style);
    if (supportedStyles.indexOf(style) < 0 && supportedColors.indexOf(style) < 0) {
        throw Error('Unsupported buttonStyle attribute value on ButtonToggleGroupComponent: ' + style);
    }
}

export function validateSizeInput(size: string) {
    if (supportedSizes.indexOf(size) < 0) {
        throw Error('Unsupported size attribute value on ButtonToggleGroupComponent: ' + size);
    }
}

/** `hc-button-toggle-group` components are on/off toggles with the appearance of a `hc-button`.
 * These toggle groups may be configured to behave as single-select (like radio buttons), or multi-select (like checkboxes). */
@Component({
    selector: 'hc-button-toggle-group',
    templateUrl: './button-toggle-group.component.html',
    styleUrls: ['./button-toggle-group.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonToggleGroupComponent implements AfterContentInit, OnDestroy {
    private _disabled = false;
    private _style: string = 'secondary';
    private _size: string = 'md';
    private _multiple: boolean = false;
    private unsubscribe$ = new Subject<void>();

    @HostBinding('class.hc-button-toggle-group') _hostClass = true;

    @ContentChildren(ButtonToggleComponent)
    _buttons: QueryList<ButtonToggleComponent>;

    @Output() selectionChangedEvent: EventEmitter<ButtonToggleChangeEvent> = new EventEmitter<ButtonToggleChangeEvent>();

    /** Sets style of toggle. Choose from: `'primary' | 'primary-alt' | 'destructive' | 'neutral' | 'secondary'`.
    * If needed, colors from the primary or secondary palette may be used as well (e.g. 'pink', 'red-orange', etc) */
    @Input()
    get buttonStyle(): string {
        return this._style;
    }
    set buttonStyle(val: string) {
        validateStyleInput(val);
        if (supportedStyles.indexOf(val) < 0) {
            val = "button-" + val;
        }
        this._style = val;
        this._updateButtonStyle();
    }

    /** Sets size of toggle. Choose from: `'sm' | 'md' | 'lg' |`. *Defaults to `md`.* */
    @Input()
    get size(): string {
        return this._size;
    }

    set size(size: string) {
        validateSizeInput(size);
        this._size = size;
        this._updateButtonStyle();
    }

    /** Whether multiple button toggles can be selected. *Defaults to `false`.* */
    @Input()
    get multiple(): boolean {
        return this._multiple;
    }
    set multiple(val) {
        this._multiple = parseBooleanAttribute(val);
    }

    /** Whether the control is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
    }


    _updateButtonStyle() {
        if (this._buttons) {
            this._buttons.forEach((button: ButtonToggleComponent) => {
                const checkedClass = button.selected ? 'hc-toggle-checked' : '';
                button._hostClass = 'hc-button-toggle hc-' + this._style + ' ' + 'hc-' + this._size + ' ' + checkedClass;
            });
        }
    }

    _updateValue(targetButton: ButtonToggleComponent) {
        if (!this.multiple) {
            this._buttons.forEach((button: ButtonToggleComponent) => {
                if (button !== targetButton) {
                    button._selected = false;
                }

            });
        }
        this._updateButtonStyle();
    }

    ngAfterContentInit() {
        setTimeout(() => {
            this._updateButtonStyle();
        });

        if (this._buttons) {
            this._buttons.forEach((button: ButtonToggleComponent) => {
                button._toggleClick.pipe(takeUntil(this.unsubscribe$)).subscribe(
                    (target: ButtonToggleComponent) => {
                        this._updateValue(target);
                        this.selectionChangedEvent.emit(new ButtonToggleChangeEvent(this._buttons.filter((btn: ButtonToggleComponent) => {
                            return target.selected;
                        }), target.value));
                    })
            });
        }
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}


// import { ElementRef, Input, QueryList, Renderer2 } from '@angular/core';
// import { AfterViewInit, Component, ContentChildren, EventEmitter, forwardRef, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { parseBooleanAttribute } from '../util';
// import { ButtonToggleChangeEvent } from './button-toggle-change-event';
// import { ButtonToggleComponent } from './button-toggle.component';





// export function validateStyleInput(style: string) {
//     if (supportedStyles.indexOf(style) < 0 && supportedColors.indexOf(style) < 0) {
//         throw Error('Unsupported buttonStyle attribute value on ButtonComponent: ' + style);
//     }
// }

// export function validateSizeInput(size: string) {
//     if (supportedSizes.indexOf(size) < 0) {
//         throw Error('Unsupported size attribute value on ButtonComponent: ' + size);
//     }
// }

// const supportedStyles = ['primary', 'primary-alt', 'destructive', 'neutral', 'secondary', 'minimal', 'link', 'link-inline'];
// const supportedColors = ['blue', 'green', 'purple', 'red', 'orange', 'ruby-red', 'deep-red', 'red-orange', 'magenta', 'pink', 'light-pink', 'azure', 'teal', 'dark-green', 'brown', 'purple-gray', 'yellow', 'yellow-orange', 'tan'];
// const supportedSizes = ['sm', 'md', 'lg'];

// /** Notification banners are used for general information about the state of the application or upcoming events. For instant
//  * feedback responding to user actions, use a toaster message.*/
// @Component({
//     selector: 'hc-button-toggle-group',
//     templateUrl: './button-toggle-group.component.html',
//     styleUrls: ['./button-toggle-group.component.scss'],
//     encapsulation: ViewEncapsulation.None
// })
// export class ButtonToggleGroupComponent implements AfterViewInit, OnDestroy {

//     @Output() selectionChangedEvent: EventEmitter<ButtonToggleChangeEvent> = new EventEmitter<ButtonToggleChangeEvent>();

//     public nextUniqueId: number = 0;
//     /** A list of all the radio buttons included in the group */
//     @ContentChildren(
//         forwardRef(() => ButtonToggleComponent),
//         { descendants: true }
//     )
//     private _buttonToggles: QueryList<ButtonToggleComponent>;
//     public get buttonToggles(): ButtonToggleComponent[] {
//         if (this._buttonToggles && this._buttonToggles.length > 0) {
//             return this._buttonToggles.toArray();
//         } else { return []; }
//     }

//     private _inline = false;
//     private _tight: boolean = false;
//     public selectedButtonToggle: ButtonToggleComponent | null = null;
//     private unsubscribe$ = new Subject<void>();



//     private _disabled = false;
//     private _style: string;
//     private _size: string;

//     /** Sets style of button. Choose from: `'primary' | 'primary-alt' | 'destructive' |
//      * 'neutral' | 'secondary' | 'minimal' | link' | 'link-inline'`. If needed, colors from
//      * the primary or secondary palette may be used as well (e.g. 'pink', 'red-orange', etc) */
//     @Input()
//     get buttonStyle(): string {
//         return this._style;
//     }

//     set buttonStyle(btnStyle: string) {
//         validateStyleInput(btnStyle);
//         if (supportedStyles.indexOf(btnStyle) < 0) {
//             btnStyle = "button-" + btnStyle;
//         }
//         this.setHostClass(this._style, btnStyle);
//         this._style = btnStyle;
//         if (this.buttonToggles && this.buttonToggles.length > 0) {
//             this.watchButtonToggles();
//         }
//     }

//     /** Sets size of button. Choose from: `'sm' | 'md' | 'lg' |`. *Defaults to `md`.* */
//     @Input()
//     get size(): string {
//         return this._size;
//     }

//     set size(size: string) {
//         validateSizeInput(size);
//         this.setHostClass(this._size, size);
//         this._size = size;
//     }


//     constructor(public elementRef: ElementRef, private renderer: Renderer2) {
//         this.buttonStyle = 'primary';
//         this.size = 'md';
//     }


//     /** Used to give focus to the button */
//     focus(): void {
//         this.elementRef.nativeElement.focus();
//     }

//     private setHostClass(previous: string, current) {
//         if (previous !== current) {
//             if (previous) {
//                 this.renderer.removeClass(this.elementRef.nativeElement, this._hcClassify(previous));
//             }
//             this.renderer.addClass(this.elementRef.nativeElement, this._hcClassify(current));
//         }
//     }

//     private _hcClassify(style: string): string {
//         return `hc-${style}`;
//     }




//     public ngAfterViewInit(): void {
//         setTimeout(() => {
//             this.watchButtonToggles();
//         }, 100);

//         // If buttons are added dynamically, recheck the items
//         this._buttonToggles.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.watchButtonToggles());
//     }

//     public initializeSelectedButton(): void {
//         this.buttonToggles.forEach((item: ButtonToggleComponent) => {
//             if (this.selectedButtonToggle === null) {
//                 if (item.selected) {
//                     this.selectedButtonToggle = item;
//                     this.selectionChangedEvent.emit(new ButtonToggleChangeEvent(item, item.value));
//                 }
//             } else {
//                 if (this.selectedButtonToggle !== item) {
//                     item.selected = false;
//                 }
//             }
//         });
//     }

//     public watchButtonToggles(): void {
//         if (this.selectedButtonToggle === null) {
//             this.initializeSelectedButton();
//         }

//         this._buttonToggles.forEach((item: ButtonToggleComponent) => {
//             item.buttonSelected.subscribe((bt: ButtonToggleChangeEvent) => {
//                 if (this.selectedButtonToggle !== item) {
//                     item.selected = true;
//                     this.selectedButtonToggle = item;
//                     this.clearSelections();
//                     this.selectionChangedEvent.emit(bt);
//                 }
//             });
//         });
//     }

//     public clearSelections(): void {
//         this._buttonToggles.forEach((item: ButtonToggleComponent) => {
//             if (this.selectedButtonToggle !== item) {
//                 item.selected = false;
//             }
//         });
//     }

//     public ngOnDestroy(): void {
//         this.unsubscribe$.next();
//         this.unsubscribe$.complete();
//     }

// }


