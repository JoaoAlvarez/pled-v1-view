import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvulsoComponent } from './avulso.component';

describe('AvulsoComponent', () => {
  let component: AvulsoComponent;
  let fixture: ComponentFixture<AvulsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvulsoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvulsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
