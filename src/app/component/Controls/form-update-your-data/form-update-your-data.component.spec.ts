import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateYourDataComponent } from './form-update-your-data.component';

describe('FormUpdateYourDataComponent', () => {
  let component: FormUpdateYourDataComponent;
  let fixture: ComponentFixture<FormUpdateYourDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateYourDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateYourDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
