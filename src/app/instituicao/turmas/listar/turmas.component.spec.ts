import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmasListarComponent } from './turmas.component';

describe('TurmasListarComponent', () => {
  let component: TurmasListarComponent;
  let fixture: ComponentFixture<TurmasListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TurmasListarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
