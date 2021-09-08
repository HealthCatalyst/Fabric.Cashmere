import {takeUntil} from 'rxjs/operators';
import {Component, Inject, OnDestroy, OnInit, Input, ViewEncapsulation, forwardRef, Output, EventEmitter, ViewChild} from '@angular/core';
import {Subject, Observable} from 'rxjs';

import {IMetadataEnvironmentService, IMetadataEnvironment, ENV_SWITCHER_SERVICE, IMetadataEnvironmentVM, badgeColorClasses} from './env-switcher-interfaces';
import {WorkTrackerService} from '../shared/work-tracker.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HcPopComponent} from '../pop/popover.component';

@Component({
    selector: 'hc-env-switcher',
    templateUrl: './env-switcher.component.html',
    styleUrls: ['./env-switcher.component.scss'],
    host: {class: 'hc-env-switcher-container'},
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => EnvSwitcherComponent),
        multi: true
    }],
    encapsulation: ViewEncapsulation.None
})
export class EnvSwitcherComponent implements OnInit, OnDestroy, ControlValueAccessor {
    /** The currently active metadata environments */
    public get activeEnvironments(): IMetadataEnvironment[] {
        const envs = new Array<IMetadataEnvironment>();
        this._activeEnvIds.forEach(id => {
            const matchingEnv = this.environments.find(e => e.id === id);
            if (matchingEnv) {
                envs.push(matchingEnv);
            }
        });
        return envs;
    }
    /** The available metadata environments */
    public get environments(): IMetadataEnvironmentVM[] { return this._environments; }
    private _environments: IMetadataEnvironmentVM[];
    /** True while environments are loading from MDS */
    public loading: Observable<boolean>;
    /** True if component was unable to load environments from MDS */
    public environmentsFailedToLoad = false;
    /** When disabled, the environment switcher cannot be opened */
    public get disabled(): boolean { return this._disabled; }
    private _disabled = false;

    /** The ids of the selected metadata environments */
    public _activeEnvIds = new Array<string>();
    /** In multiselect mode, track the ids of selected environments in this 'staging' model (and then actually apply them when the user is done) */
    public _stagedActiveEnvIds = new Array<string>();
    public _badgeText = "No Env";
    public _badgeTooltip = "No environment selected";
    public _badgeColor = "hc-badge-color-white";
    public _initialized = false;
    private _onChange = (_: unknown) => _;
    private _canSelectMultiple = false;
    private _canOpenInNewTab = false;
    private _destroy$ = new Subject();
    private readonly _colorClassesMap = badgeColorClasses;

    /** Reference to the popover containing the environment selection menu */
    @ViewChild('envSwitcherPop') pop: HcPopComponent;

    /** If true, will allow multiple environments to be selected at once. */
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

    /** If true, will show an icon that allows user to click to open an environment in a new tab.
     * When clicking this icon, a `(openInNewTab)` event will be fired that the consuming app will
     * need to listen for and respond to.
     */
    @Input()
    get canOpenInNewTab(): boolean {
        return this._canOpenInNewTab;
    }

    set canOpenInNewTab(canOpenInNewTab: boolean) {
        this._canOpenInNewTab = canOpenInNewTab;
    }

    /** Fires when model is updated. Outputs an array of the currently selected environments.
     * Consuming app will need to set appropriate environment headers refresh elements on page as needed. */
    @Output() updateEnvironments = new EventEmitter<Array<IMetadataEnvironment>>();

    /** Fires when 'open in new tab' action is triggered. Outputs the selected environment.
     * Consuming app will need implement their own open in new tab functionality. */
    @Output() openInNewTab = new EventEmitter<IMetadataEnvironment>();

    constructor(@Inject(ENV_SWITCHER_SERVICE) public envSwitcherService: IMetadataEnvironmentService, private workTracker: WorkTrackerService) {}

    writeValue(selectedEnvs: string[]): void {
        if (this._initialized) {
            this.setActiveEnvironments(selectedEnvs || []);
        } else {
            this._activeEnvIds = selectedEnvs || [];
        }
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

    ngOnInit(): void {
        this.loadEnvironments();
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    /** Load environment options from MDS. */
    public loadEnvironments(): void {
        this.loading = this.workTracker.startObservable(() =>
            this.envSwitcherService
                .getEnvironments()
                .pipe(takeUntil(this._destroy$))
                .subscribe(
                    (response) => {
                        this.environmentsFailedToLoad = false;
                        this._environments = response.value.map(env => {
                            const envVM = Object.assign({}, env) as IMetadataEnvironmentVM;
                            envVM.badgeColorClass = this._getBadgeColorClass(env);
                            return envVM;
                        });
                        this.setActiveEnvironments(this._activeEnvIds);
                    },
                    (error) => {
                        console.error('Failed to load environments from the environment switcher service.', error);
                        this.environmentsFailedToLoad = true;
                    },
                    () => {
                        this._initialized = true;
                    }
                )
        );
    }

    /** Open the app switcher menu. */
    public openMenu(): void {
        this._stagedActiveEnvIds = this.canSelectMultiple ? this._activeEnvIds.slice() : [];
        this.pop.open();
    }

    /** Convenience method for setting the current active environment(s). Invalid environment IDs will not be selected. */
    public setActiveEnvironments(envs: string[]): void {
        const envsToSet = envs.filter(givenEnvId => {
            const matchingEnv = this._environments.find(env => env.id === givenEnvId);
            if (matchingEnv) {
                return matchingEnv;
            } else {
                console.warn(`Attempted to set an environment as active that is not currently an option. ${givenEnvId}`)
            }
        });
        this._activeEnvIds.length = 0;
        this._activeEnvIds.push(...envsToSet);
        this._stagedActiveEnvIds = this.canSelectMultiple ? this._activeEnvIds.slice() : [];
        this._updateBadgeText();
        this._updateBadgeColor();
    }

    public _isEnvSelected(envId: string): boolean {
        if (this.canSelectMultiple) {
            return this._stagedActiveEnvIds.findIndex(e => e === envId) > -1;
        }
        return this._activeEnvIds.findIndex(e => e === envId) > -1;
    }

    public _onBadgeClick(): void {
        if (this._disabled) { return; }
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
        this.updateEnvironments.emit(this.activeEnvironments);
        this._updateBadgeText();
        this._updateBadgeColor();
        this.pop.close();
    }

    /** Update the text displayed on the environment switcher badge in the navbar */
    private _updateBadgeText() {
        if(this._activeEnvIds.length === 0) {
            this._badgeText = "No Env";
            this._badgeTooltip = "No environment selected";
        } else if (this._activeEnvIds.length === 1) {
            this._badgeText = this.activeEnvironments[0].environmentShortName.trim().slice(0, 6);
            this._badgeTooltip = `Active environment: ${this._buildActiveEnvList()}`;
        } else if (this._activeEnvIds.length === this.environments.length) {
            this._badgeText = "All";
            this._badgeTooltip= `${this._activeEnvIds.length} active environments: ${this._buildActiveEnvList()}`;
        } else if (this._activeEnvIds.length > 1) {
            this._badgeText = `${this._activeEnvIds.length} Envs`;
            this._badgeTooltip= `${this._activeEnvIds.length} active environments: ${this._buildActiveEnvList()}`;
        }
    }

    /** Returns a list of the active environments */
    private _buildActiveEnvList(): string {
        return this.activeEnvironments.map(e => e.environmentName).join(', ');
    }

    /** Set the appropriate color for environment switcher badge displayed in the navbar */
    private _updateBadgeColor(): void {
        if (this._activeEnvIds.length === 0 || this._activeEnvIds.length > 1) {
            this._badgeColor = "hc-badge-color-white";
        } else {
            this._badgeColor = this._getBadgeColorClass(this.activeEnvironments?.[0]);
        }
    }

    /** Translate an environment's color code into an appropriate css class */
    private _getBadgeColorClass(env?: IMetadataEnvironment): string {
        const color = env?.color?.toLowerCase().replace('#', '') || 'ffffff';
        return this._colorClassesMap[color];
    }
}
