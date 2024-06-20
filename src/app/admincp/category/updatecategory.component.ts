import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loaidonoithat } from '../../Model/loaidonoithat.model';

@Component({
    selector: 'app-category',
    templateUrl: './updatecategory.component.html',
    styleUrls: [
        '../../../assets/adminui/css/sb-admin-2.min.css',
        '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
        '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
    ]
})

export class UpdateCategoryComponent implements OnInit{
    categoryId: string = '';
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }
   
    mobj: loaidonoithat[] = [];
    svs: loaidonoithat = { id: 0, TenLDNT: "", MoTa: "" };
    dulieucategory:any;
    ngOnInit(): void {
        // Sử dụng ActivatedRoute để nhận tham số từ URL
        this.route.params.subscribe(params => {
          this.categoryId = params['id'];
          this.dulieu();
          // Bạn có thể sử dụng this.categoryId trong các phương thức khác của component
        });
    }
    dulieu() {
        this.http.get('http://localhost:3000/api/category/getbyid/'+this.categoryId).subscribe(
            data=>{
                this.dulieucategory=data;
                this.svs.id = this.dulieucategory.id;
                this.svs.TenLDNT = this.dulieucategory.TenLDNT;
                this.svs.MoTa = this.dulieucategory.MoTa;
            }
        )
    }
    sukien() {
        this.http.post('http://localhost:3000/api/category/update', this.svs).subscribe(
            data => {
                alert("Sửa thành công");
                this.router.navigate(['/admin/category']);
            },
            error => {
                console.error('Lỗi:', error);
            }
        );
    }

}
