import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent {
@Input() fullWidthMode = false;
@Output() addToCart = new EventEmitter();

product: Product | undefined ={
  id: 0,
  title: 'Snickers',
  price: 212,
  description: 'lorem10 dolor sit amet, consectetur adipiscing elit',
  category: 'Shoes',
  image: 'https://via.placeholder.com/150'
};

onAddToCart(): void {
  this.addToCart.emit(this.product);
}
}
