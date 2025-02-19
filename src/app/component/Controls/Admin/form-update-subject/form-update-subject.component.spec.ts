import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateSubjectComponent } from './form-update-subject.component';

describe('FormUpdateSubjectComponent', () => {
  let component: FormUpdateSubjectComponent;
  let fixture: ComponentFixture<FormUpdateSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
