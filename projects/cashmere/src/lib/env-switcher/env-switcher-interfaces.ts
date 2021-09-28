export interface IMetadataEnvironment {
    /** A unique identifier for the environment. */
    id: number;
    /** An identifier representing a given tenant. (For example, a particular client.) */
    tenantCode: string;
    /** The full name of environment. */
    name: string;
    /** An abbreviated environment name. Used in environment badge ui element. */
    shortName: string;
    /** Describes the environment. */
    description: string;
    /** Hex code for the color associated with an environment. Used in the environment badge ui element.
     * Color options include: `"ffffff", "7acb91", "00acac, "00a859, "e7c447, "ebba82, "f89012, "f13c45, "eea2C0, "a94c9d, "3194fe, "ace5ff"`.
     * If no color (or an invalid color) is provided, will default to white (#ffffff).*/
    color: string;
}

/** Extended version of metadata environment model ready for display in the environment switcher UI */
export interface IMetadataEnvironmentVM extends IMetadataEnvironment {
    badgeColorClass: string;
}

/** map of color hex codes and their corresponding css classes. Allows UI to restrict which colors are used */
export const badgeColorClasses = {
    ffffff: 'hc-env-color-white',
    '7acb91': 'hc-env-color-light-green',
    '00acac': 'hc-env-color-forest-green',
    '00a859': 'hc-env-color-green',
    e7c447: 'hc-env-color-gold',
    ebba82: 'hc-env-color-tan',
    f89012: 'hc-env-color-orange',
    f13c45: 'hc-env-color-red',
    eea2C0: 'hc-env-color-pink',
    a94c9d: 'hc-env-color-purple',
    '3194fe': 'hc-env-color-blue',
    ace5ff: 'hc-env-color-light-blue'
};
