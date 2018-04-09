:::
##### Angular Component
``` html
<hc-pagination [totalPages]="pageCount" [(pageNumber)]="currentPage"></hc-pagination>
```
:::


:::
##### Typescript
``` typescript
@NgModule({
    imports: [
        PaginationModule
    ],
...
```
:::

:::
##### Responsiveness
Normally, the pagination control displays a previous button, a next button, and nine page options (some of which may be ellipses).  When limited space is available (determined by media query), the pagination control collapses down to five page options.
:::

:::
##### Pagination Component Properties
| Name | Type | Description |
| - | - | - |
|totalPages|number|The total number of pages available to navigate to|
|pageNumber|number|The current page number (one-based).  Should be two-way bound using `[(pageNumber)]` to ensure that the source property is updated when the control is used.|
:::
