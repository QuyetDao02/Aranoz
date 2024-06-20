import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-importedinvoice',
  templateUrl: './importedinvoice.component.html',
  styleUrls: [
    '../../../assets/adminui/css/sb-admin-2.min.css',
    '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/homeui/css/style.css',
    '../../../assets/adminui/css/pagination.css'
  ]
})
export class ImportedinvoiceComponent {
  id: any;
  dulieudata: any;
  tieude: any;
  tt: any;
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
      if (this.id == 0) this.tieude = "Hóa đơn chờ xác nhận"
      if (this.id == 1) this.tieude = "Hóa đơn đã xác nhận"
    });
  }
  dulieu() {
    this.http.get('http://localhost:3000/api/importedinvoice/get/' + this.id).subscribe(
      (data: any) => {
        this.dulieudata = data;
      }
    )
  }
  dataimportedinvoice: any;
  sukien(id: number, tinhtrang: number, event: Event) {
    this.tt = tinhtrang + 1;
    if (this.tt == 0) this.tieude1 = "Hóa đơn chờ xác nhận"
    if (this.tt == 1) this.tieude1 = "Hóa đơn đã xác nhận"

    if (confirm("Bạn có muốn chuyển đơn hàng sang trạng thái: " + this.tieude1)) {
      this.data = [{ id: id, TinhTrang: tinhtrang + 1 }]
      this.http.get('http://localhost:3000/api/importedinvoice/getdetail/' + id).subscribe(
        (data: any) => {
          this.dataimportedinvoice = data;
          for (let i = 0; i < this.dataimportedinvoice.length; i++) {
            const updatequanty = { MaKho: 0, SoLuong: 0 }
            let quanty = 0;
            this.http.get('http://localhost:3000/api/depot/getbyid/' + this.dataimportedinvoice[i].IDKho).subscribe(
              (data2: any) => {
                console.log(data2);
                quanty = data2.SoLuong;
                updatequanty.MaKho = data2.MaKho;
                updatequanty.SoLuong = quanty + this.dataimportedinvoice[i].SoLuong;
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
    }
  }
  delete(event: Event, id: number) {
    event.preventDefault();
    if (confirm('Bạn muốn xóa bản ghi này không!')) {
      const url = `http://localhost:3000/api/importedinvoice/delete/${id}`;
      this.http.post(url, {}).subscribe(red => {
        this.dulieu();
      });
    }
  }
}
