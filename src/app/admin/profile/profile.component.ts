import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any;
  cache: any;
  roleMap = this.userService.roleMap;
  orgMap = this.userService.orgMap;
  constructor(private userService: UserService, private msg: NzMessageService) {}
  ngOnInit(): void {
    const id = localStorage.getItem('id');
    if (id != null) {
      const userId: number = +id;
      // tslint:disable-next-line: deprecation
      this.userService.getUserById(userId).subscribe({
        next: resp => {
          this.data = resp.data;
          this.cache = JSON.parse(JSON.stringify(this.data));
        }
      });
    }
  }
  resetForm(): void {
    this.data = JSON.parse(JSON.stringify(this.cache));
  }

  save(): void {
    // tslint:disable-next-line: deprecation
    this.userService.update(this.data.id, this.data).subscribe({
      next: resp => {
        if (resp.code === 200) {
          this.msg.success(resp.msg);
        }else {
          this.msg.error(resp.msg);
        }
      }
    });
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name}上传成功`);
      this.data.imgUrl = 'http://shc.is135282.com/' + info.file.response.data;
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name}上传失败`);
    }
  }
}
