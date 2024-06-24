let nextUniqueId = 0;

/** @docs-private */
export interface LinkParent {
    iconClass?: string;
    title: string;
    description: string;
    labelHTML: string;
    children: SidenavLink[];
    parent?: LinkParent;
    tabCSSClass?: string;
}

export class SidenavLink implements LinkParent {
    /** Name of the link. Used as the primary label in the UI. */
    public title: string;
    /** Serves as the primary label in the UI. Will override "title". **WARNING:** You are responsible to sanitize any unsafe user input. */
    public labelHTML: string;
    /** Unique identifier for this link. If not provided at initialization, will be auto generated. */
    public key: string;
    /** Extra detail for this link, preferably less than 10 characters. Shown as a sub label in the UI. */
    public subText?: string;
    /** Icon associated with this link */
    public iconClass?: string;
    /** Describes the link. Will be used for hover tooltips. */
    public description: string;
    /** Passed to routerLink */
    public routerLink?: string;
    /** Additional CSS class to apply */
    public tabCSSClass?: string;
    /** Instead of a route, can provide a callback function.
     * Alternative is to listen to SideNav's tabClicked or favoriteClicked `@Output` events. */
    public onClick?: (e: MouseEvent, link: SidenavLink) => void;
    /** If true, this link will not respond to clicks and will look disabled. *Defaults to `false`.* */
    public disabled = false;
    /** If false, this link will not respond to clicks. Will not look disabled, but will just serve as a non-clickable label. *Defaults to `true`.**/
    public clickable = true;

    /** Nested sub links. Will be displayed in a tree structure */
    public children: SidenavLink[];
    /** True if this parent link is open and children links should be shown. */
    public open = false;

    /** @docs-private */
    public parent: LinkParent;

    /** @docs-private */
    public get isLastLeafNode(): boolean {
        return this.parent?.children.indexOf(this) === this.parent?.children.length - 1;
    }

    /** Text or markup to be inserted into a badge.
     * **WARNING:** You are responsible to sanitize any unsafe user input.
    */
    public badgeHTML: string;
    /** Select a valid cashmere color for the badge background color (from the primary, secondary, or neutral palette. eg 'blue', 'slate-gray-300', or 'light-pink') */
    public badgeColor = 'slate-gray-200';

    constructor(partial: Partial<SidenavLink>) {
        Object.assign(this, partial);
        this.key = this.key || `link${nextUniqueId++}`;
        this.children?.forEach(child => {
            child.parent = this;
        });
    }
}

export class SidenavTabGroup implements LinkParent {
    /** Icon associated with this link section */
    iconClass?: string;
    /** Name of the link section. Used as the primary label in the UI. */
    public title: string;
    /** Alternate name of the link section to show when sidenav is collapsed. */
    public collapsedTitle: string;
    /** Name of the link section. shown on hover */
    public description: string;
    /** Serves as the primary label in the UI. Will override "title". **WARNING:** You are responsible to sanitize any unsafe user input. */
    public labelHTML: string;
    /** Alternate markup to serve as the primary label in the UI when the sidenav is collapsed. Will override other title or label properties. **WARNING:** You are responsible to sanitize any unsafe user input. */
    public collapsedLabelHTML: string;
    /** Nested links for this section*/
    public children: SidenavLink[];
    /** If true, will put child links into popover menu when the sidenav is collapsed */
    public hideChildrenOnCollapse = true;
    /** Additional CSS class to apply */
    public tabCSSClass?: string;

    /** @docs-private */
    public hasNestedLinks: boolean;

    constructor(partial: Partial<SidenavTabGroup>) {
        Object.assign(this, partial);
        this.hasNestedLinks = this.children.some(child => child.children?.length > 0);
        this.children?.forEach(child => child.parent = this);
    }
}

export class SidenavLinkClickEvent {
    public event: MouseEvent;
    public link: SidenavLink;
}
