import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { hang } from '../../Model/hang.model';

@Component({
    selector: 'app-supplier',
    templateUrl: './updatecompany.component.html',
    styleUrls: [
        '../../../assets/adminui/css/sb-admin-2.min.css',
        '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
        '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
    ]
})

export class UpdateCompanyComponent implements OnInit{
    id: string = '';
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    svs: hang = { idhang: 0, tenhang: "", diachi: "", sdt: "", ghichu: "" };
    ngOnInit(): void {
        // Sử dụng ActivatedRoute để nhận tham số từ URL
        this.route.params.subscribe(params => {
          this.id = params['id'];
          this.dulieu();
        });
    }
    dulieu() {
        this.http.get('http://localhost:3000/api/company/getbyid/'+this.id).subscribe(
            (data:any)=>{
                this.svs.idhang = data.idhang;
                this.svs.tenhang = data.tenhang;
                this.svs.diachi = data.diachi;
                this.svs.sdt = data.sdt;
                this.svs.ghichu = data.ghichu;

            }
        )
    }
    sukien() {
        this.http.post('http://localhost:3000/api/company/update', this.svs).subscribe(
            data => {
                console.log(this.svs);
                alert("Sửa thành công");
                this.router.navigate(['/admin/company']);
            },
            error => {
                console.error('Lỗi:', error);
            }
        );
    }

}
