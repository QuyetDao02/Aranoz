import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { loaidonoithat } from 'src/app/Model/loaidonoithat.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: [
    '../../../assets/adminui/css/sb-admin-2.min.css',
    '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/homeui/css/style.css',
    '../../../assets/adminui/css/pagination.css'
  ]
})
export class CategoryComponent implements OnInit {
  constructor(
    private http: HttpClient,
  ) { }
  p: number = 1;
  items: number = 10;
  svs: loaidonoithat[] = [];
  ngOnInit() {
    this.loaddata();
  }
  loaddata() {
    this.http.get("http://localhost:3000/api/category/getall").subscribe(
      (data: any) => {
        this.svs = data;
        this.filteredItems = Array.from(this.svs);
        console.log(this.filteredItems);
      });
  }
  sukien(categoryId: number, event: Event) {
    event.preventDefault();
    if (confirm('Bạn muốn xóa bản ghi này không!')) {
      const url = `http://localhost:3000/api/category/delete/${categoryId}`;
      this.http.post(url, {}).subscribe(red => {
        this.loaddata();
      });
    }
  }
  filteredItems: loaidonoithat[] = [];

  searchTerm: string = "";

  search() {
    if (this.searchTerm == "") {
      this.filteredItems = Array.from(this.svs);
    }
    else {
      this.filteredItems = this.svs.filter((item: loaidonoithat) =>
        item.TenLDNT.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.MoTa.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log(this.filteredItems);
    }
  }
}
