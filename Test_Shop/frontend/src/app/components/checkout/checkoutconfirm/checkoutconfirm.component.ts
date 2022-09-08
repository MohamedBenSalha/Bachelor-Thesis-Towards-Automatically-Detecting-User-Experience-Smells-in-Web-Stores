import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'src/app/models/user';
import {CartServiceService} from 'src/app/service/cart.service';
import {OrderService} from 'src/app/service/order.service';
import {UserService} from 'src/app/service/user.service';

@Component({
  selector: 'app-checkoutconfirm',
  templateUrl: './checkoutconfirm.component.html',
  styleUrls: ['./checkoutconfirm.component.css']
})
export class CheckoutconfirmComponent implements OnInit {

  subTotal: number = 0;
  user!: User;
  name: string = '';
  lastName: string = '';
  land: string = '';
  adresse: string = '';
  stadt: string = '';
  plz: string = '';
  telnummer: string = '';
  email: string = '';
  orderNotes: string = '';
  response: any;
  private productList: any = [];

  constructor(private cartService: CartServiceService, private userService: UserService, private orderService: OrderService, private router: Router) {
    this.productList = JSON.parse(localStorage.getItem('items') || '[]')
  }

  ngOnInit(): void {
    this.subTotal = this.cartService.getTotalPrice();
    var username = localStorage.getItem("user");
    if (username) {
      this.userService.getUserByName(username).subscribe(res => {
        this.user = res;
        console.log(this.user);
      })
    }
  }

  startPayment() {
    console.log(this.name, this.lastName, this.land, this.adresse, this.stadt, this.plz, this.telnummer, this.email, this.orderNotes, this.subTotal, this.productList);
    this.orderService.createOrder(this.name, this.lastName, this.land, this.adresse, this.stadt, this.plz, this.telnummer, this.email, this.orderNotes, this.subTotal, this.productList).subscribe(res => {
      this.response = res;
      console.log(this.response);
    });
    this.router.navigate(["/checkout/payment"]);
  }

}
