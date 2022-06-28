# Login Screen

###### Last updated Mar 10, 2020

:::

##### Overview

The login styles provide a unified experience when a user first enters an application. The following examples can be customized for each applications needs. The component is mobile friendly and will adapt for smaller screen sizes.

The logo and background images are encoded in the css, but you can download them directly here if needed: [Logo](https://cashmere.healthcatalyst.net/assets/HealthCatalyst_Horizontal.svg) and [Background](https://cashmere.healthcatalyst.net/assets/login_bg.jpg)

:::
<br>

<div class="hc-login-container" style="height: 650px; border: 1px solid #e0e3e6; box-shadow: 0 2px 5px rgb(0 0 0 / 20%); border-radius: 4px;">
    <div class="hc-login">
        <div class="logo"></div>
        <form>
            <label for="email">Email</label>
            <input class="login-input" required name="email" type="text" placeholder="Enter your email address" />
            <label for="email">Password</label>
            <a href="#" class="forgot-password">Forgot my password</a>
            <input class="login-input" required name="password" type="password" placeholder="Enter your email password"/>
            <input value="Sign in" class="login-button" type="submit" />
        </form>
        <div class="new-to-hcat">
            <span>New to Health Catalyst?</span>
            <a href="#" class="new-account">Create account</a>
        </div>
    </div>
    <div class="hc-login-footer">
        <div class="privacy">
            By signing in you agree to our
            <br />
            <a target="_blank" href="https://www.healthcatalyst.com/terms-conditions/">Terms of Use</a>
            and
            <a target="_blank" href="https://www.healthcatalyst.com/privacy-policy/">Privacy Statement</a>
        </div>
        <a target="_blank" class="hc-site-btn" href="https://www.healthcatalyst.com" title="Visit the Health Catalyst website">HealthCatalyst.com</a>
    </div>
</div>
<br>
<br>
<br>

:::

##### Layout

To accommodate most needs, these styles can be used with or without angular. The examples just give an outline and can be customized as needed
<br>
<br>

##### HTML and CSS version

The following example does not use angular but a post css Preprocesser is needed. Here are general steps to setup and use these styles:

-   Install and set css preprocessor like [gulp sass](https://github.com/dlmanning/gulp-sass) or [webpack with sass](https://github.com/webpack-contrib/sass-loader)
-   Install cashmere npm package
-   Import styles `@import "@healthcatalyst/cashmere/scss/login-page";`
-   Use html markup as needed

```html
<div class="hc-login-container">
    <div class="hc-login">
        <div class="logo"></div>
        <form>
            <label for="email">Email</label>
            <input class="login-input" required name="email" type="text" placeholder="Enter your email address" />
            <label for="email">Password</label>
            <a href="#" class="forgot-password">Forgot my password</a>
            <input class="login-input" required name="password" type="password" placeholder="Enter your email password"/>
            <input value="Sign in" class="login-button" type="submit" />
        </form>
        <div class="new-to-hcat">
            <span>New to Health Catalyst?</span>
            <a href="#" class="new-account">Create account</a>
        </div>
    </div>
    <div class="hc-login-footer">
        <div class="privacy">
            By signing in you agree to our
            <br />
            <a target="_blank" href="https://www.healthcatalyst.com/terms-conditions/">Terms of Use</a>
            and
            <a target="_blank" href="https://www.healthcatalyst.com/privacy-policy/">Privacy Statement</a>
        </div>
        <a target="_blank" class="hc-site-btn" href="https://www.healthcatalyst.com" title="Visit the Health Catalyst website">HealthCatalyst.com</a>
    </div>
</div>
```

##### Angular version using Cashmere components

The following example uses angular and cashmere and is the preffered method. It uses `ButtonModule` and `InputModule` and must be imported into the app.module

```html
<div class="hc-login-container">
    <div class="hc-login">
        <div class="logo"></div>
        <div>
            <hc-form-field>
                <hc-label>Email</hc-label>
                <input hcInput required placeholder="Enter your email address"/>
            </hc-form-field>
            <hc-form-field>
                <hc-label>Password</hc-label>
                <input type="password" hcInput required placeholder="Enter your password"/>
            </hc-form-field>
            <a href="#" class="forgot-password" hidden="hidden">Forgot my password</a>
            <button hc-button class="login-button">Sign in</button>
        </div>
        <div class="new-to-hcat">
            <span>New to Health Catalyst?</span>
            <a href="#" class="new-account">Create account</a>
        </div>
    </div>
    <div class="hc-login-footer">
        <div class="privacy">
            By signing in you agree to our
            <br />
            <a target="_blank" href="https://www.healthcatalyst.com/terms-conditions/">Terms of Use</a>
            and
            <a target="_blank" href="https://www.healthcatalyst.com/privacy-policy/">Privacy Statement</a>
        </div>
        <a target="_blank" class="hc-site-btn" href="https://www.healthcatalyst.com" title="Visit the Health Catalyst website">HealthCatalyst.com</a>
    </div>
</div>
```

:::
