import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './professor-menu';

@Component({
  selector: 'ngx-professor',
  templateUrl: './professor.component.html'
})
export class ProfessorComponent {

  menu = MENU_ITEMS;

}
