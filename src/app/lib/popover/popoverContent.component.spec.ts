import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverContentComponent } from './popoverContent.component';
import { PopoverDirective } from './popover.directive';

describe('PopoverContentComponent', () => {
    let component: PopoverContentComponent;
    let fixture: ComponentFixture<PopoverContentComponent>;
    const mockPopoverComponent: PopoverContentComponent = new PopoverContentComponent(<any>undefined);
    const mockViewContainerRef: any = {
        createComponent: jasmine.createSpy('createComponent')
            .and.returnValue({
                'instance': mockPopoverComponent,
                'destroy': jasmine.createSpy('destroy')
            }),
        element: {nativeElement: ''}
    };
    let directive: PopoverDirective;

    const mockResolver: any = {
        resolveComponentFactory: jasmine.createSpy('resolveComponentFactory')
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PopoverContentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopoverContentComponent);
        component = fixture.componentInstance;
        directive = new PopoverDirective(mockViewContainerRef, mockResolver, <any>undefined, <any>undefined);
        fixture.detectChanges();
    });

    describe('constructor', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    // describe('onDocumentMouseDown', () => {
    //     it('should emit onCloseFromOutside', () => {
    //         const emitSpy: jasmine.Spy = spyOn(component.onCloseFromOutside, 'emit');
    //         component.onDocumentMouseDown({target: true});
    //         expect(emitSpy).toHaveBeenCalled();
    //     });
    // });
});
