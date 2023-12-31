import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent {
@Input() fullWidthMode = false;
@Input() product: Product | undefined;
@Output() addToCart = new EventEmitter();


onAddToCart(): void {
  this.addToCart.emit(this.product);
}
}
