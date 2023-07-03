import { StoreService } from './../../Services/store.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Models/product.model';
import { CartService } from 'src/app/Services/cart.service';

const ROWS_HEIGHT:{[id:number]:number} = {1:400, 3:335, 4: 350};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products:  Product[] | undefined;
  sort: string = 'desc';
  count: string = '12';
  productSubcription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) { 
  }
  
  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts(): void {
    this.productSubcription =  this.storeService.getAllProducts(this.count, this.sort, this.category)
    .subscribe((_products)=>{
      this.products = _products; 
    })
  }
  
  onSortChange(sort:string): void{
    this.sort = sort;
    this.getProducts();
  }

  onLimitChange(limit:number): void{
    this.count = limit.toString();
    this.getProducts();
  }

  onColumnsCountChange(cols:number): void{
    this.cols = cols;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  
  
  onShowCategory(newCategory: string): void {
    newCategory === 'All' ? this.category = undefined :  this.category = newCategory; 
    
    this.getProducts();
  }
  
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    })
  }
  
  ngOnDestroy(): void {
  if(this.productSubcription){
    this.productSubcription.unsubscribe();
  }
  }
}
