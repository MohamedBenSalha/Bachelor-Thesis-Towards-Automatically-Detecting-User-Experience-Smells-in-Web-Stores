import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  response: any;
  status: string | undefined;
  private baseUrl = `${environment.baseURL}api/users`;
  private loginURL = `${environment.baseURL}api/login`;
  private resetURL = `${environment.baseURL}api/resetPasswort`;
  private changeURL = `${environment.baseURL}api/changePassword`;

  constructor(private http: HttpClient) {
  }

  getUserByName(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`);
  }

  login(username: string, password: string) {
    const loginCredentials = {username, password};
    console.log('login credentials', loginCredentials);
    //return this.http.post(`${this.loginURL}`, loginCredentials);
    //return this.http.post(`${this.loginURL}`,username);
    return this.http.post(`${this.loginURL}`, loginCredentials, {
      responseType: 'text',
    });
    /**.pipe(
     map((response: any) => {
              const user = response;
              if (user.result.succeeded) {
                localStorage.setItem("token", user.token);
                localStorage.setItem("user", JSON.stringify(user.userToReturn));
              }
            })
     );**/
  }

  /**login(username: string, password: string) {
        return this.http.get(`${this.baseUrl}/${username}/${password}`)
    }**/

  isLoggedIn() {
    localStorage.getItem('user');
  }

  createUser(
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Observable<Object> {
    const contactData = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      userName: username,
      email: email,
    };
    return this.http.post(`${this.baseUrl}`, contactData, {
      responseType: 'text',
    });
  }

  resetPasswort(email: string) {
    return this.http.post(`${this.resetURL}`, email);
  }

  updatePasswort(password: string, token: string, email: string) {
    const credentials = {password, token, email};
    console.log('Credentails: ', credentials);
    return this.http.put(`${this.changeURL}`, credentials);
  }
}
