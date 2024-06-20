import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-homelayout',
  templateUrl: './homelayout.component.html',
  styleUrls: ['../../../assets/homeui/css/style.css',]
})
export class HomelayoutComponent implements AfterViewInit, OnInit {
  constructor(
    private http: HttpClient,
    private cart: CartService,
    private auth: AuthService,
    private router: Router
  ) {
    const data = JSON.parse(localStorage.getItem("datahistory")!) || []
    if (data) {
      this.datahistory = data;
    }
  }

  datahistory: any[] = []
  lsp: any;
  product: any = [];
  cartitem: any;
  user: any;
  carts: any[] = [];
  count: number = 0;

  ngAfterViewInit(): void {
    this.carts = [];
    this.http.get("http://localhost:3000/api/category/getall").subscribe(data => { this.lsp = data });
    this.cartitem = this.cart.getCartItems();
    this.user = this.auth.getItems();
    for (let i = 0; i < this.cartitem.length; i++) {
      let a = this.cartitem[i].UserID;
      let b = this.user.userID;
      if (a == b) {
        this.carts.push(this.cartitem[i]);
      }
    }
    this.counts();
    this.http.get("http://localhost:3000/api/product/getall").subscribe(
      (data: any) => {
        this.product = data;
        this.filteredItems = Array.from(this.product);
      }
    );
  }
  counts() {
    this.count = this.carts.length;
  }
  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/user/index").then(() => {
      location.reload();
    })
    this.ngOnInit();
  }
  ngOnInit(): boolean {
    return this.auth.IsAuthenticated();
  }

  filteredItems: any[] = [];

  searchTerm: string = "";
  searchdata() {
    if (this.searchTerm == "") {
      this.filteredItems = Array.from(this.product);
    }
    else {
      this.filteredItems = this.product.filter((item: any) =>
        item.TenDNT.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.TenLDNT.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  
  data:any [] = [];
  reloaddata:any [] = [];
  search() {
    this.data = [];
    this.reloaddata = [];
 
    localStorage.setItem('datahistory', JSON.stringify(this.reloaddata));

    localStorage.setItem('datahistory', JSON.stringify(this.filteredItems));

    const storedCartItems = localStorage.getItem('datahistory');
    if (storedCartItems) {
      this.data = JSON.parse(storedCartItems);
    };
    console.log(this.data);
    this.router.navigateByUrl("/user/search").then(() => {
      window.location.reload();
    });
  }
}
