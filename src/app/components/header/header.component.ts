import { Cart, CartItem } from 'src/app/Models/cart.model';
import { CartService } from './../../Services/cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  itemsQuantity = 0;
  // cart: Cart = { items: [] };
  private _cart: Cart = {items: []}

  @Input()
  get cart():Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
    .map(item =>item.quantity)
    .reduce((prev,current) => prev+ current, 0);
  }

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // this.cartService.cart.subscribe((_cart) => {
    //   this.cart = _cart;

    //   this.itemsQuantity = _cart.items
    //     .map((item) => item.quantity)
    //     .reduce((prev, current) => prev + current, 0);
    // });
    // console.log(this.cart)
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }
  onClearCart() {
    this.cartService.clearCut();
  }
}
