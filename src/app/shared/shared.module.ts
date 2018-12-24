import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductQuantityComponent} from 'shared/components/product-quantity/product-quantity.component';
import {ProductCardComponent} from 'shared/components/product-card/product-card.component';
import {AuthService} from 'shared/services/auth.service';
import {AuthGuard} from 'shared/services/auth.guard';
import {UserService} from 'shared/services/user.service';
import {CategoryService} from 'shared/services/category.service';
import {ProductService} from 'shared/services/product.service';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';
import {OrderService} from 'shared/services/order.service';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng4-validators';
import {DataTableModule} from 'angular-6-datatable';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    CommonModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule {
}
