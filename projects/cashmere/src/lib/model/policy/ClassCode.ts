export class ClassCode {
    classCode: number;
    stateCode: string;
    description: string;

    constructor(classCode: number, stateCode: string, description: string) {
        this.classCode = classCode;
        this.stateCode = stateCode;
        this.description = description;
    }

    static createTestClassCode(): ClassCode {
        return new ClassCode(3456, 'UT', 'Hurt while typing');
    }
}
