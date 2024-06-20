import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: [
    '../../../assets/adminui/css/sb-admin-2.min.css',
    '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/homeui/css/style.css',
    '../../../assets/adminui/css/pagination.css'
  ]
})
export class StatisticalComponent {
  constructor(
    private http: HttpClient
  ) { }
  bill: any;
  databill: any;
  indate: string = "";
  detaillbill: any;
  month: string = "";
  year: string = "";
  pice: number = 0;
  pice1: number = 0;
  pice2: number = 0;
  p: number = 1;
  items: number = 5;
  tieude: string = "";

  day() {
    this.tieude = "Đơn hàng trong ngày"
    this.pice1 = 0;
    this.pice2 = 0;
    this.http.get('http://localhost:3000/api/statistical/get/3/' + this.indate).subscribe(
      (data: any) => {
        this.detaillbill = data;

        this.detaillbill.forEach((element: any) => {
          this.pice1 += element.SoLuong * element.GiaNhap;
          this.pice2 += element.SoLuong * element.GiaBan;

        });
        this.pice = this.pice2 - this.pice1;

      }
    );
    this.http.get('http://localhost:3000/api/statistical/getbillinday/3/' + this.indate).subscribe(
      (data: any) => {
        this.bill = data;
        console.log(this.bill);

      }
    );

  }
  statisticalInMonth() {
    this.tieude = "Đơn hàng trong tháng"

    this.pice1 = 0;
    this.pice2 = 0;
    const date = new Date(this.indate);
    this.month = `${date.getMonth() + 1}`;
    this.year = `${date.getFullYear()}`;
    this.http.get('http://localhost:3000/api/statistical/getmonth/3/' + this.month + '/' + this.year).subscribe(
      (data: any) => {
        this.detaillbill = data;
        this.detaillbill.forEach((element: any) => {
          this.pice1 += element.SoLuong * element.GiaNhap;
          this.pice2 += element.SoLuong * element.GiaBan;
        });
        this.pice = this.pice2 - this.pice1;
      }
    );
    this.http.get('http://localhost:3000/api/statistical/getbillinmonth/3/' + this.month + '/' + this.year).subscribe(
      (data: any) => {
        this.bill = data;
        console.log(this.bill);

      }
    );

  }
  statisticalInYear() {
    this.tieude = "Đơn hàng trong năm"

    this.pice1 = 0;
    this.pice2 = 0;
    const date = new Date(this.indate);
    this.year = `${date.getFullYear()}`;
    this.http.get('http://localhost:3000/api/statistical/getyear/3/' + this.year).subscribe(
      (data: any) => {
        this.detaillbill = data;
        this.detaillbill.forEach((element: any) => {
          this.pice1 += element.SoLuong * element.GiaNhap;
          this.pice2 += element.SoLuong * element.GiaBan;
        });
        this.pice = this.pice2 - this.pice1;
      }
    );
    this.http.get('http://localhost:3000/api/statistical/getbillinyear/3/' + this.year).subscribe(
      (data: any) => {
        this.bill = data;
        console.log(this.bill);

      }
    );

  }

  beforce: string = "";
  after: string = "";
  statisticalIndate() {
    this.tieude = "Đơn hàng trong năm"
    console.log(this.beforce, this.after)
    this.pice1 = 0;
    this.pice2 = 0;

    this.http.get('http://localhost:3000/api/statistical/getdate/3/' + this.beforce + '/' + this.after).subscribe(
      (data: any) => {
        this.detaillbill = data;
        this.detaillbill.forEach((element: any) => {
          this.pice1 += element.SoLuong * element.GiaNhap;
          this.pice2 += element.SoLuong * element.GiaBan;
        });
        this.pice = this.pice2 - this.pice1;
      }
    );
    this.http.get('http://localhost:3000/api/statistical/getbillindate/3/' + this.beforce + '/' + this.after).subscribe(
      (data: any) => {
        this.bill = data;
        console.log(this.bill);

      }
    );

  }

  detailbill(id: number) {
    this.http.get('http://localhost:3000/api/billofsale/getdetail/' + id).subscribe(
      (data: any) => {
        this.databill = data;
      }
    )
  }
}
