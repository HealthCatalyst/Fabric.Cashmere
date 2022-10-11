import {Component, OnDestroy, Input, ViewEncapsulation, Output, EventEmitter, ViewChild, forwardRef, HostBinding} from '@angular/core';
import {Subject} from 'rxjs';

import {IMetadataEnvironment, IMetadataEnvironmentVM, badgeColorClasses} from './env-switcher-interfaces';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HcPopComponent} from '../pop/popover.component';

@Component({
    selector: 'hc-env-switcher',
    templateUrl: './env-switcher.component.html',
    styleUrls: ['./env-switcher.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EnvSwitcherComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class EnvSwitcherComponent implements OnDestroy, ControlValueAccessor {
    @HostBinding('class.hc-env-switcher-container') _hostClass = true;

    /** The currently active metadata environments.
     * NgModel/FormValue is bound to just the environment IDs, but you can access this property for an array with the entire environment model. */
    public get selectedEnvironments(): IMetadataEnvironment[] {
        const envs = new Array<IMetadataEnvironment>();
        this._activeEnvIds.forEach(id => {
            const matchingEnv = this.environmentOptions.find(e => e.id === id);
            if (matchingEnv) {
                envs.push(matchingEnv);
            }
        });
        return envs;
    }
    /** When disabled, the environment switcher cannot be opened. *Defaults to false.* */
    public get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    /** The ids of the selected metadata environments */
    public _activeEnvIds = new Array<number>();
    /** In multiselect mode, track the ids of selected environments in this 'staging' model (and then actually apply them when the user is done) */
    public _stagedActiveEnvIds = new Array<number>();
    /** Text to show in the badge shown in the navbar. */
    public _badgeText = 'None';
    /** Tooltip shown when a user hover over the badge in the navbar. */
    public _badgeTooltip = 'None selected';
    /** Color of the badge in the navbar. */
    public _badgeColor = 'hc-badge-color-white';
    /** collection of allowed colors mapped to their matching css classes */
    private readonly _colorClassesMap = badgeColorClasses;

    private _onChange = (_: unknown) => _;
    private _destroy$ = new Subject();

    /** Reference to the popover containing the environment selection menu. */
    @ViewChild('envSwitcherPop') pop: HcPopComponent;

    /** Set to true while waiting for environments to load from MDS. *Defaults to false.* */
    @Input() public loading = false;

    /** Set to true if unable to load environments from MDS. A "Failed to load" message will be shown in the switcher. *Defaults to false.* */
    @Input() public failedToLoad = false;

    /** Header to display above the expanded list of environments. *Defaults to 'Environments'.* */
    @Input() public listHeader = "Environments";

    /** If true, will allow multiple environments to be selected at once. *Defaults to false.* */
    @Input()
    get canSelectMultiple(): boolean {
        return this._canSelectMultiple;
    }

    set canSelectMultiple(canSelectMultiple: boolean) {
        // if switching from multiselect to single, make sure just one is selected
        if (!canSelectMultiple && this._canSelectMultiple && this._activeEnvIds?.length > 1) {
            this.setActiveEnvironments([this._activeEnvIds[0]]);
        }

        this._canSelectMultiple = canSelectMultiple;
    }
    private _canSelectMultiple = false;

    /** If true, will show an icon that allows user to click to open an environment in a new tab.
     * When clicking this icon, a `(openInNewTab)` event will be fired that the consuming app will
     * need to listen for and respond to. *Defaults to false.*
     */
    @Input()
    get canOpenInNewTab(): boolean {
        return this._canOpenInNewTab;
    }

    set canOpenInNewTab(canOpenInNewTab: boolean) {
        this._canOpenInNewTab = canOpenInNewTab;
    }
    private _canOpenInNewTab = false;

    /** The metadata environments to show in the switcher. */
    @Input() public set environmentOptions(envs: IMetadataEnvironment[]) {
        this._environmentOptionVMs = this._convertEnvsToVMs(envs);
        this.setActiveEnvironments(this._activeEnvIds);
    }
    public get environmentOptions(): IMetadataEnvironment[] {
        return this._environmentOptionVMs;
    }
    public _environmentOptionVMs: IMetadataEnvironmentVM[];

    /** Event that fires when model is updated. Outputs an array of the currently selected environments.
     * Consuming app will need to set appropriate environment headers refresh elements on page as needed. */
    @Output() updateEnvironments = new EventEmitter<Array<IMetadataEnvironment>>();

    /** Event that fires when the "open in new tab" action is triggered. Outputs the selected environment.
     * Consuming app will need implement functionality to actually open a new tab with the given environment active. */
    @Output() openInNewTab = new EventEmitter<IMetadataEnvironment>();

    /** Event that fires when users click a link to reload environments. This link is shown if `failedToLoad` is set to true. */
    @Output() reloadEnvironments = new EventEmitter<void>();

    writeValue(selectedEnvs: number[]): void {
        this.setActiveEnvironments(selectedEnvs || []);
    }

    registerOnChange(fn: () => null): void {
        this._onChange = fn;
    }

    registerOnTouched(): void {
        // do nothing
    }

    setDisabledState(state: boolean): void {
        this._disabled = state;
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    /** Manually open the app switcher menu. */
    public openMenu(): void {
        this._stagedActiveEnvIds = this.canSelectMultiple ? this._activeEnvIds.slice() : [];
        this.pop.open();
    }

    /** Manually close the app switcher menu. */
    public closeMenu(): void {
        this.pop.close();
    }

    /** Convenience method for setting the current active environment(s) by their Ids. Invalid environment Ids will not be selected. */
    public setActiveEnvironments(envs: number[]): void {
        const envsToSet = envs.filter(givenEnvId => {
            const matchingEnv = this._environmentOptionVMs.find(env => env.id === givenEnvId);
            if (matchingEnv) {
                return matchingEnv;
            } else {
                console.warn(`Attempted to set an environment as active that is not currently an option. ${givenEnvId}`);
            }
        });
        this._activeEnvIds.length = 0;
        this._activeEnvIds.push(...envsToSet);
        this._stagedActiveEnvIds = this.canSelectMultiple ? this._activeEnvIds.slice() : [];
        this._updateBadgeText();
        this._updateBadgeColor();
    }

    public _isEnvSelected(envId: number): boolean {
        if (this.canSelectMultiple) {
            return this._stagedActiveEnvIds.findIndex(e => e === envId) > -1;
        }
        return this._activeEnvIds.findIndex(e => e === envId) > -1;
    }

    public _onBadgeClick(): void {
        if (this._disabled) {
            return;
        }
        this.openMenu();
    }

    public _envClicked(env: IMetadataEnvironmentVM): void {
        if (this.canSelectMultiple) {
            this._envClickedForMulti(env);
        } else {
            this._envClickedForSingle(env);
        }
    }

    /** Used when `canSelectMultiple` is true. applies the state of the 'staging' model (`_stagedSelectedEnvs`) and closes the menu. */
    public _applyEnvs(): void {
        this._activeEnvIds.length = 0;
        this._activeEnvIds.push(...this._stagedActiveEnvIds);
        this._onEnvironmentsChanged();
    }

    /** Used when `canSelectMultiple` is true. toggles the environment as needed in the 'staging' model (`_stagedSelectedEnvs`). */
    private _envClickedForMulti(env: IMetadataEnvironmentVM): void {
        const idx = this._stagedActiveEnvIds.findIndex(e => e === env.id);
        if (idx > -1) {
            this._stagedActiveEnvIds.splice(idx, 1);
        } else {
            this._stagedActiveEnvIds.push(env.id);
        }
    }

    /** Used when `canSelectMultiple` is false. selects an environment and closes the menu */
    private _envClickedForSingle(env: IMetadataEnvironmentVM): void {
        this._activeEnvIds.length = 0;
        this._activeEnvIds.push(env.id);

        // go ahead and apply changes, close the dropdown for single select
        this._onEnvironmentsChanged();
    }

    private _onEnvironmentsChanged(): void {
        this._onChange(this._activeEnvIds);
        this.updateEnvironments.emit(this.selectedEnvironments);
        this._updateBadgeText();
        this._updateBadgeColor();
        this.pop.close();
    }

    /** Update the text displayed on the environment switcher badge in the navbar */
    private _updateBadgeText() {
        if (this._activeEnvIds.length === 0) {
            this._badgeText = 'None';
            this._badgeTooltip = 'None selected';
        } else if (this._activeEnvIds.length === 1) {
            this._badgeText = this.selectedEnvironments[0].shortName.trim().slice(0, 6);
            this._badgeTooltip = `Active: ${this._buildActiveEnvList()}`;
        } else if (this._activeEnvIds.length === this.environmentOptions.length) {
            this._badgeText = 'All';
            this._badgeTooltip = `${this._activeEnvIds.length} active: ${this._buildActiveEnvList()}`;
        } else if (this._activeEnvIds.length > 1) {
            this._badgeText = `${this._activeEnvIds.length} Selected`;
            this._badgeTooltip = `${this._activeEnvIds.length} active: ${this._buildActiveEnvList()}`;
        }
    }

    /** Returns a list of the active environments */
    private _buildActiveEnvList(): string {
        return this.selectedEnvironments.map(e => e.name).join(', ');
    }

    /** Set the appropriate color for environment switcher badge displayed in the navbar */
    private _updateBadgeColor(): void {
        if (this._activeEnvIds.length === 0 || this._activeEnvIds.length > 1) {
            this._badgeColor = 'hc-badge-color-white';
        } else {
            this._badgeColor = this._getBadgeColorClass(this.selectedEnvironments?.[0]);
        }
    }

    /** Translate an environment's color code into an appropriate css class */
    private _getBadgeColorClass(env?: IMetadataEnvironment): string {
        const defaultColor = 'ffffff';
        const color = env?.color?.toLowerCase().replace('#', '') || defaultColor;
        return this._colorClassesMap[color] || this._colorClassesMap[defaultColor];
    }

    /** Prepares given environment models into view models read for display in the UI. */
    private _convertEnvsToVMs(envs: IMetadataEnvironment[]): IMetadataEnvironmentVM[] {
        return envs.map(env => {
            const envVM = Object.assign({}, env) as IMetadataEnvironmentVM;
            envVM.badgeColorClass = this._getBadgeColorClass(env);
            envVM.shortName = env.shortName || this._generateShortName(env.name);
            return envVM;
        });
    }

    public _generateShortName(name: string): string {
        if (!name) {
            return 'ENV';
        }
        const tokens = name.trim().split(/\s+/g);

        if (tokens.length > 1) {
            return tokens
                .map(e => e.charAt(0).toLocaleUpperCase())
                .join('')
                .slice(0, 4);
        } else {
            return name.trim().slice(0, 4).toLocaleUpperCase();
        }
    }
}
