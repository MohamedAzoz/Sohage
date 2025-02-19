import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateCollegeComponent } from './form-update-college.component';

describe('FormUpdateCollegeComponent', () => {
  let component: FormUpdateCollegeComponent;
  let fixture: ComponentFixture<FormUpdateCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateCollegeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
