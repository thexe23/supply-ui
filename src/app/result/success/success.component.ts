import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html'
})
export class SuccessComponent implements OnInit {
  title!: string;
  subTitle!: string;
  goTitle!: string;
  backTitle!: string;
  goUrl!: string;
  backUrl!: string;

  constructor(private activeRoute: ActivatedRoute){}
  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.activeRoute.queryParams.subscribe(param => {
      this.title = param.title;
      this.subTitle = param.subTitle;
      this.goTitle = param.goTitle;
      this.backTitle = param.backTitle;
      this.goUrl = param.goUrl;
      this.backUrl = param.backUrl;
    });
  }
}
