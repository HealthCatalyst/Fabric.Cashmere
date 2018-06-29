// import {Component} from '@angular/core';
// import {IPicklistSettings} from '@healthcatalyst/cashmere';
// import {FakeRemoteOptionsService, getFakeValues, getFakeValueSets} from './picklist-demo-data';
//
// @Component({
//     selector: 'hc-picklist-demo',
//     templateUrl: './picklist-demo.component.html',
//     styleUrls: ['./picklist-demo.component.scss']
// })
// export class PicklistDemoComponent {
//     public lastModified: Date = new Date(document.lastModified);
//     public fakeService = new FakeRemoteOptionsService();
//     public selectedConfig = 'simpleConfig';
//
//     public simpleConfig: IPicklistSettings = {
//         options: {
//             values: [{code: '1', title: 'North'}, {code: '2', title: 'South'}, {code: '3', title: 'East'}, {code: '4', title: 'West'}]
//         }
//     };
//
//     public complexConfig: IPicklistSettings = {
//         codeIsSignificant: true,
//         useValuesets: true,
//         options: {values: getFakeValues(), valueSets: getFakeValueSets()}
//     };
//
//     public remoteConfig: IPicklistSettings = {
//         useValuesets: true,
//         options: {
//             isPaged: true,
//             pageSize: 25,
//             getValuesForValueset: code => this.fakeService.getValuesForValueset(code),
//             getOptions: params => this.fakeService.getOptions(params)
//         }
//     };
//
//     public getConfigForSelection(): IPicklistSettings {
//         return this[this.selectedConfig];
//     }
// }
