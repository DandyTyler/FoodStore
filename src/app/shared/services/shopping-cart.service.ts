import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {catchError, map, take} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ShoppingCart} from '../models/shopping-cart';
import {Product} from 'shared/models/product';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
      map((c: any) => new ShoppingCart(c.items)),
      catchError(this.handleError)
    );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
    // item$.valueChanges().pipe(take(1)).subscribe(item => {
    //   item$.update({product: product, quantity: (item.quantity || 0) + 1});
    // });
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object(/shopping-carts/ + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {

      if (item) {
        let itemQuantity = item.quantity;
        if (itemQuantity === 0 && change < 0) item$.remove();
        else {
          item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: item.quantity + change
          });
        }
      }
      else
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1
        });
    });
  }

  handleError(error) {
    localStorage.removeItem('cartId');
    return throwError('Cart with this cartId was removed from database');
  }

}
