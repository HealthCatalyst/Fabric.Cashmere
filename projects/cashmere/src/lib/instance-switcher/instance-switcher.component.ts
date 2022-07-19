import { animate, state, style, transition, trigger } from '@angular/animations';
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation,
    AfterViewInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MeasurableService } from '../measurable';
import { MeasurableComponent } from '../measurable/measurable.component';
import { HcPopoverAnchorDirective } from '../pop';
import { IInstance, IInstanceSwitcherTooltipText } from './instance-switcher-interfaces';
import {parseBooleanAttribute} from '../util';
import { FormControl } from '@angular/forms';

type InstanceSwitcherTooltipConfig = IInstanceSwitcherTooltipText & {
    instanceTrigger: string;
    addTrigger: string;
    closeTrigger: string;
};

/**
 * `hc-instance-switcher` is used to manage multiple instances of the same page.
 */
@Component({
    selector: 'hc-instance-switcher',
    templateUrl: './instance-switcher.component.html',
    styleUrls: ['./instance-switcher.component.scss'],
    animations: [
        trigger('openState', [
            state(
                'open',
                style({
                    height: '*'
                })
            ),
            state(
                'void',
                style({
                    height: '0px',
                    visibility: 'hidden'
                })
            ),
            transition('void <=> open', animate('400ms ease'))
        ]),
        trigger('moreOpenState', [
            state(
                'open',
                style({
                    transform: 'rotate(180deg)'
                })
            ),
            state(
                'closed',
                style({
                    transform: 'rotate(0deg)'
                })
            ),
            transition('open <=> closed', animate('500ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class InstanceSwitcherComponent implements OnDestroy, AfterViewInit {
    _instances: IInstance[] = [];
    _moreInstances: IInstance[] = [];
    _selectedKey: string | null = null;
    _editKey: string | null = null;
    _previouslySelected: string[] = [];
    _closable = true;
    _isOpen = true;
    _openState: 'void' | 'open' = 'open';
    _tooltipText: InstanceSwitcherTooltipConfig = {
        instanceTrigger: 'none',
        addTrigger: 'none',
        closeTrigger: 'none'
    };
    _renameInstanceControl = new FormControl('');
    _renameInstanceSize$ = this._renameInstanceControl.valueChanges.pipe(
        map((instanceName: string) => Math.max(instanceName.length + 2, 4))
    );

    private _unsubscribe$ = new Subject<void>();
    private _animationFrameCount = 0;
    private _blurActive = false;
    _instanceContextKey: string | null = null;
    _instanceContextValue: string | null = null

    public _collapse = false;
    public _moreList: Array<IInstance> = [];

    /**
     * The instances to display on the Instance Switcher. *Required.*
     */
    @Input()
    get instances(): IInstance[] {
        return this._instances;
    }

    set instances(instancesVal: IInstance[]) {
        this._instances = instancesVal;
        this._ref.detectChanges();
        this.refreshInstances();
    }

    /**
     * Controls whether or not to display the close button
     * on the Instance Switcher. *Defaults to true.*
     */
    @Input()
    get closable(): boolean {
        return this._closable;
    }

    set closable(closableVal: boolean) {
        this._closable = parseBooleanAttribute(closableVal);
        this._ref.detectChanges();
        this.refreshInstances();
    }

    /**
     * Controls whether or not the instance chips are
     * editable. *Defaults to true.*
     *
     * @memberof InstanceSwitcherComponent
     */
    @Input()
    editable = false;

    /**
     * Sets the Instance Switcher to either open or closed. *Defaults to true. Required if `closable` is also true.*
     */
    @Input()
    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(isOpenVal: boolean) {
        this._isOpen = parseBooleanAttribute(isOpenVal);
        this._openState = this._isOpen ? 'open' : 'void';
    }

    /**
     * Sets which instance is selected.
     */
    @Input()
    get selectedKey(): string | null {
        return this._selectedKey;
    }

    set selectedKey(selectedKeyVal: string | null) {
        if (this._selectedKey !== selectedKeyVal) {
            this._selectedKey = selectedKeyVal;
            this._ref.detectChanges();
            this.refreshInstances();
        }
    }

    /**
     * Configures the tooltip text that shows up on the various
     * controls.
     */
    @Input()
    get tooltipText(): IInstanceSwitcherTooltipText {
        return this._tooltipText;
    }

    set tooltipText(toolTipVal: IInstanceSwitcherTooltipText) {
        this._tooltipText = {
            ...toolTipVal,
            instanceTrigger: toolTipVal.instanceText ? 'hover' : 'none',
            addTrigger: toolTipVal.addText ? 'hover' : 'none',
            closeTrigger: toolTipVal.closeText ? 'hover' : 'none'
        };
    }

    get _moreOpenState(): 'open' | 'closed' {
        return this._instancesMore?.isPopoverOpen() ? 'open' : 'closed';
    }

    /**
     * Value emitted when an instance tab is clicked. The value
     * is the unique key assigned to the instance.
     */
    @Output()
    selected = new EventEmitter<string | null>();

    /**
     * Empty event emitted when the add instance button is clicked.
     */
    @Output()
    added = new EventEmitter<never>();

    @Output()
    edited = new EventEmitter<IInstance>();

    /**
     * Value emitted when the close button is clicked on an
     * instance tab. The value is the unique key assigned to the
     * instance.
     */
    @Output()
    removed = new EventEmitter<string>();

    /**
     * Empty event emitted when the close button is clicked on the
     * instance switcher.
     */
    @Output()
    closed = new EventEmitter<never>();

    @ViewChildren(MeasurableComponent)
    _instanceChips: QueryList<MeasurableComponent>;

    @ViewChild('moreInstances')
    _instancesMore: HcPopoverAnchorDirective;

    @ViewChild('instancesContainer')
    _instancesContainer: ElementRef;

    @ViewChild('instanceEditInput')
    _instanceEditInput: ElementRef;

    @ViewChildren('instance')
    _instancePopovers: QueryList<HcPopoverAnchorDirective>;

    /**
     * Recalculates which instances should be shown, and which
     * ones should be moved to the more menu.
     */
    @HostListener('window:resize')
    refreshInstances(): void {
        if (this._instancesMore) {
            this._instancesMore.closePopover();
        }

        if (!this._instanceChips) {
            return;
        }

        const selectedInstance = this._instanceChips
            .find(instance => instance.itemKey === this._selectedKey);

        selectedInstance?.show();

        const selectedSize = selectedInstance?.width ?? 0;

        const moreKeys = this._measurableService.fillContainer(
            this._instanceChips.filter(instance => instance.itemKey !== this._selectedKey),
            this._calculateAvailableSize() - selectedSize,
            112);

        this._moreInstances = this._instances.filter(instance => moreKeys.has(instance.instanceKey));

        this._ref.detectChanges();
    }

    constructor(
        private _measurableService: MeasurableService,
        private _ref: ChangeDetectorRef
    ) {}

    ngAfterViewInit(): void {
        this.checkContainerSize();
    }

    /**
     * Checks the container size a few times to see if the instances can be refreshed for the first
     * time. For more information about this approach, see the Usage tab on the website.
     */
    private checkContainerSize(): void {
        // If the clientWidth is zero, then the container element has not yet been rendered to the DOM.
        // This will try requesting a new animation frame 60 times, or until the element has been
        // rendered, whichever comes first.
        if (this._instancesContainer.nativeElement.clientWidth === 0 && this._animationFrameCount++ < 60) {
            requestAnimationFrame(() => this.checkContainerSize());
        } else {
            // If the container element is loaded, or we have exceeded the try count, then refresh instances.
            this.refreshInstances();

            this._instanceChips.changes.pipe(
                takeUntil(this._unsubscribe$)
            ).subscribe(() => this.refreshInstances());
        }
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    _isSelected(key: string, isMore: boolean, index: number): boolean {
        return this.selectedKey === key
            || (!isMore && index === 0 && !this.selectedKey);
    }

    _contextTrigger(): string {
        return this._instances.length === 1 && !this.editable ? 'none' : 'rightclick';
    }

    _isEditable(key: string): boolean {
        return this.editable && this._editKey === key;
    }

    _inputWidth(charCount: number): number {
        return Math.max(charCount, 4);
    }

    _closeClick(): void {
        this.isOpen = false;
        this.closed.emit();
    }

    _instanceClick(key: string): void {
        if (key !== this._selectedKey  && this._selectedKey) {
            this._previouslySelected.push(this._selectedKey);
        }

        this.selectedKey = key;
        this.selected.emit(key);
    }

    _instanceContextOpened(key: string, value: string): void {
        this._instanceContextKey = key;
        this._instanceContextValue = value;
    }

    _instanceEdit(key: string | null, value: string | null, clickEvent?: MouseEvent): void {
        if (this.editable && key && value) {
            if (clickEvent) {
                clickEvent.stopPropagation();
            }

            const instancePopover = this._instancePopovers.first;

            this._editKey = key;

            setTimeout(() => {
                this._renameInstanceControl.setValue(value);
                this._renameInstanceControl.updateValueAndValidity();
                if (instancePopover) {
                    instancePopover.closePopover();
                }

                setTimeout(() => {
                    this._instanceEditInput.nativeElement.focus();
                    this._blurActive = true;
                }, 0);
            }, 0);
        }
    }

    _cancelEdit(): void {
        this._editKey = null;
    }

    _instanceBlur(key: string): void {
        if (!this._blurActive) {
            return;
        }

        this._blurActive = false;

        const value = this._renameInstanceControl.value
        if (value) {
            if (key === this._editKey) {
                this._editKey = null;
            }

            this.instances = this._instances.map(instance => {
                if (instance.instanceKey === key) {
                    return {
                        ...instance,
                        displayText: value
                    };
                }

                return instance
            });

            this.edited.emit({
                instanceKey: key,
                displayText: value
            });

            this._instanceChips
                .find(instance => instance.itemKey === key)
                ?.reset();

            this.refreshInstances();
        }
    }

    _instanceClose(key: string, event?: MouseEvent): void {
        event?.stopPropagation();

        this._instances = this._instances.filter(instance => instance.instanceKey !== key);
        this._previouslySelected = this._previouslySelected.filter(prevKey => prevKey !== key);

        if (this._previouslySelected.length > 0) {
            this.selectedKey = this._previouslySelected.pop() ?? null;
        } else if (this._instances.length > 0) {
            this.selectedKey = this._instances[0].instanceKey;
        } else {
            this.selectedKey = null;
        }

        this.selected.emit(this.selectedKey);

        this.removed.emit(key);
    }

    _instanceAdd(): void {
        this.added.emit();
    }

    _calculateAvailableSize(): number {
        const baseSize = this._instancesContainer.nativeElement.clientWidth;
        return baseSize - 45;
    }

    _instanceTrackBy(index: number, instance: IInstance): string {
        return `${instance.instanceKey}|${instance.displayText}`;
    }
}
