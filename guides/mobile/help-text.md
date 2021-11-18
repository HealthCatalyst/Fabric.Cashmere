# Help Text on Mobile

###### Last updated November 15, 2021

:::

##### User Context

_Sometimes I struggle to learn a new UI, and from my phone it seems impossible to find the extra guidance I need. "Hover to discover" doesn't work on my phone._

:::

:::

##### Explanation

In a perfect world, applications are so intuitive and users so saavy that no help text is needed. That's a great goal to reach for, but in the real world some folks will always need extra guidance.

With limited space and no mouse (so no hover events!), we need to be more creative and tactical in the ways we provide help text. In many cases help text will transfer nicely from a desktop experience to a mobile experience, but in others it will not.

:::

:::

##### How to Use

First assess where users tend to rely on help text to navigate through the interface. If working on an exisiting desktop application, be sure to make note of places that currently use `[title]` attributes or hover-based popovers (`[hcPop]` or `[hcTooltip]`) to provide vital help.

After identifying places where help text will be a must, decide based on context how to best provide it.

<br>

**Some points to remember:**

-   Icons, buttons, or links that show help on demand _must use click events_ instead of hover events to display that help.
-   Focus on brevity and clarity in your copy writing. This is always valuable, but especially so when space is limited.
-   Context is key. Help must be provided at the right time and in the right location to be helpful. Be sure not to obscure other important elements.
-   Employ mobile-friendly images or animations to illustrate functionality, especially during onboarding.

:::

:::

##### Examples

_The desktop app uses a hover tooltip here, but the mobile experience uses click to provide the helpful text:_

![Click handler help text](./assets/guides/mobileHelp1.gif 'Click handler help text')

<br>

_This well placed "unmuted" tooltip appears after clicking on the sound icon:_

![Timely tooltip](./assets/guides/mobileHelp2.png 'Timely tooltip')

<br>

_This example has help text describing the use of markdown, with more guidance available right in context:_

![Contextual help](./assets/guides/mobileHelp3.gif 'Contextual help')

:::

:::

##### Next Steps

-   [Designing Better Tooltips For Mobile User Interfaces, Smashing Magizine](https://www.smashingmagazine.com/2021/02/designing-tooltips-mobile-user-interfaces/)

:::
