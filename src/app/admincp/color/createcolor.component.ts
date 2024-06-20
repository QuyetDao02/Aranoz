import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loaidonoithat } from '../../Model/loaidonoithat.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-category',
    templateUrl: './createcolor.component.html',
    styleUrls: [
        '../../../assets/adminui/css/sb-admin-2.min.css',
        '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
        '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
    ]
})

export class CreateColorComponent {
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    svs: any = { IDMauSac: 0, MauSac: "", GhiChu: "", code: "" };

    sukien() {
        this.http.post('http://localhost:3000/api/color/create', this.svs).subscribe(
            data => {
                console.log('Thêm thành công:', data);
                alert("Thêm thành công");
                this.router.navigate(['/admin/color']);
            },
            error => {
                console.error('Lỗi:', error);
            }
        );
    }
}
