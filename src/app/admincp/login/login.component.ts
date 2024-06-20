import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { users } from 'src/app/Model/usersmodel';
import { Location } from '@angular/common';
import { CartService } from 'src/app/Service/cart.service';
import { AuthAdminService } from 'src/app/Service/auth-admin.service';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../../assets/adminui/css/sb-admin-2.min.css',
    '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class LoginAdminComponent {
  constructor(
    private auth: AuthAdminService,
    private router: Router,
    private http: HttpClient,
    private location:Location,
    private cart:CartService,
  ) { }

  user: users[] = [];

  ngAfterViewInit(): void {
    this.http.get("http://localhost:3000/api/users/getall").subscribe(
      (data: any) => {
        // data.forEach((element:any) => {
        this.user = data;
        console.log(this.user);
        // });
      });
  }

  username: string = "";
  password: string = "";
  content: boolean = true;
  login(): void {
    if (this.auth.login(this.username, this.password, this.user)) {
      console.log('Đăng nhập thành công.');

      this.location.back();
      this.username = "";
      this.password = "";
      this.content = true;

    } else {
      console.log('Đăng nhập không thành công.');
      this.content = false;
    }


  }
}
