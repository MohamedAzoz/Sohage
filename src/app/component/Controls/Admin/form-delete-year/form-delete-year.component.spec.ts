import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeleteYearComponent } from './form-delete-year.component';

describe('FormDeleteYearComponent', () => {
  let component: FormDeleteYearComponent;
  let fixture: ComponentFixture<FormDeleteYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDeleteYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDeleteYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
