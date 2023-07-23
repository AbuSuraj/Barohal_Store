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
  this.categoriesSubscription =  this.storeService.getAllCategories().subscribe(categories =>{

    this.categories = categories;
    this.categories = [...this.categories, 'All']
    console.log(this.categories)
  })
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
    
  }
  
  ngOnDestroy(): void {
    if(this.categoriesSubscription)
    this.categoriesSubscription.unsubscribe();
  }
}


// Angular Development: Designing and implementing features for web applications using Angular, ensuring seamless user experiences.
// Feature Creation: Leading the conceptualization and development of new features for applications.
// CRUD Operations: Proficiently performing Create, Read, Update, and Delete operations for data management.
// Bug Fixing and Quality Assurance: Identifying and resolving software defects to ensure a smooth user experience.
// Agile Development: Embracing agile methodologies for adaptive project delivery.
// Collaboration and Communication: Working closely with cross-functional teams to foster a collaborative environment.
// Continuous Learning: Keeping up-to-date with the latest advancements in Angular and web development.
