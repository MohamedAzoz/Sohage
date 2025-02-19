import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryManagerComponent } from './summary-manager.component';

describe('SummaryManagerComponent', () => {
  let component: SummaryManagerComponent;
  let fixture: ComponentFixture<SummaryManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
