import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loaidonoithat } from '../../Model/loaidonoithat.model';

@Component({
    selector: 'app-category',
    templateUrl: './updatesize.component.html',
    styleUrls: [
        '../../../assets/adminui/css/sb-admin-2.min.css',
        '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
        '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
    ]
})

export class UpdatesizeComponent implements OnInit{
    id: string = '';
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }
   
    svs: any = { idSize: 0, dai: "", rong: "", cao: "", GhiChu: "" };

    ngOnInit(): void {
        // Sử dụng ActivatedRoute để nhận tham số từ URL
        this.route.params.subscribe(params => {
          this.id = params['id'];
          this.dulieu();
          // Bạn có thể sử dụng this.categoryId trong các phương thức khác của component
        });
    }
    dulieu() {
        this.http.get('http://localhost:3000/api/size/getbyid/'+this.id).subscribe(
            (data:any)=>{
                this.svs.idSize = data.idSize;
                this.svs.dai = data.dai;
                this.svs.rong = data.rong;
                this.svs.cao = data.cao;
                this.svs.GhiChu = data.GhiChu;
            }
        )
    }
    sukien() {
        this.http.post('http://localhost:3000/api/size/update', this.svs).subscribe(
            data => {
                alert("Sửa thành công");
                this.router.navigate(['/admin/size']);
            },
            error => {
                console.error('Lỗi:', error);
            }
        );
    }

}
