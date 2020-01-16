##### Attributes

**[buttonStyle]**

`buttonStyle: 'primary' | 'primary-alt' | 'secondary' | 'destructive' | 'neutral' | 'minimal' | 'link' | 'link-inline' = 'primary'`

Sets the color and style of the button.

```html
<button hc-button buttonStyle="primary">button</button>
```

**[size]**

`size: 'sm' | 'md' | 'lg' = 'md'`

Sets the size of the button.

```html
<button hc-button size="md">button</button>
```

**[disabled]**

`disabled: boolean = false`

Puts the button in a disabled state.

```html
<button [disabled]="true">button</button>
```

**[hc-icon-button]**

Use this instead of the `buttonStyle` attribute to designate this as a textless icon button.

```html
<button hc-icon-button>
    <hc-icon fontSet="fa" fontIcon="fa-anchor"></hc-icon>
</button>
```

##### Split Button Attributes

**[autoCloseMenuOnClick]**

`autoCloseMenuOnClick: boolean = true`

True if clicking anywhere in the dropdown menu should automatically close it.

```html
<hc-split-button [autoCloseMenuOnClick]="false">
    Split button
    <div hcButtonItem>Menu Item</div>
</hc-split-button>
```

**[menuPosition]**

`menuPosition: 'start' | 'end' | 'center' = 'end'`

Positions the dropdown menu horizontally, relative to the left and right edges of the button.

```html
<hc-split-button menuPosition="start">
    Split button
    <div hcButtonItem>Menu Item</div>
</hc-split-button>
```

**[...]**

The common HTML button attributes `name`, `title`, `type`, and `value` can be used on an `<hc-split-button>` in the normal way.

##### Events

**(click)**

Buttons are generally used with a click event handler.

```html
<button hc-button (click)="handleClick()"></button>
```

##### Related Components

**HcIcon**

You can use a Cashmere icon in any button. It's recommended that you style it with some extra margin so it doesn't abut button text.

```html
<button hc-button>
    <hc-icon fontSet="fa" fontIcon="fa-cog" style="margin-right: 5px">
    Options
</button>
```

**HcSplitButton**

For a split button (a button with a caret and a dropdown menu), replace `<button>` with `<hc-split-button>`. Put menu options inside the `<hc-split-button>`, tagged with the `hcButtonItem` attribute.

```html
<hc-split-button buttonStyle="primary">
    Split Button
    <div hcButtonItem>Menu Item</div>
</hc-split-button>
```

##### Methods

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

**focus()**

Gives focus to the button.

```typescript
this.buttonRef.focus();
this.splitButtonRef.focus();
```

**openMenu()**

Opens the dropdown menu.

```typescript
this.splitButtonRef.openMenu();
```

**closeMenu()**

Closes the dropdown menu.

```typescript
this.splitButtonRef.closeMenu();
```
