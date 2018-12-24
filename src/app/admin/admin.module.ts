import {NgModule} from '@angular/core';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {AdminProductsComponent} from './components/admin-products/admin-products.component';
import {AdminOrdersComponent} from './components/admin-orders/admin-orders.component';
import {AdminAuthGuard} from './services/admin-auth.guard';
import {SharedModule} from 'shared/shared.module';
import {RouterModule} from '@angular/router';
import {AuthGuard} from 'shared/services/auth.guard';

@NgModule({
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
    ])
  ],
  providers: [
    AdminAuthGuard,
  ]
})
export class AdminModule { }
