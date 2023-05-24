export class ResizableMetadata {
    static readonly classPrefix = 'hc-resizable-handle-';
    static readonly classSelectorPrefix = 'hc-resizable-handle-selector-';
    static readonly baseClass = 'hc-resizable-handle';
    static readonly highlight = 'hc-resizable-border-highlight';
    static readonly maxHeightClass = 'hc-resizable-max-height';
    static readonly maxWidthClass = 'hc-resizable-max-width';
    static readonly regexMaxHeight = new RegExp(ResizableMetadata.maxHeightClass);
    static readonly regexMaxWidth = new RegExp(ResizableMetadata.maxWidthClass);
}
