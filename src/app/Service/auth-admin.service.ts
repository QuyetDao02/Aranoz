import { Injectable } from '@angular/core';
import { users } from '../Model/usersmodel';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService{
  private isAuthenticated: boolean = false;
  constructor(
  ) { }
  user:users [] = [];

  login(username: string, password: string, users:users[]): boolean {
    
    // Giả sử bạn có một mảng users chứa thông tin người dùng

    // Tìm kiếm người dùng trong mảng
    const user = users.find(u => u.UserName === username && u.Password === password && u.role === 1);
    
    if (user) {
      // Đăng nhập thành công
      this.isAuthenticated = true;
      // Lưu thông tin người dùng vào localStorage hoặc sessionStorage nếu cần
      localStorage.setItem('userAdmin', JSON.stringify(user));
      return true;
    } else {
      // Đăng nhập không thành công
      this.isAuthenticated = false;
      return false;
    }
  }

  logout(): void {
    // Đăng xuất
    this.isAuthenticated = false;
    // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage nếu cần
    localStorage.removeItem('userAdmin');
  }

  IsAuthenticated(): boolean {
    // Kiểm tra trạng thái đăng nhập
    const token = localStorage.getItem('userAdmin');
    return !!token;
  }
  getItems(): users[] {
    const storedCartItems = localStorage.getItem('userAdmin');
    if (storedCartItems) {
      var data = JSON.parse(storedCartItems);
    }
    return data
  }
}
