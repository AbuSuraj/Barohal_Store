import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/Models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  cart: Cart ={items:[{
    id: 1,
    name: 'Item 1',
    price: 100,
    quantity: 1,
    product:'https://via.placehold.com/150'
  }]};

  dataSource: CartItem [] = [];
  displayedColumns: string[] = ['product','name', 'price', 'quantity', 'total', 'action'];
  
  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }
   
}
