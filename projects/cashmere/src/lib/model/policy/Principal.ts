import {SimpleObject} from "../common/SimpleObject";
import {ClassCode} from "./ClassCode";

export class Principal {
  id: number;
  principalCoverage: string;
  coverageType: SimpleObject;
  classCode: ClassCode;
  namedInsuredId: number;
  owner: boolean;
  principal: boolean;
  ownershipPercentage: number;
  businessName: string;
  taxId: string;

  // Person Info
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  title: SimpleObject;
  dateOfBirth: Date;
  duties: string;
  userId: string;
  status: string;

  deleted: boolean = false;

  constructor(id: number, principalCoverage: string, coverageType: SimpleObject, classCode: ClassCode,
              namedInsuredId: number, owner: boolean, principal: boolean, ownershipPercentage: number,
              businessName: string, taxId: string, firstName: string, middleName: string,
              lastName: string, suffix: string, title: SimpleObject, dateOfBirth: Date, duties: string,
              userId: string, status: string, deleted: boolean) {
    this.id = id;
    this.principalCoverage = principalCoverage;
    this.coverageType = coverageType;
    this.classCode = classCode;
    this.namedInsuredId = namedInsuredId;
    this.owner = owner;
    this.principal = principal;
    this.ownershipPercentage = ownershipPercentage;
    this.businessName = businessName;
    this.taxId = taxId;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.suffix = suffix;
    this.title = title;
    this.dateOfBirth = dateOfBirth;
    this.duties = duties;
    this.userId = userId;
    this.status = status;
    this.deleted = deleted;
  }

  static createTestPrincipal(): Principal {
    let coverageType: SimpleObject = SimpleObject.createTestSimpleObject();
    let classCode: ClassCode = ClassCode.createTestClassCode();
    return new Principal(2343, "TestPCoverage", coverageType, classCode, 34545, false, true, 50,
      "TEstBizname", "34545454", "John", "Awesome", "Doe", "Mr.", coverageType, new Date(), "TestDuties",
      "JDoe", "TestStatus", false);
  }

}
