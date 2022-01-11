import { string } from "yargs";

export interface IUsage {
    TermID: string;
    TermName: string;
    TermUsage: string;
    TermTypes: string;
    TermCategories: string;
    TermExample: string;
    TermDateAdded: string;
}

export const usageAttributesMapping = {
    TermID: 'TermID',
    TermName: 'TermName',
    TermUsage: 'TermUsage',
    TermTypes: 'TermTypes',
    TermCategories: 'TermCategories',
    TermExample: 'TermExample',
    TermDateAdded: 'TermDateAdded'
};
