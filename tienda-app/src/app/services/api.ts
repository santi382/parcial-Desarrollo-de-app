import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private url = 'https://fakestoreapi.com/products';


  constructor (private Http: HttpClient) {}

  getProducts(): Observable<any[]>{
    return this.Http.get<any[]>(this.url);
  }
}
