import {Component, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {MatomoTracker} from '@ngx-matomo/tracker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  response_text = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  username: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  submitted = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private matomoTracker: MatomoTracker,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  openSnackBar() {
    this._snackBar.open('Registrierung war erfoglreich!', 'Schließen', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  save(form: NgForm) {
    let checkBeforeSubmitting = this.getNumberFilledRequiredFields();
    console.log('BEFORE' + checkBeforeSubmitting);
    this.matomoTracker.trackEvent(
      'Form',
      'Before',
      'number_filled_fields',
      checkBeforeSubmitting
    );
    this.userService
      .createUser(
        this.username,
        this.email,
        this.firstName,
        this.lastName,
        this.password
      )
      .subscribe(
        (data) => {
          form.reset();
          console.log(data);
          this.gotoList();
        },
        (error: HttpErrorResponse) => {
          form.reset();
          this.response_text = error.error;
          let checkAfterSubmittingError = this.getNumberFilledRequiredFields();
          console.log('AFTER' + checkAfterSubmittingError);
          this.matomoTracker.trackEvent(
            'Form',
            'After',
            'number_filled_fields',
            checkAfterSubmittingError
          );
        }
      );
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.save(form);
  }

  gotoList() {
    this.router.navigate(['/products']);
  }

  private getNumberFilledRequiredFields(): number {
    let x = 0;
    if (this.email !== null && this.email.length > 0) {
      x++;
    }
    if (this.username !== null && this.username.length > 0) {
      x++;
    }
    if (this.firstName !== null && this.firstName.length > 0) {
      x++;
    }
    if (this.password !== null && this.password.length > 0) {
      x++;
    }
    if (this.lastName !== null && this.lastName.length > 0) {
      x++;
    }
    return x;
  }
}
