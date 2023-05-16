##### Resizable overview

The `hcResizable` component can be used anywhere that you want to give the user the ability to change the `width` or `height` of an element.
It can be applied as a directive to any html element.
To work, the display type of that element needs to be `block` or another type that is affected by setting the width or height styles.
`hcResizable` can be used with both horizontal or vertical layouts by setting the `position` property.
You may also constrain the resizing using the `min` or `max` properties (set to numerical pixel values).

##### Optional directives

The most common use of `hcResizable` is in flexible layouts either on sidebar or bottom panel.
In such a situation, you can take advantages of two optional convenience directives.
`hcResizableContainer` can be added to the parent element containing both resizable and static layout elements.
`hcResizableStatic` can be added to any other containers in the parent that don't need a resizable handle.

##### Static and resizable elements together

Note that as in the component example, if you have two elements in a container, you don't need both of them to be resizable.
You can apply the `hcResizable` component to one and `hcResizableStatic` to the other and it will create a flexible space.
The `hcResizable` element is the one that will have the drag handle added, the static one will adjust its size based on dimensions of the resized element.
