export interface IUsage {
    TermID: string;
    TermName: string;
    TermUsage: string;
    TermType: string;
    TermCategories: string;
    TermDateAdded: string;
}

export const usageAttributesMapping = {
    TermID: 'TermID',
    TermName: 'TermName',
    TermUsage: 'TermUsage',
    TermType: 'TermType',
    TermCategories: 'TermCategories',
    TermDateAdded: 'TermDateAdded'

}