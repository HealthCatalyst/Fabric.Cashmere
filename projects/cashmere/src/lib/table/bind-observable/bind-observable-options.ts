export interface BindObservableOpts {
    /**
     * optional custom key of the companion property.
     * If not provided, the decorator will take the name of the original property key with a '$' suffix.
     */
    key?: string;
    /**
     * If true, the observable will emit the raw setter value if the decorated property is an accessor.
     * Otherwise the observable will call the getter once and emit the returned value.
     * This option will be ignored if the decorated property has no get accessor.
     */
    emitRawSetterValue?: boolean;
}

export function isBindObservableOpts(pet: any): pet is BindObservableOpts {
    return pet && typeof pet === 'object';
}
