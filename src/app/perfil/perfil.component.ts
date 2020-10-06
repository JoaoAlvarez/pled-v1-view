import { Component } from '@angular/core';
import { MENU_ITEMS } from './perfil-menu';


@Component({
  selector: 'ngx-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  menu = MENU_ITEMS;

}
