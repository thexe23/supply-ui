import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Register } from '../models/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
    this.validateForm.controls[i].markAsDirty();
    this.validateForm.controls[i].updateValueAndValidity();
  }
    if (this.validateForm.valid) {
      const data: Register = {
      username: this.validateForm.value.username,
      password: this.validateForm.value.password,
      role: this.validateForm.value.role,
      phone: this.validateForm.value.phone,
      orgId: this.validateForm.value.orgId,
    };

      // tslint:disable-next-line: deprecation
      this.authService.register(data).subscribe({
        next: resp => {
          if (resp.code === 200) {
            this.router.navigate(['/success'], {queryParams:
              {
                title: '注册成功！',
                subTitle: '尊敬的' + data.username + '您的账号' + data.phone + '已注册成功，请使用用户名和密码登陆',
                goTitle: '去登陆',
                goUrl: '/login',
                backTitle: '重新注册',
                backUrl: '/register',
              }});
          }
        },
        error: err => console.log(err)
      });
  }
}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      role: [null, Validators.required],
      phoneNumberPrefix: ['+86'],
      phone: [null, [Validators.required]],
      orgId: [null, [Validators.required]]
    });
  }
}
