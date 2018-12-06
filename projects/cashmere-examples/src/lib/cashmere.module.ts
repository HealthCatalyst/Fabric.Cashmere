import {NgModule} from '@angular/core';
import {CashmereModule as DocsCashmereModule} from '../../../../src/app/shared/cashmere.module';

@NgModule({
    imports: [DocsCashmereModule],
    exports: [DocsCashmereModule]
})
export class CashmereModule {}
