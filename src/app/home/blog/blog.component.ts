import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['../../../assets/homeui/css/style.css',]
})
export class BlogComponent implements AfterViewInit{
  constructor(
    private http: HttpClient
  ){}
  ngAfterViewInit(): void {
    var src = [
      "assets/homeui/js/jquery-1.12.1.min.js",
      "assets/homeui/js/popper.min.js",
      "assets/homeui/js/bootstrap.min.js",
      "assets/homeui/js/jquery.magnific-popup.js",
      "assets/homeui/js/swiper.min.js",
      "assets/homeui/js/masonry.pkgd.js",
      "assets/homeui/js/owl.carousel.min.js",
      "assets/homeui/js/jquery.nice-select.min.js",
      "assets/homeui/js/slick.min.js",
      "assets/homeui/js/jquery.counterup.min.js",
      "assets/homeui/js/waypoints.min.js",
      "assets/homeui/js/contact.js",
      "assets/homeui/js/jquery.ajaxchimp.min.js",
      "assets/homeui/js/jquery.form.js",
      "assets/homeui/js/jquery.validate.min.js",
      "assets/homeui/js/mail-script.js",
      "assets/homeui/js/custom.js",
    ];
    src.forEach(element => {
      var the = document.createElement('script');
      the.src = element;
      the.type = 'text/javascript';
      the.async = true;
      document.getElementsByTagName('head')[0].appendChild(the);
    });
    this.data();
  }

  svs:any;
  category:any;
  data(){
    this.http.get('http://localhost:3000/api/news/getall').subscribe(data=>{this.svs=data})
    this.http.get('http://localhost:3000/api/category/getall').subscribe(data=>{this.category=data})
  
  }
}
