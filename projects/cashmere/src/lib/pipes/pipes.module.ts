import {NgModule} from '@angular/core';
import {EllipsisPipeModule} from './ellipsis/ellipsis-pipe.module';
import {NullOrEmptyStringPipeModule} from './null-or-empty-string/null-or-empty-string-pipe.module';

@NgModule({
    imports: [
        EllipsisPipeModule,
        NullOrEmptyStringPipeModule
    ],
    exports: [
        EllipsisPipeModule,
        NullOrEmptyStringPipeModule
    ]
})
export class PipesModule {}
