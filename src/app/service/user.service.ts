import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUserReq } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  roleMap: Map<number, string> = new Map([
    [1, '居民'],
    [2, '社区负责人'],
    [3, '商超'],
    [4, '供应商'],
  ]);

  orgMap: Map<number, string> = new Map([
    [1001, '华农东苑'],
    [1002, '华农西苑'],
    [1003, '华农南苑'],
    [1004, '华农北苑'],
    [2001, '超市A'],
    [2002, '超市B'],
    [3001, '供应商']
  ]);
  constructor(private http: HttpClient) { }

  userUrl = 'api/guard/user';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getUsers(): Observable<any>{
    return this.http.get(this.userUrl, this.httpOptions);
  }
  getUserById(id: number): Observable<any> {
    return this.http.get(this.userUrl + `/${id}`, this.httpOptions);
  }
  update(id: number, newUser: UpdateUserReq): Observable<any> {
    return this.http.put(this.userUrl + `/${id}`, newUser, this.httpOptions);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.userUrl + `/${id}`);
  }
}
