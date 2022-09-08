import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from 'src/app/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  response: any;
  token: any;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate(['error'], {skipLocationChange: true});
  }

  onSubmit(f: NgForm) {
    this.userService.resetPasswort(f.value).subscribe((res) => {
      this.response = res;
      this.token = this.response.token;
      if (this.token) {
        localStorage.setItem('token', this.token);
      }
    });
  }
}
