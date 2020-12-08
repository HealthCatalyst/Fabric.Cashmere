import {AfterViewInit, Component, ContentChildren, EventEmitter, forwardRef, OnDestroy, Output, QueryList, ViewEncapsulation} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ButtonToggleComponent } from './button-toggle.component';



/** Notification banners are used for general information about the state of the application or upcoming events. For instant
 * feedback responding to user actions, use a toaster message.*/
@Component({
    selector: 'hc-button-toggle-group',
    templateUrl: './button-toggle-group.component.html',
    styleUrls: ['./button-toggle-group.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonToggleGroupComponent implements AfterViewInit, OnDestroy  {

    @Output() selectionChangedEvent: EventEmitter<ButtonToggleComponent> = new EventEmitter<ButtonToggleComponent>();

    public nextUniqueId: number = 0;
    /** A list of all the radio buttons included in the group */
    @ContentChildren(
        forwardRef(() => ButtonToggleComponent),
        { descendants: true }
    )
    private _buttonToggles: QueryList<ButtonToggleComponent>;

    private _value: any = null;
    private _uniqueName = `hc-radio-group-${this.nextUniqueId++}`;
    private _name = this._uniqueName;
    private _inline = false;
    private _tight: boolean = false;
    private _initialized = false; // if value of radio group has been set to initial value
    private _selected: ButtonToggleComponent | null = null;
    private ButtonToggleChangeEvent: any[];
    private selectedButtonToggle: ButtonToggleComponent;
    private unsubscribe$ = new Subject<void>();


    public ngAfterViewInit(): void {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        console.log(this._buttonToggles);
        this._buttonToggles.forEach((item: ButtonToggleComponent) => {
            if (item.selected) { this.selectedButtonToggle = item; }
        });

            // If links are added dynamically, recheck the navbar link sizing
        //     this._buttonToggles.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.refreshNavLinks());
        // });

    }




    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    onSelectedChanged(selectedId: number) {
        this._buttonToggles.forEach((bt: ButtonToggleComponent) => {
            if (bt.uniqueId === selectedId) {
                this._selected = bt;
                bt.selected = true;
                this.selectionChangedEvent.emit(bt);
            } else { bt.selected = false; }
        });
    }

    //     public get selectedButtonToggle(): any {
    //         this.buttonToggles.forEach((bt: ButtonToggleComponent) => {
    //             if (bt.selected) { return bt; }
    //         });
    //         return null;
    // }


    //     ngAfterContentInit(): void {
    //         this.buttonToggles.forEach((bt: ButtonToggleComponent) => {
    //             bt.uniqueId = this.nextUniqueId++;
    //         });
    //     }
    // }


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



}


