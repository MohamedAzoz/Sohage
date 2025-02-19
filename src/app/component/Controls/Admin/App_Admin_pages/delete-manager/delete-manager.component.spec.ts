import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteManagerComponent } from './delete-manager.component';

describe('DeleteManagerComponent', () => {
  let component: DeleteManagerComponent;
  let fixture: ComponentFixture<DeleteManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
