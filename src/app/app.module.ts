import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './admincp/category/category.component';
import { ProductComponent } from './admincp/product/product.component';
import { BillofsaleComponent } from './admincp/billofsale/billofsale.component';
import { SupplierComponent } from './admincp/supplier/supplier.component';
import { ImportedinvoiceComponent } from './admincp/importedinvoice/importedinvoice.component';
import { CompanyComponent } from './admincp/company/company.component';
import { AdminlayoutComponent } from './shared/adminlayout/adminlayout.component';
import { HomelayoutComponent } from './shared/homelayout/homelayout.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateCategoryComponent } from './admincp/category/createcategory.component';
import { UpdateCategoryComponent } from './admincp/category/updatecategory.component';
import { CreateProductComponent } from './admincp/product/createproduct.component';
import { UpdateProductComponent } from './admincp/product/updateproduct.component';
import { DetailBillComponent } from './admincp/billofsale/detailbill.component';
import { CreateSupplierComponent } from './admincp/supplier/createsupplier.component';
import { UpdateSupplierComponent } from './admincp/supplier/updatesupplier.component';
import { CreateCompanyComponent } from './admincp/company/createcompany.component';
import { UpdateCompanyComponent } from './admincp/company/updatecompany.component';
import { DetailImportedinvoceComponent } from './admincp/importedinvoice/detail/detailimportedinvoice.component';
import { CreateDetailImportedComponent } from './admincp/importedinvoice/detail/createdetailimportedinvoice.component';
import { CreateImportedInvoiceComponent } from './admincp/importedinvoice/createimportedinvoice.component';
import { ColorComponent } from './admincp/color/color.component';
import { IndexComponent } from './home/index/index.component';
import { CategoryUserComponent } from './home/category/category.component';
import { BlogComponent } from './home/blog/blog.component';
import { CartComponent } from './home/cart/cart.component';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { CartService } from './Service/cart.service';
import { CreateColorComponent } from './admincp/color/createcolor.component';
import { UpdateColorComponent } from './admincp/color/updatecolor.component';
import { SizeComponent } from './admincp/size/size.component';
import { UpdatesizeComponent } from './admincp/size/updatesize.component';
import { CreateSizeComponent } from './admincp/size/createsize.component';
import { LoginComponent } from './home/login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NewsComponent } from './admincp/news/news.component';
import { CreatenewsComponent } from './admincp/news/createnews.component';
import { UpdatenewsComponent } from './admincp/news/updatenews.component';
import { DetailnewsComponent } from './admincp/news/detailnews.component';
import { TruncateTextPipe } from './TruncateText/truncate-text.pipe';
import { AuthService } from './Service/auth.service';
import { AuthGuardService } from './Service/auth-guard.service';
import { LoginAdminComponent } from './admincp/login/login.component';
import { AuthAdminService } from './Service/auth-admin.service';
import { AuthGuardAdminService } from './Service/auth-guard-admin.service';
import { DetailComponent } from './home/detail/detail.component';
import { CommonModule, DatePipe } from '@angular/common';
import { DetailProductComponent } from './admincp/product/detailproduct.compontent';
import { ADDDetailProductComponent } from './admincp/product/AddDetailProduct/adddetailproduct.compontent';
import { SignupComponent } from './home/account/signup.component';
import { SearchComponent } from './home/category/search.component';
import { StatisticalComponent } from './admincp/statistical/statistical.component';
import { DepotComponent } from './admincp/depot/depot.component';



@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductComponent,
    BillofsaleComponent,
    SupplierComponent,
    ImportedinvoiceComponent,
    CompanyComponent,
    AdminlayoutComponent,
    HomelayoutComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    CreateProductComponent,
    UpdateProductComponent,
    DetailBillComponent,
    CreateSupplierComponent,
    UpdateSupplierComponent,
    CreateCompanyComponent,
    UpdateCompanyComponent,
    DetailImportedinvoceComponent,
    CreateDetailImportedComponent,
    CreateImportedInvoiceComponent,
    ColorComponent,
    IndexComponent,
    DetailComponent,
    CategoryUserComponent,
    BlogComponent,
    CartComponent,
    CheckoutComponent,
    CreateColorComponent,
    UpdateColorComponent,
    SizeComponent,
    UpdatesizeComponent,
    CreateSizeComponent,
    LoginComponent,
    HomelayoutComponent,
    NewsComponent,
    CreatenewsComponent,
    UpdatenewsComponent,
    DetailnewsComponent,
    TruncateTextPipe,
    LoginAdminComponent,
    DetailProductComponent,
    ADDDetailProductComponent,
    SignupComponent,
    SearchComponent,
    StatisticalComponent,
    DepotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AngularEditorModule,
    CommonModule,
  ],
  providers: [
    CartService,
    AuthService,
    AuthGuardService,
    AuthAdminService,
    AuthGuardAdminService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
