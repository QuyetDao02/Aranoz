import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


interface size {
    idSize: number, dai: string, rong: string, cao: "", GhiChu: "", idDNT: number
}

@Component({
    selector: 'app-detaiproduct',
    templateUrl: './detailproduct.compontent.html',
    styleUrls: [
        '../../../assets/adminui/css/sb-admin-2.min.css',
        '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
        '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css',
        '../../../assets/homeui/css/style.css'
    ]
})

export class DetailProductComponent {
    id: string = '';
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    svs: any = { id: 0, TenDNT: "", MaLDNT: 0, idhang: 0, HinhAnh: "", MoTa: "", GiaTB: "" };
    size: any = { idSize: 0, dai: "", rong: "", cao: "", GhiChu: "", idDNT: 0 };
    detailcolor:any;

    depot:any;

    dulieudata: any;
    ldnt: any;
    hang: any;
    ngOnInit(): void {
        // Sử dụng ActivatedRoute để nhận tham số từ URL
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.dulieu();
        });
    }
    dulieu() {
        this.http.get('http://localhost:3000/api/product/getbyid/' + this.id).subscribe(
            data => {
                this.dulieudata = data;
                this.svs.id = this.dulieudata.id;
                this.svs.TenDNT = this.dulieudata.TenDNT;
                this.svs.MoTa = this.dulieudata.MoTa;
                this.svs.HinhAnh = this.dulieudata.HinhAnh;
                this.svs.GiaTB = this.dulieudata.GiaTB;
                this.svs.MaLDNT = this.dulieudata.MaLDNT;
                this.svs.idhang = this.dulieudata.idhang;

                this.http.get("http://localhost:3000/api/category/getbyid/" + this.svs.MaLDNT).subscribe(data => { this.ldnt = data });
                this.http.get("http://localhost:3000/api/company/getbyid/" + this.svs.idhang).subscribe(data => { this.hang = data });
                this.http.get("http://localhost:3000/api/color/getbyproductid/" + this.id).subscribe((data: any) => { this.detailcolor = data;});
                this.http.get("http://localhost:3000/api/size/getbyid/" + this.id).subscribe((data: any) => {this.size = data;});
                this.http.get("http://localhost:3000/api/depot/getbyproduct/" + this.id).subscribe((data: any) => {this.depot = data;});
            }
        )
        
    }
   
}
