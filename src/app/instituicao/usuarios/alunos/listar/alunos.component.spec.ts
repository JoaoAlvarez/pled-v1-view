import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosListarComponent } from './alunos.component';

describe('AlunosListarComponent', () => {
  let component: AlunosListarComponent;
  let fixture: ComponentFixture<AlunosListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlunosListarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
