import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { chitietdhb } from 'src/app/Model/chitietdonhangban.model';
import { khachhang } from 'src/app/Model/khachhang.model';
import { EmailService } from 'src/app/Service/EmailService/email.service';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-Signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../../assets/homeui/css/style.css',]
})
export class SignupComponent implements AfterViewInit {


  constructor(
    private cart: CartService,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private date: DatePipe,
    private email: EmailService
  ) {
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

    let link = [
      "assets/homeui/js/address.js",
    ];
    link.forEach(element => {
      var script = document.createElement('script');
      script.src = element;
      // script.type = 'text/javascript';
      // script.async = true;
      document.getElementsByTagName('body')[0].appendChild(script);
    });

  }
  user: any = { username: "", password: "", role: 0 };
  customer: any = { TenKH: "", Email: "", SDT: "", DiaChi: "" };
  re_enterPassword: any = "";
  isRe_enterPassword: boolean = true;

  register() {
    if (this.re_enterPassword == this.user.password) {
      this.http.post("http://localhost:3000/api/users/register", this.user).subscribe(
        data => {
          this.http.post("http://localhost:3000/api/users/registercus", this.customer).subscribe(
            data => {

            }
          )
        }
      )
      console.log(this.user);
      console.log(this.customer);
      console.log(this.re_enterPassword);
      this.router.navigateByUrl("/user/login").then(() => {
        window.location.reload();
      });

    }
    else {
      this.isRe_enterPassword = false;
    }
  }

  isValid: boolean = true;
  isTouched: boolean = false;
  validateNumber() {
    this.isTouched = true;
    this.isValid = /^[0-9]+$/.test(this.customer.SDT);
    if (this.customer.SDT.length == 0) {
      this.isTouched = false;
    }
  }
}
