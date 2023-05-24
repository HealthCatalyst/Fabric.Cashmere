export enum ResizablePositionOption {
    bottom = 'bottom',
    left = 'left',
    right = 'right',
    top = 'top'
}

export type ResizablePosition = keyof typeof ResizablePositionOption;
