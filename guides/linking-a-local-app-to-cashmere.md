# Linking a Local App to Cashmere

###### Last updated May 26, 2022

:::

##### Setup linking

If you are trying to debug an issue in Cashmere that only appears within your app, it can be helpful to modify the Cashmere library used by your app while it is running on your computer. Following the below steps can facilitate this.

1. Open a terminal and run `npm run build` in the Cashmere root folder on your computer. This will put all the necessary files in the `dist/cashmere` directory. *Note:* Running only `npm run build:lib` will leave out some necessary files from this directory, so make sure to run the whole thing.
2. Navigate to `dist/cashmere` and run `npm link`. This will set up a link to use your local build of Cashmere rather than the installed one from npm.
3. Navigate to the root folder of the app you would like to test with your local Cashmere and run `npm link @healthcatalyst/cashmere`. This will tell your project to use the local cashmere rather than the installed one.

Once this is complete, you should technically be good. A couple more tweaks that might have to be done:

- Sometimes, your project may find a conflict between the locally-installed `rxjs` (or other libraries) and the one bundled with Cashmere. In order to make sure you are using the version from your project, add the following two lines to the `paths` section in your root `tsconfig.json`:

```
"rxjs": ["node_modules/rxjs"],
"rxjs/*": ["node_modules/rxjs/*"]
```

- In order to help Angular to accept the symlinks added by `npm link`, add the following line to your `angular.json` (under `projects -> {project} -> architect -> build -> options`):

```
"preserveSymlinks": true
```

If you encounter other configuration tweaks needed to make it work in your app, please add it to this list to help others that may encounter the same problems.
