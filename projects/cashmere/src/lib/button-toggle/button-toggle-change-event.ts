import { ButtonToggleComponent } from "./button-toggle.component";

export class ButtonToggleChangeEvent {
    /**
     * @param source the button-toggle that fired the event
     * @param value the value of that button-toggle
     */
    constructor(public source: ButtonToggleComponent[] | null, public value: any) { }
}






