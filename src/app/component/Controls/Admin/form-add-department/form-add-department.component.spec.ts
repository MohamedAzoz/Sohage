import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddDepartmentComponent } from './form-add-department.component';

describe('FormAddDepartmentComponent', () => {
  let component: FormAddDepartmentComponent;
  let fixture: ComponentFixture<FormAddDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddDepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
