# Guidelines for Contribution

###### Last updated March 10, 2018

:::

##### All May Contribute

We would love for you to contribute to Cashmere and be part of the community making this project better! To get started, follow the [Getting Started guide](http://cashmere.healthcatalyst.net/guides/getting-started).
:::

:::

##### Contributing to Cashmere

Before you submit your pull request (PR), consider the following guidelines:

*   Search [GitHub](https://github.com/HealthCatalyst/Fabric.Cashmere/pulls) for an open or closed PR that relates to your submission. You don't want to duplicate effort.
*   Make your changes in a new Git branch. Here is a good [guide](https://gist.github.com/Chaser324/ce0505fbed06b947d962) if you're just getting started.
*   Verify all changes look and function properly in different browsers and at different resolutions.
*   Run the following commands:
    *   `ng lint` should result in `All files pass linting`
    *   `ng test` should result in `All tests passing`
    *   `npm run build:lib` should pass and build the library successfully
*   New components and directives must be accompanied by:
    *   A component demonstrating the functionality; this component should be added to the demo app's routes
    *   Unit tests demonstrating that it functions as intended
*   A new component should adhere to the [Health Catalyst style](http://cashmere.healthcatalyst.net).
*   "Squash and merge" a PR to complete it.
    :::
