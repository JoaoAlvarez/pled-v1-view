import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosAdicionarComponent } from './adicionar.component';

describe('AdicionarComponent', () => {
  let component: AlunosAdicionarComponent;
  let fixture: ComponentFixture<AlunosAdicionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlunosAdicionarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunosAdicionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
