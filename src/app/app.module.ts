import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';

import {LoginComponent} from './core/components/login/login.component';
import {AdminAuthGuard} from './admin/services/admin-auth.guard';
import {SharedModule} from 'shared/shared.module';
import {AdminModule} from './admin/admin.module';
import {ProductsComponent} from './shopping/components/products/products.component';
import {ShoppingModule} from './shopping/shopping.module';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'login', component: LoginComponent},
    ])
  ],
  providers: [
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
