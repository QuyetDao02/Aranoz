import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: [
    '../../../assets/adminui/css/sb-admin-2.min.css',
    '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/homeui/css/style.css',
    '../../../assets/adminui/css/pagination.css'
  ]
})
export class ColorComponent {
  constructor(
    private http: HttpClient,
  ) { }
  stt:number = 0;
  svs: any;
  p:number = 1;
  items:number = 10;
  ngOnInit() {
    this.loaddata();
  }
  loaddata(){
    this.http.get("http://localhost:3000/api/color/getall").subscribe(data => { this.svs = data; console.log(this.svs)});
  }
  sukien(id : number, event:Event) {
    event.preventDefault();
   if(confirm('Bạn muốn xóa bản ghi này không!')){
    const url = `http://localhost:3000/api/color/delete/${id}`;
    this.http.post(url, {}).subscribe(red=>{
      this.loaddata();
    });
   }
  }
}
