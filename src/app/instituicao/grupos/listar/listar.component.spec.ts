import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposListarComponent } from './listar.component';

describe('GruposListarComponent', () => {
  let component: GruposListarComponent;
  let fixture: ComponentFixture<GruposListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GruposListarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
