##### Setup

The `options` takes a `DateRangeOptions` object as a parameter to configure the date range component. This is typically setup for each component:

```typescript
@Component({
...
})
export class MyComponent implements OnInit{
     options: DateRangeOptions;
     ngOnInit() {
        this.options = {
            presets: [],
            format: 'mediumDate',
            range: { fromDate: today, toDate: today },
            applyLabel: 'Apply',
            ...
        };
    }
}
```

```html
<button hc-button hcDateRange [options]="options">
    Click Me
</button>
```

The default if options are not setup

```typescript
{
    excludeWeekends: false,
    locale: 'en-US',
    fromMinMax: { fromDate: undefined, toDate: undefined },
    toMinMax: { fromDate: undefined, toDate: undefined },
    presets: [],
    format: '',
    range: { fromDate: undefined, toDate: undefined }
}
```
