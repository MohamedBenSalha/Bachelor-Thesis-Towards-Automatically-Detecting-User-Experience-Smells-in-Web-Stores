import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from 'src/app/http.service';
import {CartServiceService} from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  /*carts: any;
  cartDetails: any;*/

  public products: any = [];
  public grandTotal: number = 0;
  cartPicture = "assets/bilder/AOMMI_Cart.png"

  constructor(private http: HttpService, private cartService: CartServiceService, private router: Router, private route: ActivatedRoute) {
  }

  /*_getCart(): void {
    this.http.getCartItems().subscribe((data: any) =>{
      this.carts = data.data;
      //this.cartDetails = data.data;

      console.log(this.carts);
    });
  }

  _increamentQTY(id: any, quantity: any): void {
    const payload = {
      productId: id,
      quantity,
    };
    this.http.increaseQuantity(payload).subscribe(() =>{
      this._getCart();
      alert('Product Added');
    });
  }

  _emptyCart(): void {
    this.http.emptyCart().subscribe(() =>{
      this._getCart();
      alert('Cart Emptied');
    })
  }

  ngOnInit(): void {
    this._getCart();
  }*/

  ngOnInit(): void {
    this.products = this.cartService.getItems();
    this.grandTotal = this.cartService.getTotalPrice();
  }

  removeItem(item: any) {
    this.cartService.remove(item);
    let currentURL = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentURL]);
  }

  emptyCart() {
    this.cartService.removeAll();
    let currentURL = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentURL]);
  }

  startCheckout() {
    if (localStorage.getItem("user")) {
      this.router.navigate(["/checkout"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }


}
