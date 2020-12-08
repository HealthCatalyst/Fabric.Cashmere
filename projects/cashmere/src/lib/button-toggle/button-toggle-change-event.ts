import { ButtonToggleComponent } from "./button-toggle.component";


/** Event type that is emitted when a radio button or radio button group changes */
export class ButtonToggleChangeEvent {
    /**
     * @param source the button-toggle that fired the event
     * @param value the value of that button-toggle
     */
    constructor(public source: ButtonToggleComponent | null, public value: any) { }
}
