import { Component, OnInit } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/service/order.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html'
})
export class MyorderComponent implements OnInit {
  orders: Order[] = [];
  listOfData: Order[] = [];
  index = 0;
  uid = 0;
  statusMap = this.orderService.statusMap;
  orgMap = this.userService.orgMap;
  constructor(private orderService: OrderService, private msg: NzMessageService, private userService: UserService) {}
  changeTab(index: number): void {
    switch (index) {
      case 1:
        this.listOfData = this.orders.filter(order => order.orderStatus === 10);
        return;
      case 2:
        this.listOfData = this.orders.filter(order => order.orderStatus === 20);
        return;
      case 3:
        this.listOfData = this.orders.filter(order => order.orderStatus === 30);
        return;
      case 4:
        this.listOfData = this.orders.filter(order => order.orderStatus === 40);
        return;
      case 5:
        this.listOfData = this.orders.filter(order => order.orderStatus === 50);
        return;
      case 6:
        this.listOfData = this.orders.filter(order => order.orderStatus === -1);
        return;
      default:
        this.listOfData = this.orders;
    }
  }
  pay(id: number): void {
    this.orderService.updateStatus(id, 20).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.msg.success('支付成功');
          const index = this.listOfData.findIndex(item => item.id === id);
          this.listOfData[index].orderStatus = 20;
        }
      }
    });
  }
  cancel(id: number): void {
    this.orderService.updateStatus(id, -1).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.msg.success('取消成功');
          const index = this.listOfData.findIndex(item => item.id === id);
          this.listOfData[index].orderStatus = -1;
        }
      }
    });
  }
  complete(id: number): void {
    this.orderService.updateStatus(id, 50).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.msg.success('已确认收货');
          const index = this.listOfData.findIndex(item => item.id === id);
          this.listOfData[index].orderStatus = 50;
        }
      }
    });
  }
  ngOnInit(): void {
    const id = localStorage.getItem('id');
    if (id != null) {
      this.uid = +id;
    }
    this.orderService.getForUser(this.uid).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.orders = resp.data;
          for (let i = 0; i < resp.data.length; i++) {
            this.orders[i].items = JSON.parse(resp.data[i].items);
          }
          this.listOfData = this.orders;
        }
      }
    });
  }
}
