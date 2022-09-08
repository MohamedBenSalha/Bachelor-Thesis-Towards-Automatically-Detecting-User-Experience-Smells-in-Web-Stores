import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${environment.baseURL}api/products`);
  }

  getSingleProduct(id: string | null): Observable<any> {
    return this.http.get(`${environment.baseURL}api/products/single/${id}`);
  }

  getAllProductsByTitle(title: string): Observable<any> {
    return this.http.get(`${environment.baseURL}api/products/title/${title}`);
  }

  getAllProductsByKategory(productType: string): Observable<any> {
    return this.http.get(
      `${environment.baseURL}api/products/product-type/${productType}`
    );
  }

  getAllProductsByBrand(brand: string): Observable<any> {
    return this.http.get(`${environment.baseURL}api/products/brand/${brand}`); // TODO: if not 200, then redirect to 404 page
  }

  getAllProductTitles(): Observable<any> {
    return this.http
      .get(`${environment.baseURL}api/products`)
      .pipe(
        map((response: any) =>
          response.map((item: { [x: string]: any }) => item['modelName'])
        )
      );
  }
}
