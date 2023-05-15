let nextUniqueId = 0;

export class SidenavLink {
    /** Name of the link. Used as the primary label in the UI. */
    public title: string;
    /** Unique identifier for this link. If not provided at initialization, will be auto generated. */
    public key: string;
    /** Extra detail for this link, preferably less than 10 characters. Shown as a sub label in the UI. */
    public subText?: string;
    /** Icon associated with this link */
    public iconClass?: string;
    /** Describes the link. Will be used for hover tooltips. */
    public description?: string;
    /** Passed to routerLink */
    public routerLink?: string;
    /** Instead of a route, can provide a callback function.
     * Alternative is to listen to SideNav's tabClicked or favoriteClicked `@Output` events. */
    public onClick?: (e: MouseEvent, link: SidenavLink) => void;
    /** If true, this link will not respond to clicks */
    public disabled = false;

    constructor(partial: Partial<SidenavLink>) {
        Object.assign(this, partial);
        this.key = this.key || `link${nextUniqueId++}`;
    }
}

export class SidenavLinkClickEvent {
    public event: MouseEvent;
    public link: SidenavLink;
}
