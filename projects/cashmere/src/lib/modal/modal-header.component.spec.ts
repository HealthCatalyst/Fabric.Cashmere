import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActiveModal} from './active-modal';
import {ModalService} from './modal.service';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ModalHeaderComponent} from './modal-header.component';

describe('hc-modal-header', () => {
    let headerComponent: ModalHeaderComponent;
    let headerFixture: ComponentFixture<ModalHeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, BrowserAnimationsModule, BrowserModule, DragDropModule],
            declarations: [ModalHeaderComponent],
            providers: [ActiveModal, ModalService]
        }).compileComponents();
    });

    beforeEach(() => {
        headerFixture = TestBed.createComponent(ModalHeaderComponent);
        headerComponent = headerFixture.componentInstance;
        headerFixture.detectChanges();
    });

    it('should create an footer component', () => {
        expect(headerComponent).toBeTruthy();
    });
});
