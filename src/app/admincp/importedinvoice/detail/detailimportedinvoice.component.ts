import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-detailimportedinvoice',
    templateUrl: './detailimportedinvoice.component.html',
    styleUrls: [
        '../../../../assets/adminui/css/sb-admin-2.min.css',
        '../../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
        '../../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
    ]
})

export class DetailImportedinvoceComponent implements OnInit {
    id: string = '';
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    databill: any;
    databyid:any;
    ngOnInit(): void {
        // Sử dụng ActivatedRoute để nhận tham số từ URL
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.dulieu();
        });
        this.http.get('http://localhost:3000/api/importedinvoice/getbyid/' + this.id).subscribe(
            (data:any)=>{
                this.databyid = data;
            }
        )
    }
    dulieu() {
        this.http.get('http://localhost:3000/api/importedinvoice/getdetail/' + this.id).subscribe(
            (data: any) => {
                this.databill = data;
            }
        )
    }
    data: any;
    sukien(event: Event, id: number) {
        event.preventDefault();
        const updatepice = {id:id, TongTien: 0}
        if (confirm('Bạn muốn xóa bản ghi này không!')) {
            const url = `http://localhost:3000/api/importedinvoice/detail/delete/${id}`;
            this.http.post(url, {}).subscribe(red => {
                this.dulieu();
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
            });
        }
    }

}
