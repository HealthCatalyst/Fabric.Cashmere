export interface IReleaseNotesModalData {
    appName: string;
    headerLinkText?: string;
    headerLinkUrl?: string;
    releaseNotes: IReleaseNote[];
    showNotice?: boolean;
}

export interface IReleaseNote {
    version: string;
    notesHTML: string;
    releaseMonth?: number;
    releaseYear?: number;
    releaseDay?: number;
}

/** Configuration data passed to the Release Notes modal */
export class ReleaseNotesModalData implements IReleaseNotesModalData {
    /** Name of the application */
    appName: string;
    /** Text shown as a link in the header. Defaults to 'More on HC Community'. We recommend linking to the release notes page on Health Catalyst Community for your web app, but the link text and url can be configured however you would like. */
    headerLinkText?: string = 'More on HC Community';
    /** URL for link in the header. We recommend linking to the release notes page on Health Catalyst Community for your web app, but the link text and url can be configured however you would like. */
    headerLinkUrl?: string = '';
    /** Collection of release notes by version. UI will be slightly simplified if only one version is given. */
    releaseNotes: ReleaseNote[];
    /** True to show notice about where to find this window again. Some apps like to open this window automatically the first time the app is loaded after a new release. In those cases, it's helpful to show a message in the footer explaining how to find this window again later. Default is to show those message. */
    showNotice?: boolean = true;
}

/** Notes for a single release */
export class ReleaseNote implements IReleaseNote {
    /** True if this release note accordion should be open */
    public isOpen = false;
    /** Merges the release day, month and year into a string: "DD MMM YYYY" */
    public get releaseDateStr(): string { return this._releaseDateStr; }
    private _releaseDateStr: string;
    constructor(
        /** Release version. Semantic versioning recommended. */
        public version: string,
        /** Release notes for the given version.
        * **WARNING:** You are responsible to sanitize any unsafe user input. */
        public notesHTML: string,
        /** Optional. What month is the release from? [1-12] */
        public releaseMonth: number,
        /** Optional. What year is the release from? [YYYY] */
        public releaseYear: number,
        /** Optional. What day is the release from? [1-31] */
        public releaseDay: number = 0) {
        // take a number 1-12 and produce a string like 'Jan', 'Feb', etc.
        const monthStr = new Date(releaseYear, releaseMonth - 1, 1).toLocaleString('en-us', { month: 'short' });
        this._releaseDateStr = `${releaseDay ? releaseDay : ''} ${monthStr} ${releaseYear}`;
    }
}
