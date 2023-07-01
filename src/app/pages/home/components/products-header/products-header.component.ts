import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent {
@Output() sortChange = new EventEmitter<string>();
 @Output() itemCountChange = new EventEmitter<number>();
 @Output() columnsCountChange = new EventEmitter<number>();
 
 sort = 'desc';
 itemCount = 12;

 onSortUpdated(sortBy:string):void {
  this.sort = sortBy;
  this.sortChange.emit(sortBy);
 }

 onUpdateShowItemCount(count:number):void {
  this.itemCount = count;
  this.itemCountChange.emit(this.itemCount);
 }

 onColumnsUpdate(columnsCount:number):void {
  this.columnsCountChange.emit(columnsCount);
 }
}
