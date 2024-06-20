import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';
import { carts } from '../../Model/cart';
import { donoithat } from 'src/app/Model/donoithat.model';
import { AuthService } from 'src/app/Service/auth.service';
import { HomelayoutComponent } from 'src/app/shared/homelayout/homelayout.component';
import { forkJoin, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: [
    '../../../assets/homeui/css/style.css',
  ]
})
export class DetailComponent implements AfterViewInit {
  @ViewChild('imgdetail') imgdetail!: ElementRef;
  user: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cartservice: CartService,
    private router: Router,
    private auth: AuthService,
    private home: HomelayoutComponent,
    private render: Renderer2
  ) {
    this.user = auth.getItems()

  }
  svs: any = { id: 0, TenDNT: "", MaLDNT: 0, idhang: 0, HinhAnh: "", MoTa: "", GiaTB: "", GiaBan: "" };
  id: any;
  cart: any[] = [];
  quantity: number = 1;
  image: any[] = [];
  price: any = { id: 0, iddnt: 0, GiaBan: 0, GiaNhap: 0 };
  depot: any = { MaKho: 0, MaDNT: 0, idSize: 0, idMauSac: 0, SoLuong: 0, MauSac: "", dai: 0, rong: 0, cao: 0 };
  size: any;
  color: any;
  idKho: number = 0;
  addcarts: any = { idsize: 0, idcolor: 0 }
  imagecolor: any;
  productcateid: any;

  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    var src = [
      "assets/homeui/js/jquery-1.12.1.min.js",
      "assets/homeui/js/popper.min.js",
      "assets/homeui/js/bootstrap.min.js",
      "assets/homeui/js/jquery.magnific-popup.js",
      "assets/homeui/js/lightslider.min.js",
      "assets/homeui/js/masonry.pkgd.js",
      "assets/homeui/js/owl.carousel.min.js",
      "assets/homeui/js/jquery.nice-select.min.js",
      "assets/homeui/js/slick.min.js",
      "assets/homeui/js/swiper.jquery.js",
      "assets/homeui/js/jquery.counterup.min.js",
      "assets/homeui/js/waypoints.min.js",
      "assets/homeui/js/contact.js",
      "assets/homeui/js/jquery.ajaxchimp.min.js",
      "assets/homeui/js/jquery.form.js",
      "assets/homeui/js/jquery.validate.min.js",
      "assets/homeui/js/mail-script.js",
      "assets/homeui/js/stellar.js",
      "assets/homeui/js/theme.js",
      // "assets/homeui/js/custom.js",
    ];
    src.forEach(element => {
      var the = document.createElement('script');
      the.src = element;
      the.type = 'text/javascript';
      the.async = true;
      document.getElementsByTagName('head')[0].appendChild(the);
    });

    this.http.get("http://localhost:3000/api/color/getbyproductid/" + this.id).subscribe(
      (data: any) => {
        this.color = data;
        this.addcarts.idcolor = this.color[0].idms;
        this.http.get("http://localhost:3000/api/product/getimagecolor/" + this.id + "/" + this.addcarts.idcolor).subscribe(
          (data: any) => {
            this.imagecolor = data;
            var src = [
              "assets/homeui/js/custom.js",
            ];
            src.forEach(element => {
              var the = document.createElement('script');
              the.src = element;
              the.async = true;
              document.getElementsByTagName('body')[0].appendChild(the);
            });
          }
        );
        this.http.get("http://localhost:3000/api/size/getbyid/" + this.id).subscribe(
          (data: any) => {
            this.size = data;
            this.addcarts.idsize = this.size[0].idSize;

            this.http.get("http://localhost:3000/api/depot/getdepot/" + this.addcarts.idsize + "/" + this.addcarts.idcolor).subscribe(
              (data: any) => {
                this.idKho = data[0].MaKho;
              }
            );
          }
        );
      }
    );

    // this.http.get("http://localhost:3000/api/product/getallimage").subscribe(
    //   (data: any) => {
    //     for (let i = 0; i < data.length; i++) {
    //       if (data[i].id == this.id) {
    //         this.image.push(data[i])
    //       }
    //     }
    //     console.log(this.image, 'aaaaa')
    //   }
    // );

    this.http.get("http://localhost:3000/api/product/getbyid/" + this.id).subscribe(
      (data: any) => {
        this.svs = data;
        this.http.get("http://localhost:3000/api/product/getcategorybyid/" + this.svs.MaLDNT).subscribe(
          (data:any) => {
            this.productcateid = data;
            console.log(this.productcateid);
          }
        );
      }
    );
    // this.http.get("http://localhost:3000/api/product/getimagecolor/" + this.id + "/" +8).subscribe(
    //   (data: any) => {
    //     this.imagecolor = data;
    //     console.log(this.imagecolor)
    //   }
    // );
    this.http.get("http://localhost:3000/api/depot/getbyproduct/" + this.id).subscribe(
      (data: any) => {
        this.depot = data;
      }
    );
  }

  addcart(item: any) {
    if (this.auth.IsAuthenticated()) {
      let obj: carts = {
        ProductID: item.id,
        ProductName: item.TenDNT,
        ProductPrice: item.GiaBan,
        ProductPath: item.HinhAnh,
        Quantity: this.quantity,
        UserID: this.user.userID,
        DepotID: this.idKho
      }



      // Kiểm tra dữ liệu trước khi thêm vào giỏ hàng
      console.log("Dữ liệu trước khi thêm vào giỏ hàng: ", this.cartservice.getCartItems());

      this.cartservice.addToCart(obj, this.quantity);

      // Kiểm tra dữ liệu sau khi thêm vào giỏ hàng
      console.log("Dữ liệu sau khi thêm vào giỏ hàng: ", this.cartservice.getCartItems());

      alert('Thêm vào giỏ hàng thành công!')
      this.home.ngAfterViewInit();

      this.router.navigate(['/user/cart'])
    }
    else {
      this.router.navigateByUrl("/user/login", { skipLocationChange: true }).then(() => {
        this.router.navigate([this.router.url]);
      });
    }
  }

  incrementQuantity(): void {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  checkIdDepot(): void {
    this.depot.forEach((element: any) => {
      if (element.idSize == this.addcarts.idsize && element.idMauSac == this.addcarts.idcolor) {
        this.idKho = element.MaKho;
      }
    });
    this.http.get("http://localhost:3000/api/product/getimagecolor/" + this.id + "/" + this.addcarts.idcolor).subscribe(
      (data: any) => {
        this.imagecolor = data;
        this.onDivClick();
      }
    );
  }

  onDivClick() {
    const divElement = document.getElementById('imgdetail');
    console.log('Existing div element:', divElement);
    // if (divElement) {
    //   divElement.remove();
    // }

    // // Tạo phần tử div mới
    const newDivElement = `
   
          <div class="product_slider_img">
            <div id="vertical">
              <div data-thumb="http://localhost:3000/${this.svs.HinhAnh}">
                <img style="width: auto; height: 450px;" src="http://localhost:3000/${this.svs.HinhAnh}" />
              </div>
              ${this.imagecolor.map((item: any) => `
              <div data-thumb="http://localhost:3000/${item.HinhAnh}">
                <img style="width: auto; height: 450px;" src="http://localhost:3000/${item.HinhAnh}" />
              </div>`).join('')}
            </div>
          </div>
      
      `;

    this.imgdetail.nativeElement.innerHTML = newDivElement;

    const script = document.createElement('script');
    script.src = 'assets/homeui/js/custom.js';
    console.log('Script created:', script);

    // Xóa các tệp script cũ (nếu có)
    const oldScripts = document.querySelectorAll('body script[src="assets/homeui/js/custom.js"]');
    oldScripts.forEach((oldScript) => {
      oldScript.remove();
    });

    // Thêm thẻ script mới vào phần tử <head>
    this.render.appendChild(document.body, script);

  }
}
