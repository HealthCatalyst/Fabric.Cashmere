import {Component, forwardRef, OnDestroy, ViewChild, ElementRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil, filter, map} from 'rxjs/operators';
import {HcFormControlComponent} from '../form-field';
import {FileUpload} from '.';

@Component({
    selector: 'hc-file-input',
    templateUrl: 'file-input.component.html',
    styleUrls: ['file-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileInputComponent),
            multi: true
        },
        {
            provide: HcFormControlComponent,
            useExisting: forwardRef(() => FileInputComponent)
        }
    ]
})
export class FileInputComponent extends HcFormControlComponent implements ControlValueAccessor, OnDestroy {
    @Input()
    disabled: boolean = false;

    /**
     * The `accept` value to use on the HTML `input` element
     * > W3C recommends authors to specify both MIME-types and corresponding extensions in the accept attribute.
     * see https://stackoverflow.com/a/23706177/1396477
     * @example '.xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
     */
    @Input()
    accept: string = '*';

    @ViewChild('fileInput')
    _fileInput: ElementRef<HTMLInputElement>;

    private readonly onDestroy: Subject<void> = new Subject<void>();

    private _value: FileUpload | null = null;
    @Input()
    get value(): FileUpload | null {
        return this._value;
    }
    set value(value: FileUpload | null) {
        if (this.value !== value) {
            this.writeValue(value);
            this.onChange(value);
        }
    }

    constructor(private _fileReader: FileReader) {
        super();
    }

    ngOnDestroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    _onClick() {
        this._fileInput.nativeElement.click();
    }

    _deleteFile() {
        this.writeValue(null);
        this.value = null;
        this._fileInput.nativeElement.value = '';
    }

    _onFileSelected() {
        const file: File | null = this._fileInput.nativeElement.files![0];
        if (!file) {
            return;
        }
        this.value = Object.assign({}, file);

        fromEvent(this._fileReader, 'load')
            .pipe(
                takeUntil(this.onDestroy),
                filter(() => !!this.value && file.name === this.value.name && file.size === this.value.size && !!this._fileReader.result),
                map(() => this._fileReader.result.toString())
            )
            .subscribe(v => (this.value.base64 = v));

        this._fileReader.readAsDataURL(file);
    }

    _onBlur() {
        this.onTouched();
    }

    writeValue(value: FileUpload | null): void {
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

    private onChange(_: FileUpload | null) {
        /* placeholder - overwritten by registerOnChange, called by Angular */
    }
    private onTouched() {
        /* placeholder - overwritten by registerOnTouched, called by Angular */
    }
}
