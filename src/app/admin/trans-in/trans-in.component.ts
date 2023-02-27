import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CreateTransport, Transports } from 'src/app/models/transport';
import { NotificationService } from 'src/app/service/notification.service';
import { TransportService } from 'src/app/service/transport.service';

@Component({
  selector: 'app-trans-in',
  templateUrl: './trans-in.component.html',
  styleUrls: ['./trans-in.component.css']
})
export class TransInComponent implements OnInit {
  listOfData: Transports[] = [];
  transIn: Transports[] = [];
  transOut: Transports[] = [];
  id = 0;
  role = 0;
  index = 0;
  statusMap = this.transportService.statusMap;
  marketMap = this.transportService.marketMap;
  constructor(private transportService: TransportService, private msg: NzMessageService,
              private notificationService: NotificationService) {}
  ngOnInit(): void {
    const uid = localStorage.getItem('id');
    if (uid != null ) {
      this.id = +uid;
    }
    this.transportService.getForSource(this.id).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.transOut = resp.data;
        }
      }
    });
    this.transportService.getForTarget(this.id).subscribe({
        next: resp => {
          if (resp.code === 200) {
            this.transIn = resp.data;
            this.listOfData = this.transIn;
          }
        }
      });
  }


  changeTab(index: number): void {
    if (index === 0) {
      this.listOfData = this.transIn;
    }else {
      this.listOfData = this.transOut;
    }
  }

  cancel(id: number): void {
    this.transportService.updateStatus(id, -1).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.msg.success('取消成功');
          const index = this.listOfData.findIndex(item => item.id === id);
          this.listOfData[index].status = -1;
        }
      },
      error: () => this.msg.error('请求错误')
    });
  }

  send(id: number): void {
    this.transportService.updateStatus(id, 30).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.msg.success('发货成功');
          const index = this.listOfData.findIndex(item => item.id === id);
          this.listOfData[index].status = 30;
          this.notificationService.sendNotification(this.id, this.listOfData[index].targetId, `调配单[${id}已发货]`);
        }
      },
      error: () => this.msg.error('请求错误')
    });
  }

  receive(id: number): void {
    this.transportService.updateStatus(id, 40).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.msg.success('收货成功');
          const index = this.listOfData.findIndex(item => item.id === id);
          this.listOfData[index].status = 40;
          this.notificationService.sendNotification(this.id, this.listOfData[index].sourceId, `调配单[${id}已收货]`);
        }
      },
      error: () => this.msg.error('请求错误')
    });
  }
}
