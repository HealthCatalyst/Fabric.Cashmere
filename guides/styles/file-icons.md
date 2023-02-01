# File Icons

###### Last updated Jan 31, 2023

:::

##### Overview

Many interfaces in a web application call for the displaying of file icons. To standardize our iconography, the following icons are provided within Cashmere with instructions below on common MIME types or extensions they are to be used for.
:::

:::

##### Usage

These icons are base64 encoded and available in a single stylesheet: `@import '@healthcatalyst/cashmere/file-icons` if you aren't already importing the full Cashmere stylesheet. Add the class listed below to an html element to apply the icon as a background-image.
:::

:::

##### Icons

| Icon                                            | Class Name                     | Typical Usage                                                        |
| ----------------------------------------------- | ------------------------------ | -------------------------------------------------------------------- |
| <div class="hc-pdf-file-icon"></div>            | `.hc-pdf-file-icon`            | Any MIME types that include 'pdf'                                    |
| <div class="hc-doc-file-icon"></div>            | `.hc-doc-file-icon`            | Any MIME types that include 'msword'                                 |
| <div class="hc-docx-file-icon"></div>           | `.hc-docx-file-icon`           | Any file names that include '.docx'                                  |
| <div class="hc-text-file-icon"></div>           | `.hc-text-file-icon`           | For the MIME type 'text/plain'                                       |
| <div class="hc-xml-file-icon"></div>            | `.hc-xml-file-icon`            | MIME types that include 'xml' and aren't covered by other types      |
| <div class="hc-text-clipping-file-icon"></div>  | `.hc-text-clipping-file-icon`  | All other MIME types that begin with 'text/' besides 'text/plain'    |
| <div class="hc-image-file-icon"></div>          | `.hc-image-file-icon`          | Any MIME types that begin with 'image/'                              |
| <div class="hc-csv-file-icon"></div>            | `.hc-csv-file-icon`            | Any MIME types that include 'csv'                                    |
| <div class="hc-xls-file-icon"></div>            | `.hc-xls-file-icon`            | Any file names that include '.xls'                                   |
| <div class="hc-generic-file-icon"></div>        | `.hc-generic-file-icon`        | Any MIME types that aren't covered by the above                      |

:::

:::

##### Checked Icons

To include a checkmark with any of the above icons (for example to indicate a successful upload), you can add a child element with the class `.hc-file-icon-checked`.

```html
<div class="hc-pdf-file-icon">
    <div class="hc-file-icon-checked"></div>
</div>
```

<div class="hc-pdf-file-icon"><div class="hc-file-icon-checked"></div></div>

:::
