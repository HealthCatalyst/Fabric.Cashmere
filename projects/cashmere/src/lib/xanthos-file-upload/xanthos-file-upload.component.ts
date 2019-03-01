import {Component, OnDestroy, DoCheck, Input, Optional, Self, OnInit, forwardRef, NgZone} from '@angular/core';
import {ControlValueAccessor, NgForm, FormGroupDirective, NgControl, FormControl, Validators} from '@angular/forms';
import {Subject, combineLatest} from 'rxjs';
import {HcFormControlComponent} from '../form-field/index';
import {XanthosFileUpload} from './xanthos-file-upload';
import {takeUntil, distinctUntilChanged} from 'rxjs/operators';
import {XANTHOS_FILE_TYPES, XANTHOS_FILE_EXTENSIONS} from './xanthos-constants';
import {fileTypeValidator} from '../file-input';

@Component({
    selector: 'hc-xanthos-file-upload',
    templateUrl: 'xanthos-file-upload.component.html',
    styleUrls: ['xanthos-file-upload.component.scss'],
    providers: [
        {
            provide: HcFormControlComponent,
            useExisting: forwardRef(() => XanthosFileUploadComponent)
        }
    ]
})
export class XanthosFileUploadComponent extends HcFormControlComponent implements ControlValueAccessor, OnInit, OnDestroy, DoCheck {
    readonly xanthosFileTypes = XANTHOS_FILE_TYPES;
    readonly xanthosFileExtensions = XANTHOS_FILE_EXTENSIONS;

    @Input()
    disabled: boolean = false;
    readonly fileControl: FormControl = new FormControl(null, fileTypeValidator(this.xanthosFileExtensions));
    readonly fileTypeControl: FormControl = new FormControl(null, Validators.required);

    private readonly onDestroy: Subject<void> = new Subject<void>();

    private _value: XanthosFileUpload | null = null;
    @Input()
    get value(): XanthosFileUpload | null {
        return this._value;
    }
    set value(value: XanthosFileUpload | null) {
        if (this.value !== value) {
            this.writeValue(value);
            this.onChange(value);
        }
    }

    private _form: NgForm | FormGroupDirective;

    constructor(
        @Optional()
        @Self()
        public _ngControl: NgControl,
        @Optional()
        form: NgForm,
        @Optional()
        formGroup: FormGroupDirective,
        private zone: NgZone
    ) {
        super();
        this._form = form || formGroup;

        if (this._ngControl != null) {
            this._ngControl.valueAccessor = this;
        }
    }

    ngOnInit() {
        combineLatest(this.fileControl.valueChanges, this.fileTypeControl.valueChanges)
            .pipe(
                takeUntil(this.onDestroy),
                distinctUntilChanged((prev, curr) => prev[0] === curr[0] && prev[1] === curr[1])
            )
            .subscribe(([file, type]) =>
                this.zone.run(() => {
                    if (this.value && this.value.file === file && this.value.type === type) {
                        return;
                    }

                    this.onTouched();
                    if (!file || !type) {
                        this.value = null;
                        this.fileTypeControl.setValidators(file ? Validators.required : null);
                    } else {
                        this.value = {file, type};
                        this.fileTypeControl.setValidators(Validators.required);
                    }
                    this.fileTypeControl.updateValueAndValidity();
                })
            );
    }

    ngOnDestroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    ngDoCheck(): void {
        // This needs to be checked every cycle because we can't subscribe to form submissions
        if (this._ngControl) {
            this._updateErrorState();
        }
    }

    private _updateErrorState() {
        const oldState = this._errorState;

        // TODO: this could be abstracted out as an @Input() if we need this to be configurable
        const newState = !!(
            this._ngControl &&
            (this._ngControl.invalid || this.fileControl.invalid || this.fileTypeControl.invalid) &&
            (this._ngControl.touched || (this._form && this._form.submitted))
        );

        if (oldState !== newState) {
            this._errorState = newState;
        }
    }

    _onBlur() {
        this.onTouched();
    }

    writeValue(value: XanthosFileUpload | null): void {
        if (value !== undefined) {
            this._value = value;
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private onChange(_: XanthosFileUpload | null) {
        /* placeholder - overwritten by registerOnChange, called by Angular */
    }
    private onTouched() {
        /* placeholder - overwritten by registerOnTouched, called by Angular */
    }
}
