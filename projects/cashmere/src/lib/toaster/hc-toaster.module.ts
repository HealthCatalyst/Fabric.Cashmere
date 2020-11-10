import {HcToastComponent} from './hc-toast.component';
import {HcToasterService} from './hc-toaster.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortalModule} from '@angular/cdk/portal';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
    imports: [CommonModule, PortalModule, OverlayModule],
    exports: [HcToastComponent],
    declarations: [HcToastComponent],
    providers: [HcToasterService],
    entryComponents: [HcToastComponent]
})
export class ToasterModule {}
