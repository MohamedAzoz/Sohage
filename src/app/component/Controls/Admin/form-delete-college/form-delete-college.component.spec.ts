import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeleteCollegeComponent } from './form-delete-college.component';

describe('FormDeleteCollegeComponent', () => {
  let component: FormDeleteCollegeComponent;
  let fixture: ComponentFixture<FormDeleteCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDeleteCollegeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDeleteCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
