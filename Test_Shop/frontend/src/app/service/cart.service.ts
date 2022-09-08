import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  public cartItemList: any = [];
  public products = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() {
    this.cartItemList = JSON.parse(localStorage.getItem('items') || '[]')
  }

  getProducts() {
    return this.products.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.products.next(product);
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.products.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.price;
    })

    return grandTotal;
  }

  removeCartItem(product: any) {
    //  this.cartItemList = this.cartItemList.filter((item: { id: any; }) => item.id !== product.id)
    this.cartItemList.map((a: any, index: any) => {
      if (product.productId === a.productId) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.products.next(this.cartItemList)
  }

  removeAllCarts() {
    this.cartItemList = [];
    this.products.next(this.cartItemList);
  }

  removeAll() {
    for (const item of this.cartItemList) {
      const index = this.cartItemList.indexOf(item);
      this.cartItemList.splice(index, 1);
      this.asyncItems();
    }
  }

  remove(item: any) {
    console.log(this.cartItemList.length)
    const index = this.cartItemList.indexOf(item);
    this.cartItemList.splice(index, 1);
    console.log(this.cartItemList.length)
    this.asyncItems();
  }

  add(item: any) {
    this.cartItemList.push(item);
    this.getTotalPrice();
    this.asyncItems();
  }

  getItems() {
    console.log(this.cartItemList.slice(0))
    return this.cartItemList.slice(0);
  }

  asyncItems() {
    localStorage.setItem('items', JSON.stringify(this.cartItemList));
    console.log("GG" + this.cartItemList)
  }
}
