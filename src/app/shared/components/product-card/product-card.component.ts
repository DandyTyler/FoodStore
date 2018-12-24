import {Component, Input} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {Product} from '../../models/product';
import {ShoppingCart} from '../../models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }

  addToCart() {
    // localStorage.removeItem('cartId');
    this.cartService.addToCart(this.product);
  }
}
