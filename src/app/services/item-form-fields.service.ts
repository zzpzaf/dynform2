import { Injectable, inject, signal } from '@angular/core';
import { DataService } from './data.service';
import { IItem } from '../dataObjects/iitem';
@Injectable({
  providedIn: 'root'
})
export class ItemFormFieldsService {

  constructor() {}

  private itemsDataServise = inject(DataService); 
  public $item = signal<IItem | undefined>(undefined);


  public setItemId(itemId: number) {
    this.itemsDataServise.getItems().subscribe((items: IItem[]) => {
      const item: IItem = items.find((item: IItem) => item['itemId'] === itemId)!;
      this.$item.update(()=>item);
    });
  }

}
