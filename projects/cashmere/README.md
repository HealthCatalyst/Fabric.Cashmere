[![Build Status](https://travis-ci.org/HealthCatalyst/Fabric.Cashmere.svg?branch=master)](https://travis-ci.org/HealthCatalyst/Fabric.Cashmere)
[![Coverage Status](https://coveralls.io/repos/github/HealthCatalyst/Fabric.Cashmere/badge.svg?branch=master)](https://coveralls.io/github/HealthCatalyst/Fabric.Cashmere?branch=master)
![Cashmere Banner](https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/master/CashmereBanner.png)

An Angular component library that makes any task feel luxurious.

## Quick Links

-   [CHANGELOG](https://github.com/HealthCatalyst/Fabric.Cashmere/blob/master/CHANGELOG.md)
-   [Components](https://wcf-insurance.github.io/index.html)
-   [Styles](http://cashmere.healthcatalyst.net/styles)
-   [Getting Started](http://cashmere.healthcatalyst.net/guides/getting-started)
-   [Guidelines for Contribution](http://cashmere.healthcatalyst.net/guides/contribution-guide)
-   [Submit an Issue](http://cashmere.healthcatalyst.net/guides/submit-an-issue)
-   [Supported Browsers](http://cashmere.healthcatalyst.net/guides/supported-browsers)

## Installin

Run `npm i --save @wcf/cashmere`.

## Adding a new Component

<ul>
<li>to create a new component in Cashmere</li>
<li>navigate to WCFCashmere folder</li>
<li>ng generate component (NameOfComponent) --project=cashmere</li>
<li>ng build --prod cashmere (Build the library again)</li>
<li>add html tag to app.component.html</li>
<li>ng serve to test it.</li>
</ul>

## Setting up NPM to use this project.

<ul>
<li>npm config set registry http://10.1.0.104:8081/repository/npm-group/</li>
<li>npm login</li>
<li>Username: admin</li>
<li>Password: admin123</li>
<li>Email: admin@example.org</li>
<li>npm install wcf-library</li>
<li>put schemas: [CUSTOM_ELEMENTS_SCHEMA ], into @NgModule section of app.module.ts of your project</li>
</ul>

## Publishing wcflibrary

<ul>
<li>cd into dist/wcf-library</li>
<li>npm publish</li>
</ul>
