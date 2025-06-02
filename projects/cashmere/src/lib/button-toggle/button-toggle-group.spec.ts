import {ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';
import {ButtonToggleGroupComponent} from './button-toggle-group.component';
import {ButtonToggleComponent} from './button-toggle.component';
import {ButtonToggleChangeEvent} from './button-toggle-change-event';
import {ButtonToggleModule} from './button-toggle.module';
import {Component, ViewChild} from '@angular/core';

@Component({
    template: `
        <hc-button-toggle-group (selectionChangedEvent)='changedEvent($event)' #group>
            <hc-button-toggle value='one' #one>one</hc-button-toggle>
            <hc-button-toggle value='two' #two>two</hc-button-toggle>
        </hc-button-toggle-group>
    `,
    standalone: false
})
export class TestButtonToggleGroup {
    @ViewChild('group', {static: false})
    toggleGroup: ButtonToggleGroupComponent;
    @ViewChild('one', {static: false})
    toggleOne: ButtonToggleComponent;
    @ViewChild('two', {static: false})
    toggleTwo: ButtonToggleComponent;

    changedEvent: (event?: ButtonToggleChangeEvent) => void = () => {
        // do nothing
    };
}

describe('ButtonToggleGroup', () => {
    let component: TestButtonToggleGroup;
    let fixture: ComponentFixture<TestButtonToggleGroup>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestButtonToggleGroup],
            imports: [ButtonToggleModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestButtonToggleGroup);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('after initialization', () => {
        beforeEach(() => fixture.detectChanges());

        it('should initialize properly without errors', () => {
            expect(component).toBeTruthy();
        });

        describe('.buttonStyle', () => {
            describe('by default', () => {
                it('all children should be set to "secondary"', async () => {
                    await fixture.whenStable();
                    expect(component.toggleOne._hostClass).toContain('hc-secondary');
                    expect(component.toggleTwo._hostClass).toContain('hc-secondary');
                });
            });
            describe('when set to an invalid value', () => {
                it('should throw an error', () => {
                    const wrap = () => (component.toggleGroup.buttonStyle = 'not-a-valid-style');
                    expect(wrap).toThrowError();
                });
            });
            describe('when set to a valid value', () => {
                it('should set the style of all children', () => {
                    component.toggleGroup.buttonStyle = 'primary';
                    fixture.detectChanges();

                    expect(component.toggleOne._hostClass).toContain('hc-primary');
                    expect(component.toggleTwo._hostClass).toContain('hc-primary');
                });
            });
        });

        describe('.size', () => {
            describe('by default', () => {
                it('all children should be set to "md"', async () => {
                    await fixture.whenStable();
                    expect(component.toggleOne._hostClass).toContain('hc-md');
                    expect(component.toggleTwo._hostClass).toContain('hc-md');
                });
            });
            describe('when set to an invalid value', () => {
                it('should throw an error', () => {
                    const wrap = () => (component.toggleGroup.size = 'not-a-valid-style');
                    expect(wrap).toThrowError();
                });
            });
            describe('when set to a valid value', () => {
                it('should set the style of all children', () => {
                    component.toggleGroup.size = 'lg';
                    fixture.detectChanges();

                    expect(component.toggleOne._hostClass).toContain('hc-lg');
                    expect(component.toggleTwo._hostClass).toContain('hc-lg');
                });
            });
        });

        describe('.multiple', () => {
            describe('when set to true', () => {
                it('should allow multiple children to be selected', () => {
                    component.toggleGroup.multiple = true;
                    component.toggleOne.selected = true;
                    component.toggleTwo.selected = true;
                    fixture.detectChanges();

                    expect(component.toggleOne._hostClass).toContain('hc-toggle-checked');
                    expect(component.toggleTwo._hostClass).toContain('hc-toggle-checked');
                });
            });

            describe('when set to false', () => {
                it('should not allow multiple children to be selected', () => {
                    component.toggleOne.selected = true;
                    component.toggleTwo.selected = true;
                    fixture.detectChanges();

                    expect(component.toggleOne._hostClass).not.toContain('hc-toggle-checked');
                    expect(component.toggleTwo._hostClass).toContain('hc-toggle-checked');
                });
            });
        });

        describe('.valueRequired', () => {
            describe('when set to true', () => {
                it('should not allow all items to be unselected', () => {
                    component.toggleGroup.valueRequired = true;
                    component.toggleOne.selected = true;
                    component.toggleTwo.selected = true;
                    fixture.detectChanges();

                    component.toggleOne.selected = false;
                    component.toggleTwo.selected = false;
                    fixture.detectChanges();

                    expect(component.toggleOne._hostClass).not.toContain('hc-toggle-checked');
                    expect(component.toggleTwo._hostClass).toContain('hc-toggle-checked');
                });
            });

            describe('when set to false', () => {
                it('should allow all items to be unselected', () => {
                    component.toggleGroup.valueRequired = false;
                    component.toggleOne.selected = true;
                    component.toggleTwo.selected = true;
                    fixture.detectChanges();

                    component.toggleOne.selected = false;
                    component.toggleTwo.selected = false;
                    fixture.detectChanges();

                    expect(component.toggleOne._hostClass).not.toContain('hc-toggle-checked');
                    expect(component.toggleTwo._hostClass).not.toContain('hc-toggle-checked');
                });
            });
        });

        describe('.disabled', () => {
            describe('when set to true', () => {
                it('it should disable all children', () => {
                    component.toggleGroup.disabled = true;
                    fixture.detectChanges();

                    expect(component.toggleOne._hostClass).toContain('hc-toggle-disabled');
                    expect(component.toggleTwo._hostClass).toContain('hc-toggle-disabled');
                });
            });
        });

        describe('ButtonToggleComponent .disabled', () => {
            describe('when set on an individual toggle', () => {
                it('should only disable a single toggle', () => {
                    component.toggleOne.disabled = true;
                    fixture.detectChanges();

                    expect(component.toggleOne._hostClass).toContain('hc-toggle-disabled');
                    expect(component.toggleTwo._hostClass).not.toContain('hc-toggle-disabled');
                });
            });
        });

        describe('.selectionChangedEvent', () => {
            describe('when a selection changes', () => {
                it('should fire an event with a ButtonToggleChangeEvent', () => {
                    spyOn( component, 'changedEvent' );
                    component.toggleOne.selected = true;
                    fixture.detectChanges();

                    const toggleEvent: ButtonToggleChangeEvent = new ButtonToggleChangeEvent(
                        component.toggleOne,
                        [component.toggleOne, component.toggleTwo],
                        ['one']);
                    expect(component.changedEvent).toHaveBeenCalledWith(toggleEvent);
                });
            });
        });
    });
});
