import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordenadoresComponent } from './coordenadores.component';

describe('CoordenadoresComponent', () => {
  let component: CoordenadoresComponent;
  let fixture: ComponentFixture<CoordenadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordenadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordenadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
