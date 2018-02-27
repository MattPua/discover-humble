import { Component, OnInit, Input, EventEmitter, Output, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Item, SteamReview } from '../../models/item';

@Component({
  selector: 'hd-expanded-item',
  templateUrl: './expanded-item.component.html',
  styleUrls: ['./expanded-item.component.scss']
})
export class ExpandedItemComponent implements OnInit, OnChanges {
  @Input() item: Item;
  @Input() isActive: boolean = false;
  @Output() deselectItem: EventEmitter<void> = new EventEmitter();
  @ViewChild('elemRef') elemRef: ElementRef;
  private _data: any[];


  allReviews: SteamReview[] = [];
  reviewsToShow: SteamReview[] = [];

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    if (this.isActive) {
      this.allReviews = this.item.steam && this.item.steam.reviews ? this.item.steam.reviews.reviews : [];
      this.allReviews = this.allReviews.sort((x, y) => {
        if (x.author.playtime_forever > y.author.playtime_forever) return -1;
        else if (x.author.playtime_forever < y.author.playtime_forever) return 1;
        else return 0;
      });
      this._data = null;
      this.reviewsToShow = this.getReviewsToShow(false, true);
      // this.elemRef.nativeElement.scrollIntoView();
    }
  }

  get data() {
    if (!this._data) {
      const newValues = [];
      if (this.item.igdb && this.item.igdb.total_rating) newValues.push({name: 'IGDB', value: Math.round(this.item.igdb.total_rating)});
      if (this.item.steam) {
        const steam = this.item.steam;
        if (steam.reviews) newValues.push({name: 'Steam', value: Math.round(steam.reviews.query_summary.review_score * 10)});
        if (steam.appDetails && steam.appDetails.metacritic) newValues.push({name: 'Metacritic', value: Math.round(steam.appDetails.metacritic.score)});
      }
      this._data = newValues;
    }
    return this._data;
  }

  getReviewsToShow(showAllReviews: boolean = false, isFirstTime: boolean = false): SteamReview[] {
    if (showAllReviews) return this.allReviews;
    else if (isFirstTime) return this.allReviews.slice(0, Math.min(this.allReviews.length, 3));
    else if (!showAllReviews) return [];
  }

}
