import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/Models/cart.model';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  cart: Cart ={items:[]};

  dataSource: CartItem [] = [];
  displayColumns: string[] = ['product','name', 'price', 'quantity', 'total', 'action'];

  constructor(private cartService: CartService){}
  
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart)=>{
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items)
  }

  onClearCart():void{
    this.cartService.clearCart();
  }
  
  onRemoveFromCart(item:CartItem):void {
    this.cartService.removeFromCart(item)
  }
   
}
