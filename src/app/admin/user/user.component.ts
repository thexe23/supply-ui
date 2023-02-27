import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User, UpdateUserReq } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  editCache: { [key: number]: { edit: boolean; data: User } } = {};
  users: User[] = [];
  listOfData: User[] = [];
  roleMap = this.userService.roleMap;
  orgMap = this.userService.orgMap;
  selectName = '';
  selectType = 0;
  selectPhone = '';
  constructor(private userService: UserService, private msg: NzMessageService) {}

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  delete(id: number): void {
    this.userService.delete(id).subscribe({
      next: resp => {
        if(resp.code === 200) {
          this.listOfData = this.listOfData.filter(item => item.id === id);
        }
      },
      error: () => this.msg.error('删除失败')
    });
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    const newUser: UpdateUserReq = {
      username: this.editCache[id].data.username,
      password: this.editCache[id].data.password,
      phone: this.editCache[id].data.phone,
      imgUrl: this.editCache[id].data.imgUrl
    };
    // tslint:disable-next-line: deprecation
    this.userService.update(id, newUser).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.msg.success('修改成功');
        }else {
          this.msg.error(resp.Msg);
        }
      },
      error: err => console.log(err)
  });
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.userService.getUsers().subscribe({
      next: (resp: { data: User[]; }) => {
        this.listOfData = resp.data;
        this.users = resp.data;
        this.updateEditCache();
      },
      error: (err: any) => this.msg.error(err)
    });
  }

  search(): void {
    this.listOfData = this.users;
    if (this.selectType !== 0) {
      this.listOfData = this.listOfData.filter(item => item.role === this.selectType);
    }
    if (this.selectName !== '') {
      this.listOfData = this.listOfData.filter(item => item.username === this.selectName);
    }
    if (this.selectPhone !== '') {
      this.listOfData = this.listOfData.filter(item => item.phone === this.selectPhone);
    }
  }
}
