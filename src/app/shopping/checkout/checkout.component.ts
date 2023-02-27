import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit{
  id: string | null = null;
  subTitle = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subTitle = `订单号：${this.id}`;
  }
}
