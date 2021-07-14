import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule, By} from '@angular/platform-browser';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActiveModal} from './active-modal';
import {ModalService} from './modal.service';
import {CommonModule} from '@angular/common';
import {DebugElement} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ModalBodyComponent} from './modal-body.component';

describe('hc-modal-body', () => {
    let bodyComponent: ModalBodyComponent;
    let bodyFixture: ComponentFixture<ModalBodyComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, BrowserAnimationsModule, BrowserModule, DragDropModule],
            declarations: [ModalBodyComponent],
            providers: [ActiveModal, ModalService]
        }).compileComponents();
    });

    beforeEach(() => {
        bodyFixture = TestBed.createComponent(ModalBodyComponent);
        bodyComponent = bodyFixture.componentInstance;
        bodyFixture.detectChanges();
    });

    it('should create a body component', () => {
        expect(bodyComponent).toBeTruthy();
    });

    it('should detect no text within the modal base body component', () => {
        const text: DebugElement = bodyFixture.debugElement.query(By.css('p'));
        expect(text).toBeNull();
    });
});
