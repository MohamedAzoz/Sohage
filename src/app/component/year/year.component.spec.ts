import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearComponentimplements } from './year.component';

describe('YearComponentimplements', () => {
  let component: YearComponentimplements;
  let fixture: ComponentFixture<YearComponentimplements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearComponentimplements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearComponentimplements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
