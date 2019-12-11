import {NgModule} from '@angular/core';

import {EllipsisPipeModule} from './ellipsis/ellipsis-pipe.module';

@NgModule({
    imports: [EllipsisPipeModule],
    exports: [EllipsisPipeModule]
})
export class PipesModule {}
