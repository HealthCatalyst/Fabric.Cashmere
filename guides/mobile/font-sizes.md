# Font Sizes

###### Last updated November 15, 2021

:::

##### User Context

*My vision isn’t great, and I like to increase the default font size of text in Chrome in order to make it easier for me to read webpages. Some sites work great, but the web app I have to use for work doesn’t increase in size, which makes it hard to use!*

:::

:::

##### Explanation

When we specify font sizes in pixels or points, we are getting an approximation of what the browser thinks is right for our current combination of screen size and PPI. However, we won’t get consistent results across different devices. Additionally, using pixel and point measurements will potentially make our web apps inaccessible to users who depend on large font settings.

Instead, it’s easier to use the newer rem unit (which stands for “root em”). Rems are “[equal] to the computed value of ‘font-size’ on the root element,” as described in the W3C document, CSS Values and Units Module Level 3. This is a fancy way of saying that our font sizes are scaled relative to the value of font-size at the root of the page. By default, font-size is 16px, which is equivalent to 1.0rem.

In the image below, you can see a simple web page that displays two columns of text. When the font-size value of the root element is 16px, our two columns look identical. For instance, 20px fonts are rendered identically to 1.25rem.

<br>

![Font Sizes](./assets/guides/font-sizes.png "Font Sizes")

<br>

However, if we increase our browser’s default font size, our pixel-sized column does not change at all, but the rem-sized correctly resize themselves, enabling our low-vision users to use our web application more easily.

<br>

![Font Sizes Larger](./assets/guides/font-sizes-large.png "Font Sizes Larger")

:::

:::

##### How to Use

Cashmere has terrific built-in support for using rem units for choosing font sizes. Since thinking in rems can be hard, Cashmere’s fontSize() mixin allows you to specify your desired font-size value in pixels, and it automatically converts it to rems for you:

```
@import '../node_modules/cashmere/sass/cashmere';

.example-name {
    @include fontSize(16px); // generates font-size: 1.143rem;
}
```

If you are not able to use Cashmere, we recommend creating a set of named variables for your type scale in Sass or Less:

```
$font-size-header1: 2rem;
$font-size-header2: 1.5rem;
$font-size-body: 0.875rem;
```

And then using these semantically-meaningful variables in place of directly-specified font sizes.

:::

:::

##### Next Steps

- [Font-size, MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)
- [CSS Values and Units Module Level 3; 5.2. Absolute Lengths, W3C](https://www.w3.org/TR/css3-values/#absolute-lengths)
- [CSS Values and Units Module Level 3; 5.4. Font-relative Lengths, W3C](https://www.w3.org/TR/css3-values/#font-relative-lengths)
- [Typography Guidelines, Cashmere](https://cashmere.healthcatalyst.net/foundations/typography)

:::
