import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { nhacungcap } from '../../Model/nhacungcap.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-supplier',
    templateUrl: './createsupplier.component.html',
    styleUrls: [
        '../../../assets/adminui/css/sb-admin-2.min.css',
        '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
        '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
    ]
})

export class CreateSupplierComponent {
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }
    svs: nhacungcap = { MaNCC: 0, TenNCC: "", DiaChi: "", Sdt:"" };

    sukien() {
        this.http.post('http://localhost:3000/api/supplier/create', this.svs).subscribe(
            data => {
                console.log('Thêm thành công:', data);
                alert("Thêm thành công");
                this.router.navigate(['/admin/supplier']);
            },
            error => {
                console.error('Lỗi:', error);
            }
        );
    }
}
