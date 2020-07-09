import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinasEditarComponent } from './editar.component';

describe('DisciplinasEditarComponent', () => {
  let component: DisciplinasEditarComponent;
  let fixture: ComponentFixture<DisciplinasEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisciplinasEditarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
