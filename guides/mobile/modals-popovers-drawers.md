# Modals/Popovers/Drawers on Mobile

###### Last updated November 15, 2021

:::

##### User Context

_It's frustrating when a mobile application pulls up a modal window that is wider than my screen and I either have to zoom out or scroll around to use it._

:::

:::

##### Explanation

The use of modals, drawers, and popovers is encouraged in Catalyst applications. They help avoid cluttering and interface via [progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/) by hiding content until the moment it is needed. For mobile applications, we need to be sure that these elements are displayed in a way that is useful.

:::

:::

##### How to Use

Identify all modals, drawers, and popovers that will be needed for mobile use cases and determine the needed adjustments. For most cases, modals and drawers can likely be made to use the full screen width and all (or most) of the screen height. This functionality is built into the Cashmere's `<hc-modal>` component. Ensure users maintain a sense of context and have a clear path to dismiss these elements and return to where they started.

Similarly, popovers need to be constrained by the height and width of the window. They also must be triggered by click (or tap) events rather than by hover events.

In some instances, such as smaller confirmation modals or popovers, the element does not need to cover the entire screen. A modal can function and feel similar to a mobile device's native alert windows.

<br>

**Time to pivot?**

As circumstances dictate, you may need to consider alternatives to using modals, drawer, or popovers. Sometimes switching to a UI with tabs or accordions for progressive disclosure will provide a better mobile experience.

:::

:::

##### Examples

_Cashmere modals by default will fill the whole screen:_

![Cashmere modal](./assets/guides/mobileModal1.gif 'Cashmere modal')

<br>

_Smaller modals are ok to cover just a portion of the window as usual:_

![Google modal](./assets/guides/mobileModal2.png 'Google modal')

:::

:::

##### Next Steps

-   [Progressive Disclosure, Nielsen Norman Group](https://www.nngroup.com/articles/progressive-disclosure/)
-   [Cashmere modals](https://cashmere.healthcatalyst.net/web/components/modal/examples)
-   [Cashmere accordion](https://cashmere.healthcatalyst.net/web/components/accordion/examples)
-   [Cashmere tabs](https://cashmere.healthcatalyst.net/web/components/tabs/examples)

:::
