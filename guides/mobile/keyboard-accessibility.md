# Keyboard Accessibility

###### Last updated November 15, 2021

:::

##### User Context

*I’m a power user and always use the keyboard when I’m interacting with my computer. The mouse is too slow. But the web app I use at work every day makes it impossible for me to just use the keyboard.*

:::

:::

##### Explanation

Adding full support for keyboard navigation to your web app is one of the most important ways in which you can enhance its usability. A keyboard-navigable user interface is a prerequisite for your UI to be accessible to users with cognitive, motor, or visual impairments, not to mention that a keyboard navigable user interface will also greatly enhance usability for your most dedicated users by speeding up their most common tasks.

:::

:::

##### How to Use

For our purposes, keyboard accessibility has four criteria:

1.	All interactive elements are accessible by repeatedly pressing the tab key on the keyboard.
2.	The tab order follows the same flow as the page’s visual layout.
3.	The focused element has a distinct appearance.
4.	Avoid keyboard ‘traps’ — make sure that there are no elements on the page (JavaScript widgets, e.g.) that prevent the user from tabbing or escaping away from them.

You can test the keyboard accessibility of your web application by clicking the mouse in your browser’s address bar, and then navigating using only the keyboard. As you press the tab key, does a focus outline appear around each interactive element? Does the order of elements that you can tab to follow a logical pattern? When you come to a button or hyperlink, can you activate them by pressing the space bar or return key? Can you dismiss modal dialogs by pressing the escape key?

If you are using Cashmere components to build your user interface, you should be in good shape for ensuring that your app’s UI elements meet criteria 1, 3, and 4. Criterion 2 is largely dependent on your web app’s HTML layout.

:::

:::

##### Next Steps

- [Keyboard-Only Navigation for Improved Accessibility, Nielsen Norman Group](https://www.nngroup.com/articles/keyboard-accessibility/)
- [Keyboard Accessibility, WebAIM](https://webaim.org/techniques/keyboard/)

:::
