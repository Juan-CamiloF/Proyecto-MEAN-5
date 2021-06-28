import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditorialComponent } from './modal-editorial.component';

describe('ModalEditorialComponent', () => {
  let component: ModalEditorialComponent;
  let fixture: ComponentFixture<ModalEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
