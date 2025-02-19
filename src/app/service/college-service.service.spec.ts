import { TestBed } from '@angular/core/testing';

import { CollegeServiceService } from './college-service.service';

describe('CollegeServiceService', () => {
  let service: CollegeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
