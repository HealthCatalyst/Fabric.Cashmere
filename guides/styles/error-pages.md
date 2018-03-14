# Error Pages
###### Last updated March 12, 2018

:::
##### Overview
One of the most common errors users can come across while working with web apps is a 404 or Page Not Found error. This error often occurs when the user follows a broken link or if they type in a website address that doesn’t exist.  A 404 page error appears when a website is active, but the specific page within it doesn’t exist. This guide illustrates the our styling for error pages - which may be used for 404 errors or extended to any other errors that an app needs to catch.
:::

:::
##### Layout
The error page should include the app's `hc-navbar` but without any of the navbar-links active.  The page background should be set to `$slate-gray-100` with the error message centered horizontally and positioned 25% from the top of the page.  Styles for the error message have been included in the error-page.scss file.  Below is example markup to create the error message displayed beneath this tile.

``` html
<div class="error-tile">
    <div class="content-column">
        <div class="error-img"></div>
    </div>
    <div class="content-column">
        <div class="error-header-code">404</div>
        <div class="error-message">
            Sorry, we can't find the page you're looking for!
        </div>
    </div>
    <hr>
    <div class="error-button">Go to Homepage</div>
</div>
```
:::

<br>
<div class="error-tile">
    <div class="content-column">
        <div class="error-img"></div>
    </div>
    <div class="content-column">
        <div class="error-header-code">404</div>
        <div class="error-message">
            Sorry, we can't find the page you're looking for!
        </div>
    </div>
    <hr>
    <div style="display: flex"><div class="error-button">Go to Homepage</div></div>
</div>
<br><br><br>

:::
##### Alternate Text Classes
For errors that need to display a string of text rather than an error code, the class `error-header-string` may be used instead. For longer error messages (a full sentence or more), the `error-message-light` class should be used.

``` html
<div class="error-header-string">Access Denied</div>
<div class="error-message-light">
    Unfortunately you are not authorized to access this application.
    Please contact your system administrator.
</div>
```
:::

<br>
<div class="error-tile">
    <div class="content-column">
        <div class="error-img"></div>
    </div>
    <div class="content-column">
        <div class="error-header-string">Access Denied</div>
        <div class="error-message-light">Unfortunately you are not authorized to access this application. Please contact your system administrator.</div>
    </div>
    <hr>
    <div style="display: flex"><div class="error-button">Go to Homepage</div></div>
</div>
