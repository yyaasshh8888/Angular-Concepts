import { TestBed } from '@angular/core/testing';

import { RouteTrackerService } from './route-tracker.service';

describe('RouteTrackerService', () => {
  let service: RouteTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
