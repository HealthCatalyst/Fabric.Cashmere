# Form Fields on Mobile

###### Last updated November 17, 2021

:::

##### User Context

*When I’m using web apps on my phone, I want the browser controls to feel consistent with UX I’m used to on my device, and tailored towards a touch interface.*

:::

:::

##### Explanation

Mobile browsers have a lot of built in functionality to make the web experience as smooth as possible on touch-based, small screens. To the greatest extent possible, we want to take advantage of that and not introduce UI that breaks from familiar usage patterns on specific devices. Primarily this is done by leveraging standard HTML markup and form elements (`<select>`, `<input>`, etc). Cashmere components have taken this into account and follow this best practice. As long as you are using Cashmere components, there isn't any additional work required. But as you are building unique elements and components in your app, think twice about incorporating novel UI elements using custom javascript or libraries. Even if they feature mobile support, their UX will be different from what users are familiar with on their device.

### Label Position

The Cashmere `<hc-form-field>` defaults to positioning labels above the form field. Research suggests that this leads to faster form completion and easier scanning of the page. They do have the option to set `inline` to true which positions the label and form element on the same horizontal. If an app includes inline form fields, when hitting breakpoints for smaller screens switch to top labels. It provides more screen real estate for longer labels and/or inputs.

<br>

![Form Field Labels](./assets/guides/form-field-labels.jpg "Form Field Labels")

### Form Layout

Beyond the form elements themselves, pay particular consideration to your form layout. If your forms include multiple columns, ensure that your flex display is set up correctly to wrap those elements into a single column on a smaller screen. You may also need to adjust the padding/margins in your form elements as the layout wraps into a single column.

:::

:::

##### How to Use

One Cashmere form element that does require configuration for ideal mobile support is the [Input directive](https://cashmere.healthcatalyst.net/web/components/input/). By default, the font size of the input is set to 1rem, which equals 14px using Cashmere styles. On iOS devices, any inputs with font sizes smaller than 16px will be automatically zoomed when activated. This forces the user to zoom back out when they are finished editing the field.

The `hcInput` directive includes a `mobile` parameter that can be set to `true` to adjust the styling of inputs for smaller screens. It sets the font size to 16px so zooming won't be triggered when the control is activated. It's up to the app to set that parameter to true or false, the component doesn't have its own breakpoints. The Angular CDK `BreakpointObserver` is an excellent way to listen for changes and adjust that parameter.

```
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

constructor( public breakpointObserver: BreakpointObserver ) {}

this.breakpointObserver.observe(['(max-width: 880px)']).subscribe((state: BreakpointState) => {
    this.isSmallScreen = state.matches;
});
```
:::

:::

##### Next Steps

- [Designing Efficient Web Forms, Smashing Magazine](https://www.smashingmagazine.com/2017/06/designing-efficient-web-forms/)
- [Design responsive and device-agnostic forms, CreativeBloq](https://www.creativebloq.com/how-to/how-to-design-responsive-and-device-agnostic-forms)
- [Breakpoint Observer, Angular CDK](https://material.angular.io/cdk/layout/overview#breakpointobserver)
- [HTML forms element reference, MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)

:::
