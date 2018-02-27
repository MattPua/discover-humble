import { Directive, ElementRef, Output, HostListener, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[hdSwiper]'
})
export class HdSwiperDirective {
  private _swipeInfo: SwipeInfo = new SwipeInfo();
  @Input() stopPropagation: boolean = true;
  @Input() stopDefault: boolean = true;
  @Input() bufferDistance: number = 0.05; // Percentage buffer for determining last direction on touchend
  @Output() onSwipe: EventEmitter<SwipeInfo> = new EventEmitter();
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  constructor(private el: ElementRef) {
  }
  @HostListener('click', ['$event'])
  click($event) {
    this.onClick.emit($event);
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchmove', ['$event'])
  onswipe($event) {
    this.swipeEvent($event);
  }

  private swipeEvent($event) {
    const type = $event.type;
    if (this.stopPropagation) {
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
    if (this.stopDefault) {
      event.preventDefault();
    }
    if (!$event.changedTouches[0]) return;
    const currentY = $event.changedTouches[0].clientY;
    const currentX = $event.changedTouches[0].clientX;
    if (type === 'touchstart') {
      this._swipeInfo.y.start = currentY;
      this._swipeInfo.y.min = currentY;
      this._swipeInfo.y.max = currentY;
      this._swipeInfo.x.start = currentX;
      this._swipeInfo.x.max = currentX;
      this._swipeInfo.x.min = currentX;
    }
    else if (type === 'touchmove') {
      if (this._swipeInfo.y.current > currentY)
        this._swipeInfo.y.direction = SwipeDirection.UP;
      else
        this._swipeInfo.y.direction = SwipeDirection.DOWN;

      if (this._swipeInfo.x.current > currentX)
        this._swipeInfo.x.direction = SwipeDirection.LEFT;
      else
        this._swipeInfo.x.direction = SwipeDirection.RIGHT;

      // Use this as a buffer to help accomodate for inaccuries in finger swiping causing directions to be slightly different at touchend
      if (currentX > this._swipeInfo.x.max) this._swipeInfo.x.max = currentX;
      if (currentX < this._swipeInfo.x.min) this._swipeInfo.x.min = currentX;
      if (currentY < this._swipeInfo.y.min) this._swipeInfo.y.min = currentY;
      if (currentY > this._swipeInfo.y.max) this._swipeInfo.y.max = currentY;
    }
    else if (type === 'touchend') {
      // Extra Logic to determine the last direction a swipe travelled taking into account inaccuracy of a finger movement via a buffer
      if (currentX < this._swipeInfo.x.max
          && currentX > (this._swipeInfo.x.max - (this._swipeInfo.x.max * this.bufferDistance))) {
        this._swipeInfo.x.direction = SwipeDirection.RIGHT;
      }
      else if (currentX > this._swipeInfo.x.min
        && currentX < (this._swipeInfo.x.min - (this._swipeInfo.x.min * this.bufferDistance))) {
        this._swipeInfo.x.direction = SwipeDirection.LEFT;
      }
      if (currentY < this._swipeInfo.y.max
        && currentY > (this._swipeInfo.y.max - (this._swipeInfo.y.max * this.bufferDistance))) {
        this._swipeInfo.y.direction = SwipeDirection.DOWN;
      }
      else if (currentY > this._swipeInfo.y.min
        && currentY < (this._swipeInfo.y.min - (this._swipeInfo.y.min * this.bufferDistance))) {
        this._swipeInfo.y.direction = SwipeDirection.UP;
      }
    }
    this._swipeInfo.y.current = currentY;
    this._swipeInfo.x.current = currentX;
    this._swipeInfo.swipeEvent = $event;
    this.onSwipe.emit(this._swipeInfo);

    if (type === 'touchend') this._swipeInfo.reset();

  }
}

export class SwipeInfo {
  y = {
    start: 0,
    current: 0,
    max: 0,
    min: 0,
    direction: null
  };
  x = {
    start: 0,
    current: 0,
    max: 0,
    min: 0,
    direction: null
  };
  swipeEvent: Event;
  constructor() {}

  reset() {
    this.y = {
      start: 0,
      current: 0,
      max: 0,
      min: 0,
      direction: null
    };
    this.x = {
      start: 0,
      current: 0,
      max: 0,
      min: 0,
      direction: null
    };
    this.swipeEvent = null;
  }
}

export enum SwipeDirection {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}
