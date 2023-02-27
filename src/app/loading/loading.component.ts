import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.authService.loading().subscribe({
      next: resp => {
        const path: string = resp.data.path;
        localStorage.setItem('id', resp.data.id);
        localStorage.setItem('org_id', resp.data.org_id);
        localStorage.setItem('role', resp.data.role);
        if (resp.data.path === '/shopping') {
          localStorage.setItem('market_id', resp.data.market_id);
        }
        this.router.navigate([path]);
      }
    });
  }

}
