import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../Models/cart.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items:[]});
  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item:CartItem):void{
    const items = [...this.cart.value.items];

    const itemInCart = items.find(_item => _item.id === item.id);

    if(itemInCart){
      itemInCart.quantity += 1;
    }
    else{
      items.push(item)
    }
    this.cart.next({items});
    this._snackBar.open('1 item has been added', 'Ok', {duration: 3000});
    console.log(this.cart.value.items[0].quantity);
  }

  getTotal(items: CartItem[]): number {
    return items.map(item =>item.price * item.quantity)
                .reduce((prev,current)=>prev+current, 0)

  }

  clearCart():void{
    this.cart.next({items:[]});
    this._snackBar.open('Cart has been cleared', 'Ok', {duration: 3000});
  }

}
