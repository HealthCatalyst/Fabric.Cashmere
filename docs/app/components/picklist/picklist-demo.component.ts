import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
    IValueOption,
    IValueSetOption,
    PicklistRemoteQueryOptions,
    IPicklistRemoteQueryResponse } from '../../../../lib/src/picklist/picklist.model';
import { PicklistComponent } from '../../../../lib/src/picklist/picklist.component';

@Component({
    selector: 'hc-picklist-demo',
    templateUrl: './picklist-demo.component.html'
})
export class PickListDemoComponent implements OnInit {
    @ViewChild(PicklistComponent) public picklist: PicklistComponent;
    lastModified: Date = new Date( document.lastModified );
    // public document: string = require('raw-loader!../../../../guides/components/navbar.md');

    public ngOnInit() {
        // local complex
        // this.picklist.resetState({
        //     codeIsSignificant: true,
        //     useValuesets: true,
        //     selected: { values: [], valueSets: [] },
        //     options: { values: getFakeValues(), valueSets: getFakeValueSets() }
        // });

        // simple
        // this.picklist.resetState({
        //     options: { values: [
        //         { code: '1', title: 'North' },
        //         { code: '2', title: 'South' },
        //         { code: '3', title: 'East' },
        //         { code: '4', title: 'West' },
        //     ]}
        // });

        // remote
        const service = new FakeRemoteOptionsService();

        this.picklist.resetState({
            useValuesets: true,
            options: {
                isPaged: true,
                getValuesForValueset: (code) => service.getValuesForValueset(code),
                getOptions: (params) => service.getOptions(params)
            }
        });
    }
}

class FakeRemoteOptionsService {
    public getOptions(params: PicklistRemoteQueryOptions): Observable<IPicklistRemoteQueryResponse> {

        return Observable.of({
            pagedValues: {
                pagerSettings: { currentPage: 1, itemsPerPage: 100 },
                totalItems: 100,
                totalPages: 1,
                values: getFakeValues(100, params.searchTerm)
            },
            pagedValueSets: {
                pagerSettings: { currentPage: 1, itemsPerPage: 100 },
                totalItems: 100,
                totalPages: 1,
                values: getFakeValueSets(null, false)
            }
        }).delay(1000);
    }

    public getValuesForValueset(code: string): Observable<IValueOption[]> {
        return Observable.of(getFakeValues(10)).delay(1000);
    }
}

function getFakeValues(count: number = 200, search: string | null = null): IValueOption[] {
    const fakeValues = new Array<IValueOption>();
    for (let i = 0; i < count; i++) {
        fakeValues.push({code: `${i}${i}`, title: `${search || 'Option'} ${i}`});
    }
    return fakeValues;
}

function getFakeValueSets(search: string | null = null, preloadValues: boolean = true): IValueSetOption[] {
    const fakeValues = new Array<IValueSetOption>();
    const subValues = preloadValues ? getFakeValues(10) : [];
    for (let i = 0; i < 200; i++) {
        fakeValues.push({code: `${i}${i}`, title: `${search || 'Option'} ${i}`, subValues: subValues });
    }
    return fakeValues;
}