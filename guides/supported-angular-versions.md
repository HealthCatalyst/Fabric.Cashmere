# Supported Angular Versions

###### Last updated May 13, 2020

:::

##### Angular support

As maintainers of Cashmere, we are dedicated to ensuring that Cashmere is a benefit, never a hinderance, to your application.  We aim to provide flexibility to application developers to use all the latest Angular features; at the same time, we don't want to leave applications behind by only targeting bleeding-edge versions.  Therefore, we take the following balanced approach for Angular versioning in Cashmere:

### Target: latest LTS version

We plan to keep Cashmere up-to-date with the latest LTS version of Angular.  This means that when an Angular version ends active support and enters LTS support (see [Angular's Support Policy and Schedule](https://angular.io/guide/releases#support-policy-and-schedule)), Cashmere will update its minimum supported version to that version.

#### Hypothetical Example

If the current support table on angular.io looks like this:

| VERSION  | STATUS | RELEASED     | ACTIVE ENDS  | LTS ENDS     |
| :------- | :----- | :----------- | :----------- | :----------- |
| ^79.0.0  | Active | Feb 06, 2120 | Aug 06, 2120 | Aug 06, 2121 |
| ^78.0.0  | LTS    | May 28, 2119 | Nov 28, 2119 | Nov 28, 2120 |

Cashmere would be updated to target Angular versions on this schedule:

* **Angular 78**: November 28, 2119
* **Angular 79**: August 6, 2120

### Latest Angular is always supported

Even though Cashmere currently _targets_ Angular version `n`, we aim to make it compatible with all released versions `>n` as well.  In the example above, you don't have to wait until August 6, 2120 to upgrade from Angular 78 to 79.  We encourage all teams to keep up to date with the latest Angular version as much as possible.

If you find any incompatibilites with the latest Angular version, please log an issue.

:::
