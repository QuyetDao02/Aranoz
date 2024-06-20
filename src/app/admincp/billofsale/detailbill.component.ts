import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-detailbill',
    templateUrl: './detailbill.component.html',
    styleUrls: [
        '../../../assets/adminui/css/sb-admin-2.min.css',
        '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
        '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
    ]
})

export class DetailBillComponent implements OnInit{
    id: string = '';
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    databill:any;

    ngOnInit(): void {
        // Sử dụng ActivatedRoute để nhận tham số từ URL
        this.route.params.subscribe(params => {
          this.id = params['id'];
          this.dulieu();
        });
    }
    dulieu() {
        this.http.get('http://localhost:3000/api/billofsale/getdetail/'+this.id).subscribe(
            (data:any)=>{
                this.databill=data;
            }
        )
    }
    print(){
        window.print();
    }
}
