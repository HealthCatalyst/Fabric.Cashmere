export class ButtonOptions {
    /**
     * The text that will appear on the button
     * @memberof ButtonOptions
     */
    public buttonName?: string = 'Default Text';

    /**
     * The font-awesome icon that will appear on the button ('fa fa-plus')
     * @memberof ButtonOptions
     */
    public buttonIcon?: string = '';

    /**
     * Button Theme
     * @memberof ButtonOptions
     */
    public buttonType?:
        | 'primary'
        | 'primary-alt1'
        | 'primary-alt2'
        | 'primary-alt3'
        | 'secondary'
        | 'tertiary' = 'primary';

    /**
     * Boolean value that enables/disables the button
     * @memberof ButtonOptions
     */
    public buttonDisabled?: boolean = false;

    /**
     * Boolean that will hide/show the button
     * @memberof ButtonOptions
     */
    public buttonDisplayed?: boolean = true;

    /**
     * Text value that will appear on button hover
     * @memberof ButtonOptions
     */
    public tooltip?: string;
}
