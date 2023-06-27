import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  c: string =''
  categories: string [] = ['Sports', 'Clothing', 'Furniture'];
  ngOnInit(): void {
    
  }
  onShowCategory(category: string): void {
    this.showCategory.emit(category);
    console.log(category);
  }
}
