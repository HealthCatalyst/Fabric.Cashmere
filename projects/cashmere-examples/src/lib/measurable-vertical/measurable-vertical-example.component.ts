import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HcPopoverAnchorDirective, MeasurableComponent, MeasurableService } from '@healthcatalyst/cashmere';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ButtonData {
    key: string;
    text: string;
}

@Component({
    selector: 'hc-measurable-vertical-example',
    templateUrl: 'measurable-vertical-example.component.html',
    styleUrls: ['measurable-vertical-example.component.scss'],
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
export class MeasurableVerticalExampleComponent implements AfterViewInit, OnDestroy {
    buttons: ButtonData[] = [];

    moreButtons: ButtonData[] = [];
    moreSelected = false;

    get moreOpenState(): 'open' | 'closed' {
        return this.buttonsMore?.isPopoverOpen() ? 'open' : 'closed';
    }

    private unsubscribe$ = new Subject<void>();

    private currentId = 1;

    @ViewChildren(MeasurableComponent)
    buttonComponents: QueryList<MeasurableComponent>;

    @ViewChild('moreButtons')
    buttonsMore: HcPopoverAnchorDirective;

    @ViewChild('buttonContainer')
    containerRef: ElementRef;

    ngAfterViewInit(): void {
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
            35,
            'vertical'
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

    addButton(): void {
        const nextId = this.currentId++;
        this.buttons = [
            ...this.buttons,
            {
                key: `button${nextId}`,
                text: `Button ${nextId}`
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
        return this.containerRef.nativeElement.clientHeight;
    }
}
