import {Component, ContentChildren, EventEmitter, forwardRef, Input, Output, QueryList, ViewEncapsulation} from '@angular/core';
import { ButtonToggleComponent } from './button-toggle.component';



/** Notification banners are used for general information about the state of the application or upcoming events. For instant
 * feedback responding to user actions, use a toaster message.*/
@Component({
    selector: 'hc-button-toggle-group',
    templateUrl: './button-toggle-group.component.html',
    styleUrls: ['./button-toggle-group.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonToggleGroupComponent {

    @Output() selectionChangedEvent: EventEmitter<ButtonToggleComponent> = new EventEmitter<ButtonToggleComponent>();

    public nextUniqueId: number = 0;
    /** A list of all the radio buttons included in the group */
    @ContentChildren(
        forwardRef(() => ButtonToggleComponent),
        { descendants: true }
    )
    public buttonToggles: QueryList<ButtonToggleComponent>;

    private _value: any = null;
    private _uniqueName = `hc-radio-group-${this.nextUniqueId++}`;
    private _name = this._uniqueName;
    private _inline = false;
    private _tight: boolean = false;
    private _initialized = false; // if value of radio group has been set to initial value
    private _selected: ButtonToggleComponent | null = null;

    onSelectedChanged(selectedId: number) {
        this.buttonToggles.forEach((bt: ButtonToggleComponent) => {
            if (bt.uniqueId === selectedId) {
                this._selected = bt;
                bt.selected = true;
                this.selectionChangedEvent.emit(bt);
            } else { bt.selected = false; }
        });
    }

    public get selectedButtonToggle(): any {
        this.buttonToggles.forEach((bt: ButtonToggleComponent) => {
            if (bt.selected) { return bt; }
        });
        return null;
}


    ngAfterContentInit(): void {
        this.buttonToggles.forEach((bt: ButtonToggleComponent) => {
            bt.uniqueId = this.nextUniqueId++;
        });
    }
}


// @Component({
//     selector: 'hc-button-toggle',
//     templateUrl: './button-toggle.component.html',
//     styleUrls: ['./button-toggle.component.scss'],
//     encapsulation: ViewEncapsulation.None
// })
// export class ButtonToggleComponent {
//     @Input() selected: boolean;
//     @Input() uniqueId: number;
//     @Input() value: string;

//     buttonToggleGroup: ButtonToggleGroupComponent;


//     constructor(group: ButtonToggleGroupComponent) {
//         this.buttonToggleGroup = group;
//     };

//     public selectButton() {
//         this.buttonToggleGroup.onSelectedChanged(this.uniqueId);
//     }
// }





