import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { users } from 'src/app/Model/usersmodel';
import { AuthService } from 'src/app/Service/auth.service';
import { IndexComponent } from '../index/index.component';
import { Location } from '@angular/common';
import { HomelayoutComponent } from 'src/app/shared/homelayout/homelayout.component';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../../assets/homeui/css/style.css',
  ]
})
export class LoginComponent implements AfterViewInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private location:Location,
    private cart:CartService,
  ) { }

  user: users[] = [];

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
    this.http.get("http://localhost:3000/api/users/getall").subscribe(
      (data: any) => {
        // data.forEach((element:any) => {
        this.user = data;
        // });
      });
    this.http.get("http://localhost:3000/api/users/getbyidcustomer/" + this.user[0].userID).subscribe(
      data =>{
        
      }
    )
  }

  username: string = "";
  password: string = "";

  login(): void {

    if (this.auth.login(this.username, this.password, this.user)) {
      console.log('Đăng nhập thành công.');
      // this.router.navigateByUrl("/user/index",{ skipLocationChange: true }).then(() => {
      //   this.router.navigate([this.router.url]);
      // });
      var index: IndexComponent = new IndexComponent(this.http);
      // this.location.back();
      // location.reload();
      this.router.navigateByUrl("/user/index").then(() => {
        window.location.reload();
      });

      index.ngAfterViewInit();
      this.username = "";
      this.password = "";
      // Chuyển hướng đến trang chính hoặc trang mong muốn
    } else {
      console.log('Đăng nhập không thành công.');
      // alert('Thông tin đăng nhập chưa chính xác!')
      // Hiển thị thông báo lỗi hoặc xử lý lỗi khác
    }

    var a:HomelayoutComponent = new HomelayoutComponent(this.http,this.cart,this.auth,this.router);
    a.ngOnInit();
  }
}
