import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [
    '../../../assets/homeui/css/style.css',
  ]
})
export class IndexComponent implements AfterViewInit {
  constructor(
    private http: HttpClient
  ) { }
  svs: any;
  slide: any;
  price: any;
  newproduct: any;
  phongkhach:any;
  phongngu:any;
  ngAfterViewInit(): void {
    this.loadScript()
    this.http.get("http://localhost:3000/api/product/getall").subscribe(
      (data: any) => {
        this.svs = data
      });
    this.http.get("http://localhost:3000/api/news/getall").subscribe(
      data => {
        this.slide = data
      }
    );
    this.http.get("http://localhost:3000/api/product/productnew").subscribe(
      (data: any) => {
        this.newproduct = data
      });
    this.http.get("http://localhost:3000/api/product/getcategorybyid/1").subscribe(
      (data: any) => {
        this.phongkhach = data
      })
    this.http.get("http://localhost:3000/api/product/getcategorybyid/6").subscribe(
      (data: any) => {
        this.phongngu = data
      });
  }
  private loadScript() {
    const scriptElements = [
      'assets/homeui/js/jquery-1.12.1.min.js',
      'assets/homeui/js/popper.min.js',
      'assets/homeui/js/bootstrap.min.js',
      'assets/homeui/js/jquery.magnific-popup.js',
      'assets/homeui/js/contact.js',
      'assets/homeui/js/swiper.min.js',
      'assets/homeui/js/masonry.pkgd.js',
      'assets/homeui/js/owl.carousel.min.js',
      'assets/homeui/js/jquery.nice-select.min.js',
      'assets/homeui/js/slick.min.js',
      'assets/homeui/js/jquery.counterup.min.js',
      'assets/homeui/js/waypoints.min.js',
      'assets/homeui/js/jquery.ajaxchimp.min.js',
      'assets/homeui/js/jquery.form.js',
      'assets/homeui/js/jquery.validate.min.js',
      'assets/homeui/js/mail-script.js',
      'assets/homeui/js/custom.js'
    ];

    scriptElements.forEach(script => {
      const node = document.createElement('script');
      node.src = script;
      node.type = 'text/javascript';
      node.async = true;
      document.getElementsByTagName('head')[0].appendChild(node);
    });
  }
}
