import { Component, ViewChild } from '@angular/core';
import { PicklistComponent, IPicklistSettings } from '../../../../lib/src/picklist/picklist.module';
import { FakeRemoteOptionsService, getFakeValues, getFakeValueSets } from './picklist-demo-data';

@Component({
    selector: 'hc-picklist-demo',
    templateUrl: './picklist-demo.component.html',
    styleUrls: ['./picklist-demo.component.scss']
})
export class PickListDemoComponent {
    @ViewChild(PicklistComponent) public picklist: PicklistComponent;
    lastModified: Date = new Date( document.lastModified );
    // public document: string = require('raw-loader!../../../../guides/components/navbar.md');

    private fakeService = new FakeRemoteOptionsService();
    public simpleConfig: IPicklistSettings = {
        options: { values: [
            { code: '1', title: 'North' },
            { code: '2', title: 'South' },
            { code: '3', title: 'East' },
            { code: '4', title: 'West' },
        ]}
    };

    public complexConfig: IPicklistSettings = {
        codeIsSignificant: true,
        useValuesets: true,
        selected: { values: [], valueSets: [] },
        options: { values: getFakeValues(), valueSets: getFakeValueSets() }
    };

    public remoteConfig: IPicklistSettings = {
        useValuesets: true,
        options: {
            isPaged: true,
            pageSize: 25,
            getValuesForValueset: (code) => this.fakeService.getValuesForValueset(code),
            getOptions: (params) => this.fakeService.getOptions(params)
        }
    }
    public selectedConfig = 'simpleConfig';

    public getConfigForSelection(): IPicklistSettings {
        return this[this.selectedConfig];
    }
}