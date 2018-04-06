import { Component, OnInit, ViewChild } from '@angular/core';
import { PicklistModel, PicklistOptionsSource, PickListOptions, ISelectOption } from '../../../../lib/src/picklist/picklist.model';
import { PicklistComponent } from '../../../../lib/src/picklist/picklist.component';

@Component({
    selector: 'hc-picklist-demo',
    templateUrl: './picklist-demo.component.html'
})
export class PickListDemoComponent implements OnInit {
    @ViewChild(PicklistComponent) public dualSelectBox: PicklistComponent;
    lastModified: Date = new Date( document.lastModified );
    // public document: string = require('raw-loader!../../../../guides/components/navbar.md');

    private pickListOptions: PickListOptions = {
        values: this.getFakeValues(),
        valueSets: this.getFakeValues()
    }

    public picklistModel: PicklistModel = {
        codeIsSignificant: true,
        allowValuesets: false,
        selectedOptions: new PickListOptions(),
        optionsSource: new PicklistOptionsSource()
    };

    public ngOnInit() {
        this.picklistModel.optionsSource.options = this.pickListOptions;
        this.dualSelectBox.resetState(this.picklistModel);
    }

    private getFakeValues(): ISelectOption[] {
        const fakeValues = new Array<ISelectOption>();
        for (let i = 0; i < 200; i++) {
            fakeValues.push({code: `${i}${i}`, title: `Option ${i}`});
        }
        return fakeValues;
    }

}
