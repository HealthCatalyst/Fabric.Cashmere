import {ButtonToggleComponent} from './button-toggle.component';

export class ButtonToggleChangeEvent {
    /**
     * @param source the button toggle that fired the event
     * @param buttonToggles the collection of button toggles in the group
     * @param selectedValues the values of all 'selected' button toggles
     */
    constructor(
        public source: ButtonToggleComponent | null,
        public buttonToggles: ButtonToggleComponent[] | null,
        public selectedValues: string[] | null
    ) {}
}
