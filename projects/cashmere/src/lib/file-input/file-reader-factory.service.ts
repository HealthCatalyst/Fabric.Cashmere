import {Injectable} from '@angular/core';

export abstract class FileReaderFactory {
    abstract create(): FileReader;
}

@Injectable()
export class BrowserFileReaderFactory extends FileReaderFactory {
    create() {
        return new FileReader();
    }
}
