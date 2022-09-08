import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  savedToken: any;
  password!: string;
  email!: string;
  token!: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("Passwort wird geändert");
    this.savedToken = localStorage.getItem("token");
    console.log(this.savedToken);
    console.log(this.token);
    if (this.token == this.savedToken) {
      this.userService.updatePasswort(this.password, this.token, this.email).subscribe(res => {
        console.log(res);
      });
      //localStorage.removeItem("token");
    }
  }
}
