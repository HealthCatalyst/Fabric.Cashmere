import {NgModule} from '@angular/core';

import {EllipsisPipe} from './ellipsis.pipe';
import {HighlightPipe} from "./highlight.pipe";
import {PhonePipe} from "./phone.pipe";
import {ZipcodePipe} from "./zipcode.pipe";
import {SSNMaskedPipe} from "./ssn-masked.pipe";
import {SSNPipe} from "./ssn.pipe";

@NgModule({
    declarations: [EllipsisPipe, HighlightPipe, PhonePipe, ZipcodePipe, SSNMaskedPipe, SSNPipe],
    exports: [EllipsisPipe, HighlightPipe, PhonePipe, ZipcodePipe, SSNMaskedPipe, SSNPipe]
})
export class PipesModule {
}
