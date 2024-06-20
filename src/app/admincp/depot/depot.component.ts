import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: [
    '../../../assets/adminui/css/sb-admin-2.min.css',
    '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/homeui/css/style.css',
    '../../../assets/adminui/css/pagination.css'
  ]
})
export class DepotComponent implements AfterViewInit{
  depot:any;
  p:number = 1;
  items:number = 10;
  constructor(
    private http: HttpClient
  ){}

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/api/depot/getall').subscribe(
      (data:any) =>{
        this.depot = data;
      }
    );
  }
}
