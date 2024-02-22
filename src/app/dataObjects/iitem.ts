
export interface IItem {
    [key: string]: any;
    itemId: number;
    itemName: string;
    itemDescription: string;
    itemModelYear: number;
    itemStatusId: number;
    itemCrUUID: string;
    itemCrTimestamp: Date;
    itemClientUUID: string;
    isItemEnabled: boolean;
    categoryNames: string[];
}