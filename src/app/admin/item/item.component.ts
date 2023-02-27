import { Component, OnInit } from '@angular/core';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/service/item.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Notifications  } from '../../models/notification';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  listOfData: Item[] = [];
  marketId = 0;
  modalData: Item = {
    id: 0,
    marketId: this.marketId,
    name: '',
    price: 0,
    stock: 0,
    category: 0,
    imgUrl: '',
    onSale: true
  };
  isVisible = false;
  isAdd = false;
  formatterRMB = (value: number) => `¥ ${value}`;
  parserRMB = (value: string) => value.replace('¥ ', '');

  constructor(private msg: NzMessageService, private itemService: ItemService, private notificationService: NotificationService) {}

  editItem(id: number): void {
      const res = this.listOfData.find(item => item.id === id);
      if (res !== undefined) {
        this.modalData = JSON.parse(JSON.stringify(res));
        this.isVisible = true;
        this.isAdd = false;
      }
  }
  addItem(): void {
    this.modalData = {
      id: 0,
      marketId: this.marketId,
      name: '',
      price: 0,
      stock: 0,
      category: 0,
      imgUrl: '',
      onSale: true
    };
    this.isVisible = true;
    this.isAdd = true;
  }

  toggle(id: number, onSale: boolean): void {
    // tslint:disable-next-line: deprecation
    this.itemService.toggleItem(id, onSale).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.msg.success('操作成功');
          const index = this.listOfData.findIndex(item => item.id === id);
          this.listOfData[index].onSale = onSale;
        }
      },
      error: err => this.msg.error(err.resp.msg)
    });
  }

  reqTrans(item: string): void {
    const noti: Notifications = {
      sourceId: this.marketId,
      targetId: 10010,
      type: 2,
      content: `[${this.marketId}]商超请求调配[${item}]`
    }
    this.notificationService.addNotification(noti).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.msg.success('请求成功');
        }
      }
    });
  }

  handleOk(): void {
    if (this.modalData.name === '') {
     this.msg.error('商品名不能为空');
     return;
    }
    if (this.isAdd) {
      // tslint:disable-next-line: deprecation
      this.itemService.addItem(this.modalData).subscribe({
        next: resp => {
          if (resp.code === 200) {
            this.msg.success('商品添加成功');
          }else {
            this.msg.error(resp.msg);
          }
        }
      });
    }else {
      this.itemService.updateItem(this.modalData.id, this.modalData).subscribe({
        next: resp => {
          if (resp.code === 200) {
            this.msg.success('商品更新成功');
          }else {
            this.msg.error(resp.msg);
          }
        }
      });
    }
    const index = this.listOfData.findIndex(item => item.id === this.modalData.id);
    this.listOfData[index] = JSON.parse(JSON.stringify(this.modalData));
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {
    const id = localStorage.getItem('id');
    if (id != null) {
      this.marketId = +id;
      // tslint:disable-next-line: deprecation
      this.itemService.getItems(this.marketId).subscribe({
        next: resp => {
          if (resp.code === 200) {
            this.listOfData = resp.data;
          }
        }
      });
    }else {
      this.msg.error('获取商超ID失败');
    }
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name}上传成功`);
      this.modalData.imgUrl = 'http://shc.is135282.com/' + info.file.response.data;
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name}上传失败`);
    }
  }
}
