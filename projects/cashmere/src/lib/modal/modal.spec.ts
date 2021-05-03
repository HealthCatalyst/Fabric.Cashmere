import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {dispatchMouseEvent, dispatchFakeEvent, dispatchEvent} from './utils/dispatch-events';
import {CommonModule} from '@angular/common';
import {ModalService} from './modal.service';
import {ActiveModal} from './active-modal';
import {ModalWindowComponent} from './modal-window.component';
import {ComponentFixture, TestBed, fakeAsync, flush} from '@angular/core/testing';
import {ModalOverlayComponent} from './modal-overlay.component';
import {BrowserModule, By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ModalHeaderComponent} from './modal-header.component';
import {ModalFooterComponent} from './modal-footer.component';
import {ModalBodyComponent} from './modal-body.component';


describe('hc-modal', () => {
    let windowComponent: ModalWindowComponent;
    let windowFixture: ComponentFixture<ModalWindowComponent>;
    let modalService: ModalService;
    let activeModal: ActiveModal;
    let headerComponent: ModalHeaderComponent;
    let footerComponent: ModalFooterComponent;
    let headerFixture: ComponentFixture<ModalHeaderComponent>;
    let footerFixture: ComponentFixture<ModalFooterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, BrowserAnimationsModule, BrowserModule, DragDropModule],
            declarations: [ModalWindowComponent, ModalOverlayComponent, ModalHeaderComponent, ModalFooterComponent],
            providers: [ActiveModal, ModalService]
        }).compileComponents();
    });

    beforeEach(() => {
        windowFixture = TestBed.createComponent(ModalWindowComponent);
        windowComponent = windowFixture.componentInstance;
        windowFixture.detectChanges();

        headerFixture = TestBed.createComponent(ModalHeaderComponent);
        headerComponent = headerFixture.componentInstance;
        headerFixture.detectChanges();

        footerFixture = TestBed.createComponent(ModalFooterComponent);
        footerComponent = footerFixture.componentInstance;
        footerFixture.detectChanges();
    });

    it('should create a window component', () => {
        expect(windowComponent).toBeTruthy();
    });

    it('should create an header component', () => {
        expect(headerComponent).toBeTruthy();
    });

    it('should create an footer component', () => {
        expect(footerComponent).toBeTruthy();
    });

    it('modal window should to be draggable', () => {
        windowComponent._isDraggable = true;
        windowFixture.detectChanges();
        expect(windowComponent._isDraggable).toBeTruthy();
    });

    it('should the overlay click be desable', () => {
        windowComponent._ignoreOverlayClick = true;
        windowFixture.detectChanges();
        expect(windowComponent._ignoreOverlayClick).toBeTruthy();
    });

    it('should change size depending on options', () => {
        let div: DebugElement = windowFixture.debugElement.query(By.css('.hc-modal'));
        expect(div.properties['className']).toContain('hc-modal-auto');
        // Small
        windowComponent._size = 'sm';
        windowFixture.detectChanges();
        expect(div.properties['className']).toContain('hc-modal-sm');

        // Medium
        windowComponent._size = 'md';
        windowFixture.detectChanges();
        expect(div.properties['className']).toContain('hc-modal-md');

        // Large
        windowComponent._size = 'lg';
        windowFixture.detectChanges();
        expect(div.properties['className']).toContain('hc-modal-lg');

        // X-Large
        windowComponent._size = 'lg';
        windowFixture.detectChanges();
        expect(div.properties['className']).toContain('hc-modal-lg');
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

describe('hc-modal-overlay', () => {
    let overlayComponent: ModalOverlayComponent;
    let overlayFixture: ComponentFixture<ModalOverlayComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, BrowserAnimationsModule, BrowserModule, DragDropModule],
            declarations: [ModalWindowComponent, ModalOverlayComponent],
            providers: [ActiveModal, ModalService]
        }).compileComponents();
    });

    beforeEach(() => {
        overlayFixture = TestBed.createComponent(ModalOverlayComponent);
        overlayComponent = overlayFixture.componentInstance;
        overlayFixture.detectChanges();
    });

    it('should create an overlay component', () => {
        expect(overlayComponent).toBeTruthy();
    });

    describe('on calling _ignoreEscapeKey', () => {
        // Check the default value of the property
        it('should ensure that _ignoreEscapeKey is set to false by default', () => {
            expect(overlayComponent._ignoreEscapeKey).toBe(false);
        });

        // Convert the 'ignoreEscapeKey' property to true
        it('should ensure that _ignoreEscapeKey is set to false by default', () => {
            overlayComponent._ignoreEscapeKey = true;
            overlayFixture.detectChanges();
            expect(overlayComponent._ignoreEscapeKey).toBe(true);
        });

        it('should ensure clicking the escape key will not exit the modal when _ignoreEscapeKey is set to false', fakeAsync(() => {
            const keyEvent = new KeyboardEvent('keydown', { key: 'Escape' });

            dispatchEvent(document.body, keyEvent);
            overlayFixture.detectChanges();
            flush();

            expect(document.querySelector('.hc-modal')).toBeNull();
        }));
    });
});

// hc-modal-body tests
describe('hc-modal-body', () => {
    let bodyComponent: ModalBodyComponent;
    let bodyFixture: ComponentFixture<ModalBodyComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, BrowserAnimationsModule, BrowserModule],
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
        let text: DebugElement = bodyFixture.debugElement.query(By.css('p'));
        expect(text).toBeNull();
    });
});
