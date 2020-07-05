import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinasCadastrarComponent } from './cadastrar.component';

describe('DisciplinasCadastrarComponent', () => {
  let component: DisciplinasCadastrarComponent;
  let fixture: ComponentFixture<DisciplinasCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisciplinasCadastrarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinasCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
