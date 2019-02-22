import {async, TestBed, ComponentFixture} from '@angular/core/testing';
import {FileInputComponent} from './file-input.component';
import {FileSizePipe} from './file-size.pipe';

describe('FileInputComponent', () => {
    let component: FileInputComponent;
    let fixture: ComponentFixture<FileInputComponent>;
    beforeEach(() =>
        TestBed.configureTestingModule({
            declarations: [FileInputComponent, FileSizePipe]
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
