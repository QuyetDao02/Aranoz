import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: [
    '../../../assets/adminui/css/sb-admin-2.min.css',
    '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/homeui/css/style.css',
    '../../../assets/adminui/css/pagination.css'
  ]
})
export class CompanyComponent {
  constructor(private http: HttpClient) { }
  svs: any;
  ldnt: any;
  p:number = 1;
  items:number = 10;
  ngOnInit() {
    this.loaddata()
  }

  loaddata(){
    this.http.get("http://localhost:3000/api/company/getall").subscribe(
      data => { 
        this.svs = data;
        this.filteredItems = Array.from(this.svs);
      });
    
  }
  sukien(event:Event,id: number) {
    event.preventDefault();
    if (confirm('Bạn có muốn xóa bản ghi này không!')) {
      const url = `http://localhost:3000/api/company/delete/${id}`;
      this.http.post(url, {}).subscribe((res)=>{
        this.loaddata();
      });
    
    }
  }
  filteredItems: any[] = [];

  searchTerm: string = "";

  search() {
    if (this.searchTerm == "") {
      this.filteredItems = Array.from(this.svs);
    }
    else {
      this.filteredItems = this.svs.filter((item: any) =>
        item.tenhang.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.diachi.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log(this.filteredItems);
    }
  }
}
