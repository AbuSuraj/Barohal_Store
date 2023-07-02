import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
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

  constructor(private cartService: CartService,
    private http :HttpClient){}
  
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
   
  onAddQuantity(item:CartItem):void{
    this.cartService.addToCart(item);
  }
  
  onRemoveQuantity(item:CartItem):void{
    this.cartService.removeQuantity(item);
  }

  onCheckout():void{
    this.http .post('https://barohal-shop.vercel.app/checkout', {
      items: this.cart.items,
    }).subscribe(async (res:any) => {
        let stripe = await loadStripe('pk_test_51M8qlKHEhQ4vnNT3pb7gkGIFinsyDPpQAjGCuC0noHZaEIs5CFahEMknDcxahuKEK2kT8cklZOX6bq3aQjwyJ0gZ00g2GMU2Gx');
        stripe?.redirectToCheckout({
          sessionId: res.id
        })      
    })
  }
}
