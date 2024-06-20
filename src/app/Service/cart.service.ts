import { Injectable } from '@angular/core';
import { carts } from '../Model/cart';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems:carts[] = [];
  private carts:any [] = [];
  user:any;

  constructor(
    private auth:AuthService
  ) { 
    // Lấy dữ liệu từ localStorage khi service được khởi tạo
    const storedCartItems = localStorage.getItem('cart');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    };
    this.user = auth.getItems()
  }

  private saveLocalStorage(): void {
    // Lưu trữ dữ liệu giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartItems(): carts[] {
    return this.cartItems;
  }

  addToCart(cart: carts, quantity:number): void {
    console.log(cart);
    
    let datacart:carts[] = this.getCartItems();
    let getDataIdCart = datacart.find(x => x.DepotID === cart.DepotID && x.UserID === cart.UserID);
    console.log(getDataIdCart);
    
    if(getDataIdCart){
      getDataIdCart.Quantity += quantity;
      this.saveLocalStorage();
    }else{
      this.cartItems.push(cart);
      this.saveLocalStorage();
    }
    
    
  }

  removeFromCart(depotid: number): void {
    this.cartItems = this.cartItems.filter(item => item.DepotID !== depotid || item.UserID !== this.user.userID);
    this.saveLocalStorage();
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveLocalStorage();
  }
    private upadtecart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  updateCartItem(index: number, quantity: number): void {
    for (let i = 0; i < this.cartItems.length; i++) {
      let a = this.cartItems[i].UserID;
      let b = this.user.userID;
      if(a == b){
        this.carts.push(this.cartItems[i]);
      } 
    }
      this.carts[index].Quantity = quantity; 
      this.saveLocalStorage();
  }

  // private cartItem:any;
  // constructor() {
  //   const savedCartItems = localStorage.getItem('cartItems');
  //   if (savedCartItems) {
  //     this.cartItems = JSON.parse(savedCartItems);
  //   }
  // }
  // addToCart(item: any, quantity: number): void {
  //   const cartItem:any [] = {...item, quantity};
    
  //   console.log(cartItem);
  //   // Tạo một đối tượng mới bao gồm thông tin sản phẩm và số lượng
  //   this.cartItems.push(cartItem);
  //   this.saveCartItems();
  // }

  // removeFromCart(index: number): void {
  //   this.cartItems.splice(index, 1);
  //   this.saveCartItems();
  // }

  // getCartItems(): any {
  //   return this.cartItems;
  // }

  // private saveCartItems(): void {
  //   localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  // }
  // updateCartItem(index: number, quantity: number): void {
  //   if (quantity <= 0) {
  //     // Nếu số lượng là 0 hoặc âm, xóa sản phẩm khỏi giỏ hàng
  //     this.removeFromCart(index);
  //   } else {
  //     this.cartItems.id = index;
  //     this.cartItems.quantity = quantity;
  //     this.saveCartItems();
  //   }
  // }
  // removeAllFromCart(): void {
  //   localStorage.removeItem('cartItems');
  // }
}
