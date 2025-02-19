import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateManagerByDoctorComponent } from './update-manager-by-doctor.component';

describe('UpdateManagerByDoctorComponent', () => {
  let component: UpdateManagerByDoctorComponent;
  let fixture: ComponentFixture<UpdateManagerByDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateManagerByDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateManagerByDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
