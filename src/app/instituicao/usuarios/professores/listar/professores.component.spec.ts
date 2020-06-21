import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessoresListarComponent } from './professores.component';

describe('ProfessoresListarComponent', () => {
  let component: ProfessoresListarComponent;
  let fixture: ComponentFixture<ProfessoresListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessoresListarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessoresListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
