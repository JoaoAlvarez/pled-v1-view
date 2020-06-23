import { Component } from '@angular/core';

@Component({
  selector: 'fluid-layout',
  styleUrls: ['./fluid.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>
          <nb-layout-header subheader>
        <nb-actions>
            <nb-action icon="home-outline"></nb-action>
            <nb-action icon="search-outline"></nb-action>
            <nb-action icon="edit-outline"></nb-action>
        </nb-actions>
    </nb-layout-header>

      <nb-layout-column>


        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class FluidLayoutComponent { }
