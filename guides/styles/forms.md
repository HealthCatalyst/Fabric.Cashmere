# Forms

Last updated December 3, 2019

:::

## General

##### Bootstrap

Lay out your forms using <a href="https://getbootstrap.com/docs/4.0/layout/grid/" target="_blank">Bootstrap Grid</a>

##### Cashmere Components

Utilize Cashmere components as much as possible

##### Responsiveness

Make sure to check your form at all breakpoints and determine the appropriate input size for each input. It's simple to adjust its width per breakpoint with Bootstrap cols.

##### Required Fields

In most cases, we should allow the user to submit the form anytime. If require fields have not been filled out, trigger an error message below the input stating that it's required.

<img src="/assets/form_examples/errors.png" alt="required fields" style="max-width: 360px;" />

:::
:::

## Form Sections

Forms should be broken into sections with common themes (e.g. Contact Information, Company Information, Delivery Details, etc.). Each section should end in an `<hr>` spaced 32px below the last input.


##### Section Headings

<ul>
<li>Put section headings in their own Bootstrap rows with a class of .col-12.</li>
<li>Form sections should have appropriate headings that give users a hint about what kinds of information will be gathered. Use <code>&lt;h5&gt;</code> for these section headings.
<li>Section headings should be spaced 24px below the <code>&lt;hr&gt;</code> and 32px above the input below.</li>
</ul>

![form buttons](/assets/form_examples/section_header.png)

<ul>
<li>If the section heading is followed by section instructions, include the instructions as standard <code>&lt;p&gt;</code> and include 16px between the heading and the paragraph and 32px between the paragraph and the input below.</li>
</ul>

![form buttons](/assets/form_examples/section_header_instruction.png)


:::
:::

## Labeled Inputs

<ul>
<li>Each labeled input should be in its own Bootstrap row</li>
<li>The label and the input should be in separate Bootstraps cols so they can easily stack up at smaller breakpoints and display side-by-side at larger breakpoints.</li>
<li>The default split between the label <code>&lt;div&gt;</code> and the input <code>&lt;div&gt;</code> (when displaying side by side) should be 5 columns to 7 columns.</li>
<li>By default, labels should stack on inputs below 576px (extra small breakpoint). Depending on your app and page layout, you may want to vary where (which breakpoint) this stacking occurs.</li>
</ul>

<img src="/assets/form_examples/stacked.png" alt="heading with description" style="max-width: 360px;" />

<ul>
<li>Inputs should have a max-width of 500px.</li>
<li>Standard input boxes should have a height of approx 40px. Because some inputs have a height less than 40px (like radio buttons), give each row a min-height of 40px so it maintains a consistent spacing pattern.</li>
<li>Space each input vertically 32px apart.</li>
<li>Use <code>&lt;hc-label&gt;</code> for labels and <code>&lt;hc-form-field&gt;</code> for Cashmere inputs.</li>
<li>Include <code>&lt;hc-error&gt;</code> inside the <code>&lt;hc-form-field&gt;</code> tags.
</ul>

:::
:::

## Buttons

* Actions (buttons) should be spaced 32px below the final form `<hr>`.
![form buttons](/assets/form_examples/buttons.png)

:::
:::

## Other

<ul><li>Add section / remove section</li></ul>

![add remove](/assets/form_examples/add_remove_section.png)

<ul>
<li>Info / Warning sections</li>
<li>Non-labeled inputs</li>
</ul>

![form buttons](/assets/form_examples/header_input.png)

:::
:::

## Examples

<em>coming soon...</em>

* Full width with sidebar
* Full width without sidebar
* With summary box
* Stacked (mobile)
* Irregular form

:::


_____________________________


:::

## Markup Example

The following is the basic markup structure of a typical form.

```html
<div class="row main-container">
    <div class="col-12">
        <form>
            <div class="row section-label">
                <div class="col-12">
                    <hc-label>Section Label</hc-label>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-5">
                    <hc-label>Email</hc-label>
                </div>
                <div class="col-sm-7">
                    <hc-form-field>
                        <input hcInput formControlName="email">
                        <hc-error>Please enter a valid email address.</hc-error>
                    </hc-form-field>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-sm-5">
                    <hc-label>Phone Number</hc-label>
                </div>
                <div class="col-6 col-md-4">
                    <hc-form-field>
                        <input hcInput id="phone" formControlName="phoneNumber" maxlength="14" phoneMask [preValue]="getPhonePreValue()">
                        <hc-error *ngIf="creditCardForm.get('phoneNumber').errors?.minlength">Phone number must be 7 digits</hc-error>
                        <hc-error *ngIf="creditCardForm.get('phoneNumber').errors?.required">Phone number is required</hc-error>
                    </hc-form-field>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-sm-5">
                    <hc-label>Tax Exempt</hc-label>
                </div>
                <div class="col-sm-7">
                    <hc-form-field>
                        <hc-radio-group formControlName="exempt" inline="true">
                            <hc-radio-button value="false">No</hc-radio-button>
                            <hc-radio-button value="true">Yes</hc-radio-button>
                        </hc-radio-group>
                    </hc-form-field>                    
                </div>
            </div>
        </form>
        <div class="row bottom-buttons">
            <div class="col-12">
                <button (click)="back()" buttonStyle="link" hc-button>Back</button>
                <button (click)="submitForm()" buttonStyle="primary" hc-button>Continue</button>
            </div>
        </div>
    </div>
</div>
```

:::
