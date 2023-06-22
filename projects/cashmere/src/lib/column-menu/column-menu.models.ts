/** The interface for caching a sortable/hidable column in local storage */
export interface HcCachedColumn {
    key: string;
    isHidden: boolean;
}

/**
 * Interface to configure a column that hideable/sortable in the column menu.
 */
export interface HcDynamicColumn {
    /** property name from data element */
    name: string;
    /** ui-ready label for this data element */
    title?: string;
    /** true if this property can be hidden/shown */
    isHidable?: boolean;
    /** true if this property should be shown default. only applicable if the column is hidable. */
    isShownByDefault?: boolean;
    /** description for this property */
    description?: string;
}
