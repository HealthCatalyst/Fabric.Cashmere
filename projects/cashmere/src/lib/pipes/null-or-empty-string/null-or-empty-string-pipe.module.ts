import {NgModule} from '@angular/core';
import {NullOrEmptyStringPipe} from './null-or-empty-string.pipe';

@NgModule({
    declarations: [NullOrEmptyStringPipe],
    exports: [NullOrEmptyStringPipe]
})
export class NullOrEmptyStringPipeModule {}
