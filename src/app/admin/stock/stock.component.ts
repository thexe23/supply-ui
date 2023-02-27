import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/service/item.service';
import { TransportService } from 'src/app/service/transport.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  items: Item[] = [];
  listOfData: Item[] = [];
  marketMap = this.transportService.marketMap;
  selectMarket = 0;
  selectItem = '';
  constructor(private itemService: ItemService, private transportService: TransportService) {}
  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.itemService.getAll().subscribe({
      next: (resp: { code: number; data: Item[]; }) => {
        if (resp.code === 200) {
          this.items = resp.data;
          this.listOfData = this.items;
        }
      }
    });
  }
  search(): void {
    this.listOfData = this.items;
    if (this.selectMarket !== 0) {
      this.listOfData = this.listOfData.filter(item => item.marketId === this.selectMarket);
    }
    if (this.selectItem !== '') {
      this.listOfData = this.listOfData.filter(item => item.name === this.selectItem);
    }
  }
}
