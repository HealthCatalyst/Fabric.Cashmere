import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, Type, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeyCode } from '../pick.types';
import { PicklistModule } from '../picklist.module';
import { Subject } from 'rxjs';
import { PicklistService } from '../picklist.service';
import { PickPaneComponent } from './pick-pane.component';

xdescribe('PickPaneComponent', () => {
    describe('Data source and bindings', () => {
        let pickPane: PickPaneComponent;
        it('should set items from primitive numbers array', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="[0, 30, 60, 90, 120, 180, 240]">
                </hc-pick-pane>`);

            tickAndDetectChanges(fixture);
            const itemsList = fixture.componentInstance.pickPane.itemsList;
            expect(itemsList.items.length).toBe(8); // 7 given items, plus default group item
            expect(itemsList.items[1]).toEqual(jasmine.objectContaining({
                label: '0',
                value: 0
            }));
        }));

        it('should map label correctly', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="cities" bindLabel="name"> </hc-pick-pane>`);

            fixture.componentInstance.cities = [{ id: 1, name: 'Vilnius' }];
            tickAndDetectChanges(fixture);
            pickPane = fixture.componentInstance.pickPane;

            expect(pickPane.itemsList.items[1].label).toBe('Vilnius');
        }));
    });

    describe('Scrollable List', () => {
        it('should set and render items in scrollable list', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="cities" bindLabel="name">
                </hc-pick-pane>`);

            const pickPane = fixture.componentInstance.pickPane;

            expect(pickPane.dropdownPanel.items.length).toBe(4); // 3 given items, plus default group item
            let options = fixture.debugElement.nativeElement.querySelectorAll('.hc-pick-option');
            expect(options.length).toBe(3);
            expect(options[0].innerText).toBe('Vilnius');
            expect(options[1].innerText).toBe('Kaunas');
            expect(options[2].innerText).toBe('Pabrade');

            fixture.componentInstance.cities = Array.from(Array(30).keys()).map((_, i) => ({ id: i, name: String.fromCharCode(97 + i) }));
            tickAndDetectChanges(fixture);
            options = fixture.debugElement.nativeElement.querySelectorAll('.hc-pick-option');
            expect(options.length).toBe(30);
            expect(options[0].innerText).toBe('a');
        }));

        it('should always have div #padding with height 0 in dropdown panel when virtual scroll is disabled', fakeAsync(() => {
            createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="cities" bindLabel="name" [virtualScroll]="false">
                </hc-pick-pane>`);

            const panelItems = document.querySelector('.hc-pick-pane-list-items');
            const firstChild = <HTMLScriptElement>panelItems?.firstChild;

            expect(firstChild.offsetHeight).toBe(0);
        }));

        it('should have div #padding with height other than 0 in dropdown panel when virtual scroll is enabled', fakeAsync(() => {

            const fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="cities" bindLabel="name" [virtualScroll]="true">
                </hc-pick-pane>`);

            tickAndDetectChanges(fixture);
            fixture.detectChanges();

            expect(fixture.componentInstance.pickPane.dropdownPanel.items.length).toBe(4);
            const options = fixture.debugElement.nativeElement.querySelectorAll('.hc-pick-option');
            expect(options.length).toBe(3);
            expect(options[0].innerText).toBe('Vilnius');
            expect(options[1].innerText).toBe('Kaunas');
            expect(options[2].innerText).toBe('Pabrade');

            fixture.componentInstance.cities = Array.from(Array(30).keys()).map((_, i) => ({ id: i, name: String.fromCharCode(97 + i) }));
            tickAndDetectChanges(fixture);
            fixture.detectChanges();

            const panelItems = document.querySelector('.hc-pick-pane-list-items');
            const firstChild = <HTMLScriptElement>panelItems?.firstChild;

            expect(firstChild.offsetHeight).not.toBe(0);
        }));


        it('should scroll to item and do not change scroll position when scrolled to visible item', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="cities" bindLabel="name">
                </hc-pick-pane>`);
            const cmp = fixture.componentInstance;
            const el: HTMLElement = fixture.debugElement.nativeElement;
            tickAndDetectChanges(fixture);

            cmp.cities = Array.from(Array(30).keys()).map((_, i) => ({ id: i, name: String.fromCharCode(97 + i) }));
            tickAndDetectChanges(fixture);

            cmp.pickPane.dropdownPanel.scrollTo(cmp.pickPane.itemsList.items[1]);
            tickAndDetectChanges(fixture);

            const panelItems = el.querySelector('.hc-pick-pane-list-items');
            expect(panelItems?.scrollTop).toBe(0);
        }));
    });

    describe('Keyboard events in search box', () => {
        let fixture: ComponentFixture<HcPickPaneTestCmp>;
        let pickPane: PickPaneComponent;

        beforeEach(() => {
            fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="cities"
                        bindLabel="name"
                        [loading]="citiesLoading">
                </hc-pick-pane>`);
            pickPane = fixture.componentInstance.pickPane;
        });

        describe('by default', () => {
            it('on arrow down, should mark first value', fakeAsync(() => {
                const searchBox = fixture.debugElement.query(By.css('.hc-pick-search-input'));
                pickPane.itemsList.unmark();
                expect(pickPane.itemsList.markedIndex).toEqual(-1);
                triggerKeyDownEvent(searchBox, KeyCode.ArrowDown);
                expect(pickPane.itemsList.markedIndex).toEqual(1);
            }));
            it('on enter keypress, should mark first value', fakeAsync(() => {
                const searchBox = fixture.debugElement.query(By.css('.hc-pick-search-input'));
                pickPane.itemsList.unmark();
                expect(pickPane.itemsList.markedIndex).toEqual(-1);
                triggerKeyDownEvent(searchBox, KeyCode.Enter);
                expect(pickPane.itemsList.markedIndex).toEqual(1);
            }));
            it('should move focus from search to listPanel', fakeAsync(() => {
                const searchBox = fixture.debugElement.query(By.css('.hc-pick-search-input'));
                const listPanel = fixture.debugElement.query(By.css('.hc-pick-pane-list'));
                searchBox.nativeElement.focus();

                expect(searchBox.nativeElement === document.activeElement).toBeTruthy();
                expect(listPanel.nativeElement === document.activeElement).toBeFalsy();
                triggerKeyDownEvent(searchBox, KeyCode.Enter);
                expect(searchBox.nativeElement === document.activeElement).toBeFalsy();
                expect(listPanel.nativeElement === document.activeElement).toBeTruthy();
            }));
        });

        describe('when custom option currently is marked', () => {
            it('on arrow down keypress should add a new custom item', fakeAsync(() => {
                const searchBox = fixture.debugElement.query(By.css('.hc-pick-search-input'));
                spyOnProperty(pickPane, 'addCustomOptionIsMarked').and.returnValue(true);
                pickPane.searchTerm = 'test custom';
                triggerKeyDownEvent(searchBox, KeyCode.ArrowDown);
                expect(pickPane.itemsList.markedIndex).toEqual(1);
                expect(pickPane.itemsList.markedItem.label).toEqual('test custom');
            }));
            it('on enter keypress should add a new custom item', fakeAsync(() => {
                const searchBox = fixture.debugElement.query(By.css('.hc-pick-search-input'));
                spyOnProperty(pickPane, 'addCustomOptionIsMarked').and.returnValue(true);
                pickPane.searchTerm = 'test custom2';
                triggerKeyDownEvent(searchBox, KeyCode.Enter);
                expect(pickPane.itemsList.markedIndex).toEqual(1);
                expect(pickPane.itemsList.markedItem.label).toEqual('test custom2');
            }));
        });
    });

    describe('Keyboard events in list', () => {
        let fixture: ComponentFixture<HcPickPaneTestCmp>;
        let pickPane: PickPaneComponent;
        let listPanel: DebugElement;

        beforeEach(() => {
            fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="cities" bindLabel="name" [loading]="citiesLoading">
                </hc-pick-pane>`);
            pickPane = fixture.componentInstance.pickPane;
            listPanel = fixture.debugElement.query(By.css('.hc-pick-pane-list'));
        });

        describe('arrows', () => {
            it('should mark next value on arrow down', fakeAsync(() => {
                expect(pickPane.itemsList.markedIndex).toEqual(1);
                triggerKeyDownEvent(listPanel, KeyCode.ArrowDown);
                expect(pickPane.itemsList.markedIndex).toEqual(2);
            }));

            it('should stop marked loop if all items disabled', fakeAsync(() => {
                fixture.componentInstance.cities[0].disabled = true;
                fixture.componentInstance.cities = [...fixture.componentInstance.cities];
                tickAndDetectChanges(fixture);
                pickPane.filter('vil');
                tickAndDetectChanges(fixture);

                triggerKeyDownEvent(listPanel, KeyCode.ArrowDown);
                expect(pickPane.itemsList.markedItem).toBeUndefined();
            }));

            it('should mark first value on arrow down when current marked item is last', fakeAsync(() => {
                pickPane.itemsList.markItem(pickPane.itemsList.filteredItems[pickPane.itemsList.filteredItems.length - 1]);
                expect(pickPane.itemsList.markedIndex).toEqual(3);
                triggerKeyDownEvent(listPanel, KeyCode.ArrowDown);
                expect(pickPane.itemsList.markedIndex).toEqual(1);
            }));

            it('should skip disabled option and mark next one', fakeAsync(() => {
                fixture.componentInstance.cities[1].disabled = true;
                fixture.componentInstance.cities = [...fixture.componentInstance.cities];
                tickAndDetectChanges(fixture);

                expect(pickPane.itemsList.markedIndex).toEqual(1);
                triggerKeyDownEvent(listPanel, KeyCode.ArrowDown);
                expect(pickPane.itemsList.markedIndex).toEqual(3);
            }));

            it('should mark previous value on arrow up', fakeAsync(() => {
                pickPane.itemsList.markItem(pickPane.itemsList.filteredItems[pickPane.itemsList.filteredItems.length - 1]);
                expect(pickPane.itemsList.markedIndex).toEqual(3);
                triggerKeyDownEvent(listPanel, KeyCode.ArrowUp);
                expect(pickPane.itemsList.markedIndex).toEqual(2);
            }));

            it('should mark last value on arrow up', fakeAsync(() => {
                expect(pickPane.itemsList.markedIndex).toEqual(1);
                triggerKeyDownEvent(listPanel, KeyCode.ArrowUp);
                expect(pickPane.itemsList.markedIndex).toEqual(3);
            }));

            it('should select next and clear last selected value on arrow', fakeAsync(() => {
                pickPane.itemsList.select(pickPane.itemsList.filteredItems[1]);
                expect(pickPane.selectedItems[0].index).toBe(1);
                triggerKeyDownEvent(listPanel, KeyCode.ArrowDown);
                expect(pickPane.selectedItems.length).toEqual(1);
                expect(pickPane.selectedItems[0].index).toBe(2);
            }));

            it('should retain previous selection and select next value on arrow with shift press', fakeAsync(() => {
                pickPane.itemsList.select(pickPane.itemsList.filteredItems[1]);
                expect(pickPane.selectedItems[0].index).toBe(1);
                const pressedShift = true;
                const pressedCtrl = false;
                triggerKeyDownEvent(listPanel, KeyCode.ArrowDown, '', pressedShift, pressedCtrl);
                expect(pickPane.selectedItems.length).toEqual(2);
                expect(pickPane.selectedItems[0].index).toBe(1);
                expect(pickPane.selectedItems[1].index).toBe(2);
            }));

            it('should retain previous selection and select next value on arrow with ctrl press', fakeAsync(() => {
                pickPane.itemsList.select(pickPane.itemsList.filteredItems[1]);
                expect(pickPane.selectedItems[0].index).toBe(1);
                const pressedShift = false;
                const pressedCtrl = true;
                triggerKeyDownEvent(listPanel, KeyCode.ArrowDown, '', pressedShift, pressedCtrl);
                expect(pickPane.selectedItems.length).toEqual(2);
                expect(pickPane.selectedItems[0].index).toBe(1);
                expect(pickPane.selectedItems[1].index).toBe(2);
            }));
        });

        describe('enter', () => {
            it('should trigger move event', fakeAsync(() => {
                const emitSpy = spyOn(pickPane.triggerMove, 'emit');
                triggerKeyDownEvent(listPanel, KeyCode.Enter);
                expect(emitSpy).toHaveBeenCalled();
            }));
        });

        describe('escape', () => {
            it('should clear selection', fakeAsync(() => {
                pickPane.itemsList.select(pickPane.itemsList.filteredItems[1]);
                expect(pickPane.itemsList.selectedItems.length).toBe(1);
                triggerKeyDownEvent(listPanel, KeyCode.Esc);
                expect(pickPane.itemsList.selectedItems.length).toBe(0);
            }));
            it('should blur panel', fakeAsync(() => {
                listPanel.nativeElement.focus();
                expect(listPanel.nativeElement === document.activeElement).toBeTruthy();
                triggerKeyDownEvent(listPanel, KeyCode.Esc);
                expect(listPanel.nativeElement === document.activeElement).toBeFalsy();
            }));
        });
    });

    describe('Selects multiple items', () => {
        let fixture: ComponentFixture<HcPickPaneTestCmp>;
        let pickPane: PickPaneComponent;
        beforeEach(() => {
            fixture = createTestingModule(
                HcPickPaneTestCmp, `<hc-pick-pane [items]="cities" bindLabel="name" placeholder="select value"></hc-pick-pane>`);
            pickPane = fixture.componentInstance.pickPane;
        });

        it('should select several items', fakeAsync(() => {
            pickPane.itemsList.select(pickPane.itemsList.filteredItems[1]);
            pickPane.itemsList.select(pickPane.itemsList.filteredItems[2]);
            pickPane.itemsList.select(pickPane.itemsList.filteredItems[3]);
            tickAndDetectChanges(fixture);
            expect(pickPane.selectedItems.length).toBe(3);
        }));
    });

    describe('Custom Options', () => {
        it('should select default custom item', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="cities" bindLabel="name" [addCustomItem]="true">
                </hc-pick-pane>`);

            tickAndDetectChanges(fixture);
            const pickPane = fixture.componentInstance.pickPane;
            pickPane.filter('new custom item');
            tickAndDetectChanges(fixture);
            const searchBox = fixture.debugElement.query(By.css('.hc-pick-search-input'));
            spyOnProperty(pickPane, '_companionPane').and.returnValue(pickPane); // faking "companion pane"
            pickPane.itemsList.unmark();
            triggerKeyDownEvent(searchBox, KeyCode.Enter);
            expect(pickPane.itemsList.selectedItems[0].label).toBe('new custom item');
            expect((pickPane.itemsList.selectedItems[0].value as Record<string, unknown>).name).toBe('new custom item');
        }));

        it('should add custom item as string', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="citiesNames" [addCustomItem]="true">
                </hc-pick-pane>`);

            tickAndDetectChanges(fixture);
            const pickPane = fixture.componentInstance.pickPane;
            pickPane.filter('Copenhagen');
            tickAndDetectChanges(fixture);
            const searchBox = fixture.debugElement.query(By.css('.hc-pick-search-input'));
            spyOnProperty(pickPane, '_companionPane').and.returnValue(pickPane); // faking "companion pane"
            pickPane.itemsList.unmark();
            triggerKeyDownEvent(searchBox, KeyCode.Enter);
            expect(pickPane.itemsList.selectedItems[0].value).toBe('Copenhagen');
        }));

        it('should add custom item as string when there are no items', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="[]" [addCustomItem]="true">
                </hc-pick-pane>`);

                tickAndDetectChanges(fixture);
                const pickPane = fixture.componentInstance.pickPane;
                pickPane.filter('Copenhagen');
                tickAndDetectChanges(fixture);
                const searchBox = fixture.debugElement.query(By.css('.hc-pick-search-input'));
                spyOnProperty(pickPane, '_companionPane').and.returnValue(pickPane); // faking "companion pane"
                pickPane.itemsList.unmark();
                triggerKeyDownEvent(searchBox, KeyCode.Enter);
                expect(pickPane.itemsList.selectedItems[0].value).toBe('Copenhagen');
        }));

        it('should add custom item as string when down arrow pressed', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="citiesNames" [addCustomItem]="true">
                </hc-pick-pane>`);

                tickAndDetectChanges(fixture);
                const pickPane = fixture.componentInstance.pickPane;
                pickPane.filter('Copenhagen');
                tickAndDetectChanges(fixture);
                const searchBox = fixture.debugElement.query(By.css('.hc-pick-search-input'));
                spyOnProperty(pickPane, '_companionPane').and.returnValue(pickPane); // faking "companion pane"
                pickPane.itemsList.unmark();
                triggerKeyDownEvent(searchBox, KeyCode.ArrowDown);
                expect(pickPane.itemsList.selectedItems[0].value).toBe('Copenhagen');
        }));

        it('can select custom item even if there are filtered items that matches search term', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="cities" bindLabel="name" [addCustomItem]="true">
                </hc-pick-pane>`);

            tickAndDetectChanges(fixture);
            const pickPane = fixture.componentInstance.pickPane;
            pickPane.filter('Vil');
            tickAndDetectChanges(fixture);
            const searchBox = fixture.debugElement.query(By.css('.hc-pick-search-input'));
            spyOnProperty(pickPane, '_companionPane').and.returnValue(pickPane); // faking "companion pane"
            triggerKeyDownEvent(searchBox, KeyCode.ArrowDown);
            const listPanel = fixture.debugElement.query(By.css('.hc-pick-pane-list'));
            triggerKeyDownEvent(listPanel, KeyCode.ArrowDown);
            triggerKeyDownEvent(listPanel, KeyCode.Enter);
            expect((pickPane.itemsList.selectedItems[0].value as Record<string, unknown>).name).toBe('Vil');
        }));

        it('should select custom item using given fuction', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="cities" bindLabel="name" [addCustomItem]="customItemFunc">
                </hc-pick-pane>`);

            tickAndDetectChanges(fixture);
            const pickPane = fixture.componentInstance.pickPane;
            pickPane.filter('custom item');
            tickAndDetectChanges(fixture);
            const searchBox = fixture.debugElement.query(By.css('.hc-pick-search-input'));
            spyOnProperty(pickPane, '_companionPane').and.returnValue(pickPane); // faking "companion pane"
            triggerKeyDownEvent(searchBox, KeyCode.Enter);
            expect(pickPane.itemsList.selectedItems[0].value).toEqual(jasmine.objectContaining({
                id: 'custom item', name: 'custom item', custom: true
            }));
        }));

        it('should select custom item with given promise-based function', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="cities" bindLabel="name" [addCustomItem]="customItemFuncPromise">
                </hc-pick-pane>`);

            tickAndDetectChanges(fixture);
            const pickPane = fixture.componentInstance.pickPane;
            pickPane.filter('server side custom item');
            tickAndDetectChanges(fixture);
            const searchBox = fixture.debugElement.query(By.css('.hc-pick-search-input'));
            spyOnProperty(pickPane, '_companionPane').and.returnValue(pickPane); // faking "companion pane"
            triggerKeyDownEvent(searchBox, KeyCode.Enter);
            tick();
            expect(pickPane.itemsList.selectedItems[0].value).toEqual(jasmine.objectContaining({
                id: 5, name: 'server side custom item', valid: true
            }));
        }));

        describe('show add custom item', () => {
            let pickPane: PickPaneComponent;
            let companionPickPane: PickPaneComponent;
            let fixture: ComponentFixture<HcPickPaneTestCmp>;
            beforeEach(() => {
                fixture = createTestingModule(
                    HcPickPaneTestCmp,
                    `<hc-pick-pane [items]="cities"
                        bindLabel="name"
                        [addCustomItem]="true"
                        placeholder="select value">
                    </hc-pick-pane>
                    <hc-pick-pane #companionPane [items]="cities"
                        bindLabel="name"
                        [addCustomItem]="true"
                        placeholder="select value">
                    </hc-pick-pane>`
                    );
                pickPane = fixture.componentInstance.pickPane;
                companionPickPane = fixture.componentInstance.companionPickPane;
            });

            it('should be false when there is no search term', () => {
                pickPane.searchTerm = "";
                expect(pickPane.showAddCustomOption).toBeFalsy();
            });

            it('should be false when term is too short', () => {
                pickPane.searchTerm = 'vi';
                pickPane.externalSearchTermMinLength = 3;
                expect(pickPane.showAddCustomOption).toBeFalsy();
            });

            it('should be true when term does not exist among items of this pane or companion pane', () => {
                spyOnProperty(pickPane, '_companionPane').and.returnValue(companionPickPane); // faking "companion pane"
                pickPane.searchTerm = 'Vil';
                expect(pickPane.showAddCustomOption).toBeTruthy();
            });

            it('should be false when term exists among items', () => {
                spyOnProperty(pickPane, '_companionPane').and.returnValue(companionPickPane); // faking "companion pane"
                pickPane.searchTerm = 'Vilnius';
                expect(pickPane.showAddCustomOption).toBeFalsy();
            });

            it('should be false when term exists among items of companionPane', () => {
                companionPickPane.itemsList.addNewOption('Vilnius in Companion Pane');
                spyOnProperty(pickPane, '_companionPane').and.returnValue(companionPickPane); // faking "companion pane"
                pickPane.searchTerm = 'Vilnius in Companion Pane';
                expect(pickPane.showAddCustomOption).toBeFalsy();
            });

            it('should be false when there is search term with only empty space', () => {
                pickPane.searchTerm = '   ';
                expect(pickPane.showAddCustomOption).toBeFalsy();
            });
        });
    });

    describe('Filter', () => {
        it('should filter using default implementation', fakeAsync(() => {
            const fixture = createTestingModule(HcPickPaneTestCmp, `<hc-pick-pane [items]="cities" bindLabel="name"></hc-pick-pane>`);
            const pickPane = fixture.componentInstance.pickPane;

            tick(200);
            pickPane.filter('vilnius');
            tick(200);

            expect(pickPane.itemsList.filteredItems.length).toEqual(2);
            expect(pickPane.itemsList.filteredItems[1].label).toBe('Vilnius');
        }));

        it('should filter using custom searchFn', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneTestCmp, `<hc-pick-pane [items]="cities" bindLabel="name" [searchFn]="searchFn"></hc-pick-pane>`);
            const pickPane = fixture.componentInstance.pickPane;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fixture.componentInstance.searchFn = (term: string, item: any) => item.name.indexOf(term) > -1 || item.id === 2;
            tickAndDetectChanges(fixture);
            pickPane.filter('Vilnius');
            tick(200);

            expect(pickPane.itemsList.filteredItems.length).toEqual(3);
            expect(pickPane.itemsList.filteredItems[1].label).toBe('Vilnius');
            expect(pickPane.itemsList.filteredItems[2].label).toBe('Kaunas');
        }));

        it('should mark first item on filter', fakeAsync(() => {
            const fixture = createTestingModule(HcPickPaneTestCmp, `<hc-pick-pane [items]="cities" bindLabel="name"></hc-pick-pane>`);
            const pickPane = fixture.componentInstance.pickPane;

            tick(200);
            pickPane.filter('pab');
            tick(200);

            expect(pickPane.itemsList.markedItem.label).toEqual('Pabrade');
        }));

        it('should mark first item on filter when selected is not among filtered items', fakeAsync(() => {
            const fixture = createTestingModule(HcPickPaneTestCmp, `<hc-pick-pane [items]="cities" bindLabel="name"></hc-pick-pane>`);
            const pickPane = fixture.componentInstance.pickPane;

            pickPane.itemsList.select(pickPane.itemsList.filteredItems[1]);
            fixture.detectChanges();
            fixture.componentInstance.pickPane.filter('pab');
            tick();

            expect(pickPane.itemsList.markedItem.label).toEqual('Pabrade');
        }));

        it('should not reset items when moving focus from search box to list pane', fakeAsync(() => {
            const fixture = createTestingModule(HcPickPaneTestCmp, `<hc-pick-pane [items]="cities" bindLabel="name"></hc-pick-pane>`);
            const pickPane = fixture.componentInstance.pickPane;
            fixture.detectChanges();
            fixture.componentInstance.pickPane.filter('pab');

            const resetFilteredItemsSpy = spyOn(pickPane.itemsList, 'resetFilteredItems');
            tickAndDetectChanges(fixture);

            const searchBox = fixture.debugElement.query(By.css('.hc-pick-search-input'));
            triggerKeyDownEvent(searchBox, KeyCode.Enter);
            tickAndDetectChanges(fixture);
            expect(resetFilteredItemsSpy).not.toHaveBeenCalled();
        }));

        it('should filter grouped items', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneGroupingTestCmp, `<hc-pick-pane [items]="accounts" groupBy="country" bindLabel="name"></hc-pick-pane>`);
            const pickPane = fixture.componentInstance.pickPane;

            tickAndDetectChanges(fixture);
            pickPane.filter('adam');
            tickAndDetectChanges(fixture);

            const filteredItems = fixture.componentInstance.pickPane.itemsList.filteredItems;
            expect(filteredItems.length).toBe(2);
            expect(filteredItems[0].children).toBeDefined();
            expect(filteredItems[0].label).toBe('United States');
            expect(filteredItems[1].parent).toBe(filteredItems[0]);
            expect(filteredItems[1].label).toBe('Adam');
        }));

        it('should continue filtering items on update of items', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneTestCmp, `<hc-pick-pane [items]="cities" bindLabel="name"></hc-pick-pane>`);
            const pickPane = fixture.componentInstance.pickPane;
            tickAndDetectChanges(fixture);

            pickPane.filter('vil');
            tickAndDetectChanges(fixture);

            expect(fixture.componentInstance.pickPane.itemsList.filteredItems[1].label).toBe('Vilnius');

            fixture.componentInstance.cities = [
                { id: 1, name: 'Vilnius' },
                { id: 2, name: 'Kaunas' },
                { id: 3, name: 'Pabrade' },
                { id: 4, name: 'Bruchhausen-Vilsen' },
            ];
            tickAndDetectChanges(fixture);

            expect(fixture.componentInstance.pickPane.itemsList.filteredItems[1].label).toBe('Vilnius');
            expect(fixture.componentInstance.pickPane.itemsList.filteredItems[2].label).toBe('Bruchhausen-Vilsen');
        }));
    });

    describe('Grouping', () => {
        it('should group flat items list by group key', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneGroupingTestCmp, `<hc-pick-pane [items]="accounts" groupBy="country"></hc-pick-pane>`);
            tickAndDetectChanges(fixture);

            const items = fixture.componentInstance.pickPane.itemsList.items;
            expect(items.length).toBe(14);
            expect(items[0].children).toBeDefined();
            expect(items[0].index).toBe(0);
            expect(items[0].label).toBe('United States');
            expect(items[0].disabled).toBeTruthy();
            expect(items[0].value).toEqual({ country: 'United States' });

            expect(items[1].children).toBeUndefined();
            expect(items[1].parent).toBe(items[0]);

            expect(items[2].children).toBeUndefined();
            expect(items[2].parent).toBe(items[0]);

            expect(items[3].label).toBe('Argentina');
            expect(items[3].label).toBe('Argentina');

            expect(items[10].label).toBe('Colombia');
            expect(items[11].parent).toBe(items[10]);
        }));

        it('should group items with children array by group key', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneGroupingTestCmp, `<hc-pick-pane [items]="groupedAccounts" groupBy="accounts"></hc-pick-pane>`);
            tickAndDetectChanges(fixture);

            const items = fixture.componentInstance.pickPane.itemsList.items;
            expect(items.length).toBe(14);
            expect(items[0].children).toBeDefined();
            expect(items[0].index).toBe(0);
            expect(items[0].disabled).toBeTruthy();
            expect(items[0].value).toEqual(jasmine.objectContaining({ country: 'United States' }));

            expect(items[1].children).toBeUndefined();
            expect(items[1].parent).toBe(items[0]);

            expect(items[2].children).toBeUndefined();
            expect(items[2].parent).toBe(items[0]);

            expect(items[3].value).toEqual(jasmine.objectContaining({ country: 'Argentina' }));

            expect(items[10].value).toEqual(jasmine.objectContaining({ country: 'Colombia' }));
            expect(items[11].parent).toBe(items[10]);
        }));

        it('should group by group fn', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneGroupingTestCmp, `<hc-pick-pane [items]="accounts" bindLabel="name" [groupBy]="groupByFn"></hc-pick-pane>`);

            tickAndDetectChanges(fixture);
            const items = fixture.componentInstance.pickPane.itemsList.items;

            expect(items.length).toBe(12);
            expect(items[0].children).toBeDefined();
            expect(items[0].value?.["name"]).toBe('c1');
            expect(items[6].children).toBeDefined();
            expect(items[6].value?.['name']).toBe('c2');
        }));

        it('should set group value using custom fn', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneGroupingTestCmp,
                `<hc-pick-pane [items]="accounts" bindLabel="name" [groupBy]="groupByFn" [groupValue]="groupValueFn">
                </hc-pick-pane>`);

            tickAndDetectChanges(fixture);
            const items = fixture.componentInstance.pickPane.itemsList.items;

            expect(items.length).toBe(12);
            expect(items[0].children).toBeDefined();
            expect(items[0].value?.['group']).toBe('c1');
            expect(items[6].children).toBeDefined();
            expect(items[6].value?.['group']).toBe('c2');
        }));

        it('should filter grouped items', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneGroupingTestCmp,
                `<hc-pick-pane [items]="accounts" groupBy="country" bindLabel="name"></hc-pick-pane>`);

            tickAndDetectChanges(fixture);
            const pickPane = fixture.componentInstance.pickPane;
            pickPane.filter('aDaM');

            const filteredItems = pickPane.itemsList.filteredItems;
            expect(filteredItems.length).toBe(2);
            expect(filteredItems[0].children).toBeTruthy();
            expect(filteredItems[1].parent).toBe(filteredItems[0]);

            pickPane.filter('not in list');
            expect(pickPane.itemsList.filteredItems.length).toBe(0);
        }));

        it('selecting an optgroup selects its children', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPickPaneGroupingTestCmp,
                `<hc-pick-pane [items]="accounts" groupBy="country" bindLabel="name" bindValue="email" [canSelectGroup]="true">
                </hc-pick-pane>`);

            tickAndDetectChanges(fixture);
            const pickPane = fixture.componentInstance.pickPane;
            pickPane.itemsList.select(pickPane.itemsList.items[0]);
            expect(pickPane.selectedItems.length).toBe(2);
            expect(pickPane.selectedItems[0].label).toBe('Adam');
            expect(pickPane.selectedItems[1].label).toBe('Samantha');
        }));
    });

    describe('Input method composition', () => {
        let fixture: ComponentFixture<HcPickPaneTestCmp>;
        let pickPane: PickPaneComponent;
        const originValue = '';
        const imeInputValue = 'zhangsan';

        beforeEach(() => {
            fixture = createTestingModule(
                HcPickPaneTestCmp,
                `<hc-pick-pane [items]="citiesNames"
                    [addCustomItem]="true"
                    placeholder="select value"
                    [searchWhileComposing]="false">
                </hc-pick-pane>`);
            pickPane = fixture.componentInstance.pickPane;
        });

        describe('composition start', () => {
            it('should not update search term', fakeAsync(() => {
                pickPane.filter(originValue);
                tickAndDetectChanges(fixture);
                pickPane._onCompositionStart();
                tickAndDetectChanges(fixture);
                pickPane.filter(imeInputValue);

                expect(pickPane.searchTerm).toBe(originValue);
            }));
        });

        describe('composition end', () => {
            it('should update search term', fakeAsync(() => {
                pickPane.filter(originValue);
                tickAndDetectChanges(fixture);
                pickPane._onCompositionEnd(imeInputValue);
                tickAndDetectChanges(fixture);

                expect(pickPane.searchTerm).toBe(imeInputValue);
            }));

            it('should update search term when searchWhileComposing', fakeAsync(() => {
                pickPane.searchWhileComposing = true;
                pickPane._onCompositionStart();
                pickPane._onCompositionEnd(imeInputValue);
                pickPane.filter('new term');

                expect(pickPane.searchTerm).toBe('new term');
            }));
        });
    });
});


function createTestingModule<T>(cmp: Type<T>, template: string): ComponentFixture<T> {

    TestBed.configureTestingModule({
        imports: [FormsModule, PicklistModule],
        declarations: [cmp],
        providers: [PicklistService]
    })
        .overrideComponent(cmp, {
            set: {
                template: template
            }
        });

    TestBed.compileComponents();

    const fixture = TestBed.createComponent(cmp);
    fixture.detectChanges();
    return fixture;
}

@Component({
    template: ``,
    standalone: false
})
class HcPickPaneTestCmp {
    @ViewChild(PickPaneComponent, { static: false }) pickPane: PickPaneComponent;
    @ViewChild('companionPane', { static: false }) companionPickPane: PickPaneComponent;
    label = 'Yes';
    clearOnBackspace = false;
    disabled = false;
    readonly = false;
    dropdownPosition = 'bottom';
    visible = true;
    externalSearchTermMinLength = 0;
    filter = new Subject<string>();
    searchFn: (term: string, item: unknown) => boolean;
    selectOnTab = true;
    hideSelected = false;

    citiesLoading = false;
    selectedCityId: number;
    selectedCityIds: number[];
    selectedCity: { id: number; name: string };
    selectedCities: { id: number; name: string }[];
    cities: Array<{ id: number, name: string, disabled?: boolean }> = [
        { id: 1, name: 'Vilnius', disabled: false },
        { id: 2, name: 'Kaunas', disabled: false },
        { id: 3, name: 'Pabrade', disabled: false },
    ];
    citiesNames = this.cities.map(x => x.name);

    selectedCountry: { id: number, description: { name: string, id: string } };
    countries = [
        { id: 1, description: { name: 'Lithuania', id: 'a' } },
        { id: 2, description: { name: 'USA', id: 'b' } },
        { id: 3, description: { name: 'Australia', id: 'c' } }
    ];

    customItemFunc(term: string) {
        return { id: term, name: term, custom: true };
    }

    customItemFuncPromise(term: string) {
        return Promise.resolve({
            id: 5, name: term, valid: true
        });
    }

    compareWith(a, b) {
        return a.name === b.name && a.district === b.district;
    }

    toggleVisible() {
        this.visible = !this.visible;
    }
}

@Component({
    template: ``,
    standalone: false
})
class HcPickPaneGroupingTestCmp {
    @ViewChild(PickPaneComponent, { static: true }) pickPane: PickPaneComponent;
    selectedAccountName = 'Adam';
    selectedAccount = null;
    accounts = [
        { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States', child: { name: 'c1' } },
        { name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States', child: { name: 'c1' } },
        { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina', child: { name: 'c1' } },
        { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina', child: { name: 'c1' } },
        { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador', child: { name: 'c1' } },
        { name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador', child: { name: 'c2' } },
        { name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador', child: { name: 'c2' } },
        { name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia', child: { name: 'c2' } },
        { name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia', child: { name: 'c2' } },
        { name: 'Nicolás', email: 'nicole@email.com', age: 43, country: 'Colombia', child: { name: 'c2' } }
    ];

    groupedAccounts = [
        {
            country: 'United States',
            accounts: [
                { name: 'Adam', email: 'adam@email.com', age: 12 },
                { name: 'Samantha', email: 'samantha@email.com', age: 30 },
            ]
        },
        {
            country: 'Argentina',
            accounts: [
                { name: 'Amalie', email: 'amalie@email.com', age: 12 },
                { name: 'Estefanía', email: 'estefania@email.com', age: 21 },
            ]
        },
        {
            country: 'Ecuador',
            accounts: [
                { name: 'Adrian', email: 'adrian@email.com', age: 21 },
                { name: 'Wladimir', email: 'wladimir@email.com', age: 30 },
                { name: 'Natasha', email: 'natasha@email.com', age: 54 },
            ]
        },
        {
            country: 'Colombia',
            accounts: [
                { name: 'Nicole', email: 'nicole@email.com', age: 43 },
                { name: 'Michael', email: 'michael@email.com', age: 15 },
                { name: 'Nicolás', email: 'nicole@email.com', age: 43 }
            ]
        }
    ];

    groupByFn = (item) => item.child.name;
    groupValueFn = (key) => ({ group: key });
}

function triggerKeyDownEvent(
    element: DebugElement, which: number, key = '', pressedShiftKey = false, pressedCtrlKey = false
): void {
    element.triggerEventHandler('keydown', {
        which: which,
        key: key,
        shiftKey: pressedShiftKey,
        ctrlKey: pressedCtrlKey,
        preventDefault: () => null,
    });
}

function tickAndDetectChanges(fixture: ComponentFixture<unknown>) {
    fixture.detectChanges();
    tick();
}
