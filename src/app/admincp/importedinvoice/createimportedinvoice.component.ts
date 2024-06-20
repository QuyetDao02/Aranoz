import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { hoadonnhap } from 'src/app/Model/hoadonnhap.model';

@Component({
    selector: 'app-CreateImported',
    templateUrl: './createimportedinvoice.component.html',
    styleUrls: [
        '../../../assets/adminui/css/sb-admin-2.min.css',
        '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
        '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
    ]
})

export class CreateImportedInvoiceComponent implements AfterViewInit{
    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private date: DatePipe
    ) { }
    id: any
    svs: any = { MaNV: 0, TinhTrang: 0, NgayNhap: "", TongTien: 0, MaNCC:0 };
    supplier:any;
    staff:any;

    ngAfterViewInit(): void {
        this.http.get("http://localhost:3000/api/supplier/getall").subscribe(
            data =>{
                this.supplier = data;
                console.log(this.supplier);
            }
        )
        this.http.get("http://localhost:3000/api/users/getallstaff").subscribe(
            data =>{
                this.staff = data;
                console.log(this.staff);
            }
        )
    }

    sukien() {
        this.svs.NgayNhap = this.date.transform(new Date(), 'yyyy-MM-dd');
        this.http.post('http://localhost:3000/api/importedinvoice/create', this.svs).subscribe(
            data => {
                console.log('Thêm thành công:', data);
                alert("Thêm thành công");
                this.router.navigate(['/admin/importedinvoice/0']);
                console.log(this.svs);
            },
            error => {
                console.error('Lỗi:', error);
            }
        );
    }
}
