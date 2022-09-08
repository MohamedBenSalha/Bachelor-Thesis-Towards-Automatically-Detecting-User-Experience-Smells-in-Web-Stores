import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../service/contact.service';
import {NgForm} from '@angular/forms';
import {MatomoTracker} from '@ngx-matomo/tracker';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  error_submit = false;
  response_text: string = '';
  message: string = '';
  email: string = '';
  name: string = '';
  number1: number = 0;
  number2: number = 0;
  sum: undefined;

  constructor(
    private contactService: ContactService,
    private matomoTracker: MatomoTracker
  ) {
  }

  ngOnInit(): void {
    this.number1 = this.getRandomInt(10);
    this.number2 = this.getRandomInt(10);
  }

  submitContact(form: NgForm) {
    let checkBeforeSubmitting = this.getNumberFilledRequiredFields();
    console.log('BEFORE' + checkBeforeSubmitting);
    this.matomoTracker.trackEvent(
      'Form',
      'Before',
      'number_filled_fields',
      checkBeforeSubmitting
    );
    this.contactService
      .sendContactForm(
        this.name,
        this.number1,
        this.number2,
        this.sum,
        this.email,
        this.message
      )
      .subscribe(
        (result) => {
          form.reset();
          this.response_text = result;
          // this.error_submit = true;
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

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  private getNumberFilledRequiredFields(): number {
    let x = 0;
    if (this.email !== null && this.email.length > 0) {
      x++;
    }
    if (this.sum !== null) {
      x++;
    }
    if (this.name !== null && this.name.length > 0) {
      x++;
    }
    if (this.message !== null && this.message.length > 0) {
      x++;
    }
    return x;
  }
}
