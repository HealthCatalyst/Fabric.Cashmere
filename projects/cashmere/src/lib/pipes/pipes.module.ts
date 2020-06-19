import {NgModule} from '@angular/core';
import {EllipsisPipeModule} from './ellipsis/ellipsis-pipe.module';
import {NullOrEmptyStringPipeModule} from './null-or-empty-string/null-or-empty-string-pipe.module';
import {FileSizePipeModule} from './file-size/file-size-pipe.module';
import {NumberAbbreviatorPipeModule} from './number-abbreviator/number-abbreviator-pipe.module';

@NgModule({
    imports: [
        EllipsisPipeModule,
        NullOrEmptyStringPipeModule,
        FileSizePipeModule,
        NumberAbbreviatorPipeModule
    ],
    exports: [
        EllipsisPipeModule,
        NullOrEmptyStringPipeModule,
        FileSizePipeModule,
        NumberAbbreviatorPipeModule
    ]
})
export class PipesModule {}
