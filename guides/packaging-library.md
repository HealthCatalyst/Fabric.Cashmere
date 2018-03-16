# Guidelines for Contribution
###### Last updated March 15, 2018

:::
#####  Building npm package and publishing
In order to publish an npm package you must be a part of the [@healthcatalyst npm members](https://www.npmjs.com/org/healthcatalyst/members)

1. Verify all guidelines pass from the [Contribution Guide](http://cashmere.healthcatalyst.net/guides/contribution-guide)
1. Increment the version in `package.json` and `lib/package.json`. Use [SemVer](http://semver.org/) for versioning.
1. Run `npm run build:lib` to bundle the library.
1. Navigate to dist directory `cd ./lib/dist/`
1. Run `npm pack`
1. Run `npm publish`

*Please note after packaging the library, building the library normally through `npm start` will fail until you clear the `./lib/dist` and `./lib/.ng_pkg_build/` directories*

:::
