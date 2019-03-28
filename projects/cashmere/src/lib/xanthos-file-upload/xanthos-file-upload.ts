import {FileUpload} from '../file-input/index';
import {CodeDescription} from "../model";

export interface XanthosFileUpload {
    file: FileUpload;
    type: CodeDescription;
}
