import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddYearComponent } from './form-add-year.component';

describe('FormAddYearComponent', () => {
  let component: FormAddYearComponent;
  let fixture: ComponentFixture<FormAddYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
