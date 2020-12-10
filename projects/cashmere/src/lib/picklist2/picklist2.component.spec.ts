import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Type, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { Picklist2Module } from './picklist2.module';
import { Picklist2Service } from './picklist2.service';
import { Picklist2Component } from './picklist2.component';

describe('Picklist2Component', () => {

    describe('custom templates', () => {
        it('should display custom option template', async(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" [(ngModel)]="selectedCities">
                    <ng-template hc-pick-option-tmp let-item="item">
                        <div class="custom-option">{{item.name}}</div>
                    </ng-template>
                </hc-picklist2>`);
    
            fixture.detectChanges();
    
            fixture.whenStable().then(() => {
                const el = fixture.debugElement.query(By.css('.custom-option')).nativeElement;
                expect(el).not.toBeNull();
            });
        }));

        it('should display custom header templates', async(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" [(ngModel)]="selectedCities">
                    <ng-template hc-pane-header-left-tmp><span class="header-left">left header</span></ng-template>
                    <ng-template hc-pane-header-right-tmp><span class="header-right">right header</span></ng-template>
                </hc-picklist2>`);
            fixture.detectChanges();
    
            fixture.whenStable().then(() => {
                const toolbar = fixture.debugElement.query(By.css('.header-left')).nativeElement;
                expect(toolbar.innerHTML).toBe('left header');
    
                const footer = fixture.debugElement.query(By.css('.header-right')).nativeElement;
                expect(footer.innerHTML).toBe('right header');
            });
        }));

        it('should display custom footer and toolbar template', async(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" [(ngModel)]="selectedCities">
                    <ng-template hc-pane-toolbar-tmp>
                        <span class="toolbar-label">toolbar</span>
                    </ng-template>
                    <ng-template hc-pane-footer-tmp>
                        <span class="footer-label">footer</span>
                    </ng-template>
                </hc-picklist2>`);
            fixture.detectChanges();
    
            fixture.whenStable().then(() => {
                const toolbar = fixture.debugElement.query(By.css('.toolbar-label')).nativeElement;
                expect(toolbar.innerHTML).toBe('toolbar');
    
                const footer = fixture.debugElement.query(By.css('.footer-label')).nativeElement;
                expect(footer.innerHTML).toBe('footer');
            });
        }));

        it('should display custom item template', async(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" [(ngModel)]="selectedCities" [addCustomItem]="true">
                    <ng-template hc-pick-custom-item-tmp let-search="searchTerm">
                        <span class="custom-item-template">{{searchTerm}}</span>
                    </ng-template>
                </hc-picklist2>`);
    
            fixture.componentInstance.picklist.availablePane.searchTerm = 'custom-item';
            fixture.componentInstance.picklist._detectChanges();
            fixture.detectChanges();
    
            fixture.whenStable().then(() => {
                const template = fixture.debugElement.query(By.css('.custom-item-template')).nativeElement;
                expect(template).toBeDefined();
            });
        }));

        it('should display custom pane headers', async(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" [(ngModel)]="selectedCities" [addCustomItem]="true">
                    <ng-template hc-pick-custom-item-tmp let-search="searchTerm">
                        <span class="custom-item-template">{{searchTerm}}</span>
                    </ng-template>
                </hc-picklist2>`);
    
            fixture.componentInstance.picklist.availablePane.searchTerm = 'custom-item';
            fixture.componentInstance.picklist._detectChanges();
            fixture.detectChanges();
    
            fixture.whenStable().then(() => {
                const template = fixture.debugElement.query(By.css('.custom-item-template')).nativeElement;
                expect(template).toBeDefined();
            });
        }));
    });

    describe('max selected items', () => {
        it('should be able to select only two elements', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" [(ngModel)]="selectedCities" [maxSelectedItems]="2">
                </hc-picklist2>`);
            const arrowIcon = fixture.debugElement.query(By.css('.hc-picklist-right-arrow-btn'));
            const availablePane = fixture.componentInstance.picklist.availablePane;
            tickAndDetectChanges(fixture);
            
            availablePane.select(availablePane.itemsList.items[1]);
            availablePane.select(availablePane.itemsList.items[2]);
            tickAndDetectChanges(fixture);
            expect(arrowIcon.nativeElement.disabled).toBeFalsy();
            fixture.componentInstance.picklist.moveLeftToRight();
            tickAndDetectChanges(fixture);

            availablePane.select(availablePane.itemsList.items[1]);
            tickAndDetectChanges(fixture);
            
            expect(arrowIcon.nativeElement.disabled).toBeTruthy();
        }));
    });

    describe('HTML template based items', () => {
        it('should create items from hc-pick-option', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2>
                    <hc-pick-option [value]="true">Yes</hc-pick-option>
                    <hc-pick-option [value]="false">No</hc-pick-option>
                </hc-picklist2>`);
    
            tickAndDetectChanges(fixture);
    
            const items = fixture.componentInstance.picklist.availablePane.itemsList.items;
            expect(items.length).toBe(3);
            expect(items[1]).toEqual(jasmine.objectContaining({
                label: 'Yes', value: true, disabled: false
            }));
            expect(items[2]).toEqual(jasmine.objectContaining({
                label: 'No', value: false, disabled: false
            }));
        }));

        it('should be able to update hc-pick-option state', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2>
                    <hc-pick-option [disabled]="disabled" [value]="true">Yes</hc-pick-option>
                    <hc-pick-option [value]="false">No</hc-pick-option>
                </hc-picklist2>`);
    
            tickAndDetectChanges(fixture);
            const picklist = fixture.componentInstance.picklist;
            expect(picklist.availablePane.itemsList.items[1].disabled).toBeFalsy();
            fixture.componentInstance.disabled = true;
            tickAndDetectChanges(fixture);
            expect(picklist.availablePane.itemsList.items[1].disabled).toBeTruthy();
        }));
    
        it('should be able to update hc-pick-option label', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2>
                    <hc-pick-option [disabled]="disabled" [value]="true">{{label}}</hc-pick-option>
                    <hc-pick-option [value]="false">No</hc-pick-option>
                </hc-picklist2>`);
    
            fixture.componentInstance.label = 'Indeed';
            tickAndDetectChanges(fixture);
            const items = fixture.componentInstance.picklist.availablePane.itemsList.items;
            expect(items[1].label).toBe('Indeed');
        }));
    });

    describe('Model bindings and data changes', () => {
        let picklist: Picklist2Component;

        it('should update ngModel on value change', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" bindLabel="name" [(ngModel)]="selectedCities"></hc-picklist2>`);
            picklist = fixture.componentInstance.picklist;
            
            // select two cities
            selectOptions(picklist, [1, 2]);
            expect(fixture.componentInstance.selectedCities.length).toBe(2);
            expect(fixture.componentInstance.selectedCities[0].name).toBe('Vilnius');
            expect(fixture.componentInstance.selectedCities[1].name).toBe('Kaunas');

            // empty out selection
            picklist.selectedPane.selectAll();
            picklist.moveRightToLeft();
            expect(fixture.componentInstance.selectedCities.length).toBe(0);
        }));

        it('should update internal model on ngModel change', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" bindLabel="name" [(ngModel)]="selectedCities"></hc-picklist2>`);
            picklist = fixture.componentInstance.picklist;

            fixture.componentInstance.selectedCities = [fixture.componentInstance.cities[0]];
            tickAndDetectChanges(fixture);
            expect(picklist.selectedPane.itemsList.items.length).toBe(2);
            expect(picklist.selectedPane.itemsList.items[1].label).toBe('Vilnius');

            fixture.componentInstance.selectedCities = [];
            tickAndDetectChanges(fixture);
            expect(picklist.selectedPane.itemsList.items).toEqual([]);
        }));

        it('should update internal model after it was toggled with *ngIf', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 *ngIf="visible" [items]="cities" bindLabel="name" [(ngModel)]="selectedCities"></hc-picklist2>`);

            // select first city
            fixture.componentInstance.selectedCities = [fixture.componentInstance.cities[0]];
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.picklist.selectedPane.itemsList.items.length).toBe(2);

            // toggle to hide/show
            fixture.componentInstance.toggleVisible();
            tickAndDetectChanges(fixture);
            fixture.componentInstance.toggleVisible();
            tickAndDetectChanges(fixture);

            fixture.componentInstance.selectedCities = [];
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.picklist.selectedPane.itemsList.items.length).toBe(0);
        }));

        describe('when ngModel set with a value that is not an exisiting option', () => {
            it('when bindValue is used, should throw an error', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [items]="cities" bindLabel="name" bindValue="id" [(ngModel)]="selectedCityIds"></hc-picklist2>`);
    
                fixture.componentInstance.cities = [];
                expect(() => { fixture.componentInstance.selectedCityIds = [7]; tickAndDetectChanges(fixture); }).toThrow();
            }));
    
            it(`should set items correctly when bindValue is not used`, fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [items]="cities" bindLabel="name" [(ngModel)]="selectedCities"></hc-picklist2>`);
    
                // clear out available options, set 'Pailgis' as selected
                fixture.componentInstance.cities = [];
                fixture.componentInstance.selectedCities = [{ id: 7, name: 'Pailgis' }];
                tickAndDetectChanges(fixture);
                picklist = fixture.componentInstance.picklist;
                expect(picklist.selectedPane.itemsList.items[1].label).toBe('Pailgis');
                expect(picklist.availablePane.itemsList.items.length).toBe(0);
    
                // even if pailgis added as an option later, should be removed from available list because its already selected
                fixture.componentInstance.cities = [{ id: 7, name: 'Pailgis' }];
                tickAndDetectChanges(fixture);
                expect(picklist.availablePane.itemsList.items.length).toBe(0);
            }));
    
            it('should bind whole object as value when bindValue prop is specified with empty string in template', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [items]="cities" bindLabel="name" bindValue="" [(ngModel)]="selectedCities"></hc-picklist2>`);

                // clear out available options, set 'Pailgis' as selected
                fixture.componentInstance.cities = [];
                fixture.componentInstance.selectedCities = [{ id: 7, name: 'Pailgis' }];
                tickAndDetectChanges(fixture);
                picklist = fixture.componentInstance.picklist;
                expect(picklist.selectedPane.itemsList.items[1].label).toBe('Pailgis');
                expect(picklist.availablePane.itemsList.items.length).toBe(0);
            }));

            it('when externalSearchSubject is used', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [items]="cities" bindLabel="name" [externalSearchSubject]="filter" [(ngModel)]="selectedCities">
                    </hc-picklist2>`);
    
                picklist = fixture.componentInstance.picklist;
                fixture.componentInstance.cities = [];
                fixture.componentInstance.selectedCities = [{ id: 1, name: 'Vilnius' }, { id: 2, name: 'Kaunas' }];
                tickAndDetectChanges(fixture);
                expect(picklist.selectedPane.itemsList.items.length).toBe(3);
                expect(picklist.selectedPane.itemsList.items[1]).toEqual(jasmine.objectContaining({ label: 'Vilnius', value: { id: 1, name: 'Vilnius' } }));
                expect(picklist.selectedPane.itemsList.items[2]).toEqual(jasmine.objectContaining({ label: 'Kaunas', value: { id: 2, name: 'Kaunas' } }));
    
                fixture.componentInstance.cities = [
                    { id: 1, name: 'Vilnius' },
                    { id: 2, name: 'Kaunas' },
                    { id: 3, name: 'Pabrade' },
                ];
                tickAndDetectChanges(fixture);
                expect(picklist.selectedPane.itemsList.items[1]).toEqual(jasmine.objectContaining({ label: 'Vilnius', value: { id: 1, name: 'Vilnius' } }));
                expect(picklist.selectedPane.itemsList.items[2]).toEqual(jasmine.objectContaining({ label: 'Kaunas', value: { id: 2, name: 'Kaunas' } }));
            }));

            it('should set items correctly if there is no bindLabel', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp, `<hc-picklist2 [items]="cities" [(ngModel)]="selectedCities"></hc-picklist2>`);
    
                fixture.componentInstance.cities = [];
                fixture.componentInstance.selectedCities = [{ id: 7, name: 'Pailgis' }];
                tickAndDetectChanges(fixture);
                fixture.componentInstance.cities = [{ id: 1, name: 'Vilnius' }, { id: 2, name: 'Kaunas' }];
                tickAndDetectChanges(fixture);
                expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1]).toEqual(jasmine.objectContaining({
                    value: { id: 7, name: 'Pailgis' }
                }));
            }));

            it('should handle a simple primitive value', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp, `<hc-picklist2 [items]="citiesNames" [(ngModel)]="selectedCities"></hc-picklist2>`);
    
                fixture.componentInstance.cities = [];
                tickAndDetectChanges(fixture);
                fixture.componentInstance.selectedCities = [<any>'Kaunas'];
                tickAndDetectChanges(fixture);
    
                expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1]).toEqual(jasmine.objectContaining({
                    value: 'Kaunas', label: 'Kaunas' }));
            }));
        });

        it('should preserve latest selected value when items are changing', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" bindLabel="name" [(ngModel)]="selectedCities"></hc-picklist2>`);
            picklist = fixture.componentInstance.picklist;

            // select a couple options, refresh available items
            fixture.componentInstance.selectedCities = [fixture.componentInstance.cities[0]];
            selectOptions(picklist, [1, 2]);
            tickAndDetectChanges(fixture);
            fixture.componentInstance.cities = [...fixture.componentInstance.cities];
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.selectedCities.length).toBe(2);

            // empty out selection, refresh available items
            picklist.selectedPane.selectAll();
            picklist.moveRightToLeft();
            tickAndDetectChanges(fixture);
            fixture.componentInstance.cities = [...fixture.componentInstance.cities];
            tickAndDetectChanges(fixture);

            expect(fixture.componentInstance.selectedCities.length).toBe(0);
        }));

        it('should map selected items with items in dropdown', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" bindLabel="name" [(ngModel)]="selectedCities"></hc-picklist2>`);

            picklist = fixture.componentInstance.picklist;

            fixture.componentInstance.selectedCities = [fixture.componentInstance.cities[0]];
            tickAndDetectChanges(fixture);

            fixture.componentInstance.cities = [...fixture.componentInstance.cities];
            tickAndDetectChanges(fixture);

            expect(fixture.componentInstance.selectedCities[0]).toEqual(fixture.componentInstance.cities[0]);
        }));

        it('should clear disabled selected values when setting new model', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" bindLabel="name" [(ngModel)]="selectedCities"></hc-picklist2>`);


            const disabled = { ...fixture.componentInstance.cities[1], disabled: true };
            fixture.componentInstance.selectedCities = <any>[fixture.componentInstance.cities[0], disabled];
            tickAndDetectChanges(fixture);

            fixture.componentInstance.cities[1].disabled = true;
            fixture.componentInstance.cities = [...fixture.componentInstance.cities];
            tickAndDetectChanges(fixture);

            fixture.componentInstance.selectedCities = [];
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.picklist.selectedPane.items).toEqual([]);
        }));

        it('should clear previous selected value even if it is disabled', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" bindLabel="name" [(ngModel)]="selectedCities"></hc-picklist2>`);

            fixture.componentInstance.cities[0].disabled = true;
            fixture.componentInstance.cities = [...fixture.componentInstance.cities];
            fixture.componentInstance.selectedCities = [fixture.componentInstance.cities[0]];
            tickAndDetectChanges(fixture);

            fixture.componentInstance.selectedCities = [fixture.componentInstance.cities[1]];
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1].label).toBe(fixture.componentInstance.cities[1].name);
        }));

        it('should clear previous select value when setting new model', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" bindLabel="name" [(ngModel)]="selectedCities"></hc-picklist2>`);

            fixture.componentInstance.selectedCities = [fixture.componentInstance.cities[0]];
            tickAndDetectChanges(fixture);
            picklist = fixture.componentInstance.picklist;
            expect(picklist.selectedPane.itemsList.items.length).toBe(2); // default group + 1 items

            fixture.componentInstance.selectedCities = [fixture.componentInstance.cities[1]];
            tickAndDetectChanges(fixture);
            expect(picklist.selectedPane.itemsList.items.length).toBe(2); // default group + 1 items

            fixture.componentInstance.selectedCities = [];
            tickAndDetectChanges(fixture);
            expect(picklist.selectedPane.items.length).toBe(0);
        }));

        it('should bind to custom object properties', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" bindLabel="name" bindValue="id" [(ngModel)]="selectedCityIds">
                </hc-picklist2>`);
            picklist = fixture.componentInstance.picklist;

            // from component to model
            selectOptions(picklist, [1]);
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.selectedCityIds[0]).toEqual(1);

            // from model to component
            fixture.componentInstance.selectedCityIds = [2];
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1]).toEqual(jasmine.objectContaining({
                value: fixture.componentInstance.cities[1]
            }));
        }));

        it('should bind to nested label property', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="countries" bindLabel="description.name" [(ngModel)]="selectedCountries">
                </hc-picklist2>`);
            picklist = fixture.componentInstance.picklist;

            // from component to model
            selectOptions(picklist, [2]);
            fixture.detectChanges();
            expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1]).toEqual(jasmine.objectContaining({
                label: 'USA',
                value: fixture.componentInstance.countries[1]
            }));

            // from model to component
            fixture.componentInstance.selectedCountries = [fixture.componentInstance.countries[0]];
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1]).toEqual(jasmine.objectContaining({
                label: 'Lithuania',
                value: fixture.componentInstance.countries[0]
            }));
        }));

        it('should bind to nested value property', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="countries" bindLabel="description.name" bindValue="description.id" [(ngModel)]="selectedCountries">
                </hc-picklist2>`);
            picklist = fixture.componentInstance.picklist;

            // from component to model
            selectOptions(picklist, [1]);
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.selectedCountries[0]).toEqual('a');

            // from model to component
            fixture.componentInstance.selectedCountries = [fixture.componentInstance.countries[2].description.id];
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1]).toEqual(jasmine.objectContaining({
                label: 'Australia',
                value: fixture.componentInstance.countries[2]
            }));

            selectOptions(picklist, [3]);
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.selectedCountries[0]).toEqual('c');
        }));

        it('should bind to simple array', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp, `<hc-picklist2 [items]="citiesNames" [(ngModel)]="selectedCities"></hc-picklist2>`);
            picklist = fixture.componentInstance.picklist;

            // from component to model
            selectOptions(picklist, [1]);
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.selectedCities[0]).toBe(<any>'Vilnius');

            // from model to component
            fixture.componentInstance.selectedCities = [<any>'Kaunas'];
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1])
                .toEqual(jasmine.objectContaining({ label: 'Kaunas', value: 'Kaunas' }));
        }));

        it('should bind to object', fakeAsync(() => {
            const fixture = createTestingModule(
                HcPicklist2TestCmp,
                `<hc-picklist2 [items]="cities" bindLabel="name" [(ngModel)]="selectedCities"></hc-picklist2>`);
            picklist = fixture.componentInstance.picklist;

            // from component to model
            selectOptions(picklist, [1]);
            tickAndDetectChanges(fixture);
            expect(fixture.componentInstance.selectedCities[0]).toEqual(fixture.componentInstance.cities[0]);

            // from model to component
            fixture.componentInstance.selectedCities = [fixture.componentInstance.cities[1]];
            tickAndDetectChanges(fixture);
            expect(picklist.selectedPane.itemsList.items[1]).toEqual(jasmine.objectContaining({
                value: fixture.componentInstance.cities[1]
            }));
        }));

        describe('hc-pick-option', () => {
            it('should create items from hc-pick-option', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [(ngModel)]="selectedCityIds">
                        <hc-pick-option *ngFor="let city of cities" [value]="city.id">{{city.name}}</hc-pick-option>
                    </hc-picklist2>`);

                picklist = fixture.componentInstance.picklist;
                tickAndDetectChanges(fixture);
                expect(picklist.availablePane.itemsList.items.length).toEqual(4); // 3 given cities plus default group
            }));

            it('should be possible to clear out items set from hc-pick-options', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [(ngModel)]="selectedCityIds">
                        <hc-pick-option *ngFor="let city of cities" [value]="city.id">{{city.name}}</hc-pick-option>
                    </hc-picklist2>`);

                picklist = fixture.componentInstance.picklist;
                tickAndDetectChanges(fixture);
                expect(picklist.availablePane.itemsList.items.length).toEqual(4);
                fixture.componentInstance.cities = [];
                tickAndDetectChanges(fixture);
                expect(picklist.availablePane.itemsList.items.length).toEqual(0);
            }));

            it('should bind value', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [(ngModel)]="selectedCityIds">
                    <hc-pick-option [value]="1">A</hc-pick-option>
                    <hc-pick-option [value]="2">B</hc-pick-option>
                </hc-picklist2>`);

                picklist = fixture.componentInstance.picklist;
                
                // from component to model
                selectOptions(picklist, [1]);
                tickAndDetectChanges(fixture);
                expect(fixture.componentInstance.selectedCityIds[0]).toEqual(1);

                // from model to component
                fixture.componentInstance.selectedCityIds = [2];
                tickAndDetectChanges(fixture);
                expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1]).toEqual(jasmine.objectContaining({
                    value: 2, label: 'B' }));
            }));

            it('should not fail while resolving selected item from object', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [(ngModel)]="selectedCities">
                        <hc-pick-option [value]="cities[0]">Vilnius</hc-pick-option>
                        <hc-pick-option [value]="cities[1]">Kaunas</hc-pick-option>
                    </hc-picklist2>`);

                const selected = { name: 'Vilnius', id: 1 };
                fixture.componentInstance.selectedCities = [selected];
                tickAndDetectChanges(fixture);

                expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1]).toEqual(jasmine.objectContaining({
                    value: selected, label: '' }));
            }));
        });

        describe('Pre-selected model', () => {
            it('should select by bindValue when primitive type', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [items]="cities" bindLabel="name" bindValue="id" placeholder="select value" [(ngModel)]="selectedCityIds">
                    </hc-picklist2>`);

                fixture.componentInstance.selectedCityIds = [2];
                tickAndDetectChanges(fixture);
                const result = jasmine.objectContaining({ value: { id: 2, name: 'Kaunas' }});
                expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1]).toEqual(result);
            }));

            it('should select by bindValue ', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [items]="cities" bindLabel="name" bindValue="id" placeholder="select value" [(ngModel)]="selectedCityIds">
                    </hc-picklist2>`);

                fixture.componentInstance.cities = [{ id: 0, name: 'Vilnius' }];
                fixture.componentInstance.selectedCityIds = [0];
                tickAndDetectChanges(fixture);

                const result = jasmine.objectContaining({ value: { id: 0, name: 'Vilnius' }});
                expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1]).toEqual(result);
            }));

            it('should select by bindLabel when binding to object', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [items]="cities" bindLabel="name" placeholder="select value" [(ngModel)]="selectedCities">
                    </hc-picklist2>`);

                fixture.componentInstance.selectedCities = [{ id: 2, name: 'Kaunas' }];
                tickAndDetectChanges(fixture);
                const result = jasmine.objectContaining({ value: { id: 2, name: 'Kaunas' }});
                expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1]).toEqual(result);
            }));

            it('should select by object reference', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [items]="cities" bindLabel="name" placeholder="select value" [(ngModel)]="selectedCities">
                    </hc-picklist2>`);

                fixture.componentInstance.selectedCities = [fixture.componentInstance.cities[1]];
                tickAndDetectChanges(fixture);
                const result = jasmine.objectContaining({ value: { id: 2, name: 'Kaunas' }});
                expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1]).toEqual(result);
            }));

            it('should select by compareWith function when bindValue is not used', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [items]="cities" bindLabel="name" placeholder="select value"
                        [compareWith]="compareWith" [(ngModel)]="selectedCities">
                    </hc-picklist2>`);


                const city = { name: 'Vilnius', id: 7, district: 'Ozo parkas' };
                fixture.componentInstance.cities.push(city);
                fixture.componentInstance.cities = [...fixture.componentInstance.cities];
                fixture.componentInstance.selectedCities = [{ name: 'Vilnius', district: 'Ozo parkas' } as any];

                tickAndDetectChanges(fixture);
                expect(fixture.componentInstance.picklist.selectedPane.itemsList.items[1].value).toEqual(city);
            }));

            it('should select by compareWith function when bindValue is used', fakeAsync(() => {
                const fixture = createTestingModule(
                    HcPicklist2TestCmp,
                    `<hc-picklist2 [items]="cities" bindLabel="name" bindValue="id" placeholder="select value"
                        [compareWith]="compareWith" [(ngModel)]="selectedCityIds">
                    </hc-picklist2>`);

                const cmp = fixture.componentInstance;
                cmp.selectedCityIds = [cmp.cities[1].id.toString()];
                cmp.compareWith = (city, model: string) => city.id === +model;
                tickAndDetectChanges(fixture);
                expect(cmp.picklist.selectedPane.itemsList.items[1].value).toEqual(cmp.cities[1]);
            }));
        });
    });
});

function createTestingModule<T>(cmp: Type<T>, template: string): ComponentFixture<T> {
    TestBed.configureTestingModule({
        imports: [FormsModule, Picklist2Module],
        declarations: [cmp],
        providers: [Picklist2Service]
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
    template: ``
})
class HcPicklist2TestCmp {
    @ViewChild(Picklist2Component, { static: false }) picklist: Picklist2Component;
    label = 'Yes';
    clearOnBackspace = false;
    disabled = false;
    readonly = false;
    dropdownPosition = 'bottom';
    visible = true;
    externalSearchTermMinLength = 0;
    filter = new Subject<string>();
    searchFn: (term: string, item: any) => boolean;
    selectOnTab = true;
    hideSelected = false;

    citiesLoading = false;
    selectedCityIds: number[];
    selectedCities: { id: number; name: string }[];
    cities: any[] = [
        { id: 1, name: 'Vilnius' },
        { id: 2, name: 'Kaunas' },
        { id: 3, name: 'Pabrade' },
    ];
    citiesNames = this.cities.map(x => x.name);

    selectedCountries = new Array<any>();
    countries = [
        { id: 1, description: { name: 'Lithuania', id: 'a' } },
        { id: 2, description: { name: 'USA', id: 'b' } },
        { id: 3, description: { name: 'Australia', id: 'c' } }
    ];

    customItemFunc(term: string) {
        return { id: term, name: term, custom: true }
    }

    customItemFuncPromise(term: string) {
        return Promise.resolve({
            id: 5, name: term, valid: true
        });
    }

    compareWith(a, b) {
        return a.name === b.name && a.district === b.district
    }

    toggleVisible() {
        this.visible = !this.visible;
    }
}

function tickAndDetectChanges(fixture: ComponentFixture<any>) {
    fixture.detectChanges();
    tick();
}

function selectOptions(picklist: Picklist2Component, indicesToSelect: number[]) {
    indicesToSelect.forEach(i => {
        picklist.availablePane.select(picklist.availablePane.itemsList.items[i]);
    });
    picklist.moveLeftToRight();
}
