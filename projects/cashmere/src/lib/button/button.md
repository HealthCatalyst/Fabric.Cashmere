## Key Attributes

Below is a list of the primary attributes that you'll be likely to use when working with a `hc-button`. For a complete list of attributes, refer to the [API Section](/components/button/api).

<br>

**[buttonStyle]**

`buttonStyle: 'primary' | 'primary-alt' | 'secondary' | 'destructive' | 'neutral' | 'minimal' | 'link' | 'link-inline' = 'primary'`

Sets the color and style of the button.

```html
<button hc-button buttonStyle="primary">button</button>
```

<br>

**[size]**

`size: 'sm' | 'md' | 'lg' = 'md'`

Sets the size of the button.

```html
<button hc-button size="md">button</button>
```

<br>

**[disabled]**

`disabled: boolean = false`

Puts the button in a disabled state.

```html
<button [disabled]="true">button</button>
```

<br>

**[hc-icon-button]**

Use this instead of the `buttonStyle` attribute to designate this as a textless icon button.

```html
<button hc-icon-button>
    <hc-icon fontSet="fa" fontIcon="fa-anchor"></hc-icon>
</button>
```

<br><br>

## Split Button Attributes

**[autoCloseMenuOnClick]**

`autoCloseMenuOnClick: boolean = true`

True if clicking anywhere in the dropdown menu should automatically close it.

```html
<hc-split-button [autoCloseMenuOnClick]="false">
    Split button
    <div hcButtonItem>Menu Item</div>
</hc-split-button>
```

<br>

**[menuPosition]**

`menuPosition: 'start' | 'end' | 'center' = 'end'`

Positions the dropdown menu horizontally, relative to the left and right edges of the button.

```html
<hc-split-button menuPosition="start">
    Split button
    <div hcButtonItem>Menu Item</div>
</hc-split-button>
```

<br>

**[...]**

The common HTML button attributes `name`, `title`, `type`, and `value` can be used on an `<hc-split-button>` in the normal way.

<br><br>

## Events

**(click)**

Buttons are generally used with a click event handler.

```html
<button hc-button (click)="handleClick()"></button>
```

<br><br>

## Related Components

**HcIcon**

You can use a Cashmere icon in any button. It's recommended that you style it with some extra margin so it doesn't abut button text.

```html
<button hc-button>
    <hc-icon fontSet="fa" fontIcon="fa-cog" style="margin-right: 5px">
    Options
</button>
```

<br>

**HcSplitButton**

For a split button (a button with a caret and a dropdown menu), replace `<button>` with `<hc-split-button>`. Put menu options inside the `<hc-split-button>`, tagged with the `hcButtonItem` attribute.

```html
<hc-split-button buttonStyle="primary">
    Split Button
    <div hcButtonItem>Menu Item</div>
</hc-split-button>
```

<br><br>

## Methods

First, get a reference to the element.

```html
<button hc-button #buttonElement></button>

<hc-split-button #splitButtonElement>
    Split button
    <div hcButtonItem>Menu Item</div>
</hc-split-button>
```

```typescript
export class ExampleComponent {
    @ViewChild('buttonElement') buttonRef: ButtonComponent;
    @ViewChild('splitButtonElement') splitButtonRef: SplitButtonComponent;
}
```

<br>

**focus()**

Gives focus to the button.

```typescript
this.buttonRef.focus();
this.splitButtonRef.focus();
```

<br>

**openMenu()**

Opens the dropdown menu.

```typescript
this.splitButtonRef.openMenu();
```

<br>

**closeMenu()**

Closes the dropdown menu.

```typescript
this.splitButtonRef.closeMenu();
```
