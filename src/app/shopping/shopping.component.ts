import { Component, OnInit } from '@angular/core';
import { Notifications } from '../models/notification';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit{
  cartCount = 0;
  user: any;
  id = 0;
  visible = false;
  notification: Notifications[] = [];
  typeMap = this.notificationService.typeMap;
  typeColorMap = this.notificationService.typeColorMap;
  constructor(private cartService: CartService, private userService: UserService, private notificationService: NotificationService) {}
  open(): void{
    this.visible = true;
  }
  close(): void{
    this.visible = false;
  }
  remove(c: string): void {
    this.notification = this.notification.filter(n => n.content !== c);
  }
  removeAll(): void {
    this.notification = [];
  }
  refresh(): void {
    this.notificationService.getNotification(this.id).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.notification = resp.data;
        }
      }
    });
  }
  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.cartService.changeCount$.subscribe(res => this.cartCount = res);
    const i = localStorage.getItem('id');
    if (i != null) {
      this.id = +i;
      // tslint:disable-next-line: deprecation
      this.userService.getUserById(this.id).subscribe({
        next: resp => {
          if (resp.code === 200) {
            this.user = resp.data;
          }
        }
      });

      this.notificationService.getNotification(this.id).subscribe({
        next: resp => {
          if (resp.code === 200) {
            this.notification = resp.data;
          }
        }
      });
    }
  }
}
