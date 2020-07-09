import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaisListarComponent } from './listar.component';

describe('MateriaisListarComponent', () => {
  let component: MateriaisListarComponent;
  let fixture: ComponentFixture<MateriaisListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MateriaisListarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaisListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
