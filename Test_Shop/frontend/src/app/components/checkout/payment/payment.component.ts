import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'src/app/models/user';
import {CartServiceService} from 'src/app/service/cart.service';
import {UserService} from 'src/app/service/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  subTotal: number = 0;
  user!: User;

  constructor(private cartService: CartServiceService, private userService: UserService, private router: Router) {
  }


  ngOnInit(): void {
  }

  endCheckout() {
    this.cartService.removeAll();
    this.router.navigate(['/']);
  }
}
