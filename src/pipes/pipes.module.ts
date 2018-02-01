import { NgModule } from '@angular/core';

import { EllipsisPipe } from './ellipsis.pipe';

@NgModule({
    declarations: [
        EllipsisPipe,
    ],
    exports: [
        EllipsisPipe,
    ]
})
export class PipesModule {
}
