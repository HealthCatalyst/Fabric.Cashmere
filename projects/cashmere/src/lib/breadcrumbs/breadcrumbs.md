##### Router Setup

The `hc-breadcrumb` component makes use of the angular `Router` with the scope of the routing module in which it is placed. A custom data element named `breadcrumb` must be added to its Routes in order for the breadcrumb component to function properly. Below in an example of a properly configured Route:

```json
{
    "path": "breadcrumbs",
    "component": BreadcrumbsDemoComponent,
    "data": {"breadcrumb": "Home Page"},
    "children": [
        {
            "path": "breadcrumb1",
            "component": Breadcrumb1DemoComponent,
            "data": {"breadcrumb": "Second Page"}
        }
    ]
}
```
