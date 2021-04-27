import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {ModalService} from './modal.service';
import {ActiveModal} from './active-modal';
import {ModalWindowComponent} from './modal-window.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ModalOverlayComponent} from './modal-overlay.component';
import {BrowserModule, By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ModalDragComponent } from './modal-drag.component';

describe('hc-modal', () => {
    let windowComponent: ModalWindowComponent;
    let windowFixture: ComponentFixture<ModalWindowComponent>;
    let overlayComponent: ModalOverlayComponent;
    let overlayFixture: ComponentFixture<ModalOverlayComponent>;
    let modalService: ModalService;
    let activeModal: ActiveModal;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, BrowserAnimationsModule, BrowserModule, DragDropModule],
            declarations: [ModalWindowComponent, ModalOverlayComponent, ModalDragComponent],
            providers: [ActiveModal, ModalService]
        }).compileComponents();
    });

    beforeEach(() => {
        windowFixture = TestBed.createComponent(ModalWindowComponent);
        windowComponent = windowFixture.componentInstance;
        windowFixture.detectChanges();

        overlayFixture = TestBed.createComponent(ModalOverlayComponent);
        overlayComponent = overlayFixture.componentInstance;
        overlayFixture.detectChanges();
    });

    it('should create a window component', () => {
        expect(windowComponent).toBeTruthy();
    });

    it('should create an overlay component', () => {
        expect(overlayComponent).toBeTruthy();
    });

    it('should change size depending on options', () => {
        let div: DebugElement = windowFixture.debugElement.query(By.css('.hc-modal'));
        expect(div.properties['className']).toContain('hc-modal-auto');
        windowComponent._size = 'lg';
        windowFixture.detectChanges();
        expect(div.properties['className']).toContain('hc-modal-lg');
    });
});