import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';

@Component({
  selector: 'app-createnews',
  templateUrl: './createnews.component.html',
  styleUrls: [
    '../../../assets/adminui/css/sb-admin-2.min.css',
    '../../../assets/adminui/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/adminui/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class CreatenewsComponent implements AfterViewInit{
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  editorConfig: AngularEditorConfig = {
    editable: true, // Cho phép hoặc không cho phép chỉnh sửa
    spellcheck: true, // Kiểm tra chính tả
    height: '100px', // Chiều cao của trình soạn thảo
    minHeight: '0', // Chiều cao tối thiểu
    maxHeight: 'auto', // Chiều cao tối đa
    width: 'auto', // Chiều rộng của trình soạn thảo
    minWidth: '0', // Chiều rộng tối thiểu
    translate: 'yes', // Dịch văn bản
    enableToolbar: true, // Cho phép thanh công cụ
    showToolbar: true, // Hiển thị thanh công cụ
    placeholder: 'Nhập mô tả', // Placeholder của trình soạn thảo
    defaultParagraphSeparator: 'p', // Thẻ HTML sẽ được sử dụng cho các đoạn văn bản mới
    defaultFontName: 'Arial', // Phông chữ mặc định
    defaultFontSize: '3', // Kích thước chữ mặc định
    fonts: [{ class: 'arial', name: 'Arial' }], // Danh sách các phông chữ
    customClasses: [
      // Danh sách các lớp tùy chỉnh
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'red-text',
      },
      {
        name: 'titleText',
        class: 'title-text',
        tag: 'h1', // Thẻ HTML cho lớp này
      },
    ],
    sanitize: true, // Loại bỏ HTML không an toàn
    toolbarPosition: 'top', // Vị trí thanh công cụ ('top' hoặc 'bottom')
    toolbarHiddenButtons: [
      ['bold', 'italic', 'underline'], // Các nút thanh công cụ bị ẩn
      ['subscript', 'superscript'],
    ],
  };
  svs: any = { MaTT: 0, TieuDe: "", Anh: "", NoiDung: "", NgayDang: "", MaNV: 0 };
  selectedFile: any;
  imageSrc: any;
  staff:any;

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/api/users/getallstaff').subscribe(
      data => {
        this.staff = data;
      },
      error => {
        console.error('Lỗi:', error);
      }
    );
  }

  sukien() {
    this.http.post('http://localhost:3000/api/news/create', this.svs).subscribe(
      data => {
        console.log('Thêm thành công:', data);
        alert("Thêm thành công");
        this.router.navigate(['/admin/news']);
      },
      error => {
        console.error('Lỗi:', error);
      }
    );
  }
  upfile(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.http.post("http://localhost:3000/upload", formData).subscribe((response: any) => {
        let path = response.url;
        this.imageSrc = "http://localhost:3000/" + path;
        this.svs.Anh = path;
      }, (error) => {
        console.error(error);
      })
    }
  }
}
