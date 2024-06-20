import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-CreateDetailImported',
    templateUrl: './createdetailimportedinvoice.component.html',
    styleUrls: [
        '../../../../assets/adminui/css/sb-admin-2.min.css',
        '../../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
        '../../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
    ]
})

export class CreateDetailImportedComponent implements OnInit {
    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute
    ) { }
    id: any
    svs: any = { idHDN: 0, IDKho: "", SoLuong: "", Gia: 0 };
    depot: any;
    data: any;
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.svs.idHDN = this.id;
        });
        this.http.get('http://localhost:3000/api/depot/getall').subscribe(
            data => {
                this.depot = data;

            }
        )
    }

    sukien() {
        const updatepice = { id: this.id, TongTien: 0 }
        this.http.get('http://localhost:3000/api/depot/getbyid/' + this.svs.IDKho).subscribe(
            (data: any) => {
                this.svs.Gia = data.GiaNhap;
                this.http.post('http://localhost:3000/api/importedinvoice/detail/create', this.svs).subscribe(
                    data => {
                        alert("Thêm thành công");
                        this.router.navigate(['/admin/importedinvoice/detail/' + this.id]);
                        this.http.get('http://localhost:3000/api/importedinvoice/getdetail/' + this.id).subscribe(
                            (data: any) => {
                                this.data = data;
                                for (let i = 0; i < this.data.length; i++) {
                                    updatepice.TongTien += this.data[i].Gia * this.data[i].SoLuong;
                                }
                                console.log(updatepice);
                                this.http.post('http://localhost:3000/api/importedinvoice/updatepice', updatepice).subscribe(
                                    data => {
                                        console.log("Cập nhật thành công", updatepice)
                                    }
                                )
                            }
                        )
                    },
                    error => {
                        console.error('Lỗi:', error);
                    }
                );
                console.log(this.svs);
            }
        );

    }
}
