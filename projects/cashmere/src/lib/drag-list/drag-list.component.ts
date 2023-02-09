import {Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';

/** Interface for making/receiving assignments */
export interface DragDropAssignment {
    /** The target awaiting an option assignment. */
    target: any;

    /** The assigned option. */
    assignment: any | null;

    /** When `true` prevents modification. Use this if you have an assignment you want to lock. */
    locked?: boolean;
}

/** A control for making assignments with drag-drop functionality */
@Component({
    selector: 'hc-drag-list',
    templateUrl: './drag-list.component.html',
    styleUrls: ['./drag-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DragListComponent implements OnChanges {
    /** Current assignments, refer to the `DragDropAssignment` interface. Pass in your targets and their current assignments with this. */
    @Input() assignments: DragDropAssignment[] = [];

    /** The `id` or "key" property of your targets (`options` are assigned to `targets`). Defaults to `id`. */
    @Input() targetIdField = 'id';

    /** The display name property of your targets. Defaults to `name`. */
    @Input() targetDisplayNameField = 'name';

    /** The tooltip or title property of your targets. Defaults to `title`. */
    @Input() targetHoverTextField = 'title';

    /** The available options to assign to your targets. */
    @Input() options: any[] = [];

    /** The `id` or "key" property of your options (`options` are assigned to `targets`). Defaults to `id`. */
    @Input() optionIdField = 'id';

    /** The display name property of your options. Defaults to `name`. */
    @Input() optionDisplayNameField = 'name';

    /** The tooltip or title property of your options. Defaults to `title`. */
    @Input() optionHoverTextField = 'title';

    /** The placeholder text for unassigned targets. Empty by default. */
    @Input() targetPlaceholder = '';

    /** The target area label. Defaults to "Targets". */
    @Input() targetHelperText = 'Targets';

    /** The tooltip text for the target area label, if defined an info icon will be displayed to the right. Empty by default. */
    @Input() targetTooltip = '';

    /** The help text for unassigned options. Defaults to "Drag values to desired location in the left pane". */
    @Input() optionsHelperText = 'Drag values to desired location in the left pane';

    /** The help text for locked options. Defaults to "This assignment is locked and cannot be changed.". */
    @Input() optionLockedText = 'This assignment is locked and cannot be changed.';

    /** When set to `true`, all targets must have an assignment before the `submissionAllowed` property will return `true`. Defaults to `false`. */
    @Input() requireAllAssignments = false;

    _modifiedAssignments: DragDropAssignment[] = [];
    _targetsById: {[id: string]: any} = {};
    _optionsById: {[id: string]: any} = {};
    _optionIsAssigned: {[id: string]: boolean} = {};
    _tooltipsByOptionId: {[id: string]: string} = {};

    get _unassignedOptions(): any {
        return this.options.filter(o => !this._optionIsAssigned[o[this.optionIdField]]);
    }

    /** Returns `true` is selections are valid. */
    get submissionAllowed(): boolean {
        let hasChanges = false;

        for (let i = 0; i < this._modifiedAssignments.length; i++) {
            const ma = this._modifiedAssignments[i];
            const oa = this.assignments[i];

            if (((ma || {}).assignment || {})[this.optionIdField] !== ((oa || {}).assignment || {})[this.optionIdField]) {
                hasChanges = true;
                break;
            }
        }

        if (!hasChanges) {
            return false;
        }

        if (this.requireAllAssignments) {
            return this._modifiedAssignments.every(a => !!a.assignment) || Object.values(this._optionIsAssigned).every(o => o === true);
        } else {
            return true;
        }
    }

    /** Returns assignments. */
    get selections(): DragDropAssignment[] {
        return this._modifiedAssignments;
    }

    private _dragData: {optionId: string | null; targetId: string | null} = {optionId: null, targetId: null};

    ngOnChanges(changes: SimpleChanges): void {
        this._modifiedAssignments = (changes.assignments.currentValue || []).map(a => ({...a}));
        this._tooltipsByOptionId = this._indexByExt(
            changes.options.currentValue || [],
            (o: any) => o[this.optionIdField],
            (o: any) => {
                if (o[this.optionHoverTextField]) {
                    return o[this.optionHoverTextField];
                }
                return o[this.optionDisplayNameField];
            }
        );
        this._optionsById = this._indexBy(changes.options.currentValue || [], o => o[this.optionIdField]);
        this._targetsById = this._indexBy(
            (this._modifiedAssignments || []).map(a => a.target),
            o => o[this.targetIdField]
        );

        this._setOptionIsAssigned(this._modifiedAssignments, changes.options.currentValue);
    }

    private _indexBy<T>(arr: T[], propFn: (item: T) => string): {[id: string]: T} {
        return (arr || []).reduce((obj, item) => {
            obj[propFn(item)] = item;
            return obj;
        }, {});
    }

    private _indexByExt<T, V = T>(
        arr: T[],
        propFn: (item: T) => string,
        valFn: (item: T) => V = it => (it as unknown) as V
    ): {[id: string]: V} {
        return (arr || []).reduce((obj, item) => {
            obj[propFn(item)] = valFn(item);
            return obj;
        }, {});
    }

    private _setOptionIsAssigned(assignments: DragDropAssignment[], options: any[]): void {
        (options || []).forEach(o => {
            this._optionIsAssigned[o[this.optionIdField]] = false;
        });
        (assignments || [])
            .filter(a => !!a.assignment)
            .forEach(a => {
                this._optionIsAssigned[a.assignment[this.optionIdField]] = true;
            });
    }

    _makeAssignment(ev: any): void {
        ev.preventDefault();

        if (!!ev && !!ev.target) {
            const optionId = this._dragData.optionId === null ? null : parseInt(this._dragData.optionId, 10);
            const target = this._findNearestWithClass(ev.target, 'hc-drag-list-assignment');

            if (!target || !target.dataset) {
                return;
            }

            const targetId =
                target.dataset.targetId === undefined || target.dataset.targetId === null ? null : parseInt(target.dataset.targetId, 10);
            const oldOptionId =
                target.dataset.optionId === undefined || target.dataset.optionId === null ? null : parseInt(target.dataset.optionId, 10);

            if (optionId === null || targetId === null) {
                return;
            }

            this._modifiedAssignments.forEach(a => {
                // If this is the target drop zone
                if (a.target[this.targetIdField] === targetId) {
                    // Make assignment
                    a.assignment = this._optionsById[optionId!];
                } else if (!!a.assignment && a.assignment[this.optionIdField] === optionId) {
                    if (oldOptionId !== null) {
                        // Swap
                        a.assignment = this._optionsById[oldOptionId];
                    } else {
                        // Clear
                        a.assignment = null;
                    }
                }
            });

            this._setOptionIsAssigned(this._modifiedAssignments, this.options);
        }
    }

    _returnToOptionsList(ev: any): void {
        ev.preventDefault();

        if (!!ev && !!ev.target) {
            const optionId = this._dragData.optionId === null ? null : parseInt(this._dragData.optionId, 10);
            const oldTargetId = this._dragData.targetId === null ? null : parseInt(this._dragData.targetId, 10);

            if (optionId !== null && oldTargetId !== null) {
                this._modifiedAssignments.forEach(a => {
                    if (a.target[this.targetIdField] === oldTargetId) {
                        // Clear assignment
                        a.assignment = null;
                    }
                });

                this._setOptionIsAssigned(this._modifiedAssignments, this.options);
            }
        }
    }

    _unassign(assignment: DragDropAssignment): void {
        assignment.assignment = null;
        this._setOptionIsAssigned(this._modifiedAssignments, this.options);
    }

    _findNearestWithClass(e: HTMLElement | null, className: string): HTMLElement | null {
        if (e === null) {
            return e;
        }

        return e.classList.contains(className) ? e : e.parentElement === null ? e : this._findNearestWithClass(e.parentElement, className);
    }

    _dragover(ev: any): void {
        ev.preventDefault();
    }

    _dragstart(ev: any): void {
        if (!!ev && !!ev.target && !!ev.target.dataset) {
            this._dragData.optionId = ev.target.dataset.optionId;
            this._dragData.targetId = ev.target.dataset.targetId;
        }
    }

    _dragenter(ev: any): void {
        ev.target.classList.add('hc-drag-list-target-hover');
    }

    _dragleave(ev: any): void {
        ev.target.classList.remove('hc-drag-list-target-hover');
    }

    /** Marks control as pristine. Typically called after saving modifications. */
    setPristine(): void {
        this.assignments = (this._modifiedAssignments || []).map(a => ({...a}));
    }

    /** Resets assigments to original values. */
    resetChanges(): void {
        this._modifiedAssignments = (this.assignments || []).map(a => ({...a}));
        this._setOptionIsAssigned(this._modifiedAssignments, this.options);
    }
}
