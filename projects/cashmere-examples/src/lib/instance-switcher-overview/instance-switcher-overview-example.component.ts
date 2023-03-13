import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IInstance, IInstanceSwitcherTooltipText } from '@healthcatalyst/cashmere';

/**
 * @title Instance Switcher Overview
 */
@Component({
    selector: 'hc-instance-switcher-overview-example',
    templateUrl: 'instance-switcher-overview-example.component.html',
    styleUrls: ['instance-switcher-overview-example.component.scss']
})
export class InstanceSwitcherOverviewExampleComponent {
    readonly maxChipWidthControl = new FormControl('none');
    instances: IInstance[] = [
        {
            instanceKey: 'instance1',
            displayText: 'Instance 1',
            tooltipText: 'Instance 1'
        },
        {
            instanceKey: 'instance2',
            displayText: 'Instance 2',
            tooltipText: 'This is a separate tooltip text'
        }
    ];

    tooltipText: IInstanceSwitcherTooltipText = {
        addText: 'Add an instance',
        closeText: 'Close the Instance Switcher'
    };

    private _currentNumber = 3;

    selectedKey: string | null = 'instance1';

    closable = true;
    isOpen = true;
    editable = true;

    toggleClosable(): void {
        this.closable = !this.closable;
    }

    getClosableDescrition(): string {
        return this.closable ? "Closable: On" : "Closable: Off";
    }

    toggleEditable(): void {
        this.editable = !this.editable;
    }

    getEditableDescription(): string {
        return this.editable ? "Editable: On" : "Editable: Off";
    }

    toggleOpen(): void {
        this.isOpen = !this.isOpen;
    }

    getOpenDescription(): string {
        return this.isOpen ? "Close Instance Bar" : "Open Instance Bar";
    }

    toggleTooltips(): void {
        if (this.tooltipText.addText) {
            this.tooltipText = {};
        } else {
            this.tooltipText = {
                addText: 'Add an instance',
                closeText: 'Close the Instance Switcher'
            };
        }
    }

    getTooltipDescription(): string {
        return this.tooltipText.addText ? "Tooltips: On" : "Tooltips: Off";
    }

    onAdded(): void {
        const nextNumber = this._currentNumber++;
        this.instances = [
            ...this.instances,
            {
                instanceKey: `instance${nextNumber}`,
                displayText: `Instance ${nextNumber}`,
                tooltipText: `Instance Tooltip ${nextNumber}`
            }
        ];
    }

    onEdited(edited: IInstance): void {
        this.instances = this.instances.map(instance => {
            if (instance.instanceKey === edited.instanceKey) {
                return edited
            }

            return instance;
        })
    }

    onClosed(key: string): void {
        this.instances = this.instances.filter(instance => instance.instanceKey !== key);
    }
}
