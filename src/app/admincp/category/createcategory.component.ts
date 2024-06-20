import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loaidonoithat } from '../../Model/loaidonoithat.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-category',
    templateUrl: './createcategory.component.html',
    styleUrls: [
        '../../../assets/adminui/css/sb-admin-2.min.css',
        '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
        '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
    ]
})

export class CreateCategoryComponent {
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    svs: loaidonoithat = { id: 0, TenLDNT: "", MoTa: "" };

    sukien() {
        this.http.post('http://localhost:3000/api/category/create', this.svs).subscribe(
            data => {
                console.log('Thêm thành công:', data);
                alert("Thêm thành công");
                this.router.navigate(['/admin/category']);
            },
            error => {
                console.error('Lỗi:', error);
            }
        );
    }
}
