import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private count = new BehaviorSubject<number>(0);
  changeCount$ = this.count.asObservable();

  Items: CartItem[] = [];
  constructor() { }

  changeItems(items: CartItem[]): void {
    this.Items = items;
    this.count.next(items.length);
  }

  addItem(item: CartItem): void {
    this.Items.push(item);
    this.count.next(this.Items.length);
  }

  getItems(): CartItem[] {
    return this.Items;
  }

  clearItems(): void {
    this.Items = [];
    this.count.next(0);
  }
}
