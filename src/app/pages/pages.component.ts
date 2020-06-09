import { Component } from '@angular/core';

import { MENU_ITEMS, MENU_ITEMS_INSTITUICAO } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  templateUrl: './pages.component.html'
})
export class PagesComponent {

  menu = MENU_ITEMS;
  menu_instituicao = MENU_ITEMS_INSTITUICAO
}
