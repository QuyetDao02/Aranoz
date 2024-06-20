import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { chitietdhb } from 'src/app/Model/chitietdonhangban.model';
import { khachhang } from 'src/app/Model/khachhang.model';
import { EmailService } from 'src/app/Service/EmailService/email.service';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['../../../assets/homeui/css/style.css',]
})
export class CheckoutComponent implements AfterViewInit {
  cartitem: any;
  user: any;
  carts: any[] = [];
  subtotal: number = 0;
  depot: any;
  paymentmethod = "Thanh toán khi nhận hàng"
  customer: any = { MaKH: 0, userID: 0, TenKH: "", Email: "", SDT: "", DiaChi: "" };
  paymentCode: any;

  constructor(
    private cart: CartService,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private date: DatePipe,
    private email: EmailService,
    private route: ActivatedRoute
  ) {
    this.cartitem = cart.getCartItems();
    this.user = auth.getItems();
  }
  ngOnInit() {
    this.http.get("http://localhost:3000/api/depot/getall").subscribe(
      (data: any) => {
        this.depot = data;
      }
    );
    this.http.get("http://localhost:3000/api/users/getbyidcustomer/" + this.user.userID).subscribe(
      (data: any) => {
        this.to = `${data.Email}`;
      }
    )
    this.route.queryParams.subscribe(params => {
      this.paymentCode = params['code'];
      if (this.paymentCode == "00") {
        const infoBill = window.sessionStorage.getItem('infoPayment');
        const bill = infoBill ? JSON.parse(infoBill) : null;

        this.order.MaKH = bill.MaKH
        this.order.NgayLap = bill.NgayLap
        this.order.DiaChi = bill.DiaChi
        this.order.TinhTrang = bill.TinhTrang
        this.order.TongTien = bill.TongTien
        this.order.GhiChu = bill.GhiChu
        this.order.NguoiNhan = bill.NguoiNhan
        this.order.SdtNguoiNhan = bill.SdtNguoiNhan
        this.order.TrangThai = 1
        this.vnpayorder()
        window.sessionStorage.clear();
      } else {

      }
    });
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

    for (let i = 0; i < this.cartitem.length; i++) {
      let a = this.cartitem[i].UserID;
      let b = this.user.userID;
      if (a == b) {
        this.carts.push(this.cartitem[i]);
      }
    }
    this.http.get("http://localhost:3000/api/users/getbyidcustomer/" + this.user.userID).subscribe(
      (data: any) => {
        this.customer = data;
        this.order.MaKH = this.customer.MaKH;
        this.order.NguoiNhan = this.customer.TenKH;
        this.order.SdtNguoiNhan = this.customer.SDT;
        this.order.DiaChi = this.customer.DiaChi;
      });
    this.order.NgayLap = this.date.transform(new Date(), 'yyyy-MM-dd');
    for (let i = 0; i < this.carts.length; i++) {
      this.subtotal += this.carts[i].ProductPrice * this.carts[i].Quantity;
    }
    this.order.TongTien = this.subtotal;
    this.http.get("http://localhost:3000/api/depot/getall").subscribe(
      (data: any) => {
        this.depot = data;
      }
    );
    this.http.get("http://localhost:3000/api/users/getbyidcustomer/" + this.user.userID).subscribe(
      (data: any) => {
        this.to = `${data.Email}`;

      }
    )
  }


  d: any[] = [];
  order: any = { MaKH: 0, NgayLap: "", DiaChi: "", TinhTrang: 0, TongTien: 0, GhiChu: "", NguoiNhan: "", SdtNguoiNhan: "", TrangThai: 0 }
  detailorder: any = { id: 0, idDHB: 0, idKho: 0, SoLuong: 0, Gia: 0 };
  addorder() {
    if (this.order.DiaChi == "" || this.order.NguoiNhan == "" || this.order.SdtNguoiNhan == "") {
      alert('Vui lòng nhập đầy đủ thông tin!')
    }
    else {
      if (this.order.SdtNguoiNhan.length != 10) {
        alert('Số điện thoại không hợp lệ!')
      }
      else {
        if (this.paymentmethod === "Thanh toán ví vnpay") {
          window.sessionStorage.setItem('infoPayment', JSON.stringify(this.order));
          this.http.post('http://localhost:3000/order/create_payment_url', { amount: this.order.TongTien, language: 'vn' }).subscribe(
            (data: any) => {
              window.location.href = data
            }
          )
        } else {
          if (confirm('Bạn có chắc chắn đặt hàng không')) {
            alert("Đặt hàng thành công")
            this.http.post('http://localhost:3000/api/billofsale/addorder', this.order).subscribe(
              data => {
                this.addorderdetail();
                this.router.navigateByUrl("/user/index").then(() => {
                  window.location.reload();
                });
                this.sendEmail();
                this.removecartbyid();
              }
            )
          }
        }
      }
    }
  }
  vnpayorder() {

    this.http.post('http://localhost:3000/api/billofsale/addorder', this.order).subscribe(
      data => {
        alert("Đặt hàng thành công");
        this.sendEmail();
        this.addorderdetail();
        this.router.navigateByUrl("/user/index").then(() => {
          window.location.reload();
        });
        this.removecartbyid();
      }
    )
  }

  methodpayment(method: any) {
    this.paymentmethod = method
  }

  addorderdetail() {
    let quanty = 0;
    for (let i = 0; i < this.carts.length; i++) {
    const updatequanty = { MaKho: 0, SoLuong: 0 }
      this.detailorder.SoLuong = this.carts[i].Quantity;
      this.detailorder.Gia = this.carts[i].ProductPrice;
      this.detailorder.idKho = this.carts[i].DepotID;

      this.http.post('http://localhost:3000/api/billofsale/addorderdetail', this.detailorder).subscribe(
        data => { })

      this.http.get('http://localhost:3000/api/depot/getbyid/' + this.detailorder.idKho).subscribe(
        (data2: any) => {
          console.log(data2);
          quanty = data2.SoLuong;
          updatequanty.MaKho = data2.MaKho;
          updatequanty.SoLuong = quanty - this.detailorder.SoLuong;
          this.http.post('http://localhost:3000/api/depot/updatequanty', updatequanty).subscribe(
            data1 => {
              console.log(updatequanty);
            }
          )
        }
      )
    }
  }
  removecartbyid() {
    this.carts.forEach(element => {
      this.cart.removeFromCart(element.DepotID);
    });
  }

  isValid: boolean = true;
  isTouched: boolean = false;

  validateNumber() {
    this.isTouched = true;
    this.isValid = /^[0-9]+$/.test(this.order.SdtNguoiNhan);
    if (this.order.SdtNguoiNhan.length == 0) {
      this.isTouched = false;
    }
  }

  to = '';
  subject = 'Đơn hàng của bạn từ cửa hàng Aranoz';
  text = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Danh sách sản phẩm</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Tên sản phẩm</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Số lượng</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Màu sắc</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Giá</th>
        </tr>
      </thead>
      <tbody>`;
  color: any;

  sendEmail() {
    var total = 0;
    // console.log(this.carts);
    for (let i = 0; i < this.carts.length; i++) {
      total += this.carts[i].ProductPrice * this.carts[i].Quantity;
      this.depot.forEach((item: any) => {
        if (item.MaKho == this.carts[i].DepotID) {
          this.color = item.MauSac;
        }
      });

      this.text += `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${this.carts[i].ProductName}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">x${this.carts[i].Quantity}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${this.color}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${this.carts[i].ProductPrice} VND</td>
      </tr>`;
      console.log(this.text);
    }
    this.text += `
      </tbody>
      </table>
      <h3 style="text-align: right;">Tổng tiền: ${total} VND</h3>
    </div>`;
    // console.log(this.text);
    const emailData = { to: this.to, subject: this.subject, html: this.text };

    this.email.sendEmail(emailData).subscribe(
      (response) => {
        console.log('Email sent successfully:', response);
        // Add logic for handling successful email sending
      },
      (error) => {
        console.error('Error sending email:', error);
        // Add logic for handling email sending error
      }
    );
  }
}
