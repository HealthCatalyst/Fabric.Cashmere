# Guidelines for Contribution
###### Last updated February 20, 2018

In order for a contribution to be considered, the following conditions must be met:

* `ng lint` should result in `All files pass linting`
    * note: for purposes of aot compilation, strict null checking has been enabled
* `ng test` should result in all tests passing
*  New components and directives must be accompanied by a component demonstrating the functionality. This component should be added to the demo app's routes
* New components and directives must be accompanied by unit tests demonstrating that it functions as intended.
* The component should adhere to the Health Catalyst style