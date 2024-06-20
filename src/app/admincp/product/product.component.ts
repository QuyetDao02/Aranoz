import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [
    '../../../assets/adminui/css/sb-admin-2.min.css',
    '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/homeui/css/style.css',
    '../../../assets/adminui/css/pagination.css'
  ]
})
export class ProductComponent {
  constructor(private http: HttpClient, private router: Router, private renderer:Renderer2) { }
  svs: any [] = [];
  ldnt: any;
  p:number = 1;
  items:number = 10;
  ngOnInit() {
    this.loaddata()
  }

  loaddata(){
    this.http.get("http://localhost:3000/api/product/getalladmin").subscribe(
      (data:any) => { 
        this.svs = data 
        this.filteredItems = Array.from(this.svs);
      });
    
  }
  sukien(event:Event,id: number) {
    event.preventDefault();
    if (confirm('Bạn có muốn xóa bản ghi này không!')) {
      // this.router.navigate(['/product']);
      const url = `http://localhost:3000/api/product/delete/${id}`;
      this.http.post(url, {}).subscribe((res)=>{
        this.loaddata();
      });
    
    }
  }
  filteredItems: any [] = [];

  searchTerm: string = "";

  search() {
    if (this.searchTerm == "") {
      this.filteredItems = Array.from(this.svs);
    }
    else {
      this.filteredItems = this.svs.filter((item: any) =>
        item.TenDNT.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.TenLDNT.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log(this.filteredItems);
    }
  }
}
