##### Basic Usage

Wrap any component you want to display in a popover with an `<hc-pop>` component.

```html
<hc-pop>
    <app-contact-overview [contact]="myContact"></app-contact-overview>
</hc-pop>
```

Next, hook the popover to an anchor element.

```html
<button [hcPop]="contactPopover">
    See Contact Details
</button>

<hc-pop #contactPopover>
    <app-contact-overview [contact]="myContact"></app-contact-overview>
</hc-pop>
```

&nbsp;

##### Focus behavior

By default, the popover will apply focus to the first tabbable element when opened and trap focus
within the popover until closed. If the popover does not contain any focusable elements, focus
will remain on the most recently focused element.

You can target a different element for initial focus using the `cdkFocusInitial` attribute.

To prevent focus from automatically moving into the popover, you can set the `autoFocus` property
to `false`.

```html
<hc-pop [autoFocus]="false">
    <!-- ... -->
</hc-pop>
```

Once the popover is closed, focus will return to the most recently focused element prior to
opening the popover. To disable this, you can set the `restoreFocus` property to `false`.

```html
<hc-pop [restoreFocus]="false">
    <!-- ... -->
</hc-pop>
```

Alternatively the `open` and `openPopover` methods support an optional `HcPopoverOpenOptions`
object where `autoFocus` and `restoreFocus` options can be set while opening the popover. Note
that these options do no take precendence over the component inputs. For example, if `restoreFocus`
is set to `false` either in the open options or via the component input, focus will not be
restored.

```html
<button [hcPop]="myPopover" (click)="myPopover.open({ restoreFocus: false })">
    Open
</button>
```

&nbsp;

##### Styles

The `<hc-pop>` component by default provides some basic styling, but these can be turned off with `disableStyle`.
This allows for the popover to be used in some very customized and interesting ways. In the case that the basic styles
are disabled, it is the responsibility of the elements you project inside the popover to style themselves. This
includes background color, box shadows, margin offsets, etc.

&nbsp;

##### Animations

#### Setup

If you want the popover animations to work, you must include `BrowserAnimationsModule` in your app.

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [ BrowserAnimationsModule ],
  ...
})
export class AppModule { }
```

If you prefer to not have animations, you can include `NoopAnimationsModule`.

```ts
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [ NoopAnimationsModule ],
  ...
})
export class AppModule { }
```

#### Modifying Animations

By default, the opening and closing animations of a popover are quick with a simple easing curve.
You can modify these animation curves using `openTransition` and `closeTransition`. Or, you can disable animation
altogther by setting `shouldAnimate` to false.

```html
<!-- open slowly but close quickly -->
<hc-pop #mySlowPopover openTransition="1000ms ease-out" closeTransition="100ms ease-in">
    <!-- ... -->
</hc-pop>
```

&nbsp;

##### Menus

One common situation where popovers can be leveraged is to create menus within the app.
Cashmere offers a standard way to present menus from any `hcPop` anchor.

`hcMenu` supports sub-menus as well as keyboard navigation.
For sub-menus, you add another `hcPop` to a menu item.
The trigger for sub-menus will automatically be set to hover and cannot be overriden.

```html
<hc-pop #menu [autoCloseOnContentClick]="true" [showArrow]="false" horizontalAlign="start">
    <div hcMenu>
        <a hcMenuItem href="http://example.com" target="_blank">
            <hc-icon hcMenuIcon fontIcon="icon-save"></hc-icon>
            <span hcMenuText>Save document</span>
            <span hcMenuSubText>Ctrl + S</span>
        </a>
        <button hcMenuItem [hcPop]="editmenu">
            <span hcMenuIcon></span>
            <span hcMenuText>Edit document</span>
            <!-- hcMenuItems with a subMenu will automatically add a caret to the right -->
        </button>
    </div>
</div>
```

&nbsp;

##### Scroll Behavior

When using `hcTooltip` or `hcPop` with a hover trigger, you may encounter some challenges with page scrolling.
Particularly when using a mouse wheel or trackpad, the tooltip may stay open even though you have scrolled off the target.
This can be particularly problematic with scroll containers that include tooltips or hover pops - elements with a fixed size that have `overflow: auto`.

The problem centers around the Angular CDK not having awareness of scroll events unless the app explictly defines scroll containers.
To do so, you may add the `cdkScrollable` directive to any scrollable container that will contain tooltips or hover popovers.
To use that directive you'll need to import the following in your module:

`import {ScrollingModule} from '@angular/cdk/scrolling';`

Below is an example of how to use the directive:

```(html)
<div cdkScrollable>
    This element is a scroll container which includes
    <u hcTooltip="I'm a tooltip">any tooltips you are using</u>.
</div>
```

&nbsp;

##### Mobile Development Guide

For information on configuring help text for responsive web applications, refer to the mobile development guide for information on [mobile help text](https://cashmere.healthcatalyst.net/web/mobile/help-text) and [popovers on small screens](https://cashmere.healthcatalyst.net/web/mobile/modals-popovers-drawers).
