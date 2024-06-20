import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


interface size {
    idSize: number, dai: string, rong: string, cao: "", GhiChu: "", idDNT: number
}

@Component({
    selector: 'app-adddetaiproduct',
    templateUrl: './adddetailproduct.compontent.html',
    styleUrls: [
        '../../../../assets/adminui/css/sb-admin-2.min.css',
        '../../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
        '../../../../assets/adminui/vendor/fontawesome-free/css/all.min.css',
        '../../../../assets/homeui/css/style.css'
    ]
})

export class ADDDetailProductComponent {
    id: string = '';
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    color: any = { IDMauSac: 0, MauSac: "", GhiChu: "", code: "" };
    size: any = { idSize: 0, dai: "", rong: "", cao: "", GhiChu: "", idDNT: 0 };
    sizelist: any[] = [];
    colorlist: number[] = [];
    sizeconst: number = 1;
    sizenumber: number[] = Array(this.sizeconst).fill(0).map((x, i) => i);
    detailcolor: any;

    idsize: number = 0;
    idcolor: number = 0;
    depotlist: any[] = [];
    depot: any;

    ngOnInit(): void {
        // Sử dụng ActivatedRoute để nhận tham số từ URL
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.dulieu();
        });
    }
    dulieu() {
        this.http.get("http://localhost:3000/api/color/getall").subscribe(data => { this.color = data });
        this.http.get("http://localhost:3000/api/color/getbyproductid/" + this.id).subscribe((data: any) => { this.detailcolor = data; });
        this.http.get("http://localhost:3000/api/size/getbyid/" + this.id).subscribe((data: any) => { this.size = data; });
        this.http.get("http://localhost:3000/api/depot/getbyproduct/" + this.id).subscribe((data: any) => { this.depot = data; });


        for (let i = 0; i < this.sizeconst; i++) {
            this.sizelist.push({ idSize: 0, dai: "", rong: "", cao: "", GhiChu: "", idDNT: this.id })
        }
    }
    sukien() {
        if (this.sizelist.length == 0) {
            this.sizelist.push({ idSize: 0, dai: "", rong: "", cao: "", GhiChu: "Không có", idDNT: this.id })
        }
        for (let i = 0; i < this.sizelist.length; i++) {
            this.http.post('http://localhost:3000/api/size/create', this.sizelist[i]).subscribe(
                data => {
                    this.http.get('http://localhost:3000/api/size/getbyid/' + this.id).subscribe(
                        data => {
                            this.size = data;
                            this.depotlist = [];
                            for (let i = 0; i < this.size.length; i++) {
                                for (let j = 0; j < this.colorlist.length; j++) {
                                    this.idsize = this.size[i].idSize;
                                    this.idcolor = this.colorlist[j];
                                    this.depotlist.push({ MaDNT: this.id, idSize: this.idsize, idMauSac: this.idcolor, SoLuong: 0 });
                                }
                            }
                            if (i == this.sizelist.length - 1) {
                                this.addDepot();
                            }
                        }
                    );
                },
                error => {
                    console.error('Lỗi:', error);
                }
            );
        };
        this.addColor();
    }

    addDepot() {
        console.log(this.depotlist);
        this.depotlist.forEach((depot: any) => {
            this.http.post('http://localhost:3000/api/depot/create', depot).subscribe(
                data => {
                    console.log('Thêm thành công depot:', data);
                },
                error => {
                    console.error('Lỗi:', error);
                }
            );
        });
    }

    addColor() {
        if (this.colorlist.length == 0) {
            this.colorlist.push(6)
        }

        for (let i = 0; i < this.colorlist.length; i++) {
            let color = { idms: this.colorlist[i], iddnt: this.id }
            console.log(color);
            this.http.post('http://localhost:3000/api/color/createdetail', color).subscribe(
                data => {
                    console.log('Thêm thành công color:', data);
                },
                error => {
                    console.error('Lỗi:', error);
                }
            );
        }
    }

    reloadSizeNumber() {
        this.sizenumber = Array(this.sizeconst).fill(0).map((x, i) => i);
    }

    up() {
        this.sizeconst += 1;
        this.reloadSizeNumber();
        for (let i = 0; i < this.sizeconst; i++) {
            if (this.sizelist.length != this.sizeconst)
                this.sizelist.push({ idSize: 0, dai: "", rong: "", cao: "", GhiChu: "", idDNT: this.id })
        }
    }

    down() {
        if (this.sizeconst > 0) {
            this.sizeconst -= 1;
            this.reloadSizeNumber();
            this.sizelist.splice(this.sizeconst, 1);
        }
    }

    colorcheck(event: any, value: number) {
        if (event.target.checked) {
            // Thêm giá trị vào mảng colorlist nếu checkbox được chọn
            this.colorlist.push(value);
        } else {
            // Xóa giá trị khỏi mảng colorlist nếu checkbox được bỏ chọn
            const index = this.colorlist.indexOf(value);
            if (index !== -1) {
                this.colorlist.splice(index, 1);
            }
        }
    }
}
