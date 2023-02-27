import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { Notifications } from '../models/notification'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  role = 0;
  id = 0;
  user: User[] = [];
  visible = false;
  notification: Notifications[] = [];
  typeMap = this.notificationService.typeMap;
  typeColorMap = this.notificationService.typeColorMap;
  constructor(private userService: UserService, private notificationService: NotificationService) { }
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
    const r = localStorage.getItem('role');
    const i = localStorage.getItem('id');
    if (r != null) {
      this.role = +r;
    }
    if (i != null) {
      this.id = +i;
    }
    this.userService.getUserById(this.id).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.user.push(resp.data);
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
