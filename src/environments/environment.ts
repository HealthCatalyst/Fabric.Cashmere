// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    instrumentationKey: '7ce7e52a-addf-427b-91cf-094dd0ea1df0',
    productCatalog: {
        url: 'https://productdatabase-prod-svc.azurewebsites.net'
    }
};
