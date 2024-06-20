import { Injectable } from '@angular/core';
import { AuthAdminService } from './auth-admin.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate{

  constructor(private authService: AuthAdminService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.IsAuthenticated()) {
      // Người dùng đã đăng nhập, cho phép truy cập
      return true;
    } else {
      // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      this.router.navigateByUrl('/admin/login');
      return false;
    }
  }
}
