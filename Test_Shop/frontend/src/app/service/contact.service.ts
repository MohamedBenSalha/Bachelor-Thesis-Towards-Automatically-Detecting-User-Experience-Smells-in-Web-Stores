import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactURL = `${environment.baseURL}api/contact`;

  constructor(private http: HttpClient) {
  }

  sendContactForm(
    username: string,
    first_number: number,
    second_number: number,
    sum: undefined,
    email: string,
    message: string
  ): Observable<string> {
    console.log(first_number);
    const contactData = {
      first_number: first_number,
      second_number: second_number,
      sum: sum,
      message: message,
      username: username,
      email: email,
    };

    console.log('Contact Data:', contactData);

    // @ts-ignore
    return this.http.post(`${this.contactURL}`, contactData, {
      responseType: 'text',
    });
  }
}
