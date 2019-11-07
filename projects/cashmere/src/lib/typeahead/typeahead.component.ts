import {
    AfterContentInit,
    Component,
    ContentChildren,
    DoCheck,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnInit,
    Optional,
    Output,
    QueryList,
    Self,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {TypeaheadItemComponent} from './typeahead-item/typeahead-item.component';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {parseBooleanAttribute} from '../util';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'hc-typeahead',
    templateUrl: './typeahead.component.html',
    styleUrls: ['./typeahead.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => TypeaheadComponent)}]
})
export class TypeaheadComponent extends HcFormControlComponent implements OnInit, AfterContentInit, ControlValueAccessor, DoCheck {

    private DIRECTION = {
        UP: 'up',
        DOWN: 'down'
    };

    _searchTerm: FormControl;
    _resultPanelHidden = true;
    _highlighted = 0;

    public _value = '';
    private _form: NgForm | FormGroupDirective | null;

    /** Number of characters required before the typehead will begin searching */
    @Input()
    minChars = 1;

    /** Placeholder text for the input box of the typeahead */
    @Input()
    placeholder = '';

    /** Event emitted after each key stroke in the typeahead box (after minChars requirement has been met) */
    @Output()
    valueChange: EventEmitter<any> = new EventEmitter<any>();

    /** Event emitted when an option is selected from the list of typeahead results */
    @Output()
    optionSelected: EventEmitter<any> = new EventEmitter<any>();

    /** Event emitted when the user hits enter and there is not an option selected (or no results available yet) */
    @Output()
    emptyOptionSelected: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren(TypeaheadItemComponent)
    _options: QueryList<TypeaheadItemComponent>;

    @ViewChild('input') _inputRef: ElementRef;
    @ViewChild('results') _resultPanel: ElementRef;
    @ViewChild('toggle') _resultToggle: ElementRef;

    constructor(
        private _elementRef: ElementRef,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional() @Inject(DOCUMENT) private _document: any,
        @Optional()
        @Self()
        public _ngControl: NgControl
    ) {
        super();

        this._form = _parentForm || _parentFormGroup;
        if (this._ngControl != null) {
            this._ngControl.valueAccessor = this;
        }
    }


    ngOnInit() {
        this._searchTerm = new FormControl(this._value);
        this._resultPanelHidden = true;
        this._highlighted = 0;

        document.body.addEventListener('click', this.handleClick.bind(this));
    }

    private handleClick(event) {
        if (this._resultPanelHidden !== true) {
            const clickTarget = event.target as HTMLElement;
            let clickedTypeahead = false;

            // check if the click was in the search input box
            if (this._elementRef) {
                if (clickTarget === this._elementRef.nativeElement ||
                    this._elementRef.nativeElement.contains(clickTarget)) {
                    clickedTypeahead = true;
                }
            }

            // check if the click was in the results panel
            if (this._resultPanel) {
                if (clickTarget === this._resultPanel.nativeElement ||
                    this._resultPanel.nativeElement.contains(clickTarget)) {
                    clickedTypeahead = true;
                }
            }

            // check if the click was on the result toggle (chevron in input box)
            if (this._resultToggle) {
                if (this._resultToggle.nativeElement.contains(clickTarget)) {
                    clickedTypeahead = true;
                }
            }

            // if the click was not in the typeahead then close the results panel
            if (!clickedTypeahead) {
                this.hideResultPanel();
            }
        }
    }

    ngAfterContentInit() {
        this._options.changes.subscribe(() => {
            this.listenForSelection();
            setTimeout(() => {
                let currentVal = this._options.length > 1 ? this._value : '';
                this.setHighlighted(0, true);
            }
            );
        });
    }

    private listenForSelection() {
        this._options.toArray().forEach(option => {
            option._selected.subscribe(() => {
                this.itemSelectedDefault(option.value);
            });
        });
    }

    _stopPropogation($event: any) {
        $event.preventDefault();
        $event.stopPropagation();
    }

    _handleTabKey($event: any) {
        this.hideResultPanel();
    }

    _filterData($event: any) {
        if ($event.keyCode === 27) {
            // handle esc key
            this.hideResultPanel();
            this.setHighlighted(0, true);
        } else if ($event.keyCode === 40) {
            // handle arrow down
            if (this._resultPanelHidden) {
                this.showResultPanel();
            } else {
                if (this._highlighted < (this._options.length - 1) && this._options.length > 0) {
                    this._highlighted += 1;
                    this.changeHighlighted(this.DIRECTION.DOWN);
                }

                this.scrollTop();
            }
        } else if ($event.keyCode === 38) {
            // handle arrow up
            if (!this._resultPanelHidden) {
                if (this._highlighted > 0) {
                    this._highlighted -= 1;
                    this.changeHighlighted(this.DIRECTION.UP);
                }

                this.scrollTop();
            }
        } else if ($event.keyCode === 13) {
            // handle enter key
            $event.preventDefault();
            $event.stopPropagation();
            let theSelection = this._options.toArray()[this._highlighted].value;
            if (theSelection) {
                this.itemSelectedDefault(theSelection);
            } else {
                this.emptyOptionSelected.emit(this._inputRef.nativeElement.value);
            }
        } else {
            const value = this._inputRef.nativeElement.value;
            if (value.length === 0) {
                this.valueChange.emit('');
                this.setHighlighted(0, false);
            }
            if (value.length >= this.minChars && value !== this._value) {
                if (this._resultPanelHidden) {
                    this.showResultPanel();
                }

                this.markAsDirty();
                this.onTouched();

                // In case the search returns some of the same results but the top result
                // has moved down the list we need to remove the highlighting from it
                // and add highlighting to the new number 1.
                this.setHighlighted(0, false);
                this.valueChange.emit(value);
                setTimeout(() => this.setHighlighted(0, true));
            }
        }
    }

    private scrollTop() {
        if (this._resultPanel) {
            this._resultPanel.nativeElement.scrollTop = this.getOptionScrollPosition(31, 200);
        }
    }

    private getOptionScrollPosition(optionHeight: number, panelHeight: number): number {
        const currentScrollPosition = this._resultPanel.nativeElement.scrollTop;
        const optionOffset = this._highlighted * optionHeight;

        if (optionOffset < currentScrollPosition) {
            return optionOffset;
        }

        if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
            return Math.max(0, optionOffset - panelHeight + optionHeight);
        }

        return currentScrollPosition;
    }

    _toggleShowResults() {
        if (this._resultPanelHidden) {
            this.showResultPanel();
            this.valueChange.emit('');
        } else {
            this.hideResultPanel();
        }
    }

    private showResultPanel() {
        this._resultPanelHidden = false;

        // set the first option as the highlighted option
        this._highlighted = 0;
        this.setHighlighted(0, true);
        this._inputRef.nativeElement.focus();
    }

    private hideResultPanel() {
        this._resultPanelHidden = true;
        this.closePanel();
    }

    private closePanel() {
        // remove highlighting from currently selected option
        this.setHighlighted(this._highlighted, false);

        // reset scroll
        if (this._resultPanel) {
            this._resultPanel.nativeElement.scrollTop = 0;
        }

        // set highlighted to the first one
        this.setHighlighted(0, true);
        this._highlighted = 0;
    }

    private itemSelectedDefault(item) {
        this.markAsDirty();
        this.onTouched();
        this.hideResultPanel();
        this.optionSelected.emit(item);
    }

    private changeHighlighted(direction: string) {
        if (direction === this.DIRECTION.DOWN && this._highlighted > 0) {
            this.setHighlighted(this._highlighted - 1, false);
        } else if (direction === this.DIRECTION.UP && this._highlighted < (this._options.length - 1)) {
            this.setHighlighted(this._highlighted + 1, false);
        }

        if (this._highlighted < this._options.length) {
            this.setHighlighted(this._highlighted, true);
        }
    }

    private setHighlighted(index: number, highlighted: boolean) {
        const option = this._options.toArray()[index];
        if (option) {
            option._highlighted = highlighted;
        }
    }

    private onChange(val: any) {
    }

    private onTouched() {
        this.markAsTouched();
    }

    markAsDirty() {
        if (this._ngControl) {
            const control = this._ngControl.control;
            if (control) {
                control.markAsDirty();
            }
        }
    }

    markAsTouched() {
        if (this._ngControl) {
            const control = this._ngControl.control;
            if (control) {
                control.markAsTouched();
            }
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: string): void {
        this._value = value;
        if (this._searchTerm) {
            this._searchTerm.setValue(value);
        }
    }

    /** Get or set the value of the select component */
    @Input()
    get value() {
        return this._value;
    }

    set value(val: string) {
        if (val !== this._value) {
            this.writeValue(val);
            this.onChange(val);
            this.onTouched();
        }
    }

    /** Enables or disables the component */
    @Input()
    get disabled(): boolean {
        if (this._ngControl && this._ngControl.disabled) {
            return this._ngControl.disabled;
        }
        return this._isDisabled;
    }

    set disabled(disabledVal) {
        this._isDisabled = parseBooleanAttribute(disabledVal);
    }

    /** Sets whether this is a required form element */
    @Input()
    get required(): boolean {
        return this._isRequired;
    }

    set required(requiredVal) {
        this._isRequired = parseBooleanAttribute(requiredVal);
    }

    ngDoCheck(): void {
        if (this._ngControl) {
            this._updateErrorState();
        }
    }

    private _updateErrorState() {
        const oldState = this._errorState;

        // TODO: this could be abstracted out as an @Input() if we need this to be configurable
        const newState = !!(
            this._ngControl &&
            this._ngControl.invalid &&
            (this._ngControl.touched || (this._form && this._form.submitted))
        );

        if (oldState !== newState) {
            this._errorState = newState;
        }
    }
}
