/* tslint:disable:component-selector no-host-metadata-property no-input-rename component-class-suffix */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {CdkColumnDef} from '@angular/cdk/table';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    ViewEncapsulation,
    HostBinding
} from '@angular/core';
import {merge, Subscription} from 'rxjs';
import {HcSort, HcSortable} from './sort';
import {hcSortAnimations} from './sort-animations';
import {SortDirection} from './sort-direction';
import {getSortHeaderNotContainedWithinSortError} from './sort-errors';
import {HcSortHeaderIntl} from './sort-header-intl';

/**
 * Valid positions for the arrow to be in for its opacity and translation. If the state is a
 * sort direction, the position of the arrow will be above/below and opacity 0. If the state is
 * hint, the arrow will be in the center with a slight opacity. Active state means the arrow will
 * be fully opaque in the center.
 *
 * @docs-private
 */
export type ArrowViewState = SortDirection | 'hint' | 'active';

/**
 * States describing the arrow's animated position (animating fromState to toState).
 * If the fromState is not defined, there will be no animated transition to the toState.
 * @docs-private
 */
export interface ArrowViewStateTransition {
    fromState?: ArrowViewState;
    toState: ArrowViewState;
}

/**
 * Applies sorting behavior (click to change sort) and styles to an element, including an
 * arrow to display the current sort direction.
 *
 * Must be provided with an id and contained within a parent HcSort directive.
 *
 * If used on header cells in a CdkTable, it will automatically default its id from its containing
 * column definition.
 */
@Component({
    selector: '[hc-sort-header]',
    exportAs: 'hcSortHeader',
    templateUrl: 'sort-header.html',
    styleUrls: ['sort-header.scss'],
    host: {
        '(click)': '_handleClick()',
        '[attr.aria-sort]': '_getAriaSortAttribute()',
        '[class.hc-sort-header-disabled]': '_isDisabled()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        hcSortAnimations.indicator,
        hcSortAnimations.leftPointer,
        hcSortAnimations.rightPointer,
        hcSortAnimations.arrowOpacity,
        hcSortAnimations.arrowPosition,
        hcSortAnimations.allowChildren
    ]
})
export class HcSortHeader implements HcSortable, OnDestroy, OnInit {
    private _rerenderSubscription: Subscription;

    /**
     * Flag set to true when the indicator should be displayed while the sort is not active. Used to
     * provide an affordance that the header is sortable by showing on focus and hover.
     */
    _showIndicatorHint: boolean = false;

    /**
     * The view transition state of the arrow (translation/ opacity) - indicates its `from` and `to`
     * position through the animation. If animations are currently disabled, the fromState is removed
     * so that there is no animation displayed.
     */
    _viewState: ArrowViewStateTransition;

    /** The direction the arrow should be facing according to the current state. */
    _arrowDirection: SortDirection = '';

    /**
     * Whether the view state animation should show the transition between the `from` and `to` states.
     */
    _disableViewStateAnimation = false;

    /**
     * ID of this sort header. If used within the context of a CdkColumnDef, this will default to
     * the column's name.
     */
    @Input('hc-sort-header')
    id: string;

    /** Sets the position of the arrow that displays when sorted. */
    @Input()
    arrowPosition: 'before' | 'after' = 'after';

    /** Overrides the sort start value of the containing HcSort for this HcSortable. */
    @Input()
    start: 'asc' | 'desc';

    /** Overrides the disable clear value of the containing HcSort for this HcSortable. */
    @Input()
    get disableClear(): boolean {
        return this._disableClear;
    }

    set disableClear(v) {
        this._disableClear = coerceBooleanProperty(v);
    }

    private _disableClear: boolean;

    @Input()
    get disabled() {
        return this._disabled;
    }

    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }

    @HostBinding('class.hc-sort-header')
    _hostClass = true;

    private _disabled: boolean = false;

    constructor(
        public _intl: HcSortHeaderIntl,
        changeDetectorRef: ChangeDetectorRef,
        @Optional() public _sort: HcSort,
        @Optional() public _cdkColumnDef: CdkColumnDef
    ) {
        if (!_sort) {
            throw getSortHeaderNotContainedWithinSortError();
        }

        this._rerenderSubscription = merge(_sort.sortChange, _sort._stateChanges, _intl.changes).subscribe(() => {
            if (this._isSorted()) {
                this._updateArrowDirection();
            }

            // If this header was recently active and now no longer sorted, animate away the arrow.
            if (!this._isSorted() && this._viewState && this._viewState.toState === 'active') {
                this._disableViewStateAnimation = false;
                this._setAnimationTransitionState({fromState: 'active', toState: this._arrowDirection});
            }

            changeDetectorRef.markForCheck();
        });
    }

    ngOnInit() {
        if (!this.id && this._cdkColumnDef) {
            this.id = this._cdkColumnDef.name;
        }

        // Initialize the direction of the arrow and set the view state to be immediately that state.
        this._updateArrowDirection();
        this._setAnimationTransitionState({toState: this._isSorted() ? 'active' : this._arrowDirection});

        this._sort.register(this);
    }

    ngOnDestroy() {
        this._sort.deregister(this);
        this._rerenderSubscription.unsubscribe();
    }

    /**
     * Sets the "hint" state such that the arrow will be semi-transparently displayed as a hint to the
     * user showing what the active sort will become. If set to false, the arrow will fade away.
     */
    _setIndicatorHintVisible(visible: boolean) {
        // No-op if the sort header is disabled - should not make the hint visible.
        if (this._isDisabled() && visible) {
            return;
        }

        this._showIndicatorHint = visible;

        if (!this._isSorted()) {
            this._updateArrowDirection();
            if (this._showIndicatorHint) {
                this._setAnimationTransitionState({fromState: this._arrowDirection, toState: 'hint'});
            } else {
                this._setAnimationTransitionState({fromState: 'hint', toState: this._arrowDirection});
            }
        }
    }

    /**
     * Sets the animation transition view state for the arrow's position and opacity. If the
     * `disableViewStateAnimation` flag is set to true, the `fromState` will be ignored so that
     * no animation appears.
     */
    _setAnimationTransitionState(viewState: ArrowViewStateTransition) {
        this._viewState = viewState;

        // If the animation for arrow position state (opacity/translation) should be disabled,
        // remove the fromState so that it jumps right to the toState.
        if (this._disableViewStateAnimation) {
            this._viewState = {toState: viewState.toState};
        }
    }

    /** Triggers the sort on this sort header and removes the indicator hint. */
    _handleClick() {
        if (this._isDisabled()) {
            return;
        }

        this._sort.sort(this);

        // Do not show the animation if the header was already shown in the right position.
        if (this._viewState.toState === 'hint' || this._viewState.toState === 'active') {
            this._disableViewStateAnimation = true;
        }

        // If the arrow is now sorted, animate the arrow into place. Otherwise, animate it away into
        // the direction it is facing.
        const viewState: ArrowViewStateTransition = this._isSorted()
            ? {fromState: this._arrowDirection, toState: 'active'}
            : {fromState: 'active', toState: this._arrowDirection};
        this._setAnimationTransitionState(viewState);

        this._showIndicatorHint = false;
    }

    /** Whether this HcSortHeader is currently sorted in either ascending or descending order. */
    _isSorted() {
        return this._sort.active === this.id && (this._sort.direction === 'asc' || this._sort.direction === 'desc');
    }

    /** Returns the animation state for the arrow direction (indicator and pointers). */
    _getArrowDirectionState() {
        return `${this._isSorted() ? 'active-' : ''}${this._arrowDirection}`;
    }

    /** Returns the arrow position state (opacity, translation). */
    _getArrowViewState() {
        const fromState = this._viewState.fromState;
        return (fromState ? `${fromState}-to-` : '') + this._viewState.toState;
    }

    /**
     * Updates the direction the arrow should be pointing. If it is not sorted, the arrow should be
     * facing the start direction. Otherwise if it is sorted, the arrow should point in the currently
     * active sorted direction. The reason this is updated through a function is because the direction
     * should only be changed at specific times - when deactivated but the hint is displayed and when
     * the sort is active and the direction changes. Otherwise the arrow's direction should linger
     * in cases such as the sort becoming deactivated but we want to animate the arrow away while
     * preserving its direction, even though the next sort direction is actually different and should
     * only be changed once the arrow displays again (hint or activation).
     */
    _updateArrowDirection() {
        this._arrowDirection = this._isSorted() ? this._sort.direction : this.start || this._sort.start;
    }

    _isDisabled() {
        return this._sort.disabled || this.disabled;
    }

    /**
     * Gets the aria-sort attribute that should be applied to this sort header. If this header
     * is not sorted, returns null so that the attribute is removed from the host element. Aria spec
     * says that the aria-sort property should only be present on one header at a time, so removing
     * ensures this is true.
     */
    _getAriaSortAttribute() {
        if (!this._isSorted()) {
            return null;
        }

        return this._sort.direction === 'asc' ? 'ascending' : 'descending';
    }
}
