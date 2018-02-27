import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild, Renderer2, EventEmitter, Output } from '@angular/core';
import { Item, IgdbData, SteamReview } from '../../models/item';

@Component({
  selector: 'hd-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit, OnChanges {
  @Input() item: Item = new Item();
  @Input() isSelectedItem: boolean = false;
  @Output() selectItem: EventEmitter<Item> = new EventEmitter();
  randomDescriptionContent: string = '';
  randomIcon: string = '';
  itemCategory: string = ''; // audio, ebook, game
  steamReview: SteamReview = null;

  isShowingSteamReviewText: boolean = false;



  private _maxDescriptionLength: number = 150;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.getRandomDescription();
    this.getRandomThumbnail();
    this.getItemCategory();
  }

  ngOnChanges() {
  }

  onClick() {
    this.selectItem.emit(this.item);
  }

  getItemCategory() {
    switch (this.item.platform) {
      case 'game': {this.itemCategory = 'https://mattpua.github.io/discover-humble/assets/icons/game.svg'; break; }
      case 'ebook': {this.itemCategory = 'https://mattpua.github.io/discover-humble/assets/icons/ereader.svg'; break; }
      case 'audio': {this.itemCategory = 'https://mattpua.github.io/discover-humble/assets/icons/music.svg'; break; }
      case 'android': {this.itemCategory = 'https://mattpua.github.io/discover-humble/assets/icons/smartphone.svg'; break; }
    }
  }
  // Generate a random description from the possible choices
  getRandomDescription() {
    const possibleValues = [];
    if (this.item.steam.appDetails) {
      const appDetails = this.item.steam.appDetails;
      if (appDetails.short_description) {
        let description = appDetails.short_description;
        if (description.length > this._maxDescriptionLength) description = description.substr(0, this._maxDescriptionLength) + '...';
        possibleValues.push({type: 'description', value: description});
      }
    }
    if (this.item.steam.reviews) {
      if (this.item.steam.reviews.reviews.length) {
        this.steamReview = this.item.steam.getRandomReview();
        let review = this.steamReview.review;
        if (review.length > this._maxDescriptionLength) review = review.substr(0, this._maxDescriptionLength) + '...';
        review = `<span class="quote">"${review}"</span>`;
        possibleValues.push({type: 'review', value: review});
      }
    }
    if (possibleValues.length) {
      const num = Math.floor(Math.random() * Math.floor(possibleValues.length));
      if (possibleValues[num].type === 'review') this.isShowingSteamReviewText = true;
      this.randomDescriptionContent = possibleValues[num].value;
    }
  }
  // get a random thumbnail to show out of all the possible places we can get a thumbnail
  getRandomThumbnail() {
    const possibleValues = [this.item.humbleBundle.icon];
    if (this.item.steam.appDetails) {
      const appDetails = this.item.steam.appDetails;
      if (appDetails.header_image) possibleValues.push(appDetails.header_image);
      if (appDetails.background) possibleValues.push(appDetails.background);
      if (appDetails.screenshots && appDetails.screenshots.length) {
        appDetails.screenshots.forEach((s) => possibleValues.push(s.path_thumbnail));
      }
    }
    if (this.item.igdb) {
      const igdb = this.item.igdb;
      if (igdb.cover) possibleValues.push(igdb.cover.url);
      if (igdb.screenshots && igdb.screenshots.length) {
        igdb.screenshots.forEach((s) => possibleValues.push(s.url));
      }
    }
    if (possibleValues.length) {
      const num = Math.floor(Math.random() * Math.floor(possibleValues.length));
      this.randomIcon = possibleValues[num];
    }
  }
}
