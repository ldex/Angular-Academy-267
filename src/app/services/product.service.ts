import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, shareReplay, tap, map } from 'rxjs/operators';
import { Product } from '../products/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://storerestservice.azurewebsites.net/api/products/';
  // Use this instead if you can't access the REST API
  // private baseUrl: string = "assets/db.json";


  products$: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this.initProducts();
  }

  insertProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  initProducts() {
    let url:string = this.baseUrl + `?$orderby=ModifiedDate%20desc`;

    this.products$ = this
                        .http
                        .get<Product[]>(url)
                        .pipe(
                          delay(1500), // fake delay!!
                          tap(console.table)
                        );
  }
}
