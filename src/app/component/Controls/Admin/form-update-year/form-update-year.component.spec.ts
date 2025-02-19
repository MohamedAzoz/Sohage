import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateYearComponent } from './form-update-year.component';

describe('FormUpdateYearComponent', () => {
  let component: FormUpdateYearComponent;
  let fixture: ComponentFixture<FormUpdateYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
