import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from 'src/app/service/user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName!: string;
  passwort!: string;
  hide = true;
  loginFailed = false;
  submitted = false;
  status: string = '';
  response: any;

  constructor(
    private formBulider: UntypedFormBuilder,
    private router: Router,
    private activeedRoute: ActivatedRoute,
    private userService: UserService,
    private cookieService: CookieService
  ) {
  }

  /*login(){
   this.userService.login(this.userName, this.passwort).subscribe((data: any)=>{
     this.status = data["status"];
     if (this.status == true){
       this.router.navigate(["/products"]);
     }
     console.log(data);
     //this.gotoList();
   })
 }*/

  login() {
    this.userService.login(this.userName, this.passwort).subscribe(
      (res) => {
        // this.status = this.response.result;
        console.log(res);
        console.log(this.status);
        // if (this.status) {
        //   localStorage.setItem('user', this.userName);
        //   this.router.navigate(['/account']);
        // }
        // this.submitted = true;
        localStorage.setItem('user', this.userName);
        this.router.navigate(['/account']);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.response = err.error;
        this.loginFailed = true;
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.login();
  }

  gotoList() {
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
    console.log('Referrer' + document.referrer);
  }
}
