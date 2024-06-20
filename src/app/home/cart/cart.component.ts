import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';
import { HomelayoutComponent } from 'src/app/shared/homelayout/homelayout.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../../../assets/homeui/css/style.css',]
})
export class CartComponent implements AfterViewInit {
  cartitem: any;
  user: any;
  quantity: any[] = [];
  a: any = { sl: 0 };
  len: number = 0;
  carts: any[] = [];
  depot: any;
  subtotal: number = 0;

  constructor(
    private cart: CartService,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private home:HomelayoutComponent
  ) {
    this.cartitem = cart.getCartItems();
    this.user = auth.getItems()
  }

  ngAfterViewInit(): void {
    var src = [
      "assets/homeui/js/jquery-1.12.1.min.js",
      "assets/homeui/js/popper.min.js",
      "assets/homeui/js/bootstrap.min.js",
      "assets/homeui/js/jquery.magnific-popup.js",
      "assets/homeui/js/swiper.min.js",
      "assets/homeui/js/masonry.pkgd.js",
      "assets/homeui/js/owl.carousel.min.js",
      "assets/homeui/js/jquery.nice-select.min.js",
      "assets/homeui/js/slick.min.js",
      "assets/homeui/js/jquery.counterup.min.js",
      "assets/homeui/js/waypoints.min.js",
      "assets/homeui/js/contact.js",
      "assets/homeui/js/jquery.ajaxchimp.min.js",
      "assets/homeui/js/jquery.form.js",
      "assets/homeui/js/jquery.validate.min.js",
      "assets/homeui/js/mail-script.js",
      "assets/homeui/js/stellar.js",
      "assets/homeui/js/custom.js",
    ];
    src.forEach(element => {
      var the = document.createElement('script');
      the.src = element;
      the.type = 'text/javascript';
      the.async = true;
      document.getElementsByTagName('head')[0].appendChild(the);
    });

    // this.cartitem.forEach((element:any) => {
    //   if(element.UserID === this.user.userId){
    //     a = element;
    //     this.carts.push(a);
    //   } 
    // });

    this.cartdata()
    this.http.get("http://localhost:3000/api/depot/getall").subscribe(
      (data: any) => {
        this.depot = data;
      }
    );

    this.carts.forEach((element: any) => {

      let i = element.Quantity;
      this.quantity.push(i);
    });
    this.len = this.carts.length;

    this.subtotalcart();
  }

  subtotalcart(): void {
    this.subtotal = 0;
    for (let i = 0; i < this.carts.length; i++) {
      this.subtotal += this.carts[i].ProductPrice * this.carts[i].Quantity;
    }
  }

  cartdata() {
    for (let i = 0; i < this.cartitem.length; i++) {
      let a = this.cartitem[i].UserID;
      let b = this.user.userID;
      if (a == b) {
        this.carts.push(this.cartitem[i]);
      }
    }
    console.log(this.carts);
  }

  incrementQuantity(count: number): void {
    this.quantity[count] = this.quantity[count] + 1;
    this.cart.updateCartItem(count, this.quantity[count])
    this.subtotalcart();

  }

  decrementQuantity(count: number): void {
    if (this.quantity[count] > 1) {
      this.quantity[count] = this.quantity[count] - 1;
      this.cart.updateCartItem(count, this.quantity[count])
      this.subtotalcart();

    }
  }
  removecartbyid(id: number, event: Event) {
    event.preventDefault();
    if (confirm('Bạn có muốn xóa bản ghi này không!')) {
      this.cart.removeFromCart(id);
      this.cartitem = [];
      this.cartitem = this.cart.getCartItems();
      this.carts = [];
      this.cartdata();
      this.len = this.carts.length;
      this.subtotalcart();
      this.home.ngAfterViewInit();
    }
  }
}

