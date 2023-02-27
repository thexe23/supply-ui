import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CartItem, Item } from 'src/app/models/item';
import { CreateOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/service/order.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId = 0;
  marketId = 0;
  orgId = 0;
  listOfData: CartItem[] = [];
  setOfChecked = new Set<CartItem>();
  sum = 0;
  isVisible = false;
  constructor(private cartService: CartService,
              private router: Router,
              private orderService: OrderService,
              private msg: NzMessageService) {}

  delete(id: number): void {
    this.listOfData = this.listOfData.filter(item => item.id !== id);
  }
  deleteAll(): void {
    this.listOfData = [];
    this.cartService.clearItems();
  }
  updateCheckedSet(item: CartItem, checked: boolean): void {
    if (checked) {
      this.setOfChecked.add(item);
      this.sum += item.number * item.price;
    } else {
      this.setOfChecked.delete(item);
      this.sum -= item.number * item.price;
    }
  }

  onItemChecked(item: CartItem, checked: boolean): void {
    this.updateCheckedSet(item, checked);
  }

  checkout(): void {
    this.listOfData = this.listOfData.filter(item => !this.setOfChecked.has(item));
    this.cartService.changeItems(this.listOfData);
    const uid = localStorage.getItem('id');
    const mid = localStorage.getItem('market_id');
    const oid = localStorage.getItem('org_id');
    if (uid != null) {
      this.userId = +uid;
    }
    if (mid != null ) {
      this.marketId = +mid;
    }
    if (oid != null) {
      this.orgId = +oid;
    }
    const order: CreateOrder = {
      userId: this.userId,
      marketId: this.marketId,
      orgId: this.orgId,
      items: JSON.stringify(Array.from(this.setOfChecked)),
      amount: this.sum
    };
    // tslint:disable-next-line: deprecation
    this.orderService.addOrder(order).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.sum = 0;
          const id = resp.data.order_id;
          this.router.navigate([`shopping/checkout/${id}`]);
        }
      },
      error: () => this.msg.error('下单失败')
    });
  }

  ngOnInit(): void {
    this.listOfData = this.cartService.getItems();
  }
}
