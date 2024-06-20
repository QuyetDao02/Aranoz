import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/Service/auth-admin.service';

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: [
    '../../../assets/adminui/css/sb-admin-2.min.css',
    '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class AdminlayoutComponent {
  constructor(
    private renderer:Renderer2, 
    private auth:AuthAdminService,
    private router:Router
    ){}
  // ngOnInit(): void {
  //   const scriptElements = [
  //     "assets/adminui/vendor/jquery/jquery.min.js",
  //     "assets/adminui/vendor/bootstrap/js/bootstrap.bundle.min.js",
  //     "assets/adminui/vendor/jquery-easing/jquery.easing.min.js",
  //     "assets/adminui/js/sb-admin-2.min.js",
  //   ];

  //   scriptElements.forEach(script => {
  //     const node = document.createElement('script');
  //     node.src = script;
  //     node.type = 'text/javascript';
  //     node.async = true;
  //     document.getElementsByTagName('head')[0].appendChild(node);
  //   });
  // }
  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/admin/login')
  }
}
