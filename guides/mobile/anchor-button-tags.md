# Anchor and Button Tags

###### Last updated November 15, 2021

:::

##### User Context

*As a visually-impaired person who depends on a screen reader to navigate the web, I sometimes encounter web apps that use what I understand are `<div>` or `<span>` tags styled to look like buttons or links. My screen reader has trouble understanding that these are supposed to be clickable elements, and that leaves me unable to navigate these sites. I wish their creators would use `<button>` and `<a>` tags instead so that I could more easily use the web.*

:::

:::

##### Explanation

Although this practice is not nearly as common as it was in the early 2010s, it is still quite common to find single page web applications that will style `<div>` and `<span>` tags to resemble buttons and hyperlinks and then attach event handlers to these elements. A user who is navigating exclusively with a mouse may not ever notice a difference between the ‘real’ elements and cleverly-styled replacements, but a keyboard-centric user will be prevented from accomplishing their tasks—or potentially even being able to find the element they are required to interact with.
:::

:::

##### How to Use

Audit your codebase for `<div>` or `<span>` elements that have onclick event handlers attached to them. In general, these elements should be replaced with `<button>` elements. However, click handlers that simply redirect the user to a new page should be replaced with `<a>` tags, as that will allow screen reader software for visually impaired users to navigate your site more easily.

:::

:::

##### Next Steps

- [HTML: A good basis for accessibility, MDN](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)

:::
