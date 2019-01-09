# Login Page

:::

##### Overview

The login styles provide a unified experience when a user first enters an application. The following examples can be customized for each applications needs. The component is mobile friendly and will adapt for smaller screen sizes.

The library does not ship with image assets, so the following images will need to be downloaded: [Logo](https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/master/docs/assets/HC_logo.svg) and [Background](https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/master/docs/assets/login_bg.jpg)

:::
<br>

<div class="hc-login-container" style="height:650px; background-image: url(../assets/login_bg.jpg)">
  <div class="hc-login">
    <div class="logo">
      <img src="../assets/HC_logo.svg" alt="Health Catalyst Logo">
    </div>
    <form>
      <label for="email">Email</label>
      <input class="login-input" required name="email" type="text" placeholder="Enter Full Email">
      <label for="email">Password</label>
      <a href="#" class="forgot-password">Forgot Password</a>
      <input class="login-input" required name="password" type="password">
      <input value="Log in" class="login-button" type="submit">
    </form>
    <div class="privacy">By signing in you agree to our
      <br>
      <a href="#">Terms of Use</a> and
      <a href="#">Privacy Statement</a>
    </div>
    <div class="new-to-catalyst">
      <span>New to Health Catalyst?</span>
    </div>
    <a href="#" class="new-account">Create a new acount</a>
  </div>
  <div class="hc-login-footer">
    <ul>
      <li>
        <a href="https://www.healthcatalyst.com/terms-conditions/"> Terms of Use </a>
      </li>
      <li>
        <a href="https://www.healthcatalyst.com/privacy-policy/">Privacy</a>
      </li>
      <li>
        <a href="https://www.healthcatalyst.com">HealthCatalyst.com</a>
      </li>
    </ul>
  </div>
</div>
<br>
<br>
<br>

:::

##### Layout

To accomidate most needs, these styles can be used with or without angular. The examples just give an outline and can be customized as needed
<br>
<br>

##### HTML and CSS version

The following example does not use angular but a post css Preprocesser is needed. Here are general steps to setup and use these styles:

-   Install and set css preprocessor like [gulp sass](https://github.com/dlmanning/gulp-sass) or [webpack with sass](https://github.com/webpack-contrib/sass-loader)
-   Install cashmere npm package
-   Import styles `@import "~@healthcatalyst/cashmere/scss/login-page";`
-   Use html markup as needed

```html
<div class="hc-login-container" style="background-image: url(../assets/login_bg.jpg)">
    <div class="hc-login">
        <div class="logo"><img src="../assets/HC_logo.svg" alt="Health Catalyst Logo" /></div>
        <form>
            <label for="email">Email</label> <input class="login-input" required name="email" type="text" placeholder="Enter Full Email" />
            <label for="email">Password</label> <a href="#" class="forgot-password">Forgot Password</a>
            <input class="login-input" required name="password" type="password" />
            <input value="Log in" class="login-button" type="submit" />
        </form>
        <div class="privacy">
            By signing in you agree to our <br />
            <a href="#">Terms of Use</a> and <a href="#">Privacy Statement</a>
        </div>
        <div class="new-to-catalyst"><span>New to Health Catalyst?</span></div>
        <a href="#" class="new-account">Create a new acount</a>
    </div>
    <div class="hc-login-footer">
        <ul>
            <li><a href="https://www.healthcatalyst.com/terms-conditions/"> Terms of Use </a></li>
            <li><a href="https://www.healthcatalyst.com/privacy-policy/">Privacy</a></li>
            <li><a href="https://www.healthcatalyst.com">HealthCatalyst.com</a></li>
        </ul>
    </div>
</div>
```

##### Angular version using Cashmere components

The following example uses angular and cashmere and is the preffered method. It uses `ButtonModule` and `InputModule` and must be imported into the app.module

```html
<div class="hc-login-container" style="background-image: url(../assets/login_bg.jpg)">
    <div class="hc-login">
        <div class="logo"><img src="../assets/HC_logo.svg" alt="Health Catalyst Logo" /></div>
        <div>
            <hc-form-field>
                <hc-label>Email</hc-label>
                <input hcInput required />
            </hc-form-field>
            <hc-form-field>
                <hc-label>Password</hc-label>
                <input type="password" hcInput required />
            </hc-form-field>
            <a href="#" class="forgot-password" hidden="hidden">Forgot Password</a> <button hc-button class="login-button">Log in</button>
        </div>
        <div class="privacy">
            By signing in you agree to our <br />
            <a href="#">Terms of Use</a> and <a href="#">Privacy Statement</a>
        </div>
        <div class="new-to-catalyst"><span>New to Health Catalyst?</span></div>
        <a href="#" class="new-account">Create a new acount</a>
    </div>
    <div class="hc-login-footer">
        <ul>
            <li><a href="https://www.healthcatalyst.com/terms-conditions/"> Terms of Use </a></li>
            <li><a href="https://www.healthcatalyst.com/privacy-policy/">Privacy</a></li>
            <li><a href="https://www.healthcatalyst.com">HealthCatalyst.com</a></li>
        </ul>
    </div>
</div>
```

:::
