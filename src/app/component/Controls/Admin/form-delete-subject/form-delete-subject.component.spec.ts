import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeleteSubjectComponent } from './form-delete-subject.component';

describe('FormDeleteSubjectComponent', () => {
  let component: FormDeleteSubjectComponent;
  let fixture: ComponentFixture<FormDeleteSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDeleteSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDeleteSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
