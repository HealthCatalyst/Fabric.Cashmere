# Responsive Breakpoints

###### Last updated November 15, 2021

:::

##### User Context

*I like to have two windows open side by side so I can look at my data in one browser window and take notes in the other one—but my monitor isn’t very large, and I have to scroll horizontally on my web app, which makes it harder to read content.*

:::

:::

##### Explanation

A well-designed web application can scale from a 4” smartphone screen all the way up to a 30” monitor—along with every dimension in between. Additionally, a good web application should not ever display a horizontal scroll bar, as they have major accessibility, usability, and discoverability issues—not to mention that they cause rampant user unhappiness!

Check out at the screenshots below of healthcatalyst.com. You will see that content reflows and the navigation bar collapses behind a button as the page shrinks—the same content is still available and accessible, regardless of the browser’s width, but the content is presented in a way that adapts to the current conditions of the user’s screen or browser window.

![Responsive Breakpoints](./assets/guides/responsive-breakpoints.jpg "Responsive Breakpoints")

:::

:::

##### How to Use

Typically, a web application may have anywhere from 3-5 breakpoint widths. Within Cashmere, we have the following widths defined:
<br><br>

| Name    | Max Width | Explanation                                           |
| :------ | :-------- | :---------------------------------------------------- |
| `xs`    | 0px       | Small mobile phones and phones in portrait mode       |
| `sm`    | 576px     | Large mobile phones and phones in landscape mode      |
| `md`    | 768px     | Tablets in portrait mode                              |
| `lg`    | 992px     | Tablets in landscape mode and smaller desktop screens |
| `xl`    | 1200px    | Larger desktop screens                                |

Also within Cashmere, you can take advantage of responsive breakpoints by using the handy mixins, media-breakpoint-up and media-breakpoint-down. For instance, you could stipulate that your web application will show a standard navigation bar on tablets in landscape mode and larger, and a hamburger menu on small screens with a pair of media queries like the following:

```
.hamburger-menu {
    display: none;
    @include media-breakpoint-down(lg) {
        display: block;
    }
}
```

```
.navigation-bar {
    display: none;
    @include media-breakpoint-up(lg) {
        display: block;
    }
}
```

Responsive breakpoints aren’t just limited to hiding and showing content—you can use them to adjust font sizes, margins and padding, the layout of UI elements, and much more.

:::

:::

##### Next Steps

- [A discussion of the customer dissatisfaction caused by horizontal scrolling: Scrolling and scrollbars, Nielsen Norman Group](https://www.nngroup.com/articles/scrolling-and-scrollbars/)
- [Defining Responsive Breakpoints: Best Practices, BrowserStack](https://www.browserstack.com/guide/responsive-design-breakpoints)
- [Using media queries, MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
- [Cashmere _mixins.scss](https://github.com/HealthCatalyst/Fabric.Cashmere/blob/dev/projects/cashmere/src/lib/sass/_mixins.scss)

:::
