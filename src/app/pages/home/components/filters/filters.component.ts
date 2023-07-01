import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: string [] = [];
  categoriesSubscription: Subscription |undefined;

  constructor(private storeService: StoreService){}

  ngOnInit(): void {
  this.categoriesSubscription =  this.storeService.getAllCategories().subscribe(categories =>
      this.categories = categories)
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
    console.log(category);
  }
  ngOnDestroy(): void {
    if(this.categoriesSubscription)
    this.categoriesSubscription.unsubscribe();
  }
}
