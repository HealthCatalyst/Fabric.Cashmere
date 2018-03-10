# Guidelines for Contribution
###### Last updated March 10, 2018

:::
##### All may contribute
We would love for you to contribute to Cashmere and help make it ever better! As a contributor, you will be part of a community making this project better. To get started, just follow the [getting started guide](https://github.com/HealthCatalyst/Fabric.Cashmere/blob/master/guides/getting-started.md)
:::

:::
#####  Found a Bug?

Before you [submit an issue](https://github.com/HealthCatalyst/Fabric.Cashmere/issues), search the archive, maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue. Help us to maximize the effort we can spend fixing issues and adding new features by not reporting duplicate issues. Providing the following information will increase the chances of your issue being dealt with quickly:

- **Overview of the Issue** - if an error is being thrown a non-minified stack trace helps
- **Angular and Cashmere Version** - which versions are affected
- **Motivation for or Use Case** - explain what are you trying to do and why the current behavior is a bug for you
- **Browsers and Operating System** - is this a problem with all browsers?
- **Reproduce the Error** - provide a live example (using CodePen, JsBin, Plunker, etc.) or a unambiguous set of steps
- **Screenshots** - Due to the visual nature of Cashmere, screenshots can help the team triage issues far more quickly than a text description.
- **Related Issues** - has a similar issue been reported before?
- **Suggest a Fix** - if you can't fix the bug yourself, perhaps you can point to what might be causing the problem (line of code or commit)

Even better, you can submit a pull request with a fix!
:::

:::
#####  Want a Feature?

You can request a new feature by submitting an issue to our [GitHub Repository](https://github.com/HealthCatalyst/Fabric.Cashmere). If you would like to implement a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it. Please consider what kind of change it is:

For a Major Feature, first open an issue and outline your proposal so that it can be discussed. This will also allow us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.
Small Features can be crafted and directly submitted as a Pull Request.
:::

:::
#####  Submitting a Pull Request (PR)

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
