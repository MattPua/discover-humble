import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'hd-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() items: Item[] = [];
  @Input() selectedItem: Item = null;
  @Output() reloadItems: EventEmitter<any> = new EventEmitter();
  @Output() selectItem: EventEmitter<Item> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
