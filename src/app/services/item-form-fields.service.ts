import { Injectable, inject, signal } from '@angular/core';
import { DataService } from './data.service';
import { IItem } from '../dataObjects/iitem';
import { BehaviorSubject, Observable } from 'rxjs';

const emptyItem: IItem = {
  itemId: 0,
  itemName: '',
  itemDescription: '',
  itemPrice: 0,
  itemCategory: '',
  itemStock: 0,
  itemModelYear: 0,
  itemStatusId: 0,
  itemCrUUID: '',
  itemCrTimestamp: new Date(), 
  itemClientUUID: '',
  isItemEnabled: false,
  categoryNames: []
};


@Injectable({
  providedIn: 'root'
})
export class ItemFormFieldsService {

  //constructor(private itemsDataServise: DataService) {{}
  constructor() {}

  private item$ = new BehaviorSubject<IItem>(emptyItem);
  private itemsDataServise = inject(DataService); 
  // private $item = signal<IItem | undefined>(undefined);

  public setItemId(itemId: number) {
    this.itemsDataServise.getItems().subscribe((items: IItem[]) => {
      const item = items.find((item: IItem) => item['itemId'] === itemId);
      this.item$.next(item!);
    });
  }

  public getItem(): Observable<IItem> {
    return this.item$.asObservable();
  }

}
