import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NumberAbbreviatorPipe} from './number-abbreviator.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [NumberAbbreviatorPipe],
    exports: [NumberAbbreviatorPipe]
})
export class NumberAbbreviatorPipeModule {}
