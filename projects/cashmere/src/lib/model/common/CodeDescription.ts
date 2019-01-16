export class CodeDescription {
    private code: string;
    private description: string;

    constructor(code: string, description: string) {
        this.code = code;
        this.description = description;
    }

    static createTestCodeDescription(): CodeDescription {
        return new CodeDescription('testCode', 'testDescription');
    }
}
