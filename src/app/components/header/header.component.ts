import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'hd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() items: Item[] = [];
  @Output() showAboutModal: EventEmitter<void> = new EventEmitter();
  @Output() showCreditsModal: EventEmitter<void> = new EventEmitter();
  @Output() showContactModal: EventEmitter<void> = new EventEmitter();

  showLinksMobile: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
