import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { carts } from 'src/app/Model/cart';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../../../assets/homeui/css/style.css',]
})
export class SearchComponent implements AfterViewInit {
  id: any;
  dulieu: any [] = [];
  category: any;
  user:any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cartservice:CartService,
    private auth:AuthService,
    private router:Router
  ) {
    this.user = auth.getItems()
   }
  ngAfterViewInit(): void {
    // this.route.params.subscribe(params => {
    //   this.id = params['id'];
    // });
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
      "assets/homeui/js/price_rangs.js",
      "assets/homeui/js/custom.js",
    ];
    src.forEach(element => {
      var the = document.createElement('script');
      the.src = element;
      the.type = 'text/javascript';
      the.async = true;
      document.getElementsByTagName('head')[0].appendChild(the);
    });
    const storedCartItems = localStorage.getItem('datahistory');
    if (storedCartItems) {
      this.dulieu = JSON.parse(storedCartItems);
    };
    console.log(this.dulieu);
    this.http.get("http://localhost:3000/api/category/getall").subscribe(
      data => {
        this.category = data;
      });
     
  }
}
