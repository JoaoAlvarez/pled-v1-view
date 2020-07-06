import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposCadastrarComponent } from './cadastrar.component';

describe('GruposCadastrarComponent', () => {
  let component: GruposCadastrarComponent;
  let fixture: ComponentFixture<GruposCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GruposCadastrarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
