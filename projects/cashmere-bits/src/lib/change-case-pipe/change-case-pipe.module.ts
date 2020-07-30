import {NgModule} from '@angular/core';
import {ChangeCasePipe} from './change-case.pipe';
import {CHANGE_CASE, changeCase} from './change-case-lib';

@NgModule({
    declarations: [ChangeCasePipe],
    providers: [{provide: CHANGE_CASE, useValue: changeCase}],
    exports: [ChangeCasePipe]
})
export class ChangeCasePipeModule {}
