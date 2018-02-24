[![Build Status](https://travis-ci.org/HealthCatalyst/Fabric.Cashmere.svg?branch=master)](https://travis-ci.org/HealthCatalyst/Fabric.Cashmere)

![Cashmere Banner](https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/master/CashmereBanner.png)

An angular component library that makes any task feel luxurious.

## Guidelines for Contribution

In order for a contribution to be considered, the following conditions must be met:

* `ng lint` should result in `All files pass linting`
    * note: for purposes of aot compilation, strict null checking has been enabled
* `ng test` should result in all tests passing
*  New components and directives must be accompanied by a component demonstrating the functionality. This component should be added to the demo app's routes
* New components and directives must be accompanied by unit tests demonstrating that it functions as intended.
* The component should adhere to the Health Catalyst style

## Helpful tips

* Certain libraries (like momentjs and lodash) if used by your components will need to be added to the globals object used by rollup.config.js

## Recommended Development Flow
* Fork the repository to your own GitHub account
* Ensure all linting and tests pass
* Develop new component or feature
* Ensure all linting and tests pass
* Package the library `node lib/build --local`
* If the build succeeds, it will give you a command to install the package into another project.
    In another angular application run that command.  It will look something like
    ```bash
    npm install C:\Source\Fabric.Cashmere\lib\dist\healthcatalyst-cashmere-0.0.3.tgz
    ```
* Ensure external application can do a production/aot build `ng build --prod`
* Submit pull request from your fork to the main repository.

## Packaging the Library

Run `node lib/build --local` to bundle the library.

## Running the Demo App

Run `ng serve` to begin serving the demo application on port 4200

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
