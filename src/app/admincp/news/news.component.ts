import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: [
    '../../../assets/adminui/css/sb-admin-2.min.css',
    '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/homeui/css/style.css',
    '../../../assets/adminui/css/pagination.css'
  ]
})
export class NewsComponent {
  constructor(
    private http:HttpClient
  ){}
  svs:any;
  p:number = 1;
  items:number = 10;
  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/news/getall').subscribe(data=>{this.svs=data})
  }
  sukien(id : number, event:Event) {
    event.preventDefault();
   if(confirm('Bạn muốn xóa bản ghi này không!')){
    const url = `http://localhost:3000/api/news/delete/${id}`;
    this.http.post(url, {}).subscribe(red=>{
      this.ngOnInit();
    });
   }
  }
  
}
