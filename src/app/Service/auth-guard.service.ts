import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.IsAuthenticated()) {
      // Người dùng đã đăng nhập, cho phép truy cập
      return true;
    } else {
      // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      this.router.navigateByUrl('/user/login');
      return false;
    }
  }
}


