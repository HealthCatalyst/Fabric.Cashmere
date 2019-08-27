### Busy Indicator Usage
The code to actually implement this in a project is considerably different than what is shown in the examples. 
The examples had to be unique in order to demonstrate them here.

[ng-http-loader](https://www.npmjs.com/package/ng-http-loader) seems to be a very versatile module for this. It will automatically start when you fire off an HTTP request and stop when the request completes. In large part, it is completely automatic once it is configured. Configuration is at the app level making it a one time setup. It also comes with a service so that you can start and stop it manually if you ever need. You can tell ng-http-loader to use this component as a custom component for the look and feel.

Install the ng-http-loader module:
```bash
npm i ng-http-loader
```

app.module.ts:
```javascript
imports: [
    ...
    NgHttpLoaderModule.forRoot(),
    ...
],
entryComponents: [
    ...
    BusyIndicatorComponent,
    ...
]
```

app.component.ts:
```javascript
// add public variable
busyComponent = BusyIndicatorComponent;
```

app.component.html:
```html
<ng-http-loader [entryComponent]="busyComponent"></ng-http-loader>
```
