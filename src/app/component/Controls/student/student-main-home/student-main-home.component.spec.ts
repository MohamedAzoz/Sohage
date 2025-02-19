import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMainHomeComponent } from './student-main-home.component';

describe('StudentMainHomeComponent', () => {
  let component: StudentMainHomeComponent;
  let fixture: ComponentFixture<StudentMainHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMainHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMainHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
