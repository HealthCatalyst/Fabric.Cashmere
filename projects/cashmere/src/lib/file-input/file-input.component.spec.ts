import {TestBed, ComponentFixture} from '@angular/core/testing';
import {FileInputComponent} from './file-input.component';
import {FileSizePipe} from './pipes/file-size.pipe';
import {ChipModule} from '../chip';
import {FileReaderFactory} from './file-reader-factory.service';

describe('FileInputComponent', () => {
    let component: FileInputComponent;
    let fixture: ComponentFixture<FileInputComponent>;
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [ChipModule],
            declarations: [FileInputComponent, FileSizePipe],
            providers: [
                {
                    provide: FileReaderFactory,
                    useValue: {create: () => (({readAsDataURL: () => {}} as Partial<FileReader>) as FileReader)} as FileReaderFactory
                }
            ]
        }).compileComponents()
    );
    beforeEach(() => {
        fixture = TestBed.createComponent(FileInputComponent);
        component = fixture.componentInstance;
    });
    it('should initialize without error', () => {
        expect(component).toBeTruthy();
    });
});
