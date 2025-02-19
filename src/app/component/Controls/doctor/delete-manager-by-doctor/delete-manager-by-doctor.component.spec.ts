import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteManagerByDoctorComponent } from './delete-manager-by-doctor.component';

describe('DeleteManagerByDoctorComponent', () => {
  let component: DeleteManagerByDoctorComponent;
  let fixture: ComponentFixture<DeleteManagerByDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteManagerByDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteManagerByDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
