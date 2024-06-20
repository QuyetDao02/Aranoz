import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminlayoutComponent } from './shared/adminlayout/adminlayout.component';
import { CategoryComponent } from './admincp/category/category.component';
import { CreateCategoryComponent } from './admincp/category/createcategory.component';
import { UpdateCategoryComponent } from './admincp/category/updatecategory.component';
import { ProductComponent } from './admincp/product/product.component';
import { CreateProductComponent } from './admincp/product/createproduct.component';
import { UpdateProductComponent } from './admincp/product/updateproduct.component';
import { BillofsaleComponent } from './admincp/billofsale/billofsale.component';
import { DetailBillComponent } from './admincp/billofsale/detailbill.component';
import { SupplierComponent } from './admincp/supplier/supplier.component';
import { CreateSupplierComponent } from './admincp/supplier/createsupplier.component';
import { UpdateSupplierComponent } from './admincp/supplier/updatesupplier.component';
import { UpdateCompanyComponent } from './admincp/company/updatecompany.component';
import { CreateCompanyComponent } from './admincp/company/createcompany.component';
import { CompanyComponent } from './admincp/company/company.component';
import { ImportedinvoiceComponent } from './admincp/importedinvoice/importedinvoice.component';
import { DetailImportedinvoceComponent } from './admincp/importedinvoice/detail/detailimportedinvoice.component';
import { CreateDetailImportedComponent } from './admincp/importedinvoice/detail/createdetailimportedinvoice.component';
import { CreateImportedInvoiceComponent } from './admincp/importedinvoice/createimportedinvoice.component';
import { HomelayoutComponent } from './shared/homelayout/homelayout.component';
import { IndexComponent } from './home/index/index.component';
import { DetailComponent } from './home/detail/detail.component';
import { CategoryUserComponent } from './home/category/category.component';
import { CartComponent } from './home/cart/cart.component';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { BlogComponent } from './home/blog/blog.component';
import { ColorComponent } from './admincp/color/color.component';
import { CreateColorComponent } from './admincp/color/createcolor.component';
import { UpdateColorComponent } from './admincp/color/updatecolor.component';
import { SizeComponent } from './admincp/size/size.component';
import { CreateSizeComponent } from './admincp/size/createsize.component';
import { UpdatesizeComponent } from './admincp/size/updatesize.component';
import { LoginComponent } from './home/login/login.component';
import { DetailBlogComponent } from './home/blog/detailblog.component';
import { NewsComponent } from './admincp/news/news.component';
import { CreatenewsComponent } from './admincp/news/createnews.component';
import { UpdatenewsComponent } from './admincp/news/updatenews.component';
import { LoginAdminComponent } from './admincp/login/login.component';
import { AuthGuardService } from './Service/auth-guard.service';
import { AuthGuardAdminService } from './Service/auth-guard-admin.service';
import { DetailProductComponent } from './admincp/product/detailproduct.compontent';
import { ADDDetailProductComponent } from './admincp/product/AddDetailProduct/adddetailproduct.compontent';
import { SignupComponent } from './home/account/signup.component';
import { SearchComponent } from './home/category/search.component';
import { StatisticalComponent } from './admincp/statistical/statistical.component';
import { DepotComponent } from './admincp/depot/depot.component';


const routes: Routes = [
  {
    path:"admin",
    component:AdminlayoutComponent,
    canActivate:[AuthGuardAdminService],
    children:[
      {
        path:"category",
        component:CategoryComponent
      },
      {
        path:"category/create",
        component:CreateCategoryComponent
      },      {
        path:"category/update/:id",
        component:UpdateCategoryComponent
      },
      {
        path:"product",
        component:ProductComponent
      },
      {
        path:"product/create",
        component:CreateProductComponent
      },      
      {
        path:"product/update/:id",
        component:UpdateProductComponent
      },
      {
        path:"product/detail/:id",
        component:DetailProductComponent
      },
      {
        path:"product/detail/create/:id",
        component:ADDDetailProductComponent
      },
      {
        path:"billofsale/:id",
        component:BillofsaleComponent
      },      {
        path:"billofsale/detail/:id",
        component:DetailBillComponent
      },
      {
        path:"supplier",
        component:SupplierComponent
      },
      {
        path:"supplier/create",
        component:CreateSupplierComponent
      },      {
        path:"supplier/update/:id",
        component:UpdateSupplierComponent
      },
      {
        path:"company",
        component:CompanyComponent
      },
      {
        path:"company/create",
        component:CreateCompanyComponent
      },      {
        path:"company/update/:id",
        component:UpdateCompanyComponent
      },
      {
        path:"importedinvoice/:id",
        component:ImportedinvoiceComponent
      },
      {
        path:"importedinvoice/data/create",
        component:CreateImportedInvoiceComponent
      },
      {
        path:"importedinvoice/detail/:id",
        component:DetailImportedinvoceComponent
      },
      {
        path:"importedinvoice/detail/create/:id",
        component:CreateDetailImportedComponent
      },
      {
        path:"color",
        component:ColorComponent
      },
      {
        path:"color/create",
        component:CreateColorComponent
      },      {
        path:"color/update/:id",
        component:UpdateColorComponent
      },
      {
        path:"size",
        component:SizeComponent
      },
      {
        path:"size/create",
        component:CreateSizeComponent
      },      {
        path:"size/update/:id",
        component:UpdatesizeComponent
      },
      {
        path:"news",
        component:NewsComponent
      },
      {
        path:"news/create",
        component:CreatenewsComponent
      },      {
        path:"news/update/:id",
        component:UpdatenewsComponent
      },
      {
        path:"statistical",
        component:StatisticalComponent
      },
      {
        path:"depot",
        component:DepotComponent
      },
    ]
  },
  {
    path:"admin/login",
    component:LoginAdminComponent,
  },
  {
    path:"user",
    component:HomelayoutComponent,
    children:[
      {
        path:"index",
        component:IndexComponent
      },
      {
        path:"detail/:id",
        component:DetailComponent
      },
      {
        path:"category/:id",
        component:CategoryUserComponent
      },
      {
        path:"cart",
        component:CartComponent,
        canActivate:[AuthGuardService]
      },{
        path:"checkout",
        component:CheckoutComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:"blog",
        component:BlogComponent
      },
      {
        path:"blog/detail/:id",
        component:DetailBlogComponent
      },
      {
        path:"login",
        component:LoginComponent,
      },
      {
        path:"signup",
        component:SignupComponent,
      },
      {
        path:"search",
        component:SearchComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
