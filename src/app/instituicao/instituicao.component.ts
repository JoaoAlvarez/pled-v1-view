import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './instituicao-menu';

@Component({
  selector: 'ngx-instituicao',
  templateUrl: './instituicao.component.html'
})
export class InstituicaoComponent {

  menu = MENU_ITEMS;

}
