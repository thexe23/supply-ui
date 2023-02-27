import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, CreateOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderUrl = 'api/guard/order';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  statusMap: Map<number, string> = new Map([
    [10, '待付款'],
    [20, '待发货'],
    [30, '待取货'],
    [40, '配送中'],
    [50, '已完成'],
    [-1, '已取消']
  ]);
  constructor(private http: HttpClient) { }

  getForUser(userId: number): Observable<any>{
    return this.http.get(`${this.orderUrl}/user/${userId}`);
  }

  getForMarket(marketId: number): Observable<any>{
    return this.http.get(`${this.orderUrl}/market/${marketId}`);
  }

  getByOrg(orgId: number): Observable<any> {
    return this.http.get(`${this.orderUrl}/org/${orgId}`);
  }

  updateStatus(id: number, status: number): Observable<any>{
    return this.http.put(`${this.orderUrl}/${id}/${status}`, []);
  }

  addOrder(order: CreateOrder): Observable<any> {
    return this.http.post(this.orderUrl, order, this.httpOptions);
  }

}
