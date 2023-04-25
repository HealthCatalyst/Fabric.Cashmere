import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, OnDestroy, Optional, Output, Self, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HcFormControlComponent } from '../form-field/hc-form-control.component';
import { parseBooleanAttribute } from '../util';

let nextUploaderId = 1;

/** Standard front-end for uploading files from the users local environment */
@Component({
    selector: 'hc-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => FileUploaderComponent)}]
})
export class FileUploaderComponent extends HcFormControlComponent implements AfterViewInit, OnDestroy {
    @ViewChild('dropZone') _dropZone!: ElementRef<HTMLElement>;
    @ViewChild('fileInput') _fileInputElement: ElementRef;
    private _form: NgForm | FormGroupDirective | null;
    private _unsubscribe = new Subject<void>();
    private _uniqueId = `hc-file-uploader-${nextUploaderId++}`;
    _fileIcon = '';
    _fileTypes = '*';
    _fileNames: string[] = [];
    _multiple = false;
    _disabled = false;
    _isRequired = false;
    _fileList: FileList;
    _subtext: string;

    @HostBinding('class.hc-file-uploader')
    _baseClass = true;

    /** Fires a `FileList` when files have been selected by the uploader */
    @Output() filesAdded = new EventEmitter<FileList>();

    /** Unique id for the file uploader element. If none is supplied, one will be auto-generated. */
    @Input()
    get id(): string {
        return this._componentId || this._uniqueId;
    }

    set id(idVal: string) {
        this._componentId = idVal ? idVal : this._uniqueId;
    }

    /** File types that the uploader will accept (eg. "image/png, image/jpeg"). Defaults to "*". */
    @Input()
    get fileTypes(): string {
        return this._fileTypes;
    }
    set fileTypes(value: string) {
        this._fileTypes = value;
    }

    /** Allow for multiple files to be selected. Defaults to false. */
    @Input()
    get multiple(): boolean {
        return this._multiple;
    }
    set multiple(value: boolean | string ) {
        this._multiple = parseBooleanAttribute( value );
    }

    /** Apply tight styling that condenses the controller to one line. Defaults to false. */
    @Input()
    get tight(): boolean {
        return this._tight;
    }
    set tight(value: boolean | string ) {
        this._tight = parseBooleanAttribute( value );
    }

    /** Whether the uploader is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(val: boolean | string) {
        this._disabled = parseBooleanAttribute(val);
    }

    /** Sets whether this is a required form element */
    @Input()
    get required(): boolean {
        return this._isRequired;
    }

    set required( requiredVal: boolean | string ) {
        this._isRequired = parseBooleanAttribute(requiredVal);
    }

    /** Displays an optional string of text below the browse button - typically used for instructions or info about file constraints */
    @Input()
    get subtext(): string {
        return this._subtext;
    }

    set subtext( val: string ) {
        this._subtext = val;
    }

    ngAfterViewInit(): void {
        if ( this._ngControl && this._ngControl.statusChanges ) {
            this._ngControl.statusChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
                // setTimeout is necessary to make sure any form or control state changes have been applied before rechecking error states
                setTimeout(() => {
                    this._updateErrorState();
                });
            });
        }
        if ( this._form ) {
            this._form.ngSubmit.pipe(takeUntil(this._unsubscribe)).subscribe(() => this._updateErrorState());
        }
    }

    constructor(
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional() @Self() public _ngControl: NgControl
    ) {
        super();

        this._form = _parentForm || _parentFormGroup;
        if (this._ngControl != null) {
            this._ngControl.valueAccessor = this;
        }
    }

    writeValue(value: FileList): void {
        // Prevent the form control from trying to write a value on removing the control
        if ( this.onChange.name !== 'noop' ) {
            this._fileList = value;
        }
    }

    public onChange: (value: FileList) => void = () => undefined;
    public onTouch: () => unknown = () => undefined;
    public registerOnChange(fn: (value: FileList) => void): void {
        this.onChange = fn;
    }
    public registerOnTouched(fn: () => FileList): void {
        this.onTouch = fn;
    }

    setDisabledState(disabledVal: boolean): void {
        this.disabled = disabledVal;
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

    /** Triggers the system file selection dialog to open */
    browseFiles(): void {
        this._fileInputElement.nativeElement.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    }

    /** Clears any selected files and returns to the initial state */
    reset(): void {
        this._fileInputElement.nativeElement.value = '';
        this._fileList = this._fileInputElement.nativeElement.files;
        this._fileNames = [];
    }

    _fileSelected(): void {
        const selectedFiles: FileList = this._fileInputElement.nativeElement.files;
        this._fileNames = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            this._fileNames.push( selectedFiles[i].name );
        }

        this._fileList = selectedFiles;
        this.onChange( this._fileList );
        this.onTouch();
        this.filesAdded.emit( selectedFiles );

        this._determineFileIcon();
    }

    _onFileDrop(event: DragEvent): void {
        event.preventDefault();
        this._unhighlight();
        let selectedFiles: FileList;
        const files = event?.dataTransfer?.files;
        if (!files) {
            return;
        }

        // Can't prevent a user from dropping multiple files; if multiple files are not supported, only take the first one
        if ( !this.multiple && files.length > 1 ) {
            const dt = new DataTransfer();
            dt.items.add(files[0]);
            this._fileInputElement.nativeElement.files = dt.files;
            const trimmedFiles = this._fileInputElement.nativeElement.files;
            selectedFiles = trimmedFiles;
        } else {
            selectedFiles = files;
        }

        this._fileNames = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            this._fileNames.push( selectedFiles[i].name );
        }

        this._fileList = selectedFiles;
        this.onChange( this._fileList );
        this.filesAdded.emit(selectedFiles);

        this._determineFileIcon();
    }

    _determineFileIcon(): void {
        const mimeType = this._fileList[0].type;

        if ( mimeType.includes('image') ) {
            this._fileIcon = 'hc-image-file-icon';
        } else if ( mimeType.includes('pdf') ) {
            this._fileIcon = 'hc-pdf-file-icon';
        } else if ( mimeType.includes('csv') ) {
            this._fileIcon = 'hc-csv-file-icon';
        } else if ( mimeType.includes('msword') ) {
            this._fileIcon = 'hc-doc-file-icon';
        } else if ( this._fileList[0].name.includes('.docx') ) {
            this._fileIcon = 'hc-docx-file-icon';
        } else if ( this._fileList[0].name.includes('.xls') ) {
            this._fileIcon = 'hc-xls-file-icon';
        } else if ( mimeType.includes('xml') ) {
            this._fileIcon = 'hc-xml-file-icon';
        } else if ( mimeType === 'text/plain' ) {
            this._fileIcon = 'hc-text-file-icon';
        } else if ( mimeType.includes('text/') ) {
            this._fileIcon = 'hc-text-clipping-file-icon';
        } else {
            this._fileIcon = 'hc-generic-file-icon';
        }
    }

    _allowDrop(event: Event): void {
        event.preventDefault();
        this._highlight();
    }

    _highlight(): void {
        this._dropZone?.nativeElement.classList.add('hc-file-uploader-drag-target-over');
    }

    _unhighlight(): void {
        this._dropZone?.nativeElement.classList.remove('hc-file-uploader-drag-target-over');
    }

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }
}
