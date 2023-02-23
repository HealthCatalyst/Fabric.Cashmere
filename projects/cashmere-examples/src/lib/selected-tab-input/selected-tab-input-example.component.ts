import {Component, OnDestroy, OnInit} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TabChangeEvent } from '@healthcatalyst/cashmere';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'hc-selected-tab-input-example',
    templateUrl: 'selected-tab-input-example.component.html',
    // TODO: delete the SCSS file if you don't need it in the example
    styleUrls: ['selected-tab-input-example.component.scss']
})
export class SelectedTabInputExampleComponent implements OnInit, OnDestroy {

    tabSelected = new UntypedFormControl(1);
    currentSelected = 1;
    unsubscribe = new Subject<void>();

    selectionChanged(event: TabChangeEvent): void {
        this.tabSelected.setValue(event.index);
    }

    ngOnInit(): void {
        this.tabSelected.valueChanges.pipe(
            map(value => {
                if (value) {
                    return Number(value);
                }

                return 0;
            }),
            takeUntil(this.unsubscribe)
        ).subscribe(value => {
            this.currentSelected = value;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
