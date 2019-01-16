import {Address} from './Address';
import {CodeDescription} from './CodeDescription';

export class Contact {
    private id: number;
    private contactType: CodeDescription;
    private description: string;
    private phoneNumber: string;
    private faxNumber: string;
    private emailAddress: string;
    private mailingAddress: Address;

    constructor(
        id: number,
        contactType: CodeDescription,
        description: string,
        phoneNumber: string,
        faxNumber: string,
        emailAddress: string,
        mailingAddress: Address
    ) {
        this.id = id;
        this.contactType = contactType;
        this.description = description;
        this.phoneNumber = phoneNumber;
        this.faxNumber = faxNumber;
        this.emailAddress = emailAddress;
        this.mailingAddress = mailingAddress;
    }

    static createTestContact(): Contact {
        let address: Address = Address.createTestAddress();
        let codeDescription = CodeDescription.createTestCodeDescription();
        return new Contact(324, codeDescription, 'testDescription', '8019165433', '8019165433', 'jdoe@wcf.com', address);
    }
}
