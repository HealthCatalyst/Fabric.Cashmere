The `hc-table` provides a Cashmere styled data-table that can be used to display rows of
data.

This table builds on the foundation of the CDK data-table and uses a similar interface for its
data input and template, except that its element and attribute selectors will be prefixed
with `hc-` instead of `cdk-`. For more information on the interface and a detailed look at how
the table is implemented, see the
[guide covering the CDK data-table](https://material.angular.io/guide/cdk-table).

### Getting Started

#### 1. Write your hc-table and provide data

Begin by adding the `<table hc-table>` component to your template and passing in data.

The simplest way to provide data to the table is by passing a data array to the table's `dataSource`
input. The table will take the array and render a row for each object in the data array.

```html
<table hc-table [dataSource]="”myDataArray”">...</table>
```

Since the table optimizes for performance, it will not automatically check for changes to the data
array. Instead, when objects are added, removed, or moved on the data array, you can trigger an
update to the table's rendered rows by calling its `renderRows()` method.

While an array is the _simplest_ way to bind data into the data source, it is also
the most limited. For more complex applications, using a `DataSource` instance
is recommended. See the section "Advanced data sources" below for more information.

#### 2. Define the column templates

Next, write your table's column templates.

Each column definition should be given a unique name and contain the content for its header and row
cells.

Here's a simple column definition with the name `'userName'`. The header cell contains the text
"Name" and each row cell will render the `name` property of each row's data.

```html
<ng-container hcColumnDef="userName">
    <th hc-header-cell *hcHeaderCellDef>Name</th>
    <td hc-cell *hcCellDef="let user">{{user.name}}</td>
</ng-container>
```

#### 3. Define the row templates

Finally, once you have defined your columns, you need to tell the table which columns will be
rendered in the header and data rows.

To start, create a variable in your component that contains the list of the columns you want to
render.

```ts
columnsToDisplay = ['userName', 'age'];
```

Then add `hc-header-row` and `hc-row` to the content of your `hc-table` and provide your
column list as inputs.

```html
<tr hc-header-row *hcHeaderRowDef="columnsToDisplay"></tr>
<tr hc-row *hcRowDef="let myRowData; columns: columnsToDisplay"></tr>
```

Note that this list of columns provided to the rows can be in any order, not necessary the order in
which you wrote the column definitions. Also, you do not necessarily have to include every column
that was defined in your template.

This means that by changing your column list provided to the rows, you can easily re-order and
include/exclude columns dynamically.

### Advanced data sources

The simplest way to provide data to your table is by passing a data array. More complex use-cases
may benefit from a more flexible approach involving an Observable stream or by encapsulating your
data source logic into a `DataSource` class.

#### Observable stream of data arrays

An alternative approach to providing data to the table is by passing an Observable stream that emits
the data array to be rendered each time it is changed. The table will listen to this stream and
automatically trigger an update to the rows each time a new data array is emitted.

#### DataSource

For most real-world applications, providing the table a DataSource instance will be the best way to
manage data. The DataSource is meant to serve a place to encapsulate any sorting, filtering, and data retrieval logic specific to the application.

A DataSource is simply a base class that has two functions: `connect` and `disconnect`. The
`connect` function will be called by the table to receive a stream that emits the data array that
should be rendered. The table will call `disconnect` when the table is destroyed, which may be the
right time to clean up any subscriptions that may have been registered during the connect process.

### Features

The `HcTable` is focused on a single responsibility: efficiently render rows of data in a
performant and accessible way.

You'll notice that the table itself doesn't come out of the box with a lot of features, but expects
that the table will be included in a composition of components that fills out its features.

For example, you can add sorting to the table by using HcSort and
mutating the data provided to the table according to their outputs.

To simplify the use case of having a table that can sort, and filter an array of data,
the Cashmere library comes with a `HcTableDataSource` that has already implemented
the logic of determining what rows should be rendered according to the current table state. To add
these feature to the table, check out their respective sections below.

#### Sorting

To add sorting behavior to the table, add the `hcSort` directive to the table and add
`hc-sort-header` to each column header cell that should trigger sorting.

```html
<!-- Name Column -->
<ng-container hcColumnDef="position">
    <th hc-header-cell *hcHeaderCellDef hc-sort-header>Name</th>
    <td hc-cell *hcCellDef="let element">{{element.position}}</td>
</ng-container>
```

If you are using the `HcTableDataSource` for your table's data source, provide the `HcSort`
directive to the data source and it will automatically listen for sorting changes and change the
order of data rendered by the table.

The default sort order of values is case insensitive as follows: "[Null]123ABC".

By default, the `HcTableDataSource` sorts with the assumption that the sorted column's name
matches the data property name that the column displays. For example, the following column
definition is named `position`, which matches the name of the property displayed in the row cell.

Note that if the data properties do not match the column names, or if a more complex data property
accessor is required, then a custom `sortingDataAccessor` function can be set to override the
default data accessor on the `HcTableDataSource`.

If you are not using the `HcTableDataSource`, but instead implementing custom logic to sort your
data, listen to the sort's `(hcSortChange)` event and re-order your data according to the sort state.
If you are providing a data array directly to the table, don't forget to call `renderRows()` on the
table, since it will not automatically check the array for changes.

The `HcSort` is one provided solution to sorting your table's data, but it is not the only option.

#### Filtering

Cashmere does not provide a specific component to be used for filtering the `HcTable`
since there is no single common approach to adding a filter UI to table data.

A general strategy is to add an input where users can type in a filter string and listen to this
input to change what data is offered from the data source to the table.

If you are using the `HcTableDataSource`, simply provide the filter string to the  
`HcTableDataSource`. The data source will reduce each row data to a serialized form and will filter
out the row if it does not contain the filter string. By default, the row data reducing function
will concatenate all the object values and convert them to lowercase.

For example, the data object `{id: 123, name: 'Mr. Smith', favoriteColor: 'blue'}` will be reduced
to `123mr. smithblue`. If your filter string was `blue` then it would be considered a match because
it is contained in the reduced string, and the row would be displayed in the table.

To override the default filtering behavior, a custom `filterPredicate` function can be set which
takes a data object and filter string and returns true if the data object is considered a match.

#### Pagination

There are cashmere pagination components available for usage. To learn about how to implement those, visit the
[pagination component examples](/components/pagination/examples).

#### Selection

Right now there is no formal support for adding a selection UI to the table, but Cashmere
does offer the right components and pieces to set this up. The following steps are one solution but
it is not the only way to incorporate row selection in your table.

##### 1. Add a selection model

Get started by setting up a `SelectionModel` from `@angular/cdk/collections` that will maintain the
selection state.

```js
const initialSelection = [];
const allowMultiSelect = true;
this.selection = new SelectionModel() < MyDataType > (allowMultiSelect, initialSelection);
```

##### 2. Define a selection column

Add a column definition for displaying the row checkboxes, including a master toggle checkbox for
the header. The column name should be added to the list of displayed columns provided to the
header and data row.

```html
<ng-container hcColumnDef="select">
    <th hc-header-cell *hcHeaderCellDef>
        <hc-checkbox
            (change)="$event ? masterToggle() : null"
            [checked]="selection.hasValue() && isAllSelected()"
            [indeterminate]="selection.hasValue() && !isAllSelected()"
        ></hc-checkbox>
    </th>
    <td hc-cell *hcCellDef="let row">
        <hc-checkbox
            (click)="$event.stopPropagation()"
            (change)="$event ? selection.toggle(row) : null"
            [checked]="selection.isSelected(row)"
        ></hc-checkbox>
    </td>
</ng-container>
```

##### 3. Add event handling logic

Implement the behavior in your component's logic to handle the header's master toggle and checking
if all rows are selected.

```js
/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected == numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}
```

#### Footer row

A footer row can be added to the table by adding a footer row definition to the table and adding
footer cell templates to column definitions. The footer row will be rendered after the rendered
data rows.

```html
<ng-container hcColumnDef="cost">
  <th hc-header-cell *hcHeaderCellDef> Cost </th>
  <td hc-cell *hcCellDef="let data"> {{data.cost}} </td>
  <td hc-footer-cell *hcFooterCellDef> {{totalCost}} </td>
</ng-container>

...

<tr hc-header-row *hcHeaderRowDef="columnsToDisplay"></tr>
<tr hc-row *hcRowDef="let myRowData; columns: columnsToDisplay"></tr>
<tr hc-footer-row *hcFooterRowDef="columnsToDisplay"></tr
```

##### 4. Include overflow styling

Finally, adjust the styling for the select column so that its overflow is not hidden. This allows
the ripple effect to extend beyond the cell.

```css
.hc-column-select {
    overflow: initial;
}
```

#### Sticky Rows and Columns

By using `position: sticky` styling, the table's rows and columns can be fixed so that they do not
leave the viewport even when scrolled. The table provides inputs that will autohcically apply the
correct CSS styling so that the rows and columns become sticky.

In order to fix the header row to the top of the scrolling viewport containing the table, you can
add a `sticky` input to the `hcHeaderRowDef`.

Similarly, this can also be applied to the table's footer row. Note that if you are using the native
`<table>` and using Safari, then the footer will only stick if `sticky` is applied to all the
rendered footer rows.

It is also possible to fix cell columns to the start or end of the horizontally scrolling viewport.
To do this, add the `sticky` or `stickyEnd` directive to the `ng-container` column definition.

This feature is supported by Chrome, Firefox, Safari, and Edge. It is not supported in IE, but
it does fail gracefully so that the rows simply do not stick.

Note that on Safari mobile when using the flex-based table, a cell stuck in more than one direction
will struggle to stay in the correct position as you scroll. For example, if a header row is stuck
to the top and the first column is stuck, then the top-left-most cell will appear jittery as you
scroll.

Also, sticky positioning in Edge will appear shaky for special cases. For example, if the scrolling
container has a complex box shadow and has sibling elements, the stuck cells will appear jittery.
There is currently an [open issue with Edge](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/17514118/)
to resolve this.

### Accessibility

Tables without text or labels should be given a meaningful label via `aria-label` or
`aria-labelledby`. The `aria-readonly` defaults to `true` if it's not set.

Table's default role is `grid`, and it can be changed to `treegrid` through `role` attribute.

`hc-table` does not manage any focus/keyboard interaction on its own. Users can add desired
focus/keyboard interactions in their application.

### Tables with `display: flex`

The `HcTable` does not require that you use a native HTML table. Instead, you can use an
alternative approach that uses `display: flex` for the table's styles.

This alternative approach replaces the native table element tags with the `HcTable` directive
selectors. For example, `<table hc-table>` becomes `<hc-table>`; `<tr hc-row`> becomes
`<hc-row>`. The following shows a previous example using this alternative template:

```html
<hc-table [dataSource]="dataSource">
    <!-- User name Definition -->
    <ng-container cdkColumnDef="username">
        <hc-header-cell *cdkHeaderCellDef>User name</hc-header-cell>
        <hc-cell *cdkCellDef="let row">{{row.username}}</hc-cell>
    </ng-container>

    <!-- Age Definition -->
    <ng-container cdkColumnDef="age">
        <hc-header-cell *cdkHeaderCellDef>Age</hc-header-cell>
        <hc-cell *cdkCellDef="let row">{{row.age}}</hc-cell>
    </ng-container>

    <!-- Title Definition -->
    <ng-container cdkColumnDef="title">
        <hc-header-cell *cdkHeaderCellDef>Title</hc-header-cell>
        <hc-cell *cdkCellDef="let row">{{row.title}}</hc-cell>
    </ng-container>

    <!-- Header and Row Declarations -->
    <hc-header-row *cdkHeaderRowDef="['username', 'age', 'title']"></hc-header-row>
    <hc-row *cdkRowDef="let row; columns: ['username', 'age', 'title']"></hc-row>
</hc-table>
```

Note that this approach means you cannot include certain native-table features such colspan/rowspan
or have columns that resize themselves based on their content.
