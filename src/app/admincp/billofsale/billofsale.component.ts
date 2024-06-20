import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-billofsale',
  templateUrl: './billofsale.component.html',
  styleUrls: [
    '../../../assets/adminui/css/sb-admin-2.min.css',
    '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/homeui/css/style.css',
    '../../../assets/adminui/css/pagination.css'
  ]
})
export class BillofsaleComponent {
  id: any;
  tt: any;
  dulieudata: any;
  tieude: any;
  tieude1: any;
  data: any;
  p: number = 1;
  items: number = 10;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  ngOnInit(): void {
    // Sử dụng ActivatedRoute để nhận tham số từ URL
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.dulieu();
      if (this.id == 0) this.tieude = "Đơn hàng chờ xác nhận"
      if (this.id == 1) this.tieude = "Đơn hàng chờ giao hàng"
      if (this.id == 2) this.tieude = "Đơn hàng đang giao hàng"
      if (this.id == 3) this.tieude = "Đơn hàng đã giao"
      if (this.id == 4) this.tieude = "Đơn hàng bị hủy"


    });
  }
  dulieu() {
    this.http.get('http://localhost:3000/api/billofsale/get/' + this.id).subscribe(
      (data: any) => {
        this.dulieudata = data;
        console.log(this.dulieudata);
      }
    )
  }
  sukien(id: number, tinhtrang: number, TrangThai: number, event: Event) {
    this.tt = tinhtrang + 1;
    if (this.tt == 0) this.tieude1 = "Đơn hàng chờ xác nhận"
    if (this.tt == 1) this.tieude1 = "Đơn hàng chờ giao hàng"
    if (this.tt == 2) this.tieude1 = "Đơn hàng đang giao hàng"
    if (this.tt == 3) this.tieude1 = "Đơn hàng đã giao"

    if (confirm("Bạn có muốn chuyển đơn hàng sang trạng thái: " + this.tieude1)) {
      if (this.tt == 3) {
        this.data = [{ id: id, TinhTrang: tinhtrang + 1, TrangThai: 1 }]

      }
      else {
        this.data = [{ id: id, TinhTrang: tinhtrang + 1, TrangThai: TrangThai }]

      }
      console.log(this.data);

      this.http.post('http://localhost:3000/api/billofsale/update', this.data[0]).subscribe(
        data => {
          this.dulieu();
        }
      )

    }

  }

  databllofsale:any;
  huy(id: number, event: Event, TrangThai:number) {
    var tt = [{ id: id, TinhTrang: 4, TrangThai: TrangThai }]
    if (confirm("Bạn có muốn hủy đơn hàng")) {
      this.http.get('http://localhost:3000/api/billofsale/getdetail/' + id).subscribe(
        (data: any) => {
          this.databllofsale = data;
          for (let i = 0; i < this.databllofsale.length; i++) {
            const updatequanty = { MaKho: 0, SoLuong: 0 }
            let quanty = 0;
            this.http.get('http://localhost:3000/api/depot/getbyid/' + this.databllofsale[i].idKho).subscribe(
              (data2: any) => {
                console.log(data2);
                quanty = data2.SoLuong;
                updatequanty.MaKho = data2.MaKho;
                updatequanty.SoLuong = quanty + this.databllofsale[i].SoLuong;
                this.http.post('http://localhost:3000/api/depot/updatequanty', updatequanty).subscribe(
                  data1 => {
                    console.log(updatequanty);
                  }
                )
              }
            )
          }
          this.http.post('http://localhost:3000/api/importedinvoice/update', this.data[0]).subscribe(
            data => {
              this.dulieu();
            }
          )
        }
      )
      console.log(tt[0]);
      this.http.post('http://localhost:3000/api/billofsale/update', tt[0]).subscribe(
        data => {
          this.dulieu();
        }
      )
    }
  }

}
