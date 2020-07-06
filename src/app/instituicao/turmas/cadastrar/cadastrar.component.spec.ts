import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmasCadastrarComponent } from './cadastrar.component';

describe('TurmasCadastrarComponent', () => {
  let component: TurmasCadastrarComponent;
  let fixture: ComponentFixture<TurmasCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TurmasCadastrarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmasCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
