export interface ICategory {
    [key: string]: any;
    categoryId: number;
    categoryInternalCode: number;
    categoryIsDefaultUndefined: boolean;
    categoryName: string;
    categoryDescription: string;
    categoryIsDisabled: boolean;
    categoryStatusId: number;
    categoryCrUUID: string;
    categoryCrTimestamp: string;
    categoryClientUUID: string;
    categoryItems: string[];
    offeringVendors: string[];
}