The `hc-measurable` component is a helper component to fill a container with components with possibly variable sizes. Nested components that will overflow the container are hidden, and can be shown inside a more menu.

##### Setting up a component to use measurable

The steps to set up the `hc-measurable` are:

1. Create a container element that has a size in the direction you want the measurables to go. For example, if you want the measurables to stack in a horizontal direction, then the container needs to have a width. If the width is `auto`, then the container will either grow with new elements added, or it will put everything into the more menu. Also add a template reference variable to the container so you can get a reference to it in the component.
2. Add an `hc-measurable`, with an `ngFor` directive applied to show your list of items. Make sure to include a `trackBy` function, since the sizes are cached inside the `hc-measurable`s. Without a `trackBy`, the `hc-measurable`s will be recreated each time the `ngFor` runs, causing the `MeasurableComponent`s to recalculate the size. Also make sure to provide a unique `string` as an input to the `hc-measurable` (bound into the `itemKey` input).
3. Add the component to fill the container inside of the `hc-measurable`.
4. Optionally add a more button that opens up a menu. After this step, your template should look something like this:
```html
<div #measurableContainer class="measurable-container">
    <hc-measurable
        *ngFor="let item of items; index as i; trackBy: itemTrackBy"
        [itemKey]="item.key">
        <my-component [item]="item">
        </my-component>
    </hc-measurable>
    <button
        hc-button
        #moreItems="hcPopAnchor"
        *ngIf="moreInstances && moreInstances.length"
        [hcPop]="popItems">
        More
        <hc-icon
            hcIconSm
            fontIcon="icon-chev-down">
        </hc-icon>
    </button>
</div>

<hc-pop
    #popItems
    [autoCloseOnContentClick]="true"
    [showArrow]="false"
    horizontalAlign="start">
    <div hcMenu>
        <button
            *ngFor="let moreItem of moreItems; index as i; trackBy: itemTrackBy"
            hcMenuItem>
            <span hcMenuText>{{moreItem.displayText}}</span>
        </button>
    </div>
</hc-pop>
```
5. You will need a `ViewChild` property referencing the container (to get the size) and a `ViewChildren` property referencing the `MeasurableComponents` to be able to send those to the service call. If you include a  Add properties similar to the following to the component containing the `hc-measurables`.
```typescript
@ViewChild('measurableContainer')
measurableContainer: ElementRef;

@ViewChildren(MeasurableComponent)
measurables: QueryList<MeasurableComponent>;

// Include this if you have the More button
@ViewChild('moreItems')
moreTrigger: HcPopoverAnchorDirective;
```
6. Inject a `MeasurableService` and a `ChangeDetectorRef` in the constructor of the component:
```typescript
constructor(
    private measurableService: MeasurableService,
    private ref: ChangeDetectorRef
) {}
```
7. Create a method that will recalculate whether the components are shown in the container or in the more menu. This can be called whenever there are updates that need to be taken into account. You should apply a `@HostListener(window:resize)` annotation to this method so it is called whenever the window is resized. The method can look like this:
```typescript
@HostListener('window:resize')
refreshItems(): void {
    // Close the popover more menu if it is currently open.
    if (this.moreTrigger) {
        this.moreTrigger.closePopover();
    }

    // If there are no items, then nothing can be done.
    if (!this.items) {
        return;
    }

    // Show and hide the measurable components as needed, then
    // return the keys of components that were hidden.
    const moreKeys = this.measurableService.fillContainer(
        // Pass in an array of type MeasurableComponent[].
        this.measurables.toArray(),
        // Get the available size through either the clientWidth
        // or clientHeight from the measurable container.
        this.measurableContainer.nativeElement.clientWidth,
        // Send in how much space in pixels should be allotted for
        // the More button in case it needs to be shown.
        116,
        // Optional. Defaults to 'horizontal', but can be 'vertical'.
        'horizontal',
        // Optional. Defaults to a function that does nothing. This
        // is an action called for each MeasurableComponent
        // that fits in the container.
        (mc: MeasurableComponent) => { console.log(mc); },
        // Optional. Defaults to a function that does nothing. This
        // is an action called for each MeasurableComponent
        // that does not fit in the container.
        (mc: MeasurableComponent) => { console.log(mc); }
    );

    // Set the items that should show up in the more menu.
    this.moreItems = this.items.filter(item => moreKeys.has(item.key));

    // Run a change detection cycle to display the changes in the UI.
    this.ref.detectChanges();
}
```
8. Call the refresh method whenever something changes that may require a recalculation. If the component is always displayed in the app (for example, in the case of the navbar), then a `@HostListener('window.load')` annotation on a method is a good place to run setup logic. If the component is only displayed at certain routes (for example, in the case of the Instance Switcher), the `window.load` event may not fire when the component shows up on the screen. In this case, it is better to add the logic shown in the "Initializing Measurables on Component Load" to the `ngAfterViewInit` method. Other places that can be of use is in the `ngOnChanges` (especially if all inputs need to trigger a refresh), or in setters on some of the inputs.

##### Adding spacing between measurables

If you need to add some spacing between elements in the container, it is best to add a margin or padding to the element inside of the `hc-measurable`. Anything applied to the `hc-measurable` itself will not be included in the calculations for how much space it takes up, which will lead to over or underflow of the container.

##### Initializing Measurables on Component Load

It is a little tricky finding a good place to call the refresh method for the first time on component load. All of the component lifecycle hooks run before the component is actually rendered to the screen, so the expression in the above example

```typescript
this.measurableContainer.nativeElement.clientWidth
```

would return zero in all of the lifecycle hooks. If the component is on every page of the app (for example, a navbar), then adding a Host Listener like the following should be enough:

```typescript
@HostListener('window:load')
_setupInstances(): void {
    this.refreshItems();

    this.measurables.changes.pipe(
        takeUntil(this.unsubscribe$)
    ).subscribe(() => this.refreshItems());
}
```

Note that any Cashmere components do not fall into this category, since the documentation pages are not on the screen for the full time.

Any components that are not on the screen need to have the refresh method called after the component is rendered. There are not currently any lifecycle hooks that run after the page is rendered, so the approach taken in the Instance Switcher component is the following:

```typescript
ngAfterViewInit(): void {
    this.checkContainerSize();
}

private checkContainerSize() {
    if (this._instancesContainer.nativeElement.clientWidth === 0 && this._animationFrameCount++ < 60) {
        requestAnimationFrame(() => this.checkContainerSize());
    } else {
        this.refreshInstances();

        this._instanceChips.changes.pipe(
            takeUntil(this._unsubscribe$)
        ).subscribe(() => this.refreshInstances());
    }
}
```

This will check on a few animation frames until the width is a positive number, and then it will run the refresh and subscribe to changes in the view. If it gets to a certain threshold, then it will also exit the loop by running the refresh and subscribing to changes in the view. This method should work to wait until the rendering of the page is complete before calculating which components should be shown or hidden.
