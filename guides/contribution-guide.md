# Guidelines for Contribution
###### Last updated March 10, 2018

:::
##### All may contribute
We would love for you to contribute to Cashmere and help make it ever better! As a contributor, you will be part of a community making this project better. To get started, just follow the [getting started guide](http://cashmere.healthcatalyst.net/guides/getting-started)
:::

:::
#####  Contributing to Cashmere

Before you submit your Pull Request (PR) consider the following guidelines:

* Search [GitHub](https://github.com/HealthCatalyst/Fabric.Cashmere/pulls) for an open or closed PR that relates to your submission. You don't want to duplicate effort.
* Make your changes in a new git branch. Here is a good [guide](https://gist.github.com/Chaser324/ce0505fbed06b947d962) for those just getting started
* Verify all changes look and function properly in different browsers and at different resolutions
* Run the following commands
  * `ng lint` should result in "All files pass linting"
  * `ng test` should result in "all tests passing"
  * `npm run build:lib` should pass and build the library successfully
*  New components and directives must be accompanied by a component demonstrating the functionality. This component should be added to the demo app's routes
* New components and directives must be accompanied by unit tests demonstrating that it functions as intended.
* The component should adhere to the Health Catalyst style
* "Squash and merge" a pull request to complete it
:::
