import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeleteDepartmentComponent } from './form-delete-department.component';

describe('FormDeleteDepartmentComponent', () => {
  let component: FormDeleteDepartmentComponent;
  let fixture: ComponentFixture<FormDeleteDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDeleteDepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDeleteDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
