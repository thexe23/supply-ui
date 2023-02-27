import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Login } from '../models/auth';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      const data: Login = {
        username: this.validateForm.value.username,
        password: this.validateForm.value.password
      };
      // tslint:disable-next-line: deprecation
      this.authService.login(data).subscribe({
        next: resp => {
          if (resp.code === 200) {
            this.authService.setToken(resp.data.token);
            this.router.navigate(['/loading']);
          }else {
            console.log(resp.msg);
          }
        },
        error: (error: any) => this.msg.error('用户名或密码错误')
      });
    }
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private msg: NzMessageService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
