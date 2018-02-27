import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SwipeInfo, SwipeDirection } from '../../directives/swiper.directive';
import { Media } from '../../models/item';

@Component({
  selector: 'hd-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent implements OnInit, OnChanges {
  @Input() media: Media[] = [];
  @Input() currentSlideIndex: number = 0;

  // Minimum movement needed before we take a swipe action as moving the images on the carousel
  private _thresholdForHorizontalSwiping: number = 30;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    this.currentSlideIndex = 0;
  }

  nextSlide($event) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    $event.stopPropagation();
    this.currentSlideIndex = this.currentSlideIndex === this.media.length - 1 ? 0 : this.currentSlideIndex + 1;
  }

  prevSlide($event) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    $event.stopPropagation();
    this.currentSlideIndex = this.currentSlideIndex === 0 ? this.media.length - 1 : this.currentSlideIndex - 1;
  }

  swipeCarousel(event: SwipeInfo) {
    if (event.swipeEvent.type === 'touchend') {
    if (Math.abs(event.x.current - event.x.start) < (this._thresholdForHorizontalSwiping)
      || (Math.abs(event.y.current - event.y.start) > this._thresholdForHorizontalSwiping)
      ) return;

      if (event.x.direction === SwipeDirection.LEFT) this.nextSlide(event.swipeEvent);
      else this.prevSlide(event.swipeEvent);
    }
  }
}
