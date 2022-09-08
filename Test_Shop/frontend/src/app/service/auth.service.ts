import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Subject} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new Subject<User>();
  private apiURL = `${environment.baseURL}/login`;

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string) {
    const loginCredentials = {email, password};
    console.log('login credentials', loginCredentials);
    return this.httpClient.post(`${this.apiURL}`, loginCredentials);
  }

  /*logout() {
      //remove this user from subject
      this.setUser(null);
      console.log('user did log out successfully');
  }*/


}
