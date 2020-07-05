import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinasListarComponent } from './disciplinas.component';

describe('DisciplinasListarComponent', () => {
  let component: DisciplinasListarComponent;
  let fixture: ComponentFixture<DisciplinasListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisciplinasListarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
