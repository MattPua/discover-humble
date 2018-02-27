import { Component, OnInit } from '@angular/core';
import { ItemService } from './services/item.service';
import { Item } from './models/item';


declare var kofiwidget2: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items: Item[] = [];
  itemsToShow: Item[] = [];
  selectedItem: Item = null;

  showAboutModal: boolean = false;
  showCreditsModal: boolean = false;
  showContactModal: boolean = false;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().then((items) => {
      this.items = items;
      this.showRandomGames();
    });

  }

  showRandomGames() {
    const numGamesToShow = Math.ceil(Math.random() * Math.floor(this.items.length / 3));
    const gamesToShow = [];
    while (gamesToShow.length < numGamesToShow) {
      const gameToAdd = this.items[Math.floor(Math.random() * Math.floor(this.items.length))];
      if (gamesToShow.indexOf(gameToAdd) < 0) gamesToShow.push(gameToAdd);
    }
    this.itemsToShow = gamesToShow;
    this.deselectItem();
  }

  deselectItem() {
    this.selectedItem = null;
  }

}
