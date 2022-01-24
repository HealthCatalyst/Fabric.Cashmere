import {HcToastComponent} from './hc-toast.component';
import {HcToasterService} from './hc-toaster.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortalModule} from '@angular/cdk/portal';
import {OverlayModule} from '@angular/cdk/overlay';
import {IconModule} from '../icon/icon.module';

@NgModule({
    imports: [CommonModule, PortalModule, OverlayModule, IconModule],
    exports: [HcToastComponent],
    declarations: [HcToastComponent],
    providers: [HcToasterService],
    entryComponents: [HcToastComponent]
})
export class ToasterModule {}
