import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent {
 sort = 'Desc';
 itemShowCount = 12;
 @Output() columnsCountChange = new EventEmitter<number>();

 onSortUpdated(sortBy:string):void {
  this.sort = sortBy;
 }

 onUpdateShowItemCount(itemCount:number):void {
  this.itemShowCount = itemCount;
 }

 onColumnsUpdate(columnsCount:number):void {
  this.columnsCountChange.emit(columnsCount);
 }
}
