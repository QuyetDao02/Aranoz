import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { hang } from '../../Model/hang.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-company',
    templateUrl: './createcompany.component.html',
    styleUrls: [
        '../../../assets/adminui/css/sb-admin-2.min.css',
        '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
        '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
    ]
})

export class CreateCompanyComponent {
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }
    ldnt: any;
    svs: hang = { idhang: 0, tenhang: "", diachi: "", sdt: "", ghichu: "" };
    selectedFile: any;
    imageSrc: any;
    hang:any;

    sukien() {
        this.http.post('http://localhost:3000/api/company/create', this.svs).subscribe(
            data => {
                console.log('Thêm thành công:', data);
                alert("Thêm thành công");
                this.router.navigate(['/admin/company']);
            },
            error => {
                console.error('Lỗi:', error);
            }
        );
    }
}
