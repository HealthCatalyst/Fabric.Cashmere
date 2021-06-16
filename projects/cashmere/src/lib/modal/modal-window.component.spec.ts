import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {ModalService} from './modal.service';
import {ActiveModal} from './active-modal';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserModule, By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ModalWindowComponent} from './modal-window.component';

describe('hc-modal-window', () => {
    let windowComponent: ModalWindowComponent;
    let windowFixture: ComponentFixture<ModalWindowComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, BrowserAnimationsModule, BrowserModule, DragDropModule],
            declarations: [ModalWindowComponent],
            providers: [ActiveModal, ModalService]
        }).compileComponents();
    });

    beforeEach(() => {
        windowFixture = TestBed.createComponent(ModalWindowComponent);
        windowComponent = windowFixture.componentInstance;
        windowFixture.detectChanges();
    });

    it('should create a window component', () => {
        expect(windowComponent).toBeTruthy();
    });

    it('modal window should to be draggable', () => {
        windowComponent._isDraggable = true;
        windowFixture.detectChanges();
        expect(windowComponent._isDraggable).toBeTruthy();
    });

    it('should the overlay click be disable', () => {
        windowComponent._ignoreOverlayClick = true;
        windowFixture.detectChanges();
        expect(windowComponent._ignoreOverlayClick).toBeTruthy();
    });

    describe('on calling _ignoreOverlayClick', () => {
        // Check the default state of the property
        it('should ensure that _ignoreOverlayClick is set to false by default', () => {
            expect(windowComponent._ignoreOverlayClick).toBe(false);
        });

        // Convert the 'ignoreOverlayClick' property to true
        it('should ensure that _ignoreOverlayClick can convert to true', () => {
            windowComponent._ignoreOverlayClick = true;
            windowFixture.detectChanges();
            expect(windowComponent._ignoreOverlayClick).toBe(true);
        });
    });

    describe('on calling _isDraggable', () => {
        // Check the default state of the property
        it('should ensure that _isDraggable is set to false by default', () => {
            expect(windowComponent._isDraggable).toBe(false);
        });

        // Convert the 'isDraggable' property to true
        it('should ensure that _isDraggable can convert to true', () => {
            windowComponent._isDraggable = true;
            windowFixture.detectChanges();
            expect(windowComponent._isDraggable).toBe(true);
        });
    });
});
