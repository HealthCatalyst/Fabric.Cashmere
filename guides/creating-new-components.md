# Creating a New Component

###### Last updated April 12, 2021

:::

##### Overview

The Cashmere library is heavily built on it's component-based architecture. By adding new and exciting components to this library you are only enriching what it has to offer to it's developers. Here are some things to remember when creating new components.

:::

:::

##### Creating the Component Manually

<!-- We will be using our banner component as an example of how to create a new component. -->

1. Start by creating a new folder for your component in ```projects/cashmere/src/lib```

This folder should contain the following files:

* "component-name".directive.ts

- "component-name".component.spec.ts

* "component-name".component.ts

- "component-name".html

* "component-name".module.ts - this file exports all the public properties of your component.

- "component-name".scss - this will be used to style your component. For more on how to follow our styling conventions, [click here](https://cashmere.healthcatalyst.net/web/guides/using-customizing-components?section=style-guidelines-for-new-components&selected=using-customizing-components)

* "index".ts - this file exports all the public properties of your component.

2. Import & export your new ```"component-name".module.ts``` in ```src/app/shared/cashmere.module.ts```

3. Export your component's ```index.ts``` file from ```projects/cashmere/src/public_api.ts```

4. Create examples see [https://cashmere.healthcatalyst.net/guides/working-with-examples](https://cashmere.healthcatalyst.net/guides/working-with-examples)

:::

:::

##### Creating the Component With Commands

<!-- We will be using our banner component as an example of how to create a new component. -->

1. Start by openining the directory where you want the new component ```projects/cashmere/src/lib```

2. Run the comand ```ng generate component "component-name"```

Executing the command creates a folder, "component-name", in the project's ```projects/cashmere/src/lib``` path.
The folder has the following files:

* "component-name".component.ts

- "component-name".component.css

* "component-name".component.html

- "component-name".component.spec.ts

* index.ts

3. Create the ```"component-name.module".ts``` file.

4. Import & export your new ```"component-name".module.ts``` in ```src/app/shared/cashmere.module.ts```

5. Export your component's ```index.ts``` file from ```projects/cashmere/src/public_api.ts```

6. Create examples see [https://cashmere.healthcatalyst.net/guides/working-with-examples](https://cashmere.healthcatalyst.net/guides/working-with-examples)

:::
