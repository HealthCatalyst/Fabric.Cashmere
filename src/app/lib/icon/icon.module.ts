import { NgModule } from '@angular/core';
import { IconComponent } from './icon.component';
import { IconDemoComponent } from './icon-demo/icon-demo.component';

@NgModule({
  declarations: [IconComponent, IconDemoComponent],
  exports: [IconComponent]
})
export class IconModule {
}
