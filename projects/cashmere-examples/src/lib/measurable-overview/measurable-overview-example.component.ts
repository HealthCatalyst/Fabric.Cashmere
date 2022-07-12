import { animate, state, style, transition, trigger } from '@angular/animations';
import {ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { HcPopoverAnchorDirective, MeasurableComponent, MeasurableService } from '@healthcatalyst/cashmere';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ButtonData {
    key: string;
    text: string;
}

@Component({
    selector: 'hc-measurable-overview-example',
    templateUrl: 'measurable-overview-example.component.html',
    styleUrls: ['measurable-overview-example.component.scss'],
    animations: [
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
    ]
})
export class MeasurableOverviewExampleComponent implements OnDestroy {
    buttons: ButtonData[] = [
        {
            key: 'button1',
            text: 'Button 1'
        },
        {
            key: 'button2',
            text: 'Button 2'
        }
    ];

    moreButtons: ButtonData[] = [];
    moreSelected = false;

    get moreOpenState(): 'open' | 'closed' {
        return this.buttonsMore?.isPopoverOpen() ? 'open' : 'closed';
    }

    private unsubscribe$ = new Subject<void>();

    private currentId = 3;

    @ViewChildren(MeasurableComponent)
    buttonComponents: QueryList<MeasurableComponent>;

    @ViewChild('moreButtons')
    buttonsMore: HcPopoverAnchorDirective;

    @ViewChild('buttonContainer')
    containerRef: ElementRef;

    @HostListener('window:load')
    setupButtons(): void {
        setTimeout(() => {
            this.refreshButtons();
        });

        this.buttonComponents.changes.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(() => this.refreshButtons());
    }

    @HostListener('window:resize')
    refreshButtons(): void {
        if (this.buttonsMore) {
            this.buttonsMore.closePopover();
        }

        if (!this.buttonComponents) {
            return;
        }

        const moreKeys = this.measurableService.fillContainer(
            this.buttonComponents.toArray(),
            this.calculateAvailableSize(),
            150
        );

        this.moreButtons = this.buttons.filter(button => moreKeys.has(button.key));

        this.ref.detectChanges();
    }

    constructor(
        private measurableService: MeasurableService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    addButton(long = false): void {
        const nextId = this.currentId++;
        const text = long ? `This is a long button # ${nextId}` : `Button ${nextId}`;
        this.buttons = [
            ...this.buttons,
            {
                key: `button${nextId}`,
                text
            }
        ];

        this.ref.detectChanges();
        this.refreshButtons();
    }

    buttonClose(key: string, event: MouseEvent): void {
        this.buttons = this.buttons.filter(button => button.key !== key);

        event.stopPropagation();

        this.ref.detectChanges();
        this.refreshButtons();
    }

    buttonTrackBy(index: number, data: ButtonData): string {
        return `${data.key}|${data.text}`;
    }

    private calculateAvailableSize(): number {
        return this.containerRef.nativeElement.clientWidth;
    }
}
