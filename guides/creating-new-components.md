# Creating a New Component

###### Last updated April 14, 2021

:::

##### Overview

The Cashmere library is heavily built on it's component-based architecture. By adding new and exciting components to this library you are only enriching what it has to offer to it's developers. Here are some things to remember when creating new components.

:::

:::

##### Creating the Component Manually

<strong>1.</strong> Start by creating a new folder for your component in `projects/cashmere/src/lib`. This folder should contain the following files:

- **"component-name".directive.ts**
- **"component-name".component.spec.ts**
- **"component-name".component.ts**
- **"component-name".html**
- **"component-name".module.ts** - this file exports all the public properties of your component.
- **"component-name".scss** - this will be used to style your component. For more on how to follow our styling conventions, see the [Customizing Components](https://cashmere.healthcatalyst.net/web/guides/using-customizing-components?section=style-guidelines-for-new-components&selected=using-customizing-components) guide
- **"index".ts** - this file exports all the public properties of your component.

<strong>2.</strong> Import & export your new `"component-name".module.ts` in `src/app/shared/cashmere.module.ts`

<strong>3.</strong> Export your component's `index.ts` file from `projects/cashmere/src/public_api.ts`

<strong>4.</strong> Create examples - see the [Working with Examples](https://cashmere.healthcatalyst.net/web/guides/working-with-examples) guide

:::

:::

##### Creating the Component With Commands

<strong>1.</strong> Start by openining the directory where you want the new component `projects/cashmere/src/lib`

<strong>2.</strong> Run the comand `ng generate component "component-name" --skip-import`. (Don't include the "hc" prefix, this will be added automatically where needed.) Executing the command creates a folder, "component-name", in the project's `projects/cashmere/src/lib` path. The folder has the following files:

- **"component-name".component.ts**
- **"component-name".component.css**
- **"component-name".component.html**
- **"component-name".component.spec.ts**

<strong>3.</strong> Create the ```"component-name.module".ts``` file.

<strong>4.</strong> Import & export your new ```"component-name".module.ts``` in ```src/app/shared/cashmere.module.ts```

<strong>5.</strong> Create the ```index.ts``` file and export it from ```projects/cashmere/src/public_api.ts```

<strong>6.</strong> Create examples - see the [Working with Examples](https://cashmere.healthcatalyst.net/web/guides/working-with-examples) guide

:::
