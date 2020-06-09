import {
  Component,
  NgZone,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
} from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import { Subscription, Subject } from "rxjs";

@Component({
  selector: "ngx-badge",
  templateUrl: "./badge.component.html",
})
export class BadgeComponent implements ViewCell, OnInit {
  constructor(public zone: NgZone, private ref: ChangeDetectorRef) {}

  renderValue;

  ngOnInit() {
    this.renderValue = this.value;
  }

  @Input() value: string | number;
  @Input() rowData: any;
}
