import {NgModule} from '@angular/core';

import {EllipsisPipe} from './ellipsis.pipe';
import {AgePipe} from './age-pipe/age.pipe';

@NgModule({
    declarations: [EllipsisPipe, AgePipe],
    exports: [EllipsisPipe, AgePipe]
})
export class PipesModule {}
