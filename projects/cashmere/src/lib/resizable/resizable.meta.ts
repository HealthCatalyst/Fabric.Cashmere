export class ResizableMetadata {
    static readonly classPrefix = 'resizable-handle-';
    static readonly classSelectorPrefix = 'resizable-handle-selector-';
    static readonly highlight = ' border-highlight';
    static readonly maxHeigthClass = 'resizable-max-height';
    static readonly maxWidthClass = 'resizable-max-width';
    static readonly regexMaxHeigth = new RegExp(ResizableMetadata.maxHeigthClass);
    static readonly regexMaxWidth = new RegExp(ResizableMetadata.maxWidthClass);
}
