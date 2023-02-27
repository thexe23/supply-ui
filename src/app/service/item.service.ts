import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemUrl = 'api/guard/item';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getItems(marketId: number): Observable<any> {
    return this.http.get(this.itemUrl + `/${marketId}`);
  }
  getItemsOnSale(marketId: number): Observable<any> {
    return this.http.get(this.itemUrl + `/${marketId}/on_sale`);
  }
  getAll(): Observable<any> {
    return this.http.get(this.itemUrl);
  }
  updateItem(itemId: number, newItem: Item): Observable<any> {
    return this.http.put(this.itemUrl + `/${itemId}`, newItem, this.httpOptions);
  }
  toggleItem(itemId: number, onSale: boolean): Observable<any> {
    return this.http.delete(this.itemUrl + `/${itemId}/${onSale}`);
  }
  addItem(item: Item): Observable<any> {
    return this.http.post(this.itemUrl, item, this.httpOptions);
  }
}
