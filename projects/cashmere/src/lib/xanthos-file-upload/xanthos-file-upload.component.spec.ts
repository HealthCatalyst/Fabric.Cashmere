import {TestBed, ComponentFixture} from '@angular/core/testing';
import {XanthosFileUploadComponent} from './xanthos-file-upload.component';
import {FormFieldModule} from '../form-field/index';
import {FileInputModule} from '../file-input/index';
import {SelectModule} from '../select/index';
import {FileReaderFactory} from '../file-input/file-reader-factory.service';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

describe('FileInputComponent', () => {
    let component: XanthosFileUploadComponent;
    let fixture: ComponentFixture<XanthosFileUploadComponent>;
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, FormFieldModule, FileInputModule, SelectModule],
            declarations: [XanthosFileUploadComponent],
            providers: [
                {
                    provide: FileReaderFactory,
                    useValue: {create: () => (({readAsDataURL: () => {}} as Partial<FileReader>) as FileReader)} as FileReaderFactory
                }
            ]
        }).compileComponents()
    );
    beforeEach(() => {
        fixture = TestBed.createComponent(XanthosFileUploadComponent);
        component = fixture.componentInstance;
    });
    it('should initialize without error', () => {
        expect(component).toBeTruthy();
    });
});
