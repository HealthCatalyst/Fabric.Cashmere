# App "About" Modal

###### Last updated Dec 10, 2019

:::

##### Overview

An "About" modal should be included with every application as place to store important statistical information. It is typically triggered from an item in the [help menu](https://cashmere.healthcatalyst.net/components/navbar/usage). This is often used in troubleshooting when a user needs to identify specifics about their app instance. At a minimum, the About modal should contain:

-   **App Name** - using the same SVG as is being used in the navbar
-   **App Icon** - SVGs may be downloaded from the [product icons page](https://cashmere.healthcatalyst.net/content/products); may be omitted if an icon does not exist for the app
-   **Version Number** - paired with the app name in the modal header
-   **Copyright** - usually included in the footer
-   **Terms and Conditions** - part of the footer and links to our [website terms page](https://www.healthcatalyst.com/terms-conditions/)
-   **Privacy Policy** - paired with Terms in the footer and links to our [website privacy page](https://www.healthcatalyst.com/privacy-policy/)

Beyond these items, other app specific information may include "web server", "database name", "metadata server" or other data related items.
:::

:::

##### Example

The following code snippet leverages styles in the `about-modal.scss` stylesheet and can be used as a starting point which you can build on to create an About modal specific to your app. Note that the content below should be displayed in a [hc-modal](https://cashmere.healthcatalyst.net/components/modal/).

```html
<hc-modal>
    <div class="about-modal-content">
        <div class="about-header">
            <img src="./assets/HealthCatalyst_Horizontal.svg" class="about-logo" alt="" />
            <div class="about-app">
                <div class="about-icon">
                    <img src="./assets/CashmereIcon.svg" alt="" />
                </div>
                <div class="about-name">
                    <img src="./assets/CashmereAppLogo.svg" alt="" />
                    <div class="about-version">
                        Version 5.3.0.0
                    </div>
                </div>
            </div>
        </div>
        <div class="about-reference">
            <div>
                <hc-icon fontSet="fa" fontIcon="fa-cloud" hcIconLg></hc-icon>
                <div>
                    <strong>Web Server</strong>
                    <div class="about-reference-detail">HC2370</div>
                </div>
            </div>
            <div>
                <hc-icon fontSet="fa" fontIcon="fa-server" hcIconLg></hc-icon>
                <div>
                    <strong>Metadata Server</strong>
                    <div class="about-reference-detail">localhost</div>
                </div>
            </div>
            <div>
                <hc-icon fontSet="fa" fontIcon="fa-database" hcIconLg></hc-icon>
                <div>
                    <strong>Database Name</strong>
                    <div class="about-reference-detail">EDWAdmin</div>
                </div>
            </div>
        </div>
        <div class="about-footer">
            Copyright 2019 <a href="https://www.healthcatalyst.com/">Health Catalyst</a>. All rights reserved
            <br>
            <a href="https://www.healthcatalyst.com/terms-conditions/">Terms and Conditions</a>  |  <a href="https://www.healthcatalyst.com/privacy-policy/">Privacy Policy</a>
        </div>
    </div>
    <hr class="about-divider">
    <div class="about-close-container"><button hc-button class="about-close">Close</button></div>
</hc-modal>
```

:::
