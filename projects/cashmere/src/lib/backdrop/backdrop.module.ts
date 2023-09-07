import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BackdropComponent } from "./backdrop.component";
import { BackdropHostDirective } from "./backdrop-host.directive";

@NgModule({
    imports: [CommonModule],
    declarations: [BackdropComponent, BackdropHostDirective],
    exports: [BackdropComponent, BackdropHostDirective]
})
export class BackdropModule {}