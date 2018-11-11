import {HcToastComponent} from './hc-toast.component';
import {HcToasterService} from './hc-toaster.service';
import {IconModule} from '../icon/icon.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule, IconModule],
    exports: [HcToastComponent],
    declarations: [HcToastComponent],
    providers: [HcToasterService],
    entryComponents: [HcToastComponent]
})
export class ToasterModule {}
