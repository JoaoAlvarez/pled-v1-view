import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosEditarComponent } from './editar.component';

describe('EditarComponent', () => {
  let component: AlunosEditarComponent;
  let fixture: ComponentFixture<AlunosEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlunosEditarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
