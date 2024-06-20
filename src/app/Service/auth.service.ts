import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { users } from '../Model/usersmodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private isAuthenticated: boolean = false;
  constructor(
    private http:HttpClient
  ) { }
  user:users [] = [];

  login(username: string, password: string, users:users[]): boolean {
    
    // Giả sử bạn có một mảng users chứa thông tin người dùng
    console.log(username);
    console.log(password);
    // Tìm kiếm người dùng trong mảng
    const user = users.find(u => u.UserName === username && u.Password === password && u.role === 0);

    if (user) {
      // Đăng nhập thành công
      this.isAuthenticated = true;
      // Lưu thông tin người dùng vào localStorage hoặc sessionStorage nếu cần
      localStorage.setItem('user', JSON.stringify(user));
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
    localStorage.removeItem('user');
  }

  IsAuthenticated(): boolean {
    // Kiểm tra trạng thái đăng nhập
    const token = localStorage.getItem('user');
    return !!token;
  }
  getItems(): users[] {
    const storedCartItems = localStorage.getItem('user');
    if (storedCartItems) {
      var data = JSON.parse(storedCartItems);
    }
    return data
  }
}



