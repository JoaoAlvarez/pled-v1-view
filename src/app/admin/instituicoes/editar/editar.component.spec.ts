import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { instituicoesEditarComponent } from './editar.component';

describe('instituicoesEditarComponent', () => {
  let component: instituicoesEditarComponent;
  let fixture: ComponentFixture<instituicoesEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ instituicoesEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(instituicoesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
