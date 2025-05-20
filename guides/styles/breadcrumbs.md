# Breadcrumbs

###### Last updated Jan 9, 2019

:::

##### Example

Add `.subnav` class to the root element with an `<ol>` element with `.breadcrumb` class as a child. Each `<li>` child should have a `.breadcrumb-item` class with either a `<span>` or `<a>`.

```html
<div class="subnav">
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="/foundations/breadcrumbs#">First</a>
            <i class="fa-solid fa-chevron-right breadcrumb-arrow"></i>
        </li>
        <li class="breadcrumb-item">
            <a href="/foundations/breadcrumbs#">Second</a>
            <i class="fa-solid fa-chevron-right breadcrumb-arrow"></i>
        </li>
        <li class="breadcrumb-item">
            <span>Third</span>
            <i class="fa-solid fa-chevron-right breadcrumb-arrow"></i>
        </li>
    </ol>
    <div class="breadcrumb-responsive-container">
        <a class="breadcrumb-back-button">
            <i class="fa-solid fa-chevron-left"></i>
            <span>Back</span>
        </a>
    </div>
</div>
```

:::

<div class="subnav">
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="/foundations/breadcrumbs#">First</a>
            <i class="fa-solid fa-chevron-right breadcrumb-arrow"></i>
        </li>
        <li class="breadcrumb-item">
            <a href="/foundations/breadcrumbs#">Second</a>
            <i class="fa-solid fa-chevron-right breadcrumb-arrow"></i>
        </li>
        <li class="breadcrumb-item">
            <span>Third</span>
            <i class="fa-solid fa-chevron-right breadcrumb-arrow"></i>
        </li>
    </ol>
    <div class="breadcrumb-responsive-container">
        <a class="breadcrumb-back-button">
            <i class="fa-solid fa-chevron-left"></i>
            <span>Back</span>
        </a>
    </div>
</div>
<br>
<br>

:::

##### Responsive

On smaller phone sized devices the `.breadcrumb` element will be hidden and in its place `.breadcrumb-responsive-container` will show. This container can have anything that would be suitable for smaller screens. Responsive behavior can be disabled by adding `.disable-responsive` to both the `.breadcrumb` and `.breadcrumb-responsive-container` element.
:::
