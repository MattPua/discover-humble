import { Component, OnInit, Input } from '@angular/core';
import { SteamReview, Item } from '../../models/item';
import * as moment from 'moment';
@Component({
  selector: 'hd-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() review: SteamReview;

  constructor() { }

  ngOnInit() {
  }

  get reviewDate(): string {
    return moment(this.review.timestamp_created * 1000).fromNow();
  }

  get calendarReviewDate(): string {
    return moment(this.review.timestamp_created * 1000).calendar();
  }

}
