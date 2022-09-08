import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderURL = `${environment.baseURL}/order`;

  constructor(private http: HttpClient) {
  }

  createOrder(name: string, lastName: string, land: string, adresse: string, stadt: string,
              postleitzahl: string, telefonnummer: string, email: string, orderNotes: string, total: number, orderdProducts: Array<Product>): Observable<Object> {
    const orderCredentails = {
      name,
      lastName,
      land,
      adresse,
      stadt,
      postleitzahl,
      telefonnummer,
      email,
      orderNotes,
      total,
      orderdProducts
    }
    console.log('Bestelldaten:', orderCredentails);
    return this.http.post(`${this.orderURL}`, orderCredentails);
  }
}
