import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateDepartmentComponent } from './form-update-department.component';

describe('FormUpdateDepartmentComponent', () => {
  let component: FormUpdateDepartmentComponent;
  let fixture: ComponentFixture<FormUpdateDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateDepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
