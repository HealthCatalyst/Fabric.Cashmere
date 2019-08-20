# Forms

###### Last updated August 15, 2019

:::

##### Overview

Forms are a prevalent and important element of many WCF web applications. Having a consistent approach to building and display forms is a good practice to provide a reliable and familiar experience to our users.

- Forms should be responsive
- Forms should be organized and easy to read
- Forms should provide clear feedback
    - Pre-formatting and auto-formatting
    - Error messages
- Another should

:::

:::

##### Markup Example

The following is the basic markup structure of a typical form.

```html
<form class="form-container">
    <div class="form-section">
        <hc-form-field>
            <hc-label>First Name</hc-label>
            <input hcInput [formControl]="firstname" required />
        </hc-form-field>
        <hc-form-field>
            <hc-label>Last Name</hc-label>
            <input hcInput [formControl]="lastname" required />
        </hc-form-field>
    </div>
    <div class="form-section">
        <hc-form-field>
            <hc-label>Email</hc-label>
            <input hcInput [formControl]="email" required />
        </hc-form-field>
    </div>
    <button hc-button title="Register" buttonStyle="primary">Register</button>
</div>
```

:::

:::

##### Form Styles

The following is the basic markup structure of a typical form.

```css
form.form-container {

    .form-section {
        border-bottom: 1px solid $gray30;
        padding: 0 0 32px 0;

        hc-form-field {
            
            hc-label {

            }

            input {
                max-width: 400px;
            } 
        }
    }

    button {

    }
}
```

:::
