export class SimpleObject {
    value: string;
    label: string;

    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }

    static createTestSimpleObject(): SimpleObject {
        return new SimpleObject('testValue', 'testLabel');
    }
}
