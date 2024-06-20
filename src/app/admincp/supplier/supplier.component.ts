import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: [
    '../../../assets/adminui/css/sb-admin-2.min.css',
    '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/homeui/css/style.css',
    '../../../assets/adminui/css/pagination.css'
  ]
})
export class SupplierComponent {
  constructor(
    private http: HttpClient,
  ) { }

  svs: any;
  p:number = 1;
  items:number = 10;
  ngOnInit() {
    this.loaddata();
  }
  loaddata(){
    this.http.get("http://localhost:3000/api/supplier/getall").subscribe(
      data => { 
        this.svs = data
        this.filteredItems = Array.from(this.svs);
      });
  };
  sukien(event:Event, id : number) {
    event.preventDefault();
    if (confirm('Bạn có muốn xóa bản ghi này không!')) {
      // this.router.navigate(['/product']);
      const url = `http://localhost:3000/api/supplier/delete/${id}`;
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
        item.TenNCC.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.DiaChi.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log(this.filteredItems);
    }
  }
}
