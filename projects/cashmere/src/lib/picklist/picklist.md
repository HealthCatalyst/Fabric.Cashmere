##### Custom Templates
The appearance of the picklist is highly customizable using template directives:

&nbsp;

| Template Directive      | Description                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `hcPaneHeaderLeftTmp`   | Header above the left picklist pane. *Default is "Available".*                                                     |
| `hcPaneHeaderRightTmp`  | Header above the right picklist pane. *Default is "Selected".*                                                     |
| `hcPickOptionTmp`       | An individual option row.                                                                                          |
| `hcPickOptgroupTmp`     | A header row for grouped options.                                                                                  |
| `hcPaneToolbarTmp`      | The space just above an option list. *Default contains count of options and Select All/Select None buttons.*       |
| `hcPaneFooterTmp`       | The space just below an option list. *Default contains count highlighted options.*                                 |
| `hcPickCustomItemTmp`   | When configuraed to allow for custom options, this template appears when search term doesn't have an exact match.  |

At a bare minimum, you simply need to use the appropriate attribute directive on an ng-template element within the `<hc-picklist>` element.
```HTML
<hc-picklist [items]="myItems">
    <ng-template hcPaneFooterTmp><!-- Custom footer content here. --></ng-template>
</hc-picklist>
```

Within those `<ng-template>` tags, you can nest additional elements, components, and directives. You can apply your own CSS classes and custom styling.

Some template directives also expose variables via the `let` template syntax. For example, in the directive for option templates (`hcPickOptionTmp`), you can access values like the option's value and index.
```HTML
<hc-picklist [items]="myItems">
    <ng-template hcPickOptionTmp let-item="item" let-search="searchTerm" let-index="index">
        <strong>{{index}}</strong><span class="my-custom-class">{{ item.name }}</span>
    </ng-template>
</hc-picklist>
```

You can see more extensive implementations under the **Picklist Templates** example.

&nbsp;

##### Migrating from Old Picklist
In Cashmere version 9.x and earlier, there was a previous iteration of `<hc-picklist>` with a different API. That original component has been
deprecated. If needed, you can still use the old component, but it is now referenced as `<hc-picklist-old>`. We highly encourage migrating to the newer version of picklist as soon as possible.

For the simpleset of use cases, migration is very simple:

```HTML
<!-- In the typescript file: simpleModelControl = new FormControl([]); -->

<!-- Old picklist -->
<hc-picklist [formControl]="simpleModelControl" [simpleOptions]="['North', 'East', 'South', 'West']"></hc-picklist>

<!-- New Picklist -->
<hc-picklist [formControl]="simpleModelControl" [items]="['North', 'East', 'South', 'West']"></hc-picklist>

```

For most cases, a bit more work is required. The previous picklist had a `[config]` input that accepted an object of type `IPicklistSettings`. Following is a table of `IPicklistSettings` properties and either an equivalent property or a note on how to migrate.


| Old Picklist                    | New Picklist                                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `config.codeIsSignificant`      | Not available. Simply include the code or id in your template. (Use `hcPickOptionTmp` or `<hc-pick-option>`.)      |
| `config.leftHeaderText`         | Use `[leftHeaderText]` input. Can also use `hcPaneHeaderLeftTmp` directive to customized header further.           |
| `config.rightHeaderText`        | Use `[rightHeaderText]` input. Can also use `hcPaneHeaderRightTmp` directive to customized header further.         |
| `config.options`                | Use `[items]` input for prefetched options. Options in the array can now take any shape, object or primitive.      |
| `config.selected`               | Not available. Use `[(ngModel)]` or `[formControl]`.                                                               |
| `config.showHeaderText`         | Use `[hasHeader]` input.                                                                                           |
| `config.sort`                   | Not available. Use `[sortFn]` input and provide a custom sort function logic instead of asc/desc strings.          |
| `config.useValuesets`           | Not available. Use `[groupBy]`, possibly along with related group input `[canSelectGroup]`, `[groupValue]`, etc.   |

If you were previously retrieving options over HTTP with `IPicklistOptionsSource`, you should reference the **Picklist Remote Data** example. As always, don't hesitate to reach out to the Cashmere steering committee on Slack.

&nbsp;

##### Inspired by Ng-Select

This component was heavily inspired by the open source ng-select component. Their API's are very similar, so you can find many applicable explanations
and examples in their robust docs site:
-   [Examples](https://ng-select.github.io/ng-select)
-   [API](https://github.com/ng-select/ng-select#api)
-   [Github](https://github.com/ng-select/ng-select)

