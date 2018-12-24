import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {AppUser} from '../models/app-user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {
  }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<any> {
    let productsRef = this.db.list('products');
    let products$ = productsRef.snapshotChanges().pipe(
      map(products => {
        return products.map((p: any) => (
          {
            key: p.payload.key,
            // payload: p.payload,
            title: p.payload.val().title,
            price: p.payload.val().price,
            category: p.payload.val().category,
            imageUrl: p.payload.val().imageUrl
          }
        ));
      })
    );
    return products$;
  }

  get(productId): Observable<any> {
    return this.db.object('products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
