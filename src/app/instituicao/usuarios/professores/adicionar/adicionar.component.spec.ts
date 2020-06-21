import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessoresAdicionarComponent } from './adicionar.component';

describe('AdicionarComponent', () => {
  let component: ProfessoresAdicionarComponent;
  let fixture: ComponentFixture<ProfessoresAdicionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessoresAdicionarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessoresAdicionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
