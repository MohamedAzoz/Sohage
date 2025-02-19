import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryHomeComponent } from './summary-home.component';

describe('SummaryHomeComponent', () => {
  let component: SummaryHomeComponent;
  let fixture: ComponentFixture<SummaryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
