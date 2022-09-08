import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {


  user!: User;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    var username = localStorage.getItem("user");
    if (username) {
      this.userService.getUserByName(username).subscribe(res => {
        this.user = res;
        console.log(this.user);
      })
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/"]);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
