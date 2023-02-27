import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CartItem } from 'src/app/models/item';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit{

  constructor(private cartService: CartService, private msg: NzMessageService) {}
  @Input() id = 0;
  @Input() price = 0;
  @Input() name = '';
  @Input() imgUrl = '';
  cartItem: any;
  addToCart(cartItem: CartItem): void {
    this.cartService.addItem(cartItem);
    this.msg.success('成功加入购物车');
  }
  ngOnInit(): void {
    this.cartItem = {
      id: this.id,
      price: this.price,
      name: this.name,
      imgUrl: this.imgUrl,
      number: 1,
  };
  }
}
