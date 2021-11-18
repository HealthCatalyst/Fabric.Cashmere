# Input Tag Types

###### Last updated November 15, 2021

:::

##### User Context

*When I log in to the web app from my desktop computer, I never have any trouble typing in my email address: the ‘@’ symbol is easily accessible by pressing Shift-2 on the keyboard. However, when I log in from my iPhone, it’s a lot harder: I must navigate through multiple screens to find the ‘@’ symbol, and the keyboard tries to autocorrect my email address.*

:::

:::

##### Explanation

On a desktop computer, we only need two `<input>` text field types: text and password. A full keyboard makes it easy to enter freeform text, numbers, or special symbols. However, on mobile devices with their smaller screens and limited space for keyboards, more creative solutions are necessary. These take the form of `<input>` types like *email*, *telephone*, or *url*, each of which signals to a mobile web browser both that it should present a customized keyboard better suited for entering that sort of data, and how it should treat autocorrection.

:::

:::

##### How to Use

Review MDN’s [HTML 5 Input Types](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types) to learn more about the available input types. Next, update the input tags on your forms that would benefit from greater customization. Starting with the email field may be best, as this can be one of the more frustrating types of data to enter on a mobile device.

Important note: confusingly, the input type number should not be used for values like account numbers, social security numbers, credit card numbers, confirmation numbers, or any other fixed value. The number field type is a great way to allow users to choose from a range of numeric values, but its feature set can make choosing a fixed value quite error prone, as described in the CSS Tricks article, [You probably don’t need input type=“number”](https://css-tricks.com/you-probably-dont-need-input-typenumber/). Instead, consider using the following, as described in another CSS Tricks article, [What to Use Instead of Number Inputs](https://css-tricks.com/what-to-use-instead-of-number-inputs/).

`<input type="text" inputmode="numeric" pattern="[0-9]*">`

:::

:::

##### Next Steps

- [HTML 5 Input Types, MDN](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types)
- [The Input (Form Input) element, MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
- [“Input”, Can I Use…](https://caniuse.com/?search=input)

:::
