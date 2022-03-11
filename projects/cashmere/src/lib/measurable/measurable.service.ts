import { Injectable } from "@angular/core";
import { MeasurableComponent } from ".";

/**
 * This service provides the logic to fill up a container
 * with components contained inside Measurable Components.
 */
@Injectable()
export class MeasurableService {

    /**
     * Fills a container with as many components as will fit. See usage for more details.
     *
     * @param components The array of components to try and fill the container.
     * @param availableSize The available width or height in the container to fill with the given components.
     * @param moreSize The width or height of a more control.
     * @param direction Which way to fill the container, either horizontally or vertically.
     * @param showFunc Additional actions to take on a component that is shown. *Defaults to a function that does nothing.*
     * @param hideFunc Additional actions to take on a component that is hidden. *Defaults to a function that does nothing.*
     * @returns A set containing all of the keys of components that were hidden.
     */
    fillContainer(
        components: MeasurableComponent[],
        availableSize: number,
        moreSize: number,
        direction: 'horizontal' | 'vertical' = 'horizontal',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        showFunc: (component: MeasurableComponent) => void = (_component) => void(0),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        hideFunc: (component: MeasurableComponent) => void = (_component) => void(0)
    ): Set<string> {
        const moreKeys = new Set<string>();
        let currentSize = 0;

        const getDirection = direction == 'horizontal'
            ? (c: MeasurableComponent) => c.width
            : (c: MeasurableComponent) => c.height;

        const totalComponentSize = components.reduce((prev, curr) => prev + getDirection(curr), 0);
        const currentMoreSize = totalComponentSize > availableSize ? moreSize : 0;

        components.forEach(component => {
            currentSize += getDirection(component);

            if (currentSize + currentMoreSize < availableSize) {
                component.show();
                showFunc(component);
            } else {
                component.hide();
                moreKeys.add(component.itemKey);
                hideFunc(component);
            }
        })

        return moreKeys;
    }
}


