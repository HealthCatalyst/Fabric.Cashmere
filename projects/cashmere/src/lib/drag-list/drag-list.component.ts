import {Component, Input, SimpleChanges, ViewEncapsulation} from '@angular/core';

/** Interface for making/receiving assignments */
export interface DragDropAssignment {
    target: any;
    assignment: any | null;
    locked?: boolean;
}

/** A control for making assignments with drag-drop functionality */
@Component({
    selector: 'hc-drag-list',
    templateUrl: './drag-list.component.html',
    styleUrls: ['./drag-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DragListComponent {
    /** Current assignments, refer to the `DragDropAssignment` interface. Pass in your targets and their current assignments with this. */
    @Input() assignments: DragDropAssignment[] = [];

    /** The `id` or "key" property of your targets (`options` are assigned to `targets`). Defaults to `id`. */
    @Input() targetIdField: string = 'id';

    /** The display name property of your targets. Defaults to `name`. */
    @Input() targetDisplayNameField: string = 'name';

    /** The tooltip or title property of your targets. Defaults to `title`. */
    @Input() targetHoverTextField: string = 'title';

    /** The available options to assign to your targets. */
    @Input() options: any[] = [];

    /** The `id` or "key" property of your options (`options` are assigned to `targets`). Defaults to `id`. */
    @Input() optionIdField: string = 'id';

    /** The display name property of your options. Defaults to `name`. */
    @Input() optionDisplayNameField: string = 'name';

    /** The tooltip or title property of your options. Defaults to `title`. */
    @Input() optionHoverTextField: string = 'title';

    /** The placeholder text for unassigned targets. Empty by default. */
    @Input() targetPlaceholder: string = '';

    /** The target area label. Defaults to "Targets". */
    @Input() targetHelperText: string = 'Targets';

    /** The tooltip text for the target area label, if defined an info icon will be displayed to the right. Empty by default. */
    @Input() targetTooltip: string = '';

    /** The help text for unassigned options. Defaults to "Drag values to desired location in the left pane". */
    @Input() optionsHelperText: string = 'Drag values to desired location in the left pane';

    /** The help text for locked options. Defaults to "This assignment is locked and cannot be changed.". */
    @Input() optionLockedText: string = 'This assignment is locked and cannot be changed.';

    /** When set to `true`, all targets must have an assignment before the `submissionAllowed` property will return `true`. Defaults to `false`. */
    @Input() requireAllAssignments: boolean = false;

    modifiedAssignments: DragDropAssignment[] = [];
    targetsById: {[id: string]: any} = {};
    optionsById: {[id: string]: any} = {};
    optionIsAssigned: {[id: string]: boolean} = {};
    tooltipsByOptionId: {[id: string]: string} = {};

    get unassignedOptions() {
        return this.options.filter(o => !this.optionIsAssigned[o[this.optionIdField]]);
    }

    /** Returns `true` is selections are valid. */
    get submissionAllowed() {
        let hasChanges = false;

        for (let i = 0; i < this.modifiedAssignments.length; i++) {
            const ma = this.modifiedAssignments[i];
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
            return this.modifiedAssignments.every(a => !!a.assignment) || Object.values(this.optionIsAssigned).every(o => o === true);
        } else {
            return true;
        }
    }

    /** Returns assignments. */
    get selections() {
        return this.modifiedAssignments;
    }

    private dragData: {optionId: string | null; targetId: string | null} = {optionId: null, targetId: null};

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        this.modifiedAssignments = (changes.assignments.currentValue || []).map(a => ({...a}));
        this.tooltipsByOptionId = this.indexByExt(
            changes.options.currentValue || [],
            (o: any) => o[this.optionIdField],
            (o: any) => {
                if (!!o[this.optionHoverTextField]) {
                    return o[this.optionHoverTextField];
                }
                return o[this.optionDisplayNameField];
            }
        );
        this.optionsById = this.indexBy(changes.options.currentValue || [], o => o[this.optionIdField]);
        this.targetsById = this.indexBy(
            (this.modifiedAssignments || []).map(a => a.target),
            o => o[this.targetIdField]
        );

        this.setOptionIsAssigned(this.modifiedAssignments, changes.options.currentValue);
    }

    private indexBy<T>(arr: T[], propFn: (item: T) => string): {[id: string]: T} {
        return (arr || []).reduce((obj, item) => {
            obj[propFn(item)] = item;
            return obj;
        }, {});
    }

    private indexByExt<T, V = T>(
        arr: T[],
        propFn: (item: T) => string,
        valFn: (item: T) => V = it => (it as unknown) as V
    ): {[id: string]: V} {
        return (arr || []).reduce((obj, item) => {
            obj[propFn(item)] = valFn(item);
            return obj;
        }, {});
    }

    private setOptionIsAssigned(assignments: DragDropAssignment[], options: any[]): void {
        (options || []).forEach(o => {
            this.optionIsAssigned[o[this.optionIdField]] = false;
        });
        (assignments || [])
            .filter(a => !!a.assignment)
            .forEach(a => {
                this.optionIsAssigned[a.assignment[this.optionIdField]] = true;
            });
    }

    makeAssignment(ev: any): void {
        ev.preventDefault();

        if (!!ev && !!ev.target) {
            const optionId = this.dragData.optionId === null ? null : parseInt(this.dragData.optionId, 10);
            const target = this.findNearestWithClass(ev.target, 'assignment');

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

            this.modifiedAssignments.forEach(a => {
                // If this is the target drop zone
                if (a.target[this.targetIdField] === targetId) {
                    // Make assignment
                    a.assignment = this.optionsById[optionId!];
                } else if (!!a.assignment && a.assignment[this.optionIdField] === optionId) {
                    if (oldOptionId !== null) {
                        // Swap
                        a.assignment = this.optionsById[oldOptionId];
                    } else {
                        // Clear
                        a.assignment = null;
                    }
                }
            });

            this.setOptionIsAssigned(this.modifiedAssignments, this.options);
        }
    }

    returnToOptionsList(ev: any): void {
        ev.preventDefault();

        if (!!ev && !!ev.target) {
            const optionId = this.dragData.optionId === null ? null : parseInt(this.dragData.optionId, 10);
            const oldTargetId = this.dragData.targetId === null ? null : parseInt(this.dragData.targetId, 10);

            if (optionId !== null && oldTargetId !== null) {
                this.modifiedAssignments.forEach(a => {
                    if (a.target[this.targetIdField] === oldTargetId) {
                        // Clear assignment
                        a.assignment = null;
                    }
                });

                this.setOptionIsAssigned(this.modifiedAssignments, this.options);
            }
        }
    }

    unassign(assignment: DragDropAssignment): void {
        assignment.assignment = null;
        this.setOptionIsAssigned(this.modifiedAssignments, this.options);
    }

    findNearestWithClass(e: HTMLElement | null, className: string): HTMLElement | null {
        if (e === null) {
            return e;
        }

        return e.classList.contains(className) ? e : e.parentElement === null ? e : this.findNearestWithClass(e.parentElement, className);
    }

    dragover(ev: any): void {
        ev.preventDefault();
    }

    dragstart(ev: any): void {
        if (!!ev && !!ev.target && !!ev.target.dataset) {
            this.dragData.optionId = ev.target.dataset.optionId;
            this.dragData.targetId = ev.target.dataset.targetId;
        }
    }

    dragenter(ev: any): void {
        ev.target.classList.add('target-hover');
    }

    dragleave(ev: any): void {
        ev.target.classList.remove('target-hover');
    }

    /** Marks control as pristine. Typically called after saving modifications. */
    setPristine(): void {
        this.assignments = (this.modifiedAssignments || []).map(a => ({...a}));
    }

    /** Resets assigments to original values. */
    resetChanges(): void {
        this.modifiedAssignments = (this.assignments || []).map(a => ({...a}));
        this.setOptionIsAssigned(this.modifiedAssignments, this.options);
    }
}
