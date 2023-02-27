import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-fresh',
  templateUrl: './fresh.component.html',
  styleUrls: ['./fresh.component.css']
})
export class FreshComponent implements OnInit {
  array = [1, 2, 3, 4];
  items: Item[] = [];
  constructor(private itemService: ItemService) {}
 ngOnInit(): void {
  const mid = localStorage.getItem('market_id');
  if (mid != null) {
    const marketId = +mid;
    // tslint:disable-next-line: deprecation
    this.itemService.getItemsOnSale(marketId).subscribe({
      next: resp => {
        if (resp.code === 200) {
          console.log(resp.data);
          this.items = resp.data.filter((elem: { category: number; }) => elem.category === 2);
        }
      }
    });
  }
 }
}
