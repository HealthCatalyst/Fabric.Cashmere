import {VALID_HORIZ_ALIGN, VALID_VERT_ALIGN, VALID_SCROLL, VALID_TRIGGER} from './types';

export function getInvalidPopoverError(): Error {
    return Error('HcPopoverAnchorDirective must be provided an HcPopover component instance.');
}

export function getUnanchoredPopoverError(): Error {
    return Error('HcPopover is not anchored to any HcPopoverAnchorDirective.');
}

export function getInvalidHorizontalAlignError(alignment): Error {
    return Error(generateGenericError('horizontalAlign/xAlign', alignment, VALID_HORIZ_ALIGN));
}

export function getInvalidVerticalAlignError(alignment): Error {
    return Error(generateGenericError('verticalAlign/yAlign', alignment, VALID_VERT_ALIGN));
}

export function getInvalidTriggerError(trigger): Error {
    return Error(generateGenericError('trigger', trigger, VALID_TRIGGER));
}

export function getInvalidScrollStrategyError(strategy): Error {
    return Error(generateGenericError('scrollStrategy', strategy, VALID_SCROLL));
}

function generateGenericError(apiName: string, invalid: any, valid: string[]): string {
    return `Invalid ${apiName}: '${invalid}'. Valid options are ` + `${valid.map(v => `'${v}'`).join(', ')}.`;
}
