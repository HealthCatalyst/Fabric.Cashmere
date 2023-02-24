import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploaderModule } from './file-uploader.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <hc-file-uploader [formControl]="uploaderForm" (filesAdded)="onFileAdd($event)"></hc-file-uploader>
    `
})
export class FileUploaderFormComponent {
    uploaderForm: FormControl = new FormControl( true );

    onFileAdd: (event?: FileList) => void = () => null;
}

describe('FileUploaderComponent', () => {
    let formComponent: FileUploaderFormComponent;
    let formFixture: ComponentFixture<FileUploaderFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FileUploaderFormComponent],
            imports: [FileUploaderModule, FormsModule, ReactiveFormsModule]
        }).compileComponents();

        formFixture = TestBed.createComponent(FileUploaderFormComponent);
        formComponent = formFixture.componentInstance;
        formFixture.detectChanges();
    }));

    it('should update the FormControl when a file is selected', () => {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(new File([''], 'test-file.pdf'))

        const inputDebugEl  = formFixture.debugElement.query(By.css('input[type=file]'));
        inputDebugEl.nativeElement.files = dataTransfer.files;

        inputDebugEl.nativeElement.dispatchEvent(new InputEvent('change'));

        formFixture.detectChanges();

        expect(formComponent.uploaderForm.value).toBeTruthy();
        expect(formComponent.uploaderForm.value[0].name).toBe('test-file.pdf')
    });

    it('should fire a filesAdded event when a file is selected', () => {
        spyOn(formComponent, 'onFileAdd');

        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(new File([''], 'test-file.pdf'))

        const inputDebugEl  = formFixture.debugElement.query(By.css('input[type=file]'));
        inputDebugEl.nativeElement.files = dataTransfer.files;

        inputDebugEl.nativeElement.dispatchEvent(new InputEvent('change'));

        formFixture.detectChanges();

        return formFixture.whenStable().then(() => {
            expect(formComponent.onFileAdd).toHaveBeenCalledTimes(1);
        });
    });
});
