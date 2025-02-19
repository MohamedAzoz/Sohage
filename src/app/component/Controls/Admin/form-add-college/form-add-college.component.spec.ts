import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddCollegeComponent } from './form-add-college.component';

describe('FormAddCollegeComponent', () => {
  let component: FormAddCollegeComponent;
  let fixture: ComponentFixture<FormAddCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddCollegeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
