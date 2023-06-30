import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/Models/cart.model';
import { CartService } from 'src/app/Services/cart.service';

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
    product:'https://via.placeholder.com/150'
  },
  {
    id: 1,
    name: 'Item 1',
    price: 100,
    quantity: 3,
    product:'https://via.placeholder.com/150'
  }
]};

  dataSource: CartItem [] = [];
  displayColumns: string[] = ['product','name', 'price', 'quantity', 'total', 'action'];

  constructor(private cartService: CartService){}
  
  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items)

  }
   
}
