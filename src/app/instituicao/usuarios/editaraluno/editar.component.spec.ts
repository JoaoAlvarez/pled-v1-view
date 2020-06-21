import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlunoComponent } from './editar.component';

describe('EditarComponent', () => {
  let component: EditarAlunoComponent;
  let fixture: ComponentFixture<EditarAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
