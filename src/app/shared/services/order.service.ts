import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ShoppingCartService} from './shopping-cart.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) {
  }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(): Observable<any> {
    let ordersRef = this.db.list('/orders');
    let orders$ = ordersRef.snapshotChanges().pipe(
      map(orders => {
        return orders.map((o: any) => (
          {
            datePlaced: o.payload.val().datePlaced,
            items: o.payload.val().items,
            shipping: o.payload.val().shipping,
            userId: o.payload.val().userId,
          }
        ));
      })
    );
    return orders$;
  }

  getOrderByUser(userId: string) {
    let ordersRef = this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId));

    let orders$ = ordersRef.snapshotChanges().pipe(
      map(orders => {
        return orders.map((o: any) => (
          {
            datePlaced: o.payload.val().datePlaced,
            items: o.payload.val().items,
            shipping: o.payload.val().shipping,
            userId: o.payload.val().userId,
          }
        ));
      })
    );
    return orders$;
  }
}
