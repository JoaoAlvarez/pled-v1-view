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
import { instituicoesService } from "../instituicoes.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: "instituicoes-anexos",
  templateUrl: "./anexos.component.html",
})
export class instituicoesAnexosComponent implements ViewCell, OnInit {
  constructor(
    public zone: NgZone,
    private ref: ChangeDetectorRef,
    private instituicoesService: instituicoesService
  ) { }

  renderValue;

  ngOnInit() {
    console.log(this.rowData);
    this.renderValue = this.value;
  }

  @Input() value: string | number;
  @Input() rowData: any;


}
