import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hd-bar-graph',
  templateUrl: 'bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {
  @Input() data: [{
    name: string,
    value: number
  }];

  constructor() {}

  ngOnInit() {
  }
}
