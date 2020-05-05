import {NgModule} from '@angular/core';

import {EllipsisPipeModule} from './ellipsis/ellipsis-pipe.module';
import {FileSizePipeModule} from './file-size/file-size-pipe.module';

@NgModule({
    exports: [EllipsisPipeModule, FileSizePipeModule]
})
export class PipesModule {}
