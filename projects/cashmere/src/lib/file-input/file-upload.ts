export interface FileUpload {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    base64?: string;
}
